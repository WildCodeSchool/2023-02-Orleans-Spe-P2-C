import heartSystem from '../services/health-system.js';

let music;
let dialogueIndex = 0;
class SceneThree extends Phaser.Scene {

    constructor() {
        super({ key: 'SceneThree' });
    }

    preload() {
        this.load.setBaseURL("../assets/");
        this.load.image('pond', 'images/pond.png');
        this.load.image('hero', 'images/hero.png');
        this.load.image('princess', 'images/princess.png');
        this.load.image('dialog', 'images/dialog-box.png');
        this.load.image('heart', 'images/heart.webp');
        this.load.audio('music3',['musics/Music3.ogg','musics/Music3.mp3']);
    }

    create ()
    {
        this.cameras.main.fadeIn(500, 0, 0, 0)

        let pond = this.add.image(-150,0,'pond').setOrigin(0).setScale(0.7);

        const musicIcon = this.add.sprite(1200, 20, 'musicIcon').setOrigin(0).setScale(2.5).setDepth(2).setInteractive();
        const muteIcon = this.add.sprite(1200, 20, 'muteIcon').setOrigin(0).setScale(2.5).setDepth(2).setInteractive().setVisible(false);

        music = this.sound.add('music3', { loop: true });

        const hearts = [];
        for (let i = 0; i < heartSystem.lives; i++) {
            hearts[i] = this.add.image(90 + i * 49, 60, 'heart').setScale(0.16).setDepth(2);
        }

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
            { name: 'maknifik damoiselle', sentence: 'Bonjour Hero !' },
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

        musicIcon.on('pointerdown', function (pointer) {music.play(); musicIcon.setVisible(false); muteIcon.setVisible(true)});
        muteIcon.on('pointerdown', function (pointer) {music.stop(); musicIcon.setVisible(true); muteIcon.setVisible(false)});
    }
}

export default SceneThree;