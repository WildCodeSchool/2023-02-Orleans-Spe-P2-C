import heartSystem from '../services/health-system.js';
let hearts = [];
class SceneOne extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneOne' });
        this.dialogueCompleted = false;
        this.minigameActive = false;
        this.userChoice = null;
    }

    preload() {
        this.load.setBaseURL("../assets/images");
        this.load.image('forest', 'mgs.png');
        this.load.image('hero', 'heroz.png');
        this.load.image('hero2', 'hero2z.png');
        this.load.image('box', 'dialog-box.png');
        this.load.image('heart', 'heart.webp');
    }

    create() {
        this.add.image(0, 0, 'forest').setOrigin(0).setScale(0.5).setDepth(1);
        this.characters = [
            new Character(this, 0, 210, 'hero', 1.3, 'Zakarius', [
                'Salut Sylvain',
                'Tu vas bien ce matin?',
                'Oui, à bientôt'
            ]),
            new Character(this, 700, 110, 'hero2', 1.0, 'Sylvain', [
                'Salut Signature stp',
                'Oui et toi?',
                'à bientôt'
            ])
        ];

        this.move();

        this.dialogueBox = this.add.image(150, 480, 'box').setOrigin(0).setScale(0.8).setDepth(2).setVisible(false);
        this.characterNameText = this.add.text(265, 505, '', {
            font: '30px Arial',
            fill: '#ffffff',
            lineSpacing: 10,
        }).setDepth(2).setVisible(false);
        this.dialogueText = this.add.text(220, 505, '', {
            font: '25px Arial',
            fill: '#ffffff',
            lineSpacing: 10,
            padding: { top: 50 }
        }).setDepth(2).setVisible(false);

        this.currentCharacterIndex = 0;
        this.input.keyboard.on('keydown-SPACE', () => this.showDialogue());
        this.setupInputListenersForGame();

        for (let i = 0; i < heartSystem.lives; i++) {
            hearts[i] = this.add.image(90 + i * 49, 60, 'heart').setScale(0.16).setDepth(2);
        }

        this.input.on('pointerdown', function (event) {
            if (!this.minigameActive) {
                this.scene.start('SceneTwo');
            }
        }, this);

    }

    update() {
        if (this.minigameActive && this.userChoice) {
            this.handleMinigameResult();
        }
    }
    handleMinigameResult() {
        const move1 = this.userChoice;
        const move2 = this.characters[1].chooseMove();
        let result;

        if (move1 === move2) {
            result = "égalité";
        } else if (
            (move1 === "php" && move2 === "javascript") ||
            (move1 === "ruby" && move2 === "php") ||
            (move1 === "javascript" && move2 === "ruby")
        ) {
            result = `${this.characters[0].name} gagne`;
        } else {
            result = `${this.characters[1].name} gagne.`;
            heartSystem.loseLife();
            hearts[hearts.length-1].setVisible(false);
        }

        this.dialogueText.setText(`${result}`).setVisible(true);
        this.minigameActive = false;
        this.userChoice = null;

        if (result === `${this.characters[0].name} gagne`) {
            setTimeout(() => {
                this.scene.start('SceneTwo');
            }, 2000);
        } else if (heartSystem.lives > 0) {
            this.minigameActive = true;
            setTimeout(() => {
                this.minigamePrompt();
            }, 2000);
        } else {
            setTimeout(() => {
                window.location.href = 'gameOver.html';
            }, 2000);
        }
    }

    showDialogue() {
        const character = this.characters[this.currentCharacterIndex];
        const currentDialogue = character.getCurrentDialogue();

        if (!currentDialogue) {
            if (!this.minigameActive && this.dialogueCompleted) {
                this.minigamePrompt();
            }
            return;
        }

        this.characterNameText.setText(character.name).setVisible(true);
        this.dialogueText.setText(currentDialogue).setVisible(true);
        this.dialogueBox.setVisible(true);

        character.zoom();
        this.currentCharacterIndex = (this.currentCharacterIndex + 1) % this.characters.length;

        if (this.currentCharacterIndex === 0 && character.dialogues.length === character.currentDialogueIndex && !this.dialogueCompleted) {
            this.dialogueCompleted = true;
            this.characters[1].setMinigamePrompt("Choisissez : PHP (P), Javascript (J) ou Ruby (R)");
        }
    }

    move() {
        this.characters[0].image.x = -300;
        this.characters[1].image.x = 700;

        this.tweens.add({
            targets: this.characters[0].image,
            x: 0,
            duration: 2000,
            ease: 'Power2'
        });

        this.tweens.add({
            targets: this.characters[1].image,
            x: 900,
            duration: 2000,
            ease: 'Power2'
        });
    }

    setupInputListenersForGame() {
        this.input.keyboard.on('keydown-P', () => this.userChoice = 'php');
        this.input.keyboard.on('keydown-J', () => this.userChoice = 'javascript');
        this.input.keyboard.on('keydown-R', () => this.userChoice = 'ruby');
    }

    minigamePrompt() {
        this.minigameActive = true;
        this.characterNameText.setText(this.characters[1].name).setVisible(true);
        this.dialogueText.setText(this.characters[1].minigamePrompt).setVisible(true);
        this.dialogueBox.setVisible(true);
    }
}

class Character {
    constructor(scene, x, y, imageKey, scale, name, dialogues) {
        this.scene = scene;
        this.image = scene.add.image(x, y, imageKey).setOrigin(0).setScale(scale).setDepth(1);
        this.name = name;
        this.dialogues = dialogues;
        this.currentDialogueIndex = 0;
        this.minigamePrompt = null;
    }

    setMinigamePrompt(prompt) {
        this.minigamePrompt = prompt;
    }

    getCurrentDialogue() {
        if (this.currentDialogueIndex < this.dialogues.length) {
            const dialogue = this.dialogues[this.currentDialogueIndex];
            this.currentDialogueIndex++;
            return dialogue;
        } else if (this.minigamePrompt) {
            return this.minigamePrompt;
        }
        return '';
    }

    zoom() {
        const scale = this.image.scale;
        const targetScale = scale * 1.1;

        this.scene.tweens.add({
            targets: this.image,
            scaleX: targetScale,
            scaleY: targetScale,
            duration: 300,
            yoyo: true,
            ease: 'Power1'
        });
    }

    chooseMove() {
        const moves = ['php', 'javascript', 'ruby'];
        return moves[Math.floor(Math.random() * moves.length)];
    }
}

export default SceneOne;