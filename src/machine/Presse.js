Presse = function(sprite,posx,posy,groupe,itemgroupe){
    this.presse = groupe.create(posx,posy,sprite);
   this.presse.animations.add('actif', [0,1,2,3,4,5,6,7,8,9,10,11,12,8,7,6,5,4,3,2,1,0], 5, false);
    this.presse.frame = 0;
    this.stock = 0;
    this.work = false;
    this.weight=0;

	this.item = itemgroupe.create(this.presse.x + 18, this.presse.y + 70, 'itemsbubbles');
	this.item.frame = 0;
}

Presse.prototype.interact = function(){
	return;
}

Presse.prototype.drop=function(itemId){
    if(this.work){
		return itemId;
	}else if(this.stock != 0 && itemId == 0 && this.work == false){
		let tmp = this.stock;
		this.stock = 0;
		this.item.frame = 0;
		return tmp;
	}else if(this.stock == 0 && itemId != 0 && this.work == false){
		switch(itemId){
			case itemsId.PateCarton1:
				this.typesort(itemsId.PateCarton1, itemsId.PlaqueCarton1);
				return 0;
				break;

			case itemsId.PateCarton2:
				this.typesort(itemsId.PateCarton2, itemsId.PlaqueCarton2);
				return 0;
				break;

			case itemsId.PateCarton3:
				this.typesort(itemsId.PateCarton3, itemsId.PlaqueCarton3);
				return 0;
				break;

			case itemsId.SceauMetal1:
				this.typesort(itemsId.SceauMetal1, itemsId.PlaqueMetal1);
				return itemsId.SceauMetal0;
				break;

			case itemsId.SceauMetal2:
				this.typesort(itemsId.SceauMetal2, itemsId.PlaqueMetal2);
				return itemsId.SceauMetal0;
				break;

			case itemsId.SceauMetal3:
				this.typesort(itemsId.SceauMetal3, itemsId.PlaqueMetal3);
				return itemsId.SceauMetal0;
				break;
		}
	}
	// En cas de possible erreur, on retourne l'objet passe en argument
	return itemId;
}

Presse.prototype.typesort = function(itemId, itemend){
	this.work = true;
	this.presse.play('actif');
	this.stock = itemId;
	this.item.frame = itemId;
	game.time.events.add(4400, () => {this.iswork(itemend);} , this);
	return;
}

Presse.prototype.iswork = function(itemId){
	this.work = false;
	this.stock = itemId;
	this.item.frame = itemId;
	return;
}
