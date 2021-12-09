//Menu
var Menu = {
	moreJunk : function(groupe){
		var junk = groupe.create(-28, Math.floor(Math.random() * 768), 'items');
		junk.scale.x = 2;
		junk.scale.y = 2;
		junk.anchor.setTo(0.5, 0.5);
		Menu.physics.arcade.enable(junk);
		// rotation
		junk.angle = Math.floor(Math.random() * 360);
		Menu.add.tween(junk).to( { angle: Math.floor(Math.random() * 270) + 90 }, 8000, Phaser.Easing.Linear.None, true);
		// Disparition
		Menu.add.tween(junk.scale).to( { x: 0, y: 0 }, 8000, Phaser.Easing.Linear.None, true);
		junk.enableBody = true;
		switch(Math.floor(Math.random() * 6)){
			case 0:
				junk.frame = itemsId.Carton;
				break;
			case 1:
				junk.frame = itemsId.Pneu;
				break;
			case 2:
				junk.frame = itemsId.Plastique;
				break;
			case 3:
				junk.frame = itemsId.Verre;
				break;
			case 4:
				junk.frame = itemsId.Metal;
				break;
			case 5:
				junk.frame = itemsId.Poubelle;
				break;
			default:
				junk.frame = itemsId.Poubelle;
		}
		junk.body.velocity.x = Math.floor(Math.random() * 120) + 40;
		junk.body.velocity.y = Math.floor(Math.random() * 150) - 70;

		Menu.time.events.add(8000, () => {junk.destroy();} , this); // Destruction

		Menu.time.events.add(Math.floor(Math.random() * 2000) + 500, () => {this.moreJunk(groupe);} , this);
	},
  create : function(){

	// Bordures de la scene
	Menu.world.setBounds(0, 0, jeu.width, jeu.height);

	// Fond d'ecran
	let fond = Menu.add.sprite(Menu.world.centerX, Menu.world.centerY, 'backgroundplanet');
    fond.anchor.setTo(0.5,0.5);
    fond.animations.add('life', [0,1], 1, true);
    fond.play('life');
	let dechets = Menu.add.group();

	Menu.time.events.add(Math.floor(Math.random() * 4000) + 1000, () => {this.moreJunk(dechets);} , this);

if(this.musicMenu==undefined){
      this.musicMenu = Menu.add.audio('musicMenu');
    }
    if(this.musicMenu.isPlaying!=true){
      this.musicMenu.play("",0,0.6,true);
    }

	// tableau stockant l'ordre d'animation de la banniere
	var tab = Array(99);
    for(let i = 0; i < 99; i++){
      tab[i] = i;
    }

    let banner = Menu.add.sprite(Menu.world.centerX, Menu.world.centerY-152, 'title');
    banner.animations.add('shiny', tab, 20, true);
    banner.play('shiny');
    banner.anchor.setTo(0.5,0.5);
    banner.scale.setTo(1,1);
    let btt1 = Menu.add.button(Menu.world.centerX, Menu.world.centerY+20, 'game', goMenuGame,this,1,0,2);
    btt1.anchor.setTo(0.5,0.5);
    let btt = Menu.add.button(Menu.world.centerX, Menu.world.centerY+134,'controls',goMenuOpt, this,1,0,2);
    btt.anchor.setTo(0.5,0.5);
  }
}
let goMenuGame =  function(){
    this.state.start('MenuGame');
}
let goMenuOpt = function(){
  this.state.start('MenuOpt');
}
let returnMenu = function(){
  this.state.start('Menu');
}

// Menu de selection
var MenuGame ={
  cursorMap : 0,
  playersskins : [0, 1, 2, 3],
  leftmap : function(mapName){
	if(this.cursorMap<=0){
		this.cursorMap = levels.length-1;
	}
	else{
		this.cursorMap--;
	}
	mapName.text = levels[this.cursorMap].name;
	imgMap.loadTexture(levels[this.cursorMap].name,0);
  },
  rightmap : function(mapName){
	this.cursorMap = (this.cursorMap+1)%levels.length;
	mapName.text = levels[this.cursorMap].name;
	imgMap.loadTexture(levels[this.cursorMap].name,0);
  },
  create : function(){
	// Bordures de la scene
	MenuGame.world.setBounds(0, 0, jeu.width, jeu.height);

	// Fond d'ecran
	let fond = MenuGame.add.sprite(MenuGame.world.centerX, MenuGame.world.centerY, 'backgroundselection');
	fond.anchor.setTo(0.5,0.5);
	let casemap = MenuGame.add.sprite(MenuGame.world.centerX, MenuGame.world.centerY + 10, 'casemap');
	casemap.anchor.setTo(0.5,0.5);

    imgMap = MenuGame.add.image(MenuGame.world.centerX, MenuGame.world.centerY,levels[this.cursorMap].name)
    imgMap.anchor.setTo(0.5,0.5);
    imgMap.scale.setTo(0.35,0.35);

    // Clique sur GO
    let button1 = MenuGame.add.button(MenuGame.world.centerX, MenuGame.world.centerY + 200, 'go', () => {
      Menu.musicMenu.stop();
      if(MenuOpt.P1KeyCodes[0]){ // Si joueur 1 est au Gamepad
        for(let i = 0; i < 6; i++){
          game.controlP1[i] = () => {return game.input.gamepad.pad1.isDown(MenuOpt.GamePadKeyCodes[i]);};
        }
      }else{
        for(let i = 0; i < 6; i++){
          game.controlP1[i] = () => {return game.input.keyboard.isDown(MenuOpt.P1KeyCodes[i+1]);};
        }
      }
      if(MenuOpt.P2KeyCodes[0]){ // Si joueur 2 est au Gamepad
        for(let i = 0; i < 6; i++){
          game.controlP2[i] = () => {return game.input.gamepad.pad2.isDown(MenuOpt.GamePadKeyCodes[i]);};
        }
      }else{
        for(let i = 0; i < 6; i++){
          game.controlP2[i] = () => {return game.input.keyboard.isDown(MenuOpt.P2KeyCodes[i+1]);};
        }
      }
      if(MenuOpt.P3KeyCodes[0]){ // Si joueur 3 est au Gamepad
        for(let i = 0; i < 6; i++){
          game.controlP3[i] = () => {return game.input.gamepad.pad3.isDown(MenuOpt.GamePadKeyCodes[i]);};
        }
      }else{
        for(let i = 0; i < 6; i++){
          game.controlP3[i] = () => {return game.input.keyboard.isDown(MenuOpt.P3KeyCodes[i+1]);};
        }
      }
      if(MenuOpt.P4KeyCodes[0]){ // Si joueur 4 est au Gamepad
        for(let i = 0; i < 6; i++){
          game.controlP4[i] = () => {return game.input.gamepad.pad4.isDown(MenuOpt.GamePadKeyCodes[i]);};
        }
      }else{
        for(let i = 0; i < 6; i++){
          game.controlP4[i] = () => {return game.input.keyboard.isDown(MenuOpt.P4KeyCodes[i+1]);};
        }
      }
      if(levels[this.cursorMap].tutoText.length < 1){
        game.id = this.cursorMap;
        game.playersskins = this.playersskins;
        game.nbPlayers = MenuOpt.nbPlayers;
        this.state.start('Game');
      }else{
        Tuto.id = this.cursorMap;
        game.id = this.cursorMap;
        game.playersskins = this.playersskins;
        game.nbPlayers = MenuOpt.nbPlayers;
        this.state.start('Tuto');
      }
    }, this,1,0,2);
    button1.anchor.setTo(0.5,0.5);

    let mapName = MenuGame.add.bitmapText(MenuGame.world.centerX, MenuGame.world.centerY - 200, 'font',levels[this.cursorMap].name, 42);
    mapName.anchor.setTo(0.5,0.5);

    // Fleche Gauche
    let button2 = MenuGame.add.button(MenuGame.world.centerX-128, MenuGame.world.centerY + 200,'leftArrow',() => { this.leftmap(mapName);},this,1,0,2);
    button2.anchor.setTo(0.5,0.5);

    // Fleche Droite
    let button3 = MenuGame.add.button(MenuGame.world.centerX+128, MenuGame.world.centerY + 200,'rightArrow',() => { this.rightmap(mapName);},this,1,0,2);
    button3.anchor.setTo(0.5,0.5);

    // Retour
    let back = MenuGame.add.button(16,18,'back',returnMenu,this,1,0,2);

    // Selection Personnages
    for(let i = 0; i < MenuOpt.nbPlayers; i++){ // J 1 - 4
	  // Case du personnage
	  let caseChar = MenuGame.add.sprite((((i % 2)*2 - 1)* 0.6 + 1)*MenuGame.world.centerX + ((i % 2)*2 - 1), MenuGame.world.centerY + (Math.round(i/2 - 0.1) - 0.5)*MenuGame.world.centerY - 50,'case');
      caseChar.anchor.setTo(0.5,0.5);

      // Skin en rotation
      let spriteChar = MenuGame.add.sprite((((i % 2)*2 - 1)* 0.6 + 1)*MenuGame.world.centerX, MenuGame.world.centerY + (Math.round(i/2 - 0.1) - 0.5)*MenuGame.world.centerY,skins[this.playersskins[i]].name);
      spriteChar.anchor.setTo(0.5,0.5);
      spriteChar.scale.setTo(2,2);
      spriteChar.animations.add('turn',[0,4,8,12,16,20,24,28], 8, true);
      spriteChar.play('turn');

      // Logo du joueur
      let playerlogo = MenuGame.add.sprite(spriteChar.position.x, spriteChar.position.y-128, 'player' + (i + 1));
      playerlogo.anchor.setTo(0.5,0.5);

      // Boutons pour changer le skin
      let bp1 = MenuGame.add.button(spriteChar.position.x-128, spriteChar.position.y,'leftArrow',() => {
        this.playersskins[i] = (this.playersskins[i] == 0 ? skins.length - 1 : this.playersskins[i] - 1)
        spriteChar.loadTexture(skins[this.playersskins[i]].name, 0);
        spriteChar.animations.add('turn',[0,4,8,12,16,20,24,28], 8, true);
        spriteChar.play('turn');
      },this,1,0,2);
      bp1.anchor.setTo(0.5,0.5);
      let bp2 = MenuGame.add.button(spriteChar.position.x+128, spriteChar.position.y,'rightArrow',() => {
        this.playersskins[i] = (this.playersskins[i] == skins.length - 1 ? 0 : this.playersskins[i] + 1)
        spriteChar.loadTexture( skins[this.playersskins[i]].name, 0);
        spriteChar.animations.add('turn',[0,4,8,12,16,20,24,28], 8, true);
        spriteChar.play('turn');
      },this,1,0,2);
      bp2.anchor.setTo(0.5,0.5);
    }
  }
}

// Menu des options
var MenuOpt ={
  nbPlayers : 2,
  GamePadKeyCodes : [
    Phaser.Gamepad.XBOX360_DPAD_UP,
    Phaser.Gamepad.XBOX360_DPAD_DOWN,
    Phaser.Gamepad.XBOX360_DPAD_LEFT,
    Phaser.Gamepad.XBOX360_DPAD_RIGHT,
    Phaser.Gamepad.XBOX360_A,
    Phaser.Gamepad.XBOX360_X
  ],
  P1KeyCodes : [
    false,
    Phaser.Keyboard.Z,
    Phaser.Keyboard.S,
    Phaser.Keyboard.Q,
    Phaser.Keyboard.D,
    Phaser.Keyboard.F,
    Phaser.Keyboard.G
  ],
  P2KeyCodes : [
    false,
    Phaser.Keyboard.UP,
    Phaser.Keyboard.DOWN,
    Phaser.Keyboard.LEFT,
    Phaser.Keyboard.RIGHT,
    Phaser.Keyboard.NUMPAD_2,
    Phaser.Keyboard.NUMPAD_3
  ],
  P3KeyCodes : [
    false,
    NaN,
    NaN,
    NaN,
    NaN,
    NaN,
    NaN
  ],
  P4KeyCodes : [
    false,
    NaN,
    NaN,
    NaN,
    NaN,
    NaN,
    NaN
  ],
  keyFromKeyCode: function(keyCode){
    // Pour les lettres et nombres, le keycode est déja présent
    if((keyCode >= 65 && keyCode <= 90) || (keyCode >= 48 && keyCode <= 57)){
      return String.fromCharCode(keyCode);
    }
    // Touches Pave Numerique
    if(keyCode >= 96 && keyCode <= 105){
      return 'PAD_' + (keyCode - 96);
    }
    // Autres touches speciales
    switch(keyCode){
      case NaN:
      return 'NA';
      case 37:
      return 'Left';
      case 38:
      return 'Up';
      case 39:
      return 'Right';
      case 40:
      return 'Down';
      case 32:
      return 'Space';
      case 188:
      return ',';
      case 59:
      return ';';
      case 58:
      return ':';
      case 161:
      return '!';
      case 165:
      return '%';
      case 170:
      return '*';
      case 160:
      return '^';
      case 164:
      return '$';
      case 107:
      return 'PAD_+';
      case 109:
      return 'PAD_-';
      case 110:
      return 'PAD_.';
      case 106:
      return 'PAD_*';
      case 17:
      return 'CTRL';
      case 16:
      return 'SHIFT';
      case 9:
      return 'TAB';
    }
    // Si nous ne l'avons pas trouve
    return 'N/A'; // Non attribue
  },
  keyWait: function(idPlayer, idKey, keytext){ // Id du player a changer puis l'id de sa touche a changer
  // Fond Gris
  var pauseRect = MenuOpt.add.graphics(0, 0);
  pauseRect.beginFill(0x222222);
  pauseRect.drawRect(0, 0, 1344, 768)
  pauseRect.alpha = 0.8;
  pauseRect.inputEnabled = true; // Permet d'eviter de cliquer sur les boutons derriere
  pauseRect.input.priorityID = 1; // " de meme

  var pressKeyText = MenuOpt.add.bitmapText(MenuOpt.world.centerX, MenuOpt.world.centerY, 'font', 'Press a Key to assign', 64);
  pressKeyText.anchor.setTo(0.5,0.5);

  MenuOpt.input.keyboard.addCallbacks(this, (eleme) => {
    let keyClicked = this.keyFromKeyCode(eleme.keyCode);
    switch(idPlayer){
      case 1:
      this.P1KeyCodes[idKey + 1] = (keyClicked != 'N/A') ? eleme.keyCode : NaN;
      break;
      case 2:
      this.P2KeyCodes[idKey + 1] = (keyClicked != 'N/A') ? eleme.keyCode : NaN;
      break;
      case 3:
      this.P3KeyCodes[idKey + 1] = (keyClicked != 'N/A') ? eleme.keyCode : NaN;
      break;
      case 4:
      this.P4KeyCodes[idKey + 1] = (keyClicked != 'N/A') ? eleme.keyCode : NaN;
      break;
    }
    keytext.text = keyClicked;
    MenuOpt.input.keyboard.addCallbacks(this, () => {return;}, null, null);
    pressKeyText.destroy();
    pauseRect.destroy();
  }, null, null);
},
createPlayerColumn: function(groupe, id){
  let buttonsNames = ['pbup', 'pbdown', 'pbleft', 'pbright', 'pbgrab', 'pbaction'];
  let playersMenuControls = [this.P1KeyCodes, this.P2KeyCodes, this.P3KeyCodes, this.P4KeyCodes];
  let activePad = [MenuOpt.input.gamepad.pad1, MenuOpt.input.gamepad.pad2, MenuOpt.input.gamepad.pad3, MenuOpt.input.gamepad.pad4]

  let playerlogo = MenuOpt.add.sprite(120 + 320 * id, 130, 'player' + (id + 1));
  groupe.add(playerlogo);
  let buttonGamePad = MenuOpt.add.button(240 + 320 * id, 130, 'gamepad',() => {
    if(MenuOpt.input.gamepad.supported && MenuOpt.input.gamepad.active && activePad[id].connected) {
      playersMenuControls[id][0] = !playersMenuControls[id][0];
      buttonGamePad.setFrames(playersMenuControls[id][0] ? 2 : 1,playersMenuControls[id][0] ? 2 : 0, playersMenuControls[id][0] ? 1: 2);
    }
  },this,playersMenuControls[id][0] ? 2 : 1,playersMenuControls[id][0] ? 2 : 0, playersMenuControls[id][0] ? 1 : 2);
  groupe.add(buttonGamePad);

  // Creations des boutons de controle
  for(let j = 0; j < buttonsNames.length; j++){
    let keyText = MenuOpt.add.bitmapText(230 + 330 * id, 270 + 80 * j, 'font', this.keyFromKeyCode(playersMenuControls[id][j+1]), 48);
    let buttonP_0 = MenuOpt.add.button(50 + 330 * id, 260 + 80 * j, buttonsNames[j],() => {
      this.keyWait(id + 1, j, keyText);
    },this,1,0,2);
    groupe.add(keyText);
    groupe.add(buttonP_0);
  }
},
create : function(){

  MenuOpt.input.gamepad.start();


  // Bordures de la scene
  MenuOpt.world.setBounds(0, 0, jeu.width, jeu.height);

  // Fond d'ecran
  let fond = MenuOpt.add.sprite(MenuOpt.world.centerX, MenuOpt.world.centerY, 'backgroundtiled');
  fond.anchor.setTo(0.5,0.5);

  var playersGroups = [MenuOpt.add.group(), MenuOpt.add.group(), MenuOpt.add.group(), MenuOpt.add.group()];

  for(let i = 0; i < this.nbPlayers; i++){
    this.createPlayerColumn(playersGroups[i], i);
  }

  let textnbplayers = MenuOpt.add.bitmapText(MenuOpt.world.centerX, 70, 'font', 'Players: ' + this.nbPlayers, 64);
  textnbplayers.anchor.setTo(0.5,0.5)

  // Fleche Gauche
  let lessPlayers = MenuOpt.add.button(MenuOpt.world.centerX-240, 70,'leftArrow',() => {
    if(this.nbPlayers > 1){
      this.nbPlayers--;
      textnbplayers.text = 'Players: ' + this.nbPlayers;
      playersGroups[this.nbPlayers].removeAll(true,true);
    }
  },this,1,0,2);
  lessPlayers.anchor.setTo(0.5,0.5);

  // Fleche Droite
  let morePlayers = MenuOpt.add.button(MenuOpt.world.centerX+240, 70,'rightArrow',() => {
    if(this.nbPlayers < 4){
      this.nbPlayers++;
      textnbplayers.text = 'Players: ' + this.nbPlayers;
      this.createPlayerColumn(playersGroups[this.nbPlayers - 1], this.nbPlayers - 1);
    }
  },this,1,0,2);
  morePlayers.anchor.setTo(0.5,0.5);

  // Bouton Fullscreen
  let goFullscreen = MenuOpt.add.button(MenuOpt.world.width-104, 20,'fullscreen',() => {
    if (jeu.scale.isFullScreen){
      jeu.scale.stopFullScreen();
    } else {
      jeu.scale.startFullScreen(false);
    }
  },this,1,0,2);

  // Bouton retour Menu
  let back = MenuOpt.add.button(20,20,'back',returnMenu,this,1,0,2);
}
}
