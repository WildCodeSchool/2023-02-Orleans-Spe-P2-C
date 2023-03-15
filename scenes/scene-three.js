class SceneThree extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'SceneThree' });
    }

    preload ()
    {
        this.load.image('pond', 'assets/images/pond.png');
    }

    create ()
    {
        let pond = this.add.image(-150,0,'pond').setOrigin(0,0).setScale(0.7);

        let dialogBox = this.add.image(90,420,'dialog-box').setOrigin(0,0).setScale(0.9);
        this.input.once('pointerdown', function (event) {

            this.scene.start('SceneTwo');

        }, this);
    }
}

export default SceneThree;