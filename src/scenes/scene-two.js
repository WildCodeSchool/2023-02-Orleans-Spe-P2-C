let counter = -1;
let dialog;
let name;
let option1;
let option2;
let step = 1;
let goodAnswer = false;
let isDialogOver = false;
let zacharius;
let hero;
let code;
let sylvain;

const dialogFirstPart = [
    {name: 'Personnage cool', sentence: `Hey ! Toi là-bas. Tu ne serais pas le héros que l'on attend?`},
    {name: 'Hero', sentence: `Si. Complètement. C’est moi. Le héros.`},
    {
        name: 'Zacharius',
        sentence: `Cool. Je suis Zacharius, et l’on m’a chargé de ton deuxième checkpoint. Mais avant ça, laisse-moi vérifier ton indentation.`
    },
    {name: 'Hero', sentence: `Oh. Euh. Ok.`},
    {name: 'Zacharius', sentence: `Mh. Pas trop mal. Bien. L’on peut procéder.`},
]

const dialogOption = [
    {
        name: 'Zacharius',
        sentence1: `Ma question est : !(!(!(!(true)))) est égal à true ou false ?`,
        sentence2: `!(!(!(true))) est égal à true ou false ?`,
        option1: 'A - true',
        option2: 'B - false'
    }
]

const dialogWrong = [
    {name: 'Zacharius', sentence: `Pas top ça… On essaie une autre. `},
]

const dialogRight = [
    {name: 'Zacharius', sentence: `En effet, c’est une bonne réponse.`},
    {name: 'Hero', sentence: `C’est pas trop tôt.`},
    {name: 'Zacharius', sentence: `Je te laisse continuer ton chemin. Fais attention à toi.`},
    {name: 'Sylvain', sentence: `Et n’oublie pas la signature !`},
]

class SceneTwo extends Phaser.Scene {
    constructor() {
        super({key: 'SceneTwo'});
    }

    preload() {
        this.load.setBaseURL("../assets/images");
        this.load.image('zacharius', 'heroz.png');
        this.load.image('sylvain', 'hero2z.png');
        this.load.image('code', 'code.png');
        this.load.image('town', 'town.png');
        this.load.image('dialog-box', 'dialog-box.png');
    }

    create() {
        this.cameras.main.fadeIn(500, 0, 0, 0)

        const town = this.add.image(0, -150, 'town').setOrigin(0, 0).setScale(1.7);

        hero = this.add.image(-300, 150, 'hero').setOrigin(0, 0).setScale(1);

        zacharius = this.add.image(1300, 205, 'zacharius').setOrigin(0, 0).setScale(1.3);
        zacharius.flipX = true;

        code = this.add.image(650, 250, 'code').setScale(0.4).setVisible(false);

        const dialogBox = this.add.image(150, 480, 'dialog-box').setOrigin(0).setScale(0.8).setVisible(false);

        sylvain = this.add.image(-300, 1000, 'sylvain').setOrigin(0, 0).setScale(1.1).setVisible(false);

        this.moveIn(hero, 0);

        dialog = this.add.text(220, 555, '', {
            fontSize: '30px',
            fontFamily: 'VT323',
            wordWrap: {width: 850, useAdvancedWrap: true}
            ,
        }).setVisible(false);
        name = this.add.text(265, 505, '', {
            fontSize: '35px',
            fontFamily: 'VT323',
            wordWrap: {width: 850, useAdvancedWrap: true},
        }).setVisible(false);

        //long and contrived conditions game to get the right dialog
        // at the right time and change scene
        this.input.keyboard.on("keydown", () => {
            if (step === 1) {
                this.moveIn(zacharius, 900);
                counter++
                dialogBox.setVisible(true);
                if (counter >= dialogFirstPart.length) {
                    step = 2;
                } else {
                    this.continueDialog(dialogFirstPart);
                }
            }
            if (step === 2) {
                counter = -1;
                this.optionDialog();
                this.input.keyboard.on('keydown-A', () => {
                    return [goodAnswer = true, step = 3]
                })
                this.input.keyboard.on('keydown-B', () => {
                    return [goodAnswer = false, step = 3]
                })
            }
            if (step === 3 && goodAnswer) {
                option1.setVisible(false);
                option2.setVisible(false);
                counter++;
                if (counter >= dialogRight.length) {
                    isDialogOver = true;
                } else {
                    this.continueDialog(dialogRight);
                }
            }
            if (step === 3 && goodAnswer === false) {
                //will add lost heart or gameover page later
                option1.setVisible(false);
                option2.setVisible(false);
                counter++;
                if (counter >= dialogWrong.length) {
                    step = 4;
                } else {
                    this.continueDialog(dialogWrong);
                }
            }
            if (step === 4) {
                counter = -1;
                this.optionDialog();
                this.input.keyboard.on('keydown-A', () => {
                    return [goodAnswer = false, step = 5]
                })
                this.input.keyboard.on('keydown-B', () => {
                    return [goodAnswer = true, step = 3]
                })
            }
            if (step === 5) {
                //will add gameover page later
                dialog.setText('you died');
            }
            if (isDialogOver === true) {
                this.cameras.main.fadeOut(1000, 0, 0, 0);
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                    this.scene.start('SceneThree')
                });
            }
        })
    }

    continueDialog = (dialogType) => {
        dialog.setText(dialogType[counter].sentence).setVisible(true);
        name.setText(dialogType[counter].name).setVisible(true);

        //shows code at appropriate part
        if (dialogType === dialogFirstPart && counter === 3) {
            code.setVisible(true);
        } else {
            code.setVisible(false);
        }

        //zoom in on current character speaking and sylvain appearing at the end
        if (dialogType[counter].name === 'Zacharius' || dialogType[counter].name === 'Personnage cool') {
            this.zoom(zacharius);
        } else if (dialogType[counter].name === 'Sylvain') {
            sylvain.setVisible(true);
            this.tweens.add({
                targets: sylvain,
                x: 500,
                y: 200,
                duration: 2000,
                ease: 'Power2'
            });
        } else {
            this.zoom(hero);
        }
    }

    optionDialog = () => {
        //setting right question for right time
        if (step === 2) {
            dialog.setText(dialogOption[0].sentence1).setVisible(true);
        } else {
            dialog.setText(dialogOption[0].sentence2).setVisible(true);
        }

        name.setText(dialogOption[0].name).setVisible(true);
        option1 = this.add.text(300, 590, dialogOption[0].option1, {
            fontSize: '40px',
            fontFamily: 'VT323'
        });
        option2 = this.add.text(700, 590, dialogOption[0].option2, {
            fontSize: '40px',
            fontFamily: 'VT323'
        });
        this.zoom(zacharius);
    }

    zoom(image) {
        let scale = image.scale;
        let targetScale = scale * 1.05;

        this.tweens.add({
            targets: image,
            scaleX: targetScale,
            scaleY: targetScale,
            duration: 300,
            yoyo: true,
            ease: 'Power1'
        });
    }

    moveIn(character, x) {
        this.tweens.add({
            targets: character,
            x: x,
            duration: 2000,
            ease: 'Power2'
        });
    }
}

export default SceneTwo;