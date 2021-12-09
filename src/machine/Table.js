Table = function(sprite,posx,posy,groupe,itemgroupe){
	this.table = groupe.create(posx,posy,sprite);
	this.stock = 0;
	this.item = itemgroupe.create(this.table.position.x + 4, this.table.position.y + 4, 'items');
	this.item.frame = 0;
}

Table.prototype.interact = function(){
	return;
}

Table.prototype.drop = function(itemId){
	if(this.stock != 0 && itemId != 0){
		return this.vider(itemId);
	}
	else if(this.stock != 0 && itemId == 0){
		let tmp = this.stock;
		this.stock = 0;
		this.item.frame = 0;
		return tmp;
	}else if(this.stock == 0 && itemId != 0){
		this.stock = itemId;
		this.item.frame = itemId;
		return 0;
	}
	// En cas de possible erreur, on retourne l'objet passe en argument
	return itemId;
}

Table.prototype.vider=function(itemId){
	let tabase = [itemsId.SceauPneu0,itemsId.SceauVerre0,itemsId.SceauVerreLiquide0,itemsId.SceauMetal0,itemsId.SceauPlastique0];
	var idbase = 0;
	for(let i = 0; i < tabase.length; i++){
		idbase = tabase[i];
		if(itemId==idbase+1||itemId==idbase+2||itemId==idbase+3){

			if(this.stock==idbase||this.stock==idbase+1||this.stock==idbase+2){
				var diff=(this.stock-idbase)+(itemId-idbase);

				this.stock = idbase + (diff > 3 ? 3 : diff);
				this.item.frame = this.stock;

				return idbase+(diff > 3 ? diff % 3 : 0);

			}else if(this.stock == itemsId.Sceau){
				this.stock = itemId;
				this.item.frame = this.stock;
				return idbase;
			}
		}
	}
	return itemId;
}
