let counter = 0;
let dialog;
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
        let counter = 0;

        let town = this.add.image(0,-150,'town').setOrigin(0,0);
        town.setScale(1.7);

        let dialogBox = this.add.image(90,420,'dialog-box').setOrigin(0,0).setScale(0.9);

        this.input.manager.enabled = true;

        dialog = this.add.text(200,500, 'ah', {fontSize: '90px'});

        town.setInteractive();
        town.on('clicked', this.clickHandler, this);
        this.input.on('gameobjectup', function (pointer, gameObject)
        {
            gameObject.emit('clicked', gameObject);
        }, this);
    }

    update ()
    {
        if (counter < dialogTexts.length) {
            dialog.setText(dialogTexts[counter]);
        } else {
            this.scene.start('SceneThree');
        }
    }

    clickHandler (town)
    {
        counter++;
    }
}

let dialogTexts = ['hello darkness', `I've come to talk`, 'with you again']
export default SceneTwo;