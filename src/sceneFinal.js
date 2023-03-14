import Phaser from "./lib/phaser.js";

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
    this.load.image('pool', '../assets/images/Reflecting_Pool.png');
    this.load.image('hero', '../assets/images/hero.png');
    this.load.image('princess', '../assets/images/princess.png');
    this.load.image('dialog', '../assets/images/dialog-box.png');
}

let hero
let princess
let dialog
let dialogueText
function create() {
    this.add.image(800, 400, 'pool');
    hero = this.add.image(350, 605, 'hero').setScale(1.2);
    princess = this.add.image(1500, 605, 'princess').setScale(1.2);
    dialog = this.add.image(950, 820, 'dialog');

    // Ajout du texte de la boîte de dialogue
    dialogueText = this.add.text(500, 750, "Hey", {
        fontSize: "60px",
        color: "#fff",
        wordWrap: { width: 1000, useAdvancedWrap: true },
    });

    // Texte à afficher dans la boîte de dialogue
    let dialogue = [
        "Princess: Bonjour Hero !",
        "....",
        "Princess: Aujourd'hui est le jour de ton avainement !",
        "...",
    ];

    // Index du texte actuellement affiché
    let dialogueIndex = 0;

    // Ajout d'un écouteur d'événements pour la touche "X"
    this.input.keyboard.on("keydown-X", () => {
        // S'il reste du texte à afficher
        if (dialogueIndex < dialogue.length) {
            // Affiche le texte suivant
            dialogueIndex++;
            dialogueText.setText(dialogue[dialogueIndex]);
        } else {
            // Ferme la boîte de dialogue
            dialogueText.setText("");
            dialogueIndex = 0;
        }

    });

    dialogueText.setText(dialogue[dialogueIndex]);

}
