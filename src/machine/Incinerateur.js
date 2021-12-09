Incinerateur = function(sprite,posx,posy,groupe){
	this.incinerateur = groupe.create(posx,posy,sprite);
	this.incinerateur.animations.add('actif',[0,1,2,1], 4, true);
	this.incinerateur.animations.play('actif');
	this.stock = 0; // Constante pour les rouleaux
	this.posx=posx+10;
	this.posy=posy+10;
	this.scoretext = game.add.bitmapText(this.posx,this.posy, 'fontred', '', 30);
	game.physics.arcade.enable([ this.scoretext ]);
}

Incinerateur.prototype.addscore=function(){
	game.world.bringToTop(this.scoretext);
	this.scoretext.text="+10%";
	this.scoretext.body.velocity.y=-50;
	game.time.events.add(1000, () => {
		game.pollution.updatePollution(10);
		this.scoretext.x=this.posx;
		this.scoretext.y=this.posy;
		this.scoretext.body.velocity.y=0;
		this.scoretext.text='';
	},this);
}

Incinerateur.prototype.interact = function(){
	return;
}

Incinerateur.prototype.drop = function(itemId){
	if(itemId != 0){
		game.cameraShake(0);
		this.addscore(-100);
		return 0;
	}
	// En cas de possible erreur, on retourne l'objet passe en argument
	return itemId;
}
