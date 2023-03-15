class SceneTwo extends Phaser.Scene {
    constructor ()
    {
        super({ key: 'SceneTwo' });
    }

    preload ()
    {
        this.load.image('town', 'assets/images/town.png');
        this.load.image('dialog-box', 'assets/images/dialog-box.png');
    }

    create ()
    {
        let town = this.add.image(0,-150,'town').setOrigin(0,0);
        town.setScale(1.7);

        this.add.image(150,480, 'dialog-box').setOrigin(0).setScale(0.8).setDepth(2);

        this.input.manager.enabled = true;
    }

    update ()
    {
        this.input.once('pointerdown', function (event) {

            this.scene.start('SceneThree');

        }, this);
        }
}

const dialogTexts = [{name: 'name', sentence: 'hello darkness'}, {name: 'name', sentence:`I've come to talk`}, {name:'', sentence:'with you again'}]
export default SceneTwo;