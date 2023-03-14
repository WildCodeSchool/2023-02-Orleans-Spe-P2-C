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
function create() {
    this.add.image(800, 400, 'pool');
    hero = this.add.image(350, 605, 'hero').setScale(1.2);
    princess = this.add.image(1500, 605, 'princess').setScale(1.2);
    dialog = this.add.image(950, 820, 'dialog');

}