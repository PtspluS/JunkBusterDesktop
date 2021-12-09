var game = {
	mod : 0,
	pollution : [],
	id : 0,
	playersskins : [0, 0, 0, 0],
	nbPlayers : 2,
	score : 0,
	chrono : 0,
	chronomax : 2*60,
	musicGame : 0,
	controlP1 : [
		() => {return game.input.keyboard.isDown(Phaser.Keyboard.Z);},
		() => {return game.input.keyboard.isDown(Phaser.Keyboard.S);},
		() => {return game.input.keyboard.isDown(Phaser.Keyboard.Q);},
		() => {return game.input.keyboard.isDown(Phaser.Keyboard.D);},
		() => {return game.input.keyboard.isDown(Phaser.Keyboard.F);},
		() => {return game.input.keyboard.isDown(Phaser.Keyboard.G);}
	],
	controlP2 : [
		() => {return game.input.keyboard.isDown(Phaser.Keyboard.UP);},
		() => {return game.input.keyboard.isDown(Phaser.Keyboard.DOWN);},
		() => {return game.input.keyboard.isDown(Phaser.Keyboard.LEFT);},
		() => {return game.input.keyboard.isDown(Phaser.Keyboard.RIGHT);},
		() => {return game.input.keyboard.isDown(Phaser.Keyboard.NUMPAD_2);},
		() => {return game.input.keyboard.isDown(Phaser.Keyboard.NUMPAD_3);}
	],
	controlP3 : [
		() => {return game.input.keyboard.isDown(NaN);},
		() => {return game.input.keyboard.isDown(NaN);},
		() => {return game.input.keyboard.isDown(NaN);},
		() => {return game.input.keyboard.isDown(NaN);},
		() => {return game.input.keyboard.isDown(NaN);},
		() => {return game.input.keyboard.isDown(NaN);}
	],
	controlP4 : [
		() => {return game.input.keyboard.isDown(NaN);},
		() => {return game.input.keyboard.isDown(NaN);},
		() => {return game.input.keyboard.isDown(NaN);},
		() => {return game.input.keyboard.isDown(NaN);},
		() => {return game.input.keyboard.isDown(NaN);},
		() => {return game.input.keyboard.isDown(NaN);}
	],
	cameraShake: function(count) {
		this.camera.x+= Math.floor(Math.random() * (20 + 1)) - 10;
		this.camera.y+= Math.floor(Math.random() * (20 + 1)) - 10;
		if(count < 10){
			game.time.events.add(10, () => {this.cameraShake(count+1); } , this);
		}else{
			this.camera.x = 0;
			this.camera.y = 0;
		}
	},
	pauseGroup: undefined, // Sera le groupe de pause
	pauseEvent: function(){
			if(jeu.paused){
			document.body.style.cursor = 'none';

				// Destruction des elements de la pause
				this.pauseGroup.removeAll(true,true);


				jeu.paused = false;
			} else {
				// Fond Gris
				document.body.style.cursor = 'default';
				var pauseRect = game.add.graphics(0, 0);
				pauseRect.beginFill(0x222222);
				pauseRect.drawRect(0, 0, 1344, 768)
				pauseRect.alpha = 0.8;
				this.pauseGroup.add(pauseRect);

				// Aides
				var pauseHelps = [];
				pauseHelps.push(this.pauseGroup.create(700, (pauseHelps.length * 80 + 110), 'help'));
				pauseHelps[pauseHelps.length - 1].frame = 5;
				pauseHelps[pauseHelps.length - 1].scale.setTo(1.4,1.4);
				pauseHelps[pauseHelps.length - 1].alpha = 0;
				if(levels[this.id].items.indexOf(itemsId.Metal) != -1 || levels[this.id].items.indexOf(itemsId.RadMetal) != -1){
					pauseHelps.push(this.pauseGroup.create(700, (pauseHelps.length * 80 + 110), 'help'));
					pauseHelps[pauseHelps.length - 1].frame = 0;
					pauseHelps[pauseHelps.length - 1].scale.setTo(1.4,1.4);
					pauseHelps[pauseHelps.length - 1].alpha = 0;
				}
				if(levels[this.id].items.indexOf(itemsId.Carton) != -1 || levels[this.id].items.indexOf(itemsId.RadCarton) != -1){
					pauseHelps.push(this.pauseGroup.create(700, (pauseHelps.length * 80 + 110), 'help'));
					pauseHelps[pauseHelps.length - 1].frame = 1;
					pauseHelps[pauseHelps.length - 1].scale.setTo(1.4,1.4);
					pauseHelps[pauseHelps.length - 1].alpha = 0;
				}
				if(levels[this.id].items.indexOf(itemsId.Pneu) != -1 || levels[this.id].items.indexOf(itemsId.RadPneu) != -1){
					pauseHelps.push(this.pauseGroup.create(700, (pauseHelps.length * 80 + 110), 'help'));
					pauseHelps[pauseHelps.length - 1].frame = 2;
					pauseHelps[pauseHelps.length - 1].scale.setTo(1.4,1.4);
					pauseHelps[pauseHelps.length - 1].alpha = 0;
				}
				if(levels[this.id].items.indexOf(itemsId.Plastique) != -1 || levels[this.id].items.indexOf(itemsId.RadPlastique) != -1){
					pauseHelps.push(this.pauseGroup.create(700, (pauseHelps.length * 80 + 110), 'help'));
					pauseHelps[pauseHelps.length - 1].frame = 3;
					pauseHelps[pauseHelps.length - 1].scale.setTo(1.4,1.4);
					pauseHelps[pauseHelps.length - 1].alpha = 0;
				}
				if(levels[this.id].items.indexOf(itemsId.Verre) != -1 || levels[this.id].items.indexOf(itemsId.RadVerre) != -1){
					pauseHelps.push(this.pauseGroup.create(700, (pauseHelps.length * 80 + 110), 'help'));
					pauseHelps[pauseHelps.length - 1].frame = 4;
					pauseHelps[pauseHelps.length - 1].scale.setTo(1.4,1.4);
					pauseHelps[pauseHelps.length - 1].alpha = 0;
				}
				if(levels[this.id].items.indexOf(itemsId.Poubelle) != -1 || levels[this.id].items.indexOf(itemsId.RadPoubelle) != -1){
					pauseHelps.push(this.pauseGroup.create(700, (pauseHelps.length * 80 + 110), 'help'));
					pauseHelps[pauseHelps.length - 1].frame = 6;
					pauseHelps[pauseHelps.length - 1].scale.setTo(1.4,1.4);
					pauseHelps[pauseHelps.length - 1].alpha = 0;
				}
				if(levels[this.id].items.indexOf(itemsId.RadPoubelle) != -1 || levels[this.id].items.indexOf(itemsId.RadCarton) != -1 || levels[this.id].items.indexOf(itemsId.RadVerre) != -1 || levels[this.id].items.indexOf(itemsId.RadPlastique) != -1 || levels[this.id].items.indexOf(itemsId.RadPneu) != -1 || levels[this.id].items.indexOf(itemsId.RadMetal) != -1){
					pauseHelps.push(this.pauseGroup.create(700, (pauseHelps.length * 80 + 110), 'help'));
					pauseHelps[pauseHelps.length - 1].frame = 7;
					pauseHelps[pauseHelps.length - 1].scale.setTo(1.4,1.4);
					pauseHelps[pauseHelps.length - 1].alpha = 0;
				}

				// Boutons
				let pauseHelpb = game.add.button(900, 50, 'helpbutton', () => {
					// Affiche / enleve les aides
					for(let i = 0; i < pauseHelps.length; i++){
						pauseHelps[i].alpha = (pauseHelps[i].alpha + 1) % 2;
					}
				},this,1,0,2);
				pauseHelpb.anchor.setTo(0.5,0.5);
				this.pauseGroup.add(pauseHelpb);

				let banner = game.add.button(300,100,'title',()=>{
					let mapName = game.add.bitmapText(500,30,'font','Map : '+levels[MenuGame.cursorMap].name,30);
					let timerInfo = game.add.bitmapText(500,60,'font','Time : '+Math.floor((this.mytimer.timemax-this.mytimer.valuetime)/60)+':'+((this.mytimer.timemax-this.mytimer.valuetime)%60),30);
					let score = game.add.bitmapText(500,90,'font','Profit : '+this.score.score+'$');
					let pollution = game.add.bitmapText(500,120,'font','Pollution : '+this.pollution.pollution+' %');
					this.pauseGroup.add(mapName);
					this.pauseGroup.add(timerInfo);
					this.pauseGroup.add(score);
					this.pauseGroup.add(pollution);
				});//banniere pour le menu de pause
				banner.anchor.setTo(0.5,0.5);
				banner.scale.setTo(0.75,0.75);
				this.pauseGroup.add(banner);

				// Bouton Fullscreen
				let goFullscreen = game.add.button(game.world.width-104, 20,'fullscreen',() => {
					if (jeu.scale.isFullScreen){
						jeu.scale.stopFullScreen();
					} else {
						jeu.scale.startFullScreen(false);
					}
				},this,1,0,2);
				this.pauseGroup.add(goFullscreen);

				let pauseResume = game.add.button(300, 300, 'resume', () => {
					// Destruction des elements de la pause

					this.pauseGroup.removeAll(true,true);
					jeu.paused = false;
				document.body.style.cursor = 'none';

		

				},this,1,0,2);
				pauseResume.anchor.setTo(0.5,0.5);
				this.pauseGroup.add(pauseResume);

				let pauseRestart = game.add.button(300, 450, 'restart', () => {
					jeu.paused = false;
						this.musicGame.stop();
					  this.state.start('Game');
				},this,1,0,2);
				pauseRestart.anchor.setTo(0.5,0.5);
				this.pauseGroup.add(pauseRestart);

				let pauseMenu = game.add.button(300, 600, 'menu', () => {
					// Retour au menu
					jeu.paused = false;
					this.musicGame.stop();
					this.state.start('Menu');
				},this,1,0,2);
				pauseMenu.anchor.setTo(0.5,0.5);
				this.pauseGroup.add(pauseMenu);

				jeu.paused = true;
			}
	},
	create : function() {
		/*
		if (levels[MenuGame.cursorMap].itemsTime = -1){
			levels[MenuGame.cursorMap].itemsTime = 10000 - (MenuOpt.nbPlayers*1500);
			levels[MenuGame.cursorMap].itemSpeed = 100 / (MenuOpt.nbPlayers*1.3);
		}*/
		this.musicGame = Menu.add.audio('musicGame');
		this.musicGame.play("",0,0.7,true);
		// Lancement de la physique Arcade
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Bordures de la scene
		game.world.setBounds(-10, -10, jeu.width + 10, jeu.height + 10);

		// Creation de la map
		let level = levels[this.id];
		map = Creatmap(level);
		players = [];
		for(let i = 0; i < this.nbPlayers; i++){
			players.push(new Player(skins[this.playersskins[i]].name,64* level.spawnpoints[i][0] +10,64*level.spawnpoints[i][1]-4,object,itemGui))
		}

		//enleve le cursor
		document.body.style.cursor = 'none';

		//Creation de la Pollution
		this.pollution = new PollutionObject(levels[MenuGame.cursorMap].pollution, this.pollution);

		//Creation du timer
		this.mytimer = new MyTimer(level.chrono);

		//Creation d un score
		this.score = new MyScore();

		// PAUSE
		this.pauseGroup = game.add.group();
		var keyPause = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		keyPause.onDown.add(this.pauseEvent,this);
		if(MenuOpt.P1KeyCodes[0]) game.input.gamepad.pad1.addCallbacks(this,{ onDown: function(){ if(game.input.gamepad.pad1.isDown(Phaser.Gamepad.XBOX360_START)) this.pauseEvent(); } });
		if(MenuOpt.P1KeyCodes[1]) game.input.gamepad.pad2.addCallbacks(this,{ onDown: function(){ if(game.input.gamepad.pad2.isDown(Phaser.Gamepad.XBOX360_START)) this.pauseEvent(); } });
		if(MenuOpt.P1KeyCodes[2]) game.input.gamepad.pad3.addCallbacks(this,{ onDown: function(){ if(game.input.gamepad.pad3.isDown(Phaser.Gamepad.XBOX360_START)) this.pauseEvent(); } });
		if(MenuOpt.P1KeyCodes[3]) game.input.gamepad.pad4.addCallbacks(this,{ onDown: function(){ if(game.input.gamepad.pad4.isDown(Phaser.Gamepad.XBOX360_START)) this.pauseEvent(); } });
		// FIN PAUSE
	},
	update : function() {


		let playersControls = [this.controlP1, this.controlP2, this.controlP3, this.controlP4];
		for(let i = 0; i < this.nbPlayers; i++){
			players[i].update(playersControls[i][0],playersControls[i][1],playersControls[i][2],playersControls[i][3],playersControls[i][4],playersControls[i][5],platformsSolid,truckGroup,smokeGroup,players);
		}
		object.sort('y', Phaser.Group.SORT_ASCENDING);
		this.mytimer.updatetimer();
		if(this.mytimer.valuetime == this.mytimer.timemax || this.pollution.pollution >= 100){
			document.body.style.cursor = 'default';
			this.musicGame.stop();
			this.state.start('End');
		}
	}
}
