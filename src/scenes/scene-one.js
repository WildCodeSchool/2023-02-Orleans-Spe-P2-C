class SceneOne extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneOne' });
    }

    preload() {
        this.load.setBaseURL("../assets/images");
        this.load.image('forest', 'mgs.png');
        this.load.image('hero', 'hero.png');
        this.load.image('hero2', 'hero2z.png');
        this.load.image('box', 'dialog-box.png');
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

        this.dialogueBox = this.add.image(150,480, 'box').setOrigin(0).setScale(0.8).setDepth(2).setVisible(false);
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

        this.input.once('pointerdown', function (event) {

            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('SceneTwo')
            });

        }, this);

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

export default SceneOne;