Boot = { // Boot du jeu
	init: function () {
		//jeu.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; // SHOW_ALL pour eviter les etirements
		jeu.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT; // EXACT_FIT pour remplir tout l'espace
		jeu.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT; // Rempli toute la fenetre (etirement minime en fullscreen)
	},
	preload: function () {
		Boot.load.spritesheet('loadingbar', './assets/loadingbar.png', 672, 111);
		Boot.load.image('backgroundloading', './assets/backgroundloading.png');
		Boot.load.bitmapFont('font', './fonts/fontwith.png', './fonts/fontwith.fnt');// Chargement de la police
	},
	create: function (){
		this.state.start('Preloader');
	}
}

Preloader = { // Chargement de toutes les dependances
	preload: function () {
		// Barre de chargement
		let background = this.add.sprite(0, 0, 'backgroundloading');
		this.preloadBar = this.add.sprite(Preloader.world.centerX - 672/2, Preloader.world.centerY, 'loadingbar');

		this.preloadBar.animations.add('run', [0,1,2,3], 4, true);
		this.preloadBar.play('run');
		this.preloadBar.anchor.setTo(0,0.5);
		this.load.setPreloadSprite(this.preloadBar);

		let loadText = Preloader.add.bitmapText(Preloader.world.centerX, 250,'font','Loading...',100);
		loadText.anchor.setTo(0.5,0.5);

		// ---- Dependances du Menu ----
		Preloader.load.audio('musicMenu','./musics/musicMenu.mp3');//Musique du menu
		Preloader.load.spritesheet('title','./assets/logo.png',408,222);
		Preloader.load.spritesheet('game','./assets/buttons/game.png',172,80);
		Preloader.load.spritesheet('controls','./assets/buttons/controls.png',296,80);
		Preloader.load.spritesheet('backgroundplanet','./assets/backgroundplanet.png',1344,768);
		Preloader.load.spritesheet('items','./assets/items.png', 56, 56);

		// ---- Dependances du Menu de Selection des niveaux ----
		Preloader.load.spritesheet('go','./assets/buttons/go.png',104,80);
		Preloader.load.spritesheet('back','./assets/buttons/backbutton.png',68,84);
		Preloader.load.spritesheet('leftArrow', './assets/buttons/leftbutton.png',74,76);
		Preloader.load.spritesheet('rightArrow','./assets/buttons/rightbutton.png',74,76);
		Preloader.load.image('player1','./assets/buttons/player1.png',104,92);
		Preloader.load.image('player2','./assets/buttons/player2.png',104,92);
		Preloader.load.image('player3','./assets/buttons/player3.png',104,92);
		Preloader.load.image('player4','./assets/buttons/player4.png',104,92);
		Preloader.load.image('backgroundselection','./assets/backgroundselection.png',1344,768);
		Preloader.load.image('case','./assets/case.png',376,276);
		Preloader.load.image('casemap','./assets/casemap.png',380,516);

		for (let lvl in levels) {// Chargement de toutes les minimaps des levels
			Preloader.load.image(levels[lvl].name,levels[lvl].imagePath);
		};
		for (let sk in skins) {// Chargement de toutes les skins de joueur
			Preloader.load.spritesheet(skins[sk].name, skins[sk].sprite, skins[sk].width, skins[sk].height);
		}

		// ---- Dependances du Menu des Options ----
		Preloader.load.spritesheet('backgroundtiled','./assets/backgroundtiled.png',1344,768);
		Preloader.load.spritesheet('pbup','./assets/buttons/pbup.png',174,60);
		Preloader.load.spritesheet('pbdown','./assets/buttons/pbdown.png',174,60);
		Preloader.load.spritesheet('pbleft','./assets/buttons/pbleft.png',174,60);
		Preloader.load.spritesheet('pbright','./assets/buttons/pbright.png',174,60);
		Preloader.load.spritesheet('pbgrab','./assets/buttons/pbgrab.png',174,60);
		Preloader.load.spritesheet('pbaction','./assets/buttons/pbaction.png',174,60);
		Preloader.load.spritesheet('gamepad','./assets/buttons/gamepad.png',104,92);
		Preloader.load.spritesheet('fullscreen','./assets/buttons/fullscreen.png',84,92);

		// ---- Dependances du Tuto ----
		Preloader.load.spritesheet('martintuto','./assets/martintuto.png',140,340);
		Preloader.load.spritesheet('petuto','./assets/petuto.png',140,308);
		Preloader.load.spritesheet('pierretuto','./assets/pierretuto.png',128,292);
		Preloader.load.spritesheet('tottituto','./assets/tottituto.png',132,300);
		Preloader.load.spritesheet('help','./assets/help.png', 397, 60);
		Preloader.load.spritesheet('skip','./assets/buttons/skip.png',196,80);
		Preloader.load.spritesheet('backgroundtuto','./assets/backgroundTuto.png',1344,768);

		//  ---- Dependances du Jeu ----

		// Sprites du jeu
		Preloader.load.spritesheet('oven','./assets/ovenanimation.png',64,94)
		Preloader.load.spritesheet('items','./assets/items.png', 56, 56);
		Preloader.load.spritesheet('itemsbubbles','./assets/itemsbubbles.png', 28, 28);
		Preloader.load.spritesheet('wall','./assets/wall.png',64,74);
		Preloader.load.spritesheet('wallposters','./assets/wallposters.png',64,74);
		Preloader.load.spritesheet('broyeur','./assets/broyeur.png',64,74);
		Preloader.load.spritesheet('compresseur','./assets/compresseur.png',128,64);
		Preloader.load.spritesheet('etabli','./assets/etabli.png',192,96);
		Preloader.load.spritesheet('presse','./assets/presse.png',64,108);
		Preloader.load.spritesheet('bassine','./assets/bassine.png',64,82);
		Preloader.load.spritesheet('conveyor','./assets/conveyor.png',64,74);
		Preloader.load.spritesheet('arrive','./assets/arrive.png',64,90);
		Preloader.load.spritesheet('incinerateur','./assets/incinerateur.png',64,64);
		Preloader.load.spritesheet('soufflerie','./assets/soufflerie.png',64,90);
		Preloader.load.spritesheet('route','./assets/route.png',128,64);
		Preloader.load.spritesheet('barriere','./assets/barriere.png',128,80);
		Preloader.load.spritesheet('grass','./assets/grass.png',64,64);
		Preloader.load.spritesheet('flower','./assets/enviflower.png',64,64);
		Preloader.load.spritesheet('puddle','./assets/envipuddle.png',64,64);
		Preloader.load.spritesheet('tree','./assets/envitree.png',64,104);
		Preloader.load.spritesheet('fox','./assets/envifox.png',64,64);
		Preloader.load.image('truck','./assets/truck.png');
		Preloader.load.image('ground','./assets/beton.png');
		Preloader.load.image('table','./assets/table.png');
		Preloader.load.image('benneverre','./assets/benneverre.png');
		Preloader.load.image('bennemetal','./assets/bennemetal.png');
		Preloader.load.image('benneplastique','./assets/benneplastique.png');
		Preloader.load.image('bennepneu','./assets/bennepneu.png');
		Preloader.load.image('bennecarton','./assets/bennecarton.png');
		Preloader.load.image('pipe','./assets/pipe.png');
		Preloader.load.image('barrel','./assets/barrel.png');
		Preloader.load.image('crate','./assets/crate.png');

		//Sprites Decontamination
		Preloader.load.spritesheet('decontaminateur','./assets/decontaminateur.png',64,96);
		Preloader.load.spritesheet('decontabouton','./assets/decontabouton.png',64,74);
		Preloader.load.spritesheet('decontasas','./assets/decontasas.png',64,64);
		Preloader.load.image('decontatable','./assets/decontatable.png');
		Preloader.load.image('decontasol','./assets/decontasol.png');
		Preloader.load.image('decontabarrils','./assets/decontabarrils.png');
		Preloader.load.image('decontafumee','./assets/decontafumee.png');

		//Sprites Pause
		Preloader.load.spritesheet('resume','./assets/buttons/resume.png',236,80);
		Preloader.load.spritesheet('restart','./assets/buttons/restart.png',264,80);
		Preloader.load.spritesheet('menu','./assets/buttons/menu.png',168,80);
		Preloader.load.spritesheet('helpbutton','./assets/buttons/helpbutton.png',204,80);

		Preloader.load.bitmapFont('fontred', './fonts/font.png', './fonts/font.fnt');//chargement de la police

		Preloader.load.audio('musicGame','./musics/Indystopia.mp3')

		// ---- Dependances de la Fin ----
		Preloader.load.audio('endMusic','./musics/endMusic.mp3');
		Preloader.load.audio('easterEgg','./musics/eminem.mp3');

		Preloader.load.spritesheet('next','./assets/buttons/next.png',168,80);

		Preloader.load.spritesheet('backgroundendg','./assets/backgroundEndG.png',1344,768);
		Preloader.load.spritesheet('backgroundendb','./assets/backgroundEndB.png',1344,768);
	},

	create: function () {
		this.preloadBar.cropEnabled = false;
	},

	update: function () {
		// On attend que la musique du menu soit decode avant de le lancer
		if (this.cache.isSoundDecoded('musicMenu')){
			this.state.start('Menu');
		}
	}
};

// On cree le jeu PHASER
var jeu = new Phaser.Game(64*21,  64*12, Phaser.AUTO, '');

// State de Boot et le Preloader
jeu.state.add('Boot', Boot);
jeu.state.add('Preloader', Preloader);

//Donne les différents menus
jeu.state.add('Menu', Menu);
jeu.state.add('MenuGame', MenuGame);
jeu.state.add('MenuOpt', MenuOpt);

// Donne la fenetre du tutoriel
jeu.state.add('Tuto', Tuto);

//Donne la fenetre de jeu
jeu.state.add('Game', game);

//Donne la fenetre de fin
jeu.state.add('End',end);

//On commence par le Boot
jeu.state.start('Boot');
