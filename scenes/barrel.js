var BarrelScene = new Phaser.Class({

    Extends: Phaser.Scene,

    platforms: null,

    initialize: function BootScene() {
        Phaser.Scene.call(this, {key: 'BarrelScene'});
    },

    preload: function() {

    },

    create: function () {
        // Black background
        //this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0)');

        // Sky blue
        this.add.image(400, 300, 'sky');

        platforms = this.physics.add.staticGroup();

        // Ground
        platforms.create(400, 568, 'platform').setScale(2).refreshBody();

        platforms.create(400, 410, 'platform').setScale(2, 1).refreshBody();
        platforms.create(50, 250, 'platform');
        platforms.create(750, 220, 'platform');


    },

    update: function() {
    }
});
