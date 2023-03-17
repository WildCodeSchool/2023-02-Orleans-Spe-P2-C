const heartSystem = {
    lives: 3,
    hearts: [],
    loseLife: function() {
        if (this.lives > 0) {
            this.lives--;
            this.hearts[this.lives].destroy();
        }
    }
};

export default heartSystem;