Benne = function(sprite,posx,posy,groupe,type){
	this.benne = groupe.create(posx,posy,sprite);
	this.work=false;
	this.weight=0;
	this.stock = 0;
	this.type = type;
	this.posx=posx+10;
	this.posy=posy+10;
	this.scoretext = game.add.bitmapText(this.posx,this.posy, 'font', '', 30);
	game.physics.arcade.enable([ this.scoretext ]);
}
Benne.prototype.addscore=function(value){
	game.world.bringToTop(this.scoretext);
	this.scoretext.text='+'+value;
	this.scoretext.body.velocity.y=-50;
	game.time.events.add(1000, () => {game.score.updatescore(value);
		this.scoretext.x=this.posx;
		this.scoretext.y=this.posy;
		this.scoretext.body.velocity.y=0;
		this.scoretext.text='';
	},this);
}

Benne.prototype.interact = function(){
	return;
}

Benne.prototype.drop=function(itemId){
	if(this.stock == 0 && itemId != 0){
		switch(this.type){
			case 'metal':
			switch(itemId){
				case itemsId.PlaqueMetal1:
				this.weight += 1;
				this.addscore(30);
				return 0;
				break;
				case itemsId.PlaqueMetal2:
				this.weight += 2;
				this.addscore(60);
				return 0;
				break;
				case itemsId.PlaqueMetal3:
				this.weight += 3;
				this.addscore(120);
				return 0;
				break;
			}
			break;
			case 'plastique':
			switch(itemId){
				case itemsId.SceauPlastique1:
				this.weight += 1;
				this.addscore(20);
				return itemsId.SceauPlastique0;
				break;
				case itemsId.SceauPlastique2:
				this.weight += 2;
				this.addscore(40);
				return itemsId.SceauPlastique0;
				break;
				case itemsId.SceauPlastique3:
				this.weight += 3;
				this.addscore(60);
				return itemsId.SceauPlastique0;
				break;
			}
			break;
			case 'verre':
			switch(itemId){
				case itemsId.BouteilleVerre1:
				this.weight += 1;
				this.addscore(30);
				return 0;
				break;
				case itemsId.BouteilleVerre2:
				this.weight += 2;
				this.addscore(60);
				return 0;
				break;
				case itemsId.BouteilleVerre3:
				this.weight += 3;
				this.addscore(120);
				return 0;
				break;
			}
			break;
			case 'pneu':
			switch(itemId){
				case itemsId.SceauPneu1:
				this.weight += 1;
				this.addscore(10);
				return itemsId.SceauPneu0;
				break;
				case itemsId.SceauPneu2:
				this.weight += 2;
				this.addscore(20);
				return itemsId.SceauPneu0;
				break;
				case itemsId.SceauPneu3:
				this.weight += 3;
				this.addscore(30);
				return itemsId.SceauPneu0;
				break;
			}
			break;
			case 'carton':
			switch(itemId){
				case itemsId.PlaqueCarton1:
				this.weight += 1;
				this.addscore(30);
				return 0;
				break;
				case itemsId.PlaqueCarton2:
				this.weight += 2;
				this.addscore(60);
				return 0;
				break;
				case itemsId.PlaqueCarton3:
				this.weight += 3;
				this.addscore(120);
				return 0;
				break;
			}
			break;
			case 'nucleaire':
			if(itemId == itemsId.Nucleaire){
				this.weight += 1;
				return 0;
			}
			break;
		}
	}
	return itemId;
}
