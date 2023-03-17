import heartSystem from '../services/health-system.js';
class SceneTwo extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneTwo' });
    }

    preload() {
        this.load.image('town', 'assets/images/town.png');
        this.load.image('dialog-box', 'assets/images/dialog-box.png');
        this.load.image('heart', 'heart.webp');
    }

    create() {
        const town = this.add.image(0, -150, 'town').setOrigin(0, 0);
        town.setScale(1.7);

        this.add.image(150, 480, 'dialog-box').setOrigin(0).setScale(0.8).setDepth(2);

        this.input.manager.enabled = true;

        for (let i = 0; i < heartSystem.lives; i++) {
            let heart = this.add.image(90 + i * 49, 60, 'heart').setScale(0.16).setDepth(2);
            heartSystem.hearts.push(heart);
        }
    }

    update() {
        this.input.once('pointerdown', function (event) {

            this.scene.start('SceneThree');

        }, this);
    }
}

const dialogTexts = [{ name: 'name', sentence: 'hello darkness' }, { name: 'name', sentence: `I've come to talk` }, { name: '', sentence: 'with you again' }]
export default SceneTwo;