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

let game = new Phaser.Game(config)

function preload() {
    this.load.image('pool', '../assets/images/pond.png');
    this.load.image('hero', '../assets/images/hero.png');
    this.load.image('princess', '../assets/images/princess.png');
    this.load.image('dialog', '../assets/images/dialog-box.png');
}

let hero
let princess
let dialog
let dialogueText
let dialogueIndex = 0;
function create() {
    this.add.image(800, 400, 'pool');
    hero = this.add.image(350, 605, 'hero').setScale(1.2);
    princess = this.add.image(1500, 605, 'princess').setScale(1.2);
    dialog = this.add.image(950, 820, 'dialog');
    dialogueText = this.add.text(500, 750, "Hey", {
        fontSize: "60px",
        color: "#fff",
        wordWrap: { width: 1000, useAdvancedWrap: true },
    });

    let dialogue = [
        "Princess: Bonjour Hero !",
        "....",
        "Princess: Aujourd'hui est le jour de ton avainement !",
        "...",
        "Es tu prêt ?",
    ];

    this.input.keyboard.on("keydown-X", () => {
        if (dialogueIndex < dialogue.length - 1) {
            dialogueIndex++;
            dialogueText.setText(dialogue[dialogueIndex]);
        } else {
            dialogueText.setText("");
            dialogueIndex = 0;
            dialogueText.setText("Princess: Es-tu prêt ? (oui/non)");
        }
    });

    dialogueText.setText(dialogue[dialogueIndex]);

    this.input.keyboard.on("keydown-O", () => {
        if (dialogueText.text.includes("Es-tu prêt ?")) {
            dialogueText.setText("Princess: Félicitations, tu es prêt !");
        }
    });

    this.input.keyboard.on("keydown-N", () => {
        if (dialogueText.text.includes("Es-tu prêt ?")) {
            dialogueText.setText("Princess: Dommage, tu es GAME OVER");
        }
    });

}
