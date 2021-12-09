Camion = function(sprite, posx, groupe, barres){
	this.camion = groupe.create(posx,-250,sprite);
	this.camion.body.immovable = true;
	
	this.barrieres = barres;
	for(let i = 0; i < this.barrieres.length; i++){
		this.barrieres[i].animations.add('leve', [0,1,2], 3, false);
		this.barrieres[i].animations.add('baisse', [2,1,0], 3, false);
	}
	
	game.time.events.add(5000, () => {this.roule();} , this);
}

Camion.prototype.interact = function(){
	return;
}

Camion.prototype.drop = function(itemId){
	return itemId;
}

Camion.prototype.roule = function(){
	for(let i = 0; i < this.barrieres.length; i++){
		this.barrieres[i].play('leve');
	}
	this.camion.body.velocity.y = 150;
	game.time.events.add(7000, () => {
		this.camion.body.velocity.y = 0;
		this.camion.y = -250;
		for(let i = 0; i < this.barrieres.length; i++){
			this.barrieres[i].play('baisse');
		}
		game.time.events.add(5000, () => {this.roule();} , this);
	} , this);
}