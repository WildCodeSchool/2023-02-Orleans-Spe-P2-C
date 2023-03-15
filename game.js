import SceneTwo from './scenes/scene-two.js';
import SceneThree from './scenes/scene-three.js';

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-game',
    width: 1280,
    height: 720,
    backgroundColor: '#2d2d2d',
    dom: {
        createContainer: true,
    },
    scene:
        [SceneTwo, SceneThree]
};

let game = new Phaser.Game(config);

/*function preload ()
{
    this.load.image('background', 'assets/images/ruins.png');
    this.load.image('avatar', 'assets/images/avatar1.png');
    this.load.image('dialog-box', 'assets/images/dialog-box.png');
}

let bg;
let avatar;
let dialogBox;
function create () {
    bg = this.add.image(0,0,'background').setOrigin(0,0);
    dialogBox = this.add.image(625,600,'dialog-box');
    //avatar = this.add.image(150,650,'avatar');

    bg.setScale(1.5);
    //avatar.setScale(0.5);
}*/