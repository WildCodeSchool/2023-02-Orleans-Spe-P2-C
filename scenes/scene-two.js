let counter = 0;
let dialog;
let name;
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

        this.add.image(90,420,'dialog-box').setOrigin(0,0).setScale(0.9);

        this.input.manager.enabled = true;

        dialog = this.add.text(160,500, '', {fontSize: '40px', fontFamily: 'VT323'});
        name = this.add.text(220,435, '', {fontSize: '60px', fontFamily: 'VT323'})

        town.setInteractive();
        town.on('clicked', this.clickHandler, this);
        this.input.on('gameobjectup', function (pointer, gameObject)
        {
            gameObject.emit('clicked', gameObject);
        }, this);
    }e

    update ()
    {
        if (counter < dialogTexts.length) {
            dialog.setText(dialogTexts[counter].sentence);
            name.setText(dialogTexts[counter].name);
        } else {
            this.scene.start('SceneThree');
        }
    }

    clickHandler (town)
    {
        counter++;
    }
}

let dialogTexts = [{name: 'name', sentence: 'hello darkness'}, {name: 'name', sentence:`I've come to talk`}, {name:'', sentence:'with you again'}]
export default SceneTwo;