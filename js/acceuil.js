let config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 1000,
    physics: {
        default: 'arcade'
    },
    scene: {

        preload: preload,
        create: create,
        update: update
    },
    audio: {
        disableWebAudio: true,
    },

    autoCenter: true

};
//acceuil
let game = new Phaser.Game(config);
let ouverture;
let playBoutton;
let titre;

//choix auto
let boutonOk;
let Ok = false;
let p;
let player;

//choix tableau suite 
let index = 0;
let choixV = new Array(4);
let car = new Array
let backImage;
var positionX = 625;
var positionX1 = 500;
var positionX2 = 350;
var positionX3 = 350;
var positionY = 1700;
var positionY1 = 130;

// son
let music;


//Arrivée 
let fond;
let finish;
let finish1;
let finish2;
let etat = false;
let etat1 = false;
let etat2 = false;
let etat3 = false;

//temps de passage
var T = [];
var tplayer;

//fin de la partie 
let win;
let gameover;



function preload() {

    //acceuil
    this.load.image('ouverture', '/assets/image/couverture .jpeg');
    this.load.image('fond', '/assets/image/parcours.png')
    this.load.image('bouton', '/assets/image/start.jpeg')

    //choix auto 
    this.load.image('ccars', '/assets/image/choix1.jpeg');
    this.load.image('ccars1', '/assets/image/choix2.jpeg');
    this.load.image('ccars2', '/assets/image/choix3.jpeg');
    this.load.image('ccars3', '/assets/image/choix4.jpeg');

    this.load.image('nextg', '/assets/image/next.jpeg');
    this.load.image('nextd', '/assets/image/nextt.jpeg')
    this.load.image('OK', '/assets/image/OK.jpeg');

    //game
    this.load.image('carR', '/assets/image/car rouge.png');
    this.load.image('circuit', '/assets/image/piste.jpeg');
    this.load.image('carJ', '/assets/image/car jaune.png');
    this.load.image('carV', '/assets/image/car vert.png');
    this.load.image('carB', '/assets/image/car bleu.png');

    //son
    this.load.audio('music', '/assets/sound/music.mp3');

    //arrivée
    this.load.image('finish', '/assets/image/finish.png');
    this.load.image('finish1', '/assets/image/finish1.png');
    this.load.image('finish2', '/assets/image/finish2.png');

    //fin de la partie
    this.load.image('win', '/assets/image/win.jpeg');
    this.load.image('gameover', '/assets/image/go.jpeg');
    this.load.image('playagain', '/assets/image/playagain.jpeg')

}

function create() {

    ///*******************/acceuil/*******************/
    acceuil = this.add.image(500, 550, 'ouverture');
    acceuil.setScale(1, 1);

    titre = this.add.image(500, 500, 'titre');
    titre.setScale(0.1, 0.1);

    playBoutton = this.add.sprite(500, 900, 'bouton').setInteractive();
    playBoutton.on('pointerdown', commencer);

    ///*******************/bouton/*******************/

    nextgBouton = this.add.sprite(100, 500, 'nextg').setInteractive();
    nextgBouton.setScale(0.3, 0.3);
    nextgBouton.setVisible(false);
    nextgBouton.on('pointerdown', previous);


    nextdBouton = this.add.sprite(900, 500, 'nextd').setInteractive();
    nextdBouton.setScale(0.3, 0.3);
    nextdBouton.setVisible(false);
    nextdBouton.on('pointerdown', next);

    boutonOk = this.add.sprite(500, 800, 'OK').setInteractive();
    boutonOk.setVisible(false);
    boutonOk.on('pointerdown', StartGame);

    ///*******************/affichage texte/*******************/
    boutonPlayagain = this.add.sprite(500, 820, 'playagain').setInteractive();
    boutonPlayagain.visible = false;
    boutonPlayagain.on('pointerdown', recommencer);

    //*******************/choix tableau suite *******************/
    choixV[0] = this.physics.add.image(500, 500, 'ccars');
    choixV[0].setScale(0.5, 0.5);
    choixV[0].visible = false;

    choixV[1] = this.physics.add.image(500, 500, 'ccars1');
    choixV[1].setScale(0.5, 0.5);
    choixV[1].visible = false;

    choixV[2] = this.physics.add.image(500, 500, 'ccars2');
    choixV[2].setScale(0.5, 0.5);
    choixV[2].visible = false;

    choixV[3] = this.physics.add.image(500, 500, 'ccars3');
    choixV[3].setScale(0.5, 0.5);
    choixV[3].visible = false;

    ///*******************/bouton/*******************/
    cursors = this.input.keyboard.createCursorKeys();
    down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    g = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
    q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

    ///*******************/les cars/*******************/
    backImage = this.add.image(500, 850, 'circuit');
    backImage.visible = false;

    car[0] = this.physics.add.image(positionX, positionY, 'carR');
    car[0].setScale(0.18, 0.25);
    car[0].body.collideWorldBounds = true;
    car[0].setVisible(false)


    car[1] = this.physics.add.image(positionX1, positionY, 'carB');
    car[1].setScale(0.18, 0.25);
    car[1].body.collideWorldBounds = true;
    car[1].setVisible(false)

    car[2] = this.physics.add.image(positionX2, positionY, 'carJ');
    car[2].setScale(0.18, 0.25);
    car[2].body.collideWorldBounds = true;
    car[2].setVisible(false)

    car[3] = this.physics.add.image(positionX3, positionY, 'carV');
    car[3].setScale(0.18, 0.25);
    car[3].body.collideWorldBounds = true;
    car[3].setVisible(false);

    ///*******************/son/*******************/
    music = this.sound.add('music');

    ///*******************/arrivée/*******************/
    finish = this.physics.add.image(350, positionY1, 'finish');
    finish.setScale(0.08, 0.15);
    finish.visible = false;
    finish.body.collideWorldBounds = true;

    finish1 = this.physics.add.image(450, positionY1, 'finish1');
    finish1.setScale(0.08, 0.15);
    finish1.visible = false;
    finish1.body.collideWorldBounds = true;

    finish2 = this.physics.add.image(600, positionY1, 'finish2');
    finish2.setScale(0.08, 0.15);
    finish2.visible = false;
    finish2.body.collideWorldBounds = true;


    ///*******************/fin de la partie/*******************/
    win = this.add.image(500, 500, 'win');
    win.setScale(0.6, 0.6);
    win.visible = false;

    lose = this.add.image(500, 500, 'gameover');
    lose.setScale(0.6, 0.6);
    lose.visible = false;

    //pour randomiser
    function getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }

    function commencer() {
        acceuil.alpha = 0;
        titre.alpha = 0;
        playBoutton.alpha = 0;

        /** display choice */
        choixV[0].visible = true;
        nextgBouton.setVisible(true);
        nextdBouton.setVisible(true);
        boutonOk.setVisible(true);

        choixV[0].alpha = 1;
        nextdBouton.alpha = 1;
        nextgBouton.alpha = 1;
        boutonOk.alpha = 1;
    }

    function recommencer() {
        /**  additional instruction from state #playAgain **/
        // boutonPlayagain.visible = false;
        // win.visible = false;
        // lose.visible = false;

        // boutonPlayagain.alpha = 0;
        // win.alpha = 0;
        // lose.alpha = 0;

        // playagain = true;

        // commencer();

        location.reload();
    }

    function next() {
        if (index < 3) {
            choixV[index].alpha = 0;
            index += 1;
            choixV[index].visible = true;
        }

    }
    function previous() {
        if (index > 0) {
            choixV[index].visible = false;
            index -= 1;
            choixV[index].alpha = 1;
        }
    }

    function StartGame() {
        d = new Date();

        choixV[0].visible = false;
        nextgBouton.setVisible(false);
        nextdBouton.setVisible(false);
        boutonOk.setVisible(false);

        choixV[index].alpha = 0;
        nextdBouton.alpha = 0;
        nextgBouton.alpha = 0;
        boutonOk.alpha = 0;

        /** display race */
        //finish.setVisible(true);

        finish.alpha = 0;
        finish.visible = true;

        finish1.alpha = 0;
        finish1.visible = true;

        finish2.alpha = 0;
        finish2.visible = true;

        
        backImage.visible = true;
      

       
        ////

     


        ////
        music.play();


        player = car[index];

        switch (player) {
            case car[0]:
                player.visible = true;
                car[1].visible = true;
                car[2].visible = true;

                car[1].setVelocityY(getRandom(-100, -300));
                car[2].setVelocityY(getRandom(-100, -300));
                break
            case car[1]:
                player.visible = true;
                car[0].visible = true;
                car[3].visible = true;
                car[0].setVelocityY(getRandom(-100, -300));
                car[3].setVelocityY(getRandom(-100, -300));
                break
            case car[2]:
                player.visible = true;
                car[1].visible = true;
                car[0].visible = true;
                car[1].setVelocityY(getRandom(-100, -300));
                car[0].setVelocityY(getRandom(-100, -300));
                break
            default:
                player.visible = true;
                car[0].visible = true;
                car[1].visible = true;
                car[0].setVelocityY(getRandom(-100, -300));
                car[1].setVelocityY(getRandom(-100, -300));
        }


    }


    ///*******************/camera/*******************/
    //window.scene=this
    //game.cameras.main.scrollY;

}

function update() {

    ///*******************/player/*******************/

    // juste pour la direction 
    if (Phaser.Input.Keyboard.JustDown(up)) {
        player.setVelocity(0, -100);
    }
    if (Phaser.Input.Keyboard.JustDown(down)) {
        player.setVelocity(0, 100);
    }
    if (Phaser.Input.Keyboard.JustDown(right)) {
        player.setVelocity(100, 0);
    }
    if (Phaser.Input.Keyboard.JustDown(left)) {
        player.setVelocity(-100, 0);
    }

    // pour accelerer
    if (Phaser.Input.Keyboard.JustDown(a)) {
        player.setVelocity(0, -300)
    }

    //decelerer en cas de collision
    this.physics.add.collider(car[0], car[1], decelerer, null, this);
    function decelerer() {
        car[0].setVelocityY(-50);
        car[1].setVelocityX(0);
    }
    this.physics.add.collider(car[0], car[2], decelerer1, null, this);
    function decelerer1() {
        car[0].setVelocityY(-50);
        car[2].setVelocityX(0);
    }
    this.physics.add.collider(car[0], car[3], decelerer2, null, this);
    function decelerer2() {
        car[0].setVelocityY(-50);
        car[3].setVelocityX(0);
    }

    this.physics.add.collider(car[1], car[2], anticollision1, null, this);
    function anticollision1() {
        car[1].setVelocityX(0);
        car[2].setVelocityX(0);
    }
    this.physics.add.collider(car[1], car[3], anticollision, null, this);
    function anticollision() {
        car[1].setVelocityX(0);
        car[3].setVelocityX(0);
    }
    this.physics.add.collider(car[2], car[3], anticollision2, null, this);
    function anticollision2() {
        car[2].setVelocityX(0);
        car[3].setVelocityX(0);
    }

    //collision avec l´arrivée
    //temps
    var d;
    let r = 0;
    function collision(_car, _finish) {
        _finish.setVelocity(0, -1000);
        _finish.body.collideWorldBounds = false;
        let t = new Date() - d;
        T[r] = { "car": _car, "temps": t };
        r++;
        if (r == 3) {
            afficherResultat(T);
        }
    }

    this.physics.add.collider(car[2], finish, collision, null, this);
    this.physics.add.collider(car[3], finish, collision, null, this);
    this.physics.add.collider(car[1], finish1, collision, null, this);
    this.physics.add.collider(car[0], finish2, collision, null, this);

    function afficherResultat(_result) {
        backImage.setVisible(false);
        car.forEach(function (c) {
            c.setVisible(false);
        });

        //alert(_result[0].temps);
        if (_result[0].car == player) {
            win.visible = true;
            win.alpha = 1;
        }
        else {
            lose.visible = true;
            lose.alpha = 1;
        }

        boutonPlayagain.visible = true;
        boutonPlayagain.alpha = 1;
    }



}



