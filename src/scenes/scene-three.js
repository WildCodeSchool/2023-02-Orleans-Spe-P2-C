import heartSystem from '../services/health-system.js';

let counter = -1,
    dialog,
    name,
    option1,
    option2,
    option3,
    step = 1,
    goodAnswer = false,
    isDialogOver = false,
    fauxSylvain,
    hero,
    sylvain;


const dialogFirstPart = [
    { name: 'Maknifik damoiselle', sentence: 'Bonjour jeune hero. Tu es certainement là pour acquérir la relique sacrée du Saint Café?' },
    { name: 'Hero', sentence: `Oui, cela même. Il est où? Y’a un micro-onde pour le réchauffer? Parce que depuis le temps…` },
    { name: 'Maknifik damoiselle', sentence: `Pas si vite. Je dois encore déterminer si tu es digne` },
    { name: 'Hero', sentence: `Encore? C’est long là. Vous voulez que je sauve le monde ou pas?` },
    { name: 'Maknifik damoiselle', sentence: `Wow. Doucement. C’est le dernier checkpoint, et le plus important.` },
    { name: 'Hero', sentence: `Ok. Ben. Allez-y.` },
    { name: 'Faux Sylvain', sentence: `Tout d’abord, mon nom est Sylvain. Je suis le gardien du Saint Café. On m’a choisi parce que je n’en bois pas, mais là n’est pas la question. Ça arrive fort.` },
    {
        name: 'Faux Sylvain', sentence: `Mon premier est une danse. Mon deuxième est le bruit du serpent. Mon troisième se trouve sous une église.
    Mon tout est un langage de développement web très utilisé et bien supérieur à PHP (bim dans tes dents Sylvain Blondeau). 
    Qui suis-je? 
    ` },
]

const dialogOption = [
    {
        name: 'Faux Sylvain',
        sentence1: ``,
        sentence2: ``,
        option1: 'A -Javascript',
        option2: 'B - Python',
        option3: 'C - Moi qui chante du polnareff sous la douche,'
    }
]

const dialogWrong = [
    { name: 'Faux Sylvain', sentence: ` Ah oui. Le niveau est pas ouf. Essaie encore une fois…` },
]

const dialogRight = [
    { name: 'Faux Sylvain', sentence: `Bravo. Bon, c’était pas très dur mais quand même.` },
    { name: 'Faux Sylvain', sentence: `Je te remets donc le Saint Café. Faut peut-être le faire bouillir à nouveau, ça fait environ 3 jours qu’il macère.` },
    { name: 'Hero', sentence: `Seulement 3 jours?` },
    { name: 'Faux Sylvain', sentence: `Oui. C’était le weekend. Sinon, en général, c’est environ toutes les demi-journées qu’on a un hero.` },
    { name: 'Faux Sylvain', sentence: `Mais. Va. File. Il n’y a plus de temps à perdre. Plus de PR après ce soir 17h00.` },
    { name: 'Sylvain', sentence: `Et n’oublie pas que PHP est de loin supérieur à JS !` }
]

class SceneThree extends Phaser.Scene {
    constructor() {
        super({key: 'SceneThree'});
    }

    preload() {
        this.load.setBaseURL("../assets/");
        this.load.image('Faux Sylvain', 'images/Sylvain-bis.png');
        this.load.image('pond', 'images/pond.png');
        this.load.image('dialog-box', 'images/dialog-box.png');
        this.load.image('heart', 'images/heart.webp');
        this.load.image('hero', 'images/hero.png');
        this.load.image('sylvain', 'images/heroz.png');
        this.load.audio('music3', ['musics/Music3.ogg', 'musics/Music3.mp3']);

    }

    create() {
        this.cameras.main.fadeIn(500, 0, 0, 0);

        const pond = this.add.image(0, -150, 'pond').setOrigin(0, 0).setScale(0.7);

        const musicIcon = this.add.sprite(1200, 20, 'musicIcon').setOrigin(0).setScale(2.5).setDepth(2).setInteractive();
        const muteIcon = this.add.sprite(1200, 20, 'muteIcon').setOrigin(0).setScale(2.5).setDepth(2).setInteractive().setVisible(false);

        const music = this.sound.add('music3', {loop: true});

        const hearts = [];
        for (let i = 0; i < heartSystem.lives; i++) {
            hearts[i] = this.add.image(90 + i * 49, 60, 'heart').setScale(0.16).setDepth(2);
        }

        hero = this.add.image(-300, 150, 'hero').setOrigin(0, 0).setScale(1);

        fauxSylvain = this.add.image(1300, 105, 'Faux Sylvain').setOrigin(0, 0).setScale(1.3);
        fauxSylvain.flipX = true;

        const dialogBox = this.add.image(150, 480, 'dialog-box').setOrigin(0).setScale(0.8).setVisible(false);

        sylvain = this.add.image(-300, 1000, 'sylvain').setOrigin(0, 0).setScale(1.1).setVisible(false);

        this.moveIn(hero, 0);

        dialog = this.add.text(210, 555, '', {
            fontSize: '30px',
            fontFamily: 'VT323',
            wordWrap: {width: 850, useAdvancedWrap: true}
            ,
        });
        name = this.add.text(260, 505, '', {
            fontSize: '35px',
            fontFamily: 'VT323',
            wordWrap: {width: 850, useAdvancedWrap: true},
        });

        this.input.keyboard.on("keydown", () => {
            if (step === 1) {
                this.moveIn(fauxSylvain, 900);
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
                this.input.keyboard.on('keydown-C', () => {
                    return [goodAnswer = false, step = 3]
                })
            }
            if (step === 3 && goodAnswer) {
                option1.setVisible(false);
                option2.setVisible(false);
                option3.setVisible(false);
                counter++;
                if (counter >= dialogRight.length) {
                    isDialogOver = true;
                } else {
                    this.continueDialog(dialogRight);
                }
            }
            if (step === 3 && !goodAnswer) {
                option1.setVisible(false);
                option2.setVisible(false);
                option3.setVisible(false);
                counter++;

                if (counter === 0) {
                    if (heartSystem.lives >= 1) {
                        heartSystem.loseLife();
                        hearts[hearts.length - 1].setVisible(false);
                    } else {
                        window.location.replace("./game-over.html");
                    }
                }
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
                    return [goodAnswer = true, step = 3]
                })
                this.input.keyboard.on('keydown-B', () => {
                    return [goodAnswer = false, step = 5]
                })
                this.input.keyboard.on('keydown-C', () => {
                    return [goodAnswer = false, step = 5]
                })
            }
            if (step === 5) {
                window.location.replace("./game-over.html");
            }
            if (isDialogOver === true) {
                this.cameras.main.fadeOut(1000, 0, 0, 0);
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                    this.scene.start('SceneThree')
                });
            }
        });

        musicIcon.on('pointerdown', function (pointer) {
            music.play();
            musicIcon.setVisible(false);
            muteIcon.setVisible(true)
        });
        muteIcon.on('pointerdown', function (pointer) {
            music.stop();
            musicIcon.setVisible(true);
            muteIcon.setVisible(false)
        });
    }

    continueDialog = (dialogType) => {
        dialog.setText(dialogType[counter].sentence).setVisible(true);
        name.setText(dialogType[counter].name).setVisible(true);

        if (dialogType[counter].name === 'Faux Sylvain' || dialogType[counter].name === 'Maknifik damoiselle') {
            this.zoom(fauxSylvain);
        } else if (dialogType[counter].name === 'Sylvain') {
            sylvain.setVisible(true);
            this.tweens.add({
                targets: sylvain,
                x: 600,
                y: 200,
                duration: 2000,
                ease: 'Power2'
            });
        } else {
            this.zoom(hero);
        }
    }

    optionDialog = () => {
        if (step === 2) {
            dialog.setText(dialogOption[0].sentence1).setVisible(true);
        } else {
            dialog.setText(dialogOption[0].sentence2).setVisible(true);
        }

        name.setText(dialogOption[0].name).setVisible(true);
        option1 = this.add.text(210, 570, dialogOption[0].option1, {
            fontSize: '40px',
            fontFamily: 'VT323'
        });
        option2 = this.add.text(680, 570, dialogOption[0].option2, {
            fontSize: '40px',
            fontFamily: 'VT323'
        });
        option3 = this.add.text(210, 620, dialogOption[0].option3, {
            fontSize: '40px',
            fontFamily: 'VT323'
        });
        this.zoom(fauxSylvain);
    }

    zoom(image) {
        const scale = image.scale;
        const targetScale = scale * 1.05;

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

export default SceneThree;