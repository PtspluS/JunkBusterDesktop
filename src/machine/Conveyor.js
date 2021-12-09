Conveyor = function(sprite,posx,posy,groupe,itemgroupe,sens){
	this.conveyor = groupe.create(posx,posy,sprite);
	this.stock = 0;
	this.speed= levels[MenuGame.cursorMap].itemSpeed*2.50/MenuOpt.nbPlayers;
	this.sens = sens;
	switch(sens){
		case 'up':
			this.conveyor.animations.add('actif', [ 0, 1, 2, 3], 500/this.speed, true);
			this.frame0 = 0;
			break;
		case 'down':
			this.conveyor.animations.add('actif', [ 4, 5, 6, 7],  500/this.speed, true);
			this.frame0 = 4;
			break;
		case 'right':
			this.conveyor.animations.add('actif', [ 8, 9, 10, 11],  500/this.speed, true);
			this.frame0 = 8;
			break;
		case 'left':
			this.conveyor.animations.add('actif', [ 12, 13, 14, 15],  500/this.speed, true);
			this.frame0 = 12;
			break;
	}
	this.conveyor.play('actif');
	this.item = itemgroupe.create(this.conveyor.position.x + 4, this.conveyor.position.y + 4, 'items');
	this.item.frame = 0;
}

Conveyor.prototype.checkfront = function(){
	// MEME checkfront que player
	var x=0;
    var y=0;

    switch(this.sens){
		case "up":
			y=-1;
			break;
		case "down":
			y=1;
			break;
		case "left":
			x=-1;
			break;
		case "right":
			x=1;
			break;
    }
	if(Math.round(parseInt((this.conveyor.y + 10)/64))+y < 0 || Math.round(parseInt((this.conveyor.y + 10)/64))+y >= map.length || Math.round(parseInt((this.conveyor.x)/64))+x < 0 || Math.round(parseInt((this.conveyor.x)/64))+x >= map[0].length){
		return 0;
	}
	return map[Math.round(parseInt((this.conveyor.y + 10)/64))+y][Math.round(parseInt((this.conveyor.x)/64))+x];
	// FIN checkfront
}

Conveyor.prototype.stabilize = function(incoming){
	switch(incoming){ // ICI LES SENS SONT INVERSES CAR ILS CORRESPONDENT AU SENS DU ROULEAU QUI VIENT DE LEUR ENVOYER ET NON D'OU LES OBJETS VIENNENT
		case 'down':
			if(this.item.position.y != this.conveyor.position.y + 4){
				this.item.position.y += 4;
				game.time.events.add(this.speed, () => {this.stabilize(incoming);} , this);
			}else{
				this.envoie();
			}
			break;
		case 'up':
			if(this.item.position.y != this.conveyor.position.y + 4){
				this.item.position.y -= 4;
				game.time.events.add(this.speed, () => {this.stabilize(incoming);} , this);
			}else{
				this.envoie();
			}
			break;
		case 'left':
			if(this.item.position.x != this.conveyor.position.x + 4){
				this.item.position.x -= 4;
				game.time.events.add(this.speed, () => {this.stabilize(incoming);} , this);
			}else{
				this.envoie();
			}
			break;
		case 'right':
			if(this.item.position.x != this.conveyor.position.x + 4){
				this.item.position.x += 4;
				game.time.events.add(this.speed, () => {this.stabilize(incoming);} , this);
			}else{
				this.envoie();
			}
			break;
	}
}

Conveyor.prototype.recup = function(itemId,incoming){
	switch(incoming){ // ICI LES SENS SONT INVERSES CAR ILS CORRESPONDENT AU SENS DU ROULEAU QUI VIENT DE LEUR ENVOYER ET NON D'OU LES OBJETS VIENNENT
		case 'down':
			this.item.position.x = this.conveyor.position.x + 4;
			this.item.position.y = this.conveyor.position.y + 4 - 32;
			this.stabilize(incoming);
			break;
		case 'up':
			this.item.position.x = this.conveyor.position.x + 4;
			this.item.position.y = this.conveyor.position.y + 4 + 32;
			this.stabilize(incoming);
			break;
		case 'left':
			this.item.position.x = this.conveyor.position.x + 4 + 32;
			this.item.position.y = this.conveyor.position.y + 4;
			this.stabilize(incoming);
			break;
		case 'right':
			this.item.position.x = this.conveyor.position.x + 4 - 32;
			this.item.position.y = this.conveyor.position.y + 4;
			this.stabilize(incoming);
			break;
	}
	this.stock = itemId;
	this.item.frame = itemId;
}

Conveyor.prototype.envoie = function(){
	var infront = this.checkfront();
	switch(this.sens){
		case 'up':
			if(this.item.position.y != this.conveyor.position.y + 4 - 32 && infront.stock == 0 && this.stock != 0){
				this.item.position.y -= 4;
				game.time.events.add(this.speed, () => {this.envoie();} , this);
			}else if(infront.stock != 0 && this.stock != 0){
				game.time.events.add(this.speed, () => {this.envoie();} , this);
			}else if(this.stock != 0){
				if(infront.recup != undefined){
					infront.recup(this.stock, this.sens);
				}else{
					infront.drop(this.stock);
				}
				this.stock = 0;
				this.item.frame = 0;
			}else if(this.stock == 0){
				this.item.position.x = this.conveyor.position.x + 4;
				this.item.position.y = this.conveyor.position.y + 4;
			}
			break;
		case 'down':
			if(this.item.position.y != this.conveyor.position.y + 4 + 32 && infront.stock == 0 && this.stock != 0){
				this.item.position.y += 4;
				game.time.events.add(this.speed, () => {this.envoie();} , this);
			}else if(infront.stock != 0 && this.stock != 0){
				game.time.events.add(this.speed, () => {this.envoie();} , this);
			}else if(this.stock != 0){
				if(infront.recup != undefined){
					infront.recup(this.stock, this.sens);
				}else{
					infront.drop(this.stock);
				}
				this.stock = 0;
				this.item.frame = 0;
			}else if(this.stock == 0){
				this.item.position.x = this.conveyor.position.x + 4;
				this.item.position.y = this.conveyor.position.y + 4;
			}
			break;
		case 'right':
			if(this.item.position.x != this.conveyor.position.x + 4 + 32 && infront.stock == 0 && this.stock != 0){
				this.item.position.x += 4;
				game.time.events.add(this.speed, () => {this.envoie();} , this);
			}else if(infront.stock != 0 && this.stock != 0){
				game.time.events.add(this.speed, () => {this.envoie();} , this);
			}else if(this.stock != 0){
				if(infront.recup != undefined){
					infront.recup(this.stock, this.sens);
				}else{
					infront.drop(this.stock);
				}
				this.stock = 0;
				this.item.frame = 0;
			}else if(this.stock == 0){
				this.item.position.x = this.conveyor.position.x + 4;
				this.item.position.y = this.conveyor.position.y + 4;
			}
			break;
		case 'left':
			if(this.item.position.x != this.conveyor.position.x + 4 - 32 && infront.stock == 0 && this.stock != 0){
				this.item.position.x -= 4;
				game.time.events.add(this.speed, () => {this.envoie();} , this);
			}else if(infront.stock != 0 && this.stock != 0){
				game.time.events.add(this.speed, () => {this.envoie();} , this);
			}else if(this.stock != 0){
				if(infront.recup != undefined){
					infront.recup(this.stock, this.sens);
				}else{
					infront.drop(this.stock);
				}
				this.stock = 0;
				this.item.frame = 0;
			}else if(this.stock == 0){
				this.item.position.x = this.conveyor.position.x + 4;
				this.item.position.y = this.conveyor.position.y + 4;
			}
			break;
	}
}

Conveyor.prototype.interact = function(){
	return;
}

Conveyor.prototype.drop = function(itemId){
	if(this.stock != 0 && itemId != 0){
		return this.vider(itemId);
	}
	else if(this.stock != 0 && itemId == 0){
		let tmp = this.stock;
		this.stock = 0;
		this.item.frame = 0;
		this.item.position.x = this.conveyor.position.x + 4;
		this.item.position.y = this.conveyor.position.y + 4;
		return tmp;
	}else if(this.stock == 0 && itemId != 0){
		this.stock = itemId;
		this.item.frame = itemId;
		this.item.position.x = this.conveyor.position.x + 4;
		this.item.position.y = this.conveyor.position.y + 4;
		this.envoie();
		return 0;
	}
	// En cas de possible erreur, on retourne l'objet passe en argument
	return itemId;
}

Conveyor.prototype.vider=function(itemId){
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
