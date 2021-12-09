Compresseur = function(sprite,posx,posy,groupe,itemgroupe){
    this.compresseur = groupe.create(posx,posy,sprite);
    this.compresseur.animations.add('actif', [ 0, 1, 2, 3, 0, 4, 5, 6, 5, 4, 0, 1, 2, 3, 0], 10, false);
    this.compresseur.frame = 0;
    this.work = false;

	this.item1 = itemgroupe.create(this.compresseur.x + 2, this.compresseur.y + 24, 'itemsbubbles');
	this.item1.frame = 0;
	this.stock1 = 0;
	this.item2 = itemgroupe.create(this.compresseur.x + 2, this.compresseur.y + 14, 'itemsbubbles');
	this.item2.frame = 0;
	this.stock2 = 0;
	this.item3 = itemgroupe.create(this.compresseur.x + 2, this.compresseur.y + 4, 'itemsbubbles');
	this.item3.frame = 0;
	this.stock3 = 0;
	this.itemf = itemgroupe.create(this.compresseur.x + 100, this.compresseur.y + 14, 'itemsbubbles');
	this.itemf.frame = 0;
	this.stockf = 0;
}

Compresseur.prototype.interact = function(){
	if(this.work == false){
		switch(this.stock1){
			case itemsId.Metal:
				this.typesort(itemsId.BlockMetal1 - 1 +(this.stock1 + this.stock2 + this.stock3) / itemsId.Metal);
				break;
			case itemsId.Plastique:
				this.typesort(itemsId.BlockPlastique1 - 1 +(this.stock1 + this.stock2 + this.stock3) / itemsId.Plastique);
				break;
			case itemsId.Carton:
				this.typesort(itemsId.BlockCarton1 - 1 +(this.stock1 + this.stock2 + this.stock3) / itemsId.Carton);
				break;
		}
	}
	return;
}

Compresseur.prototype.drop = function(itemId){
	if((itemId != 0 && this.stockf != 0) || (itemId != 0 && itemId != this.stock1 && this.stock2 != 0 && this.stock3 != 0)||this.work){
		return itemId;
	}else if(this.stockf != 0 && itemId == 0){
		itemId = this.stockf;
		this.stockf = 0;
		this.itemf.frame = 0;
		return itemId;
	}else if(this.stockf == 0 && itemId == 0){
		if(this.stock3 != 0){
			itemId = this.stock3;
			this.stock3 = 0;
			this.item3.frame = 0;
			return itemId;
		}else if(this.stock2 != 0){
			itemId = this.stock2;
			this.stock2 = 0;
			this.item2.frame = 0;
			return itemId;
		}else if(this.stock1 != 0){
			itemId = this.stock1
			this.stock1 = 0;
			this.item1.frame = 0;
			return itemId;
		}
		return itemId;
	}else if(this.stock3 == 0 && itemId != 0){
		if(this.stock1 == 0){
			this.stock1 = itemId;
			this.item1.frame = itemId;
			return 0;
		}else if(this.stock2 == 0 && itemId == this.stock1){
			this.stock2 = itemId;
			this.item2.frame = itemId;
			return 0;
		}else if(this.stock3 == 0 && itemId == this.stock1){
			this.stock3 = itemId;
			this.item3.frame = itemId;
			return 0;
		}
		return itemId
	}
	return itemId;
}

Compresseur.prototype.typesort = function(itemend){
	this.work = true;
	this.compresseur.play('actif');
	this.stock1 = 0;
	this.stock2 = 0;
	this.stock3 = 0;
	this.item1.frame = 0;
	this.item2.frame = 0;
	this.item3.frame = 0;
	game.time.events.add(1400, () => {this.iswork(itemend);} , this);
	return;
}

Compresseur.prototype.iswork = function(itemId){
	this.work = false;
	this.stockf = itemId;
	this.itemf.frame = itemId;
	return;
}
