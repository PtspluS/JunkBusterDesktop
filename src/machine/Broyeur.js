Broyeur = function(sprite,posx,posy,groupe,itemgroupe){
	this.broyeur = groupe.create(posx,posy,sprite);
	this.broyeur.animations.add('actif', [0, 1], 10, true);
	this.stock = 0;
    this.work=false;
	this.container=null;
	this.weight=0;

	this.item = itemgroupe.create(this.broyeur.x + 18, this.broyeur.y + 10, 'itemsbubbles');
	this.item.frame = 0;
	this.broyeursound = game.add.audio('broyeursound');

}

Broyeur.prototype.interact = function(){
	return;
}

Broyeur.prototype.drop=function(itemId){
	if(this.work==true){
		return itemId;
	}else if(this.stock != 0 && (itemId == itemsId.Sceau || (itemId >= this.container && 3 >= itemId - this.container + this.weight)) && this.work == false){
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
      case itemsId.Pneu:
      this.typesort(itemId,itemsId.SceauPneu0,1,itemsId.SceauPneu1,1000);
  		return 0;
      break;

      case itemsId.BlockPlastique1:
      this.typesort(itemId,itemsId.SceauPlastique0,1,itemsId.SceauPlastique1,1000)
      return 0;
      break;

      case itemsId.BlockPlastique2:
      this.typesort(itemId,itemsId.SceauPlastique0,2,itemsId.SceauPlastique2,1000)
      return 0;
      break;

      case itemsId.BlockPlastique3:
      this.typesort(itemId,itemsId.SceauPlastique0,3,itemsId.SceauPlastique3,1000)
      return 0;
      break;

    }
}
return itemId;
}


Broyeur.prototype.typesort=function(itemId,conteneur,weight,itemend,time){
	this.stock = itemId;
  this.item.frame=itemId;
  this.container=conteneur;
  this.weight=weight;
  this.broyeur.animations.play('actif');
  this.work=true;
	this.broyeursound.play();
  game.time.events.add(time, () => {this.iswork(itemend);} , this);
}

Broyeur.prototype.iswork=function(itemId){
	this.work=false;
	this.broyeur.animations.stop();
	this.broyeur.frame=0;
		this.stock=itemId;
	this.item.frame=itemId;


}
