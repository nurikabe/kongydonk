var BarrelScene = new Phaser.Class({

    Extends: Phaser.Scene,

    platforms: null,

    onLadder: false,

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

        var ladders = this.physics.add.staticGroup();
        ladders.create(130, 472, 'ladder').setScale(0.1, 0.3).refreshBody();

        this.dk = this.physics.add.sprite(650, -100, 'donkeykong').setScale(0.2);
        this.dk.setBounce(0.3);

        this.tweens.add({
            targets: this.dk,
            x: 350,
            duration: 4000,
            ease: 'Expo.easeInOut',
            repeat: -1,
            //delay: 500,
            yoyo: true
        });

        this.physics.add.collider(this.dk, platforms);

        this.player = this.physics.add.sprite(780, 450, 'dude');
        this.player.body.velocity.x = -10;

        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.physics.add.collider(this.player, platforms);
        this.physics.add.overlap(this.player, ladders, function() { this.onLadder = true; }, null, this);
        this.physics.add.collider(this.player, this.dk, hitHazard, null, this);

        function hitHazard() {
            alert('Ouch!');
        }

        function createBarrel(scene, platforms) {
            var barrel = scene.physics.add.sprite(scene.dk.x, scene.dk.y, 'barrel').setScale(0.25);
            barrel.setCollideWorldBounds(true);
            barrel.body.velocity.x = -200;
            barrel.body.collideWorldBounds = true;
            barrel.body.bounce.set(1, 0);
            scene.physics.add.collider(barrel, platforms);
            scene.physics.add.collider(barrel, scene.player, hitHazard, null, this);
        }

        //createBarrel(this, platforms);
        //this.time.delayedCall(3000, createBarrel, [this, platforms]);

        this.time.addEvent({
            delay: 3000,
            callback: createBarrel,
            args: [this, platforms],
            //callbackScope: this,
            loop: true
        });

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
            this.player.body.setAllowGravity(false);
            if (this.onLadder) {
                // Climb!
                this.player.setVelocityY(-90);
            } else {
                // Jump!
                this.player.setVelocityY(-170);
            }
        }

        this.onLadder = false;
    }

});
