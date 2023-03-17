const heartSystem = {
    lives: 3,
    hearts: [],
    loseLife: function () {
        this.lives--;
        this.hearts[this.lives].setVisible(false);
    }
};

export default heartSystem;