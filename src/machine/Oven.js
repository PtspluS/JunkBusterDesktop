Oven=function(sprite,posx,posy,groupe,itemgroupe){
    this.oven = groupe.create(posx,posy,sprite);
    this.oven.animations.add('actif', [1, 2, 3,4], 10, true);
    this.oven.frame=0;
    this.stock=0;
    this.cook=false;
    this.container=null;
	this.weight=0;

	this.item = itemgroupe.create(this.oven.x + 2, this.oven.y + 2, 'itemsbubbles');
	this.item.frame = 0;
}

Oven.prototype.interact = function(){
	return;
}

Oven.prototype.drop=function(itemId){
    if(this.cook==true){
		return itemId;
    }else if(this.stock != 0 && (itemId == itemsId.Sceau || (itemId >= this.container && 3 >= itemId - this.container + this.weight)) && this.cook == false){
		let tmp = this.stock;
		this.stock = 0;
		this.item.frame = 0;
		if(itemId == itemsId.Sceau || itemId == this.container){
			return tmp;
		}else{
			return (itemId + this.weight);
		}
    }else if(this.stock == 0 && itemId != 0){
		switch(itemId){
			case itemsId.BlockMetal1:
			this.typesort(itemId,itemsId.SceauMetal0,1,itemsId.SceauMetal1,5000);
			return 0;
			break;

			case itemsId.BlockMetal2:
			this.typesort(itemId,itemsId.SceauMetal0,2,itemsId.SceauMetal2,5000);
			return 0;
			break;

			case itemsId.BlockMetal3:
			this.typesort(itemId,itemsId.SceauMetal0,3,itemsId.SceauMetal3,5000);
			return 0;
			break;

			case itemsId.SceauVerre1:
			this.typesort(itemId,itemsId.SceauVerreLiquide0,1,itemsId.SceauVerreLiquide1,5000);
			return itemsId.SceauVerre0;
			break;

			case itemsId.SceauVerre2:
			this.typesort(itemId,itemsId.SceauVerreLiquide0,2,itemsId.SceauVerreLiquide2,5000);
			return itemsId.SceauVerre0;
			break;

			case itemsId.SceauVerre3:
			this.typesort(itemId,itemsId.SceauVerreLiquide0,3,itemsId.SceauVerreLiquide3,5000);
			return itemsId.SceauVerre0;
			break;
		}
	}
	return itemId;
}

Oven.prototype.typesort=function(itemId,conteneur,weight,itemend,time){
    this.stock = itemId;
    this.item.frame=itemId;
    this.container=conteneur;
    this.weight=weight;
    this.oven.animations.play('actif');
    this.cook=true;
    game.time.events.add(time, () => {this.iscook(itemend);} , this);
}



Oven.prototype.iscook=function(itemId){
    this.cook=false;
    this.oven.animations.stop();
    this.oven.frame=0;
    this.stock=itemId;
    this.item.frame=itemId;
}
