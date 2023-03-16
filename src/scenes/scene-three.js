import heartSystem from '../services/heartSystem.js';


let dialogueIndex = 0;
class SceneThree extends Phaser.Scene {

    constructor() {
        super({ key: 'SceneThree' });
    }

    preload() {
        this.load.setBaseURL("../assets/images");
        this.load.image('pond', 'pond.png');
        this.load.image('hero', 'heroz.png');
        this.load.image('princess', 'princess.png');
        this.load.image('dialog', 'dialog-box.png');
        this.load.image('heart', 'heart.webp');
    }

    create() {
        const pond = this.add.image(-150, 0, 'pond').setOrigin(0).setScale(0.7);

        const dialogBox = this.add.image(150, 480, 'dialog-box').setOrigin(0).setScale(0.8).setDepth(2);
        const hero = this.add.image(150, 460, 'hero').setScale(1.3);
        const princess = this.add.image(1100, 550, 'princess').setScale(1.3);
        const dialogueText = this.add.text(220, 555, "", {
            fontSize: "25px",
            color: "#fff",
            wordWrap: { width: 1000, useAdvancedWrap: true },
        }).setDepth(2);

        const nameText = this.add.text(265, 505, "", {
            fontSize: "30px",
            color: "#fff",
            wordWrap: { width: 1000, useAdvancedWrap: true },
        }).setDepth(2);

        let dialogue = [
            { name: 'Sylvain', sentence: 'Bonjour Hero !' },
            { name: 'Zakarius', sentence: `....` },
            { name: 'Sylvain', sentence: "Aujourd'hui est le jour de ton avènement !" }
        ];

        this.input.keyboard.on("keydown-X", () => {
            if (dialogueIndex < dialogue.length - 1) {
                dialogueIndex++;
                nameText.setText(dialogue[dialogueIndex].name);
                dialogueText.setText(dialogue[dialogueIndex].sentence);
            } else {
                nameText.setText("");
                dialogueText.setText("");
                dialogueIndex = 0;
                nameText.setText("Sylvain");
                dialogueText.setText("Es-tu prêt ? (oui/non)");
            }
        });

        nameText.setText(dialogue[dialogueIndex].name);
        dialogueText.setText(dialogue[dialogueIndex].sentence);

        this.input.keyboard.on("keydown-O", () => {
            if (dialogueText.text.includes("Es-tu prêt ?")) {
                nameText.setText("Sylvain");
                dialogueText.setText("Félicitations, tu es prêt !");
            }
        });

        this.input.keyboard.on("keydown-N", () => {
            if (dialogueText.text.includes("Es-tu prêt ?")) {
                nameText.setText("Sylvain");
                dialogueText.setText("Dommage, tu es GAME OVER");
            }
        });

        for (let i = 0; i < heartSystem.lives; i++) {
            let heart = this.add.image(90 + i * 49, 60, 'heart').setScale(0.16).setDepth(2);
            heartSystem.hearts.push(heart);
        }
    }

    update() {
        this.input.once('pointerdown', function (event) {

            this.scene.start('SceneOne');

        }, this);
    }
}

export default SceneThree;