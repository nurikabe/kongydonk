var BarrelScene = new Phaser.Class({

    Extends: Phaser.Scene,

    platforms: null,

    initialize: function BootScene() {
        Phaser.Scene.call(this, {key: 'BarrelScene'});
    },

    create: function () {
        // Black background
        this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0)');

        platforms = [];

        for (var i = 0; i < 10; i++) {
            var x = Math.random() * 800;
            var y = Math.random() * 600;

            platformGroup = this.physics.add.staticGroup();
            var platform = platformGroup.create(x, y, 'platform');

            var scale = Math.random() * 2;
            platform.setScale(scale, scale);

            var angle = Math.random() * 360;
            platform.angle = angle;

            platforms.push(platform);
        }
    },

    update: function() {
        for (var i = 0; i < 10; i++) {
            platforms[i].angle += 1;
        }
    }
});
