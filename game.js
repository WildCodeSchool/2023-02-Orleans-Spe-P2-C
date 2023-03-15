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

const game = new Phaser.Game(config);