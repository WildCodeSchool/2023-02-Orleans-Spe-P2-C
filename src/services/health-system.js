const heartSystem = {
    lives: 3,
    loseLife: function() {
        if (this.lives > 0) {
            this.lives--;
        }
    }
};

export default heartSystem;