var BootScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function BootScene ()
    {
        Phaser.Scene.call(this, { key: 'BootScene' });
    },

    preload: function ()
    {
        this.load.image('boot', 'assets/boot.png');
        this.load.image('platform', 'assets/platform.png');
    },

    create: function ()
    {
        var bootImage = this.add.image(160, 120, 'boot');
        bootImage.setScale(0.18);
        bootImage.displayHeight = 250;
        bootImage.displayWidth = 350;

        this.add.text(38, 150, 'Press Any Key to Start', { fontSize: '18px', fill: '#fff' });
        this.input.keyboard.on('keydown', function () { this.scene.start('BarrelScene'); }, this);
    }
});

