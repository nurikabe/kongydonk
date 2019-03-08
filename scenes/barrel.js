var BarrelScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function BootScene() {
        Phaser.Scene.call(this, {key: 'BarrelScene'});
    },

    create: function () {
        // Black background
        this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0)');

        /*
        this.graphics = this.add.graphics();
        //this.graphics.lineStyle(5, 0xff00ff, 1.0);
        this.graphics.fillStyle(0xaa00aa, 1.0);
        this.graphics.fillRect(50, 50, 400, 200);
        */

        platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, 'platform').setScale(2).refreshBody();

        var p1 = platforms.create(350, 450, 'platform');
        p1.setScale(2, 1);
        p1.angle = 2;

        var p2 = platforms.create(450, 350, 'platform');
        p2.setScale(2, 1);
        p2.angle = -2;
    }
});

