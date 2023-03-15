import Phaser from "../lib/phaser.js";

let config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    physics: {},
    scene: {
        preload: preload,
        create: create
    }
}
    
const game = new Phaser.Game(config)

function preload() {
    this.load.setBaseURL("../assets/images");
    this.load.image('pool', 'pond.png');
    this.load.image('hero', 'hero.png');
    this.load.image('princess', 'princess.png');
    this.load.image('dialog', 'dialog-box.png');
}

let hero
let princess
let dialog
let dialogueText
let nameText
let dialogueIndex = 0;
function create() {
    this.add.image(800, 400, 'pool');
    hero = this.add.image(350, 605, 'hero').setScale(1.2);
    princess = this.add.image(1500, 605, 'princess').setScale(1.2);
    dialog = this.add.image(950, 820, 'dialog');
    dialogueText = this.add.text(450, 765, "", {
        fontSize: "60px",
        color: "#fff",
        wordWrap: { width: 1000, useAdvancedWrap: true },
    });

    nameText = this.add.text(507, 690, "", {
        fontSize: "60px",
        color: "#fff",
        wordWrap: { width: 1000, useAdvancedWrap: true },
    });

    let dialogue = [
        { name: 'Princess', sentence: 'Bonjour Hero !' },
        { name: 'Zakarius', sentence: `....` },
        { name: 'Princess', sentence: "Princess: Aujourd'hui est le jour de ton avainement !" }
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
            nameText.setText("Princess");
            dialogueText.setText("Es-tu prêt ? (oui/non)");
        }
    });

    nameText.setText(dialogue[dialogueIndex].name);
    dialogueText.setText(dialogue[dialogueIndex].sentence);

    this.input.keyboard.on("keydown-O", () => {
        if (dialogueText.text.includes("Es-tu prêt ?")) {
            nameText.setText("Princess");
            dialogueText.setText("Félicitations, tu es prêt !");
        }
    });

    this.input.keyboard.on("keydown-N", () => {
        if (dialogueText.text.includes("Es-tu prêt ?")) {
            nameText.setText("Princess");
            dialogueText.setText("Dommage, tu es GAME OVER");
        }
    });

}
