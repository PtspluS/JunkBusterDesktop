Bassine = function(sprite,posx,posy,groupe,itemgroupe){
    this.bassine = groupe.create(posx,posy,sprite);
    this.bassine.animations.add('actif', [ 3, 4, 5], 10, true);
    this.bassine.animations.add('inactif', [ 1, 2], 2, true);
    this.bassine.frame = 0;
    this.stock = 0;
    this.work = false;
    this.working = 0;

	this.item = itemgroupe.create(this.bassine.x + 18, this.bassine.y + 34, 'itemsbubbles');
	this.item.frame = 0;
}

Bassine.prototype.interact = function(){
	if(this.work && this.working == 0){
		this.bassine.animations.stop();
		this.bassine.play('actif');
		this.working++;
	}else if (this.work){
		this.working++;
		if(this.working >= 10){
			this.work = false;
			this.working = 0;
			this.bassine.frame = 0;
			this.item.frame = this.stock;
			this.bassine.play('inactif');
		}
	}
	return;
}

Bassine.prototype.drop = function(itemId){
	if(this.work){
		return itemId;
	}else if(this.stock != 0 && itemId == 0 && this.work == false){
		let tmp = this.stock;
		this.stock = 0;
		this.item.frame = 0;
		this.bassine.animations.stop();
		this.bassine.frame = 0;
		return tmp;
	}else if(this.stock == 0 && itemId != 0 && this.work == false){
		switch(itemId){
			case itemsId.SceauVerre0:
			case itemsId.SceauVerreLiquide0:
			case itemsId.SceauPlastique0:
			case itemsId.SceauMetal0:
			case itemsId.SceauPneu0:
				this.typesort(itemId, itemsId.Sceau);
				return 0;
				break;

			case itemsId.BlockCarton1:
				this.typesort(itemId, itemsId.PateCarton1);
				return 0;

			case itemsId.BlockCarton2:
				this.typesort(itemId, itemsId.PateCarton2);
				return 0;

			case itemsId.BlockCarton3:
				this.typesort(itemId, itemsId.PateCarton3);
				return 0;
		}
	}
	// En cas de possible erreur, on retourne l'objet passe en argument
	return itemId;
}

Bassine.prototype.typesort = function(itemId, itemend){
	this.work = true;
	this.bassine.play('inactif');
	this.stock = itemend;
	return;
}
