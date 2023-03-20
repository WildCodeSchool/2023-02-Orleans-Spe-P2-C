
import heartSystem from '../services/health-system.js';

let hearts = [];
let music;
class SceneOne extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneOne' });
        this.dialogueCompleted = false;
        this.minigameActive = false;
        this.userChoice = null;
    }

    preload() {
        this.load.setBaseURL("../assets/");
        this.load.image('forest', 'images/mgs.png');
        this.load.image('hero', 'images/hero.png');
        this.load.image('hero2', 'images/hero2z.png');
        this.load.image('box', 'images/dialog-box.png');
        this.load.image('heart', 'images/heart.webp');
        this.load.image('musicIcon', 'images/musical.png');
        this.load.image('muteIcon', 'images/mute.png');
        this.load.audio('music1', ['musics/Music1.ogg', 'musics/Music1.mp3']);
    }

    create() {
        this.add.image(0, 0, 'forest').setOrigin(0).setScale(0.5).setDepth(1);

        const musicIcon = this.add.sprite(1200, 20, 'musicIcon').setOrigin(0).setScale(2.5).setDepth(2).setInteractive();
        const muteIcon = this.add.sprite(1200, 20, 'muteIcon').setOrigin(0).setScale(2.5).setDepth(2).setInteractive().setVisible(false);

        music = this.sound.add('music1', { loop: true });

        for (let i = 0; i < heartSystem.lives; i++) {
            hearts[i] = this.add.image(90 + i * 49, 60, 'heart').setScale(0.16).setDepth(2);
        }


        this.characters = [
            new Character(this, 0, 210, 'hero', 1.0, 'hero', [
                'il y a quelqu\'un?',
                'Ah bon? ',
                'Tu vas bien ce matin?',
                'Pardon Monsieur…',
                'Euh… Je crois?',
                'ah..'
            ]),
            new Character(this, 700, 110, 'hero2', 1.0, 'Sylvain', [
                'Bonjour jeune homme. Je t’attendais.',
                'Oui. Tu es en retard, d’ailleurs. ',
                'Sylvain. Je suis là pour ton premier checkpoint. Es-tu prêt?',
                `On va faire un petit jeu de PHP, Javascript, Ruby. 
                PHP gagne contre Javascript, Javascript gagne contre Ruby, 
                et Python gagne contre PHP. Tu as compris?`,
                'Pas le choix de toute manière.',
                'Allons-y.'
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
        this.input.keyboard.on('keydown-X', () => this.showDialogue());
        this.setupInputListenersForGame();

        musicIcon.on('pointerdown', function (pointer) { music.play(); musicIcon.setVisible(false); muteIcon.setVisible(true) });
        muteIcon.on('pointerdown', function (pointer) { music.stop(); musicIcon.setVisible(true); muteIcon.setVisible(false) });

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
            result = `Bravo ${this.characters[0].name} tu as gagné. Tu peux donc continuer ton chemin. 
            Mais n’oublie pas PHP est clairement supérieur à Javascript.`;
            music.stop();
                this.cameras.main.fadeOut(1000, 0, 0, 0);
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                    this.scene.start('SceneTwo')
                });
        } else {
            result = `${this.characters[1].name} gagne.`;
            heartSystem.loseLife();
            hearts[hearts.length - 1].setVisible(false);
        }

        this.dialogueText.setText(`${result}`).setVisible(true);
        this.setupInputListenersForGame();
        this.minigameActive = false;
        this.userChoice = null;

        if (result === `Bravo ${this.characters[0].name} tu as gagné. Tu peux donc continuer ton chemin. 
        Mais n’oublie pas PHP est clairement supérieur à Javascript.`) {
        } else if (heartSystem.lives > 0) {
            this.minigameActive = true;
            setTimeout(() => {
                this.minigamePrompt();
            }, 2000);
        } else {
            setTimeout(() => {
                window.location.href = 'game-over.html';
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
        const targetScale = scale * 1.05;

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
