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

        var platforms = this.physics.add.staticGroup();

        // Ground
        platforms.create(400, 568, 'platform').setScale(2).refreshBody();

        platforms.create(550, 410, 'platform').setScale(2, 1).refreshBody();
        platforms.create(150, 260, 'platform').setScale(2, 1).refreshBody();
        platforms.create(500, 120, 'platform');

        this.dk = this.physics.add.sprite(600, -100, 'donkeykong').setScale(0.2);
        this.dk.setBounce(0.3);

        this.physics.add.collider(this.dk, platforms);

        this.player = this.physics.add.sprite(780, 450, 'dude');
        this.player.body.velocity.x = -10;

        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.physics.add.collider(this.player, platforms);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.cursors = this.input.keyboard.createCursorKeys();
    },

    update: function() {
        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        }
        else
        {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-330);
        }
    }
});
