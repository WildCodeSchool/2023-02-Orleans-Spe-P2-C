let hero
let princess
let dialog
let dialogueText
let nameText
let dialogueIndex = 0;

class SceneThree extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'SceneThree' });
    }

    preload ()
    {
        this.load.setBaseURL("../assets/images");
        this.load.image('pond', 'pond.png');
        this.load.image('hero', 'heroz.png');
        this.load.image('princess', 'princess.png');
        this.load.image('dialog', 'dialog-box.png');
    }

    create ()
    {
        this.cameras.main.fadeIn(500, 0, 0, 0)

        let pond = this.add.image(-150,0,'pond').setOrigin(0).setScale(0.7);

        let dialogBox = this.add.image(150,480, 'dialog-box').setOrigin(0).setScale(0.8).setDepth(2);
        hero = this.add.image(150, 460, 'hero').setScale(1.3);
        princess = this.add.image(1100, 550, 'princess').setScale(1.3);
        dialogueText = this.add.text(220, 555, "", {
            fontSize: "25px",
            color: "#fff",
            wordWrap: { width: 1000, useAdvancedWrap: true },
        }).setDepth(2);

        nameText = this.add.text(265, 505, "", {
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
    }

    update ()
    {
        this.input.once('pointerdown', function (event) {

            this.scene.start('SceneOne');

        }, this);
    }
}

export default SceneThree;