class DialogueScene extends Phaser.Scene {
    constructor() {
        super({ key: 'DialogueScene' });
    }

    preload() {
        this.load.setBaseURL("../assets/images");
        this.load.image('forest', 'mgs.png');
        this.load.image('hero', 'heroz.png');
        this.load.image('hero2', 'hero2z.png');
        this.load.image('box', 'dialog-box.png');
    }

    create() {
        this.add.image(0, 0, 'forest').setOrigin(0).setScale(0.5).setDepth(1);
        this.characters = [
            new Character(this, 0, 350, 'hero', 1.3, 'Zakarius', [
                'Salut Sylvain',
                'Tu vas bien ce matin?',
                'Oui, à bientôt'
            ]),
            new Character(this, 1100, 250, 'hero2', 1.0, 'Sylvain', [
                'Salut Signature stp',
                'Oui et toi?',
                'à bientôt'
            ])
        ];

        this.move();

        this.dialogueBox = this.add.image(250, 600, 'box').setOrigin(0).setScale(0.8).setDepth(2).setVisible(false);
        this.characterNameText = this.add.text(448, 620, '', {
            font: '30px Arial',
            fill: '#000000',
            lineSpacing: 10,
        }).setDepth(2).setVisible(false);
        this.dialogueText = this.add.text(330, 650, '', {
            font: '30px Arial',
            fill: '#000000',
            lineSpacing: 10,
            padding: { top: 50 }
        }).setDepth(2).setVisible(false);

        this.currentCharacterIndex = 0;
        this.input.keyboard.on('keydown-SPACE', () => this.showDialogue());

    }

    showDialogue() {
        let character = this.characters[this.currentCharacterIndex];
        this.characterNameText.setText(character.name).setVisible(true);
        this.dialogueText.setText(character.getCurrentDialogue()).setVisible(true);
        this.dialogueBox.setVisible(true);

        character.zoom();
        this.currentCharacterIndex = (this.currentCharacterIndex + 1) % this.characters.length;
    }

    move() {

        this.characters[0].image.x = -300;
        this.characters[1].image.x = 1700;

        this.tweens.add({
            targets: this.characters[0].image,
            x: 0,
            duration: 2000,
            ease: 'Power2'
        });

        this.tweens.add({
            targets: this.characters[1].image,
            x: 1100,
            duration: 2000,
            ease: 'Power2'
        });
    }
}

class Character {
    constructor(scene, x, y, imageKey, scale, name, dialogues) {
        this.scene = scene;
        this.image = scene.add.image(x, y, imageKey).setOrigin(0).setScale(scale).setDepth(1);
        this.name = name;
        this.dialogues = dialogues;
        this.currentDialogueIndex = 0;
    }

    getCurrentDialogue() {
        let dialogue = this.dialogues[this.currentDialogueIndex];
        this.currentDialogueIndex = (this.currentDialogueIndex + 1) % this.dialogues.length;
        return dialogue;
    }

    zoom() {
        let scale = this.image.scale;
        let targetScale = scale * 1.1;

        this.scene.tweens.add({
            targets: this.image,
            scaleX: targetScale,
            scaleY: targetScale,
            duration: 300,
            yoyo: true,
            ease: 'Power1'
        });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 1440,
    height: 859,
    parent: 'game-container',
    scene: [DialogueScene]
};

const game = new Phaser.Game(config);