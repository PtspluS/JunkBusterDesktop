Decontamination = function(){
	this.sas = [];
	this.decontaminateurs = [];
	this.tables = [];
	this.sols = [];
}

// ====== SAS ======

DecontaminationSAS = function(sprite, posx, posy, groupe, solide){
	this.sas = groupe.create(posx, posy, sprite);
	this.sas.animations.add('ferme', [8,7,6,5,4,3,2,1,0], 4, false);
	this.sas.animations.add('ouvre', [0,1,2,3,4,5,6,7,8], 4, false);
	this.sas.frame = 8;
	
	this.solidGroup = solide; // Groupe du sol quand ferme
	this.tuile = null;
	this.posx = posx;
	this.posy = posy + 6;
}

DecontaminationSAS.prototype.ferme = function(){
	this.sas.play('ferme');
	
	this.tuile = this.solidGroup.create(this.posx, this.posy, 'ground');
	this.tuile.body.immovable = true;
}

DecontaminationSAS.prototype.ouvre = function(){
	this.sas.play('ouvre');
	
	this.tuile.destroy();
}

// ====== DECONTAMINATEUR ======

DecontaminationDecontaminateur = function(sprite, posx, posy, groupe, itemGroup){
	this.decontaminateur = groupe.create(posx, posy, sprite);
	this.decontaminateur.animations.add('actif', [1,2,3,4], 4, true);
	this.decontaminateur.animations.add('fin', [5,6,7], 3, false);
	this.decontaminateur.frame = 0;
	
	this.stock = 0;
	this.work = false;
	
	this.item = itemGroup.create(this.decontaminateur.x + 18, this.decontaminateur.y + 60, 'itemsbubbles');
	this.item.frame = 0;
}

DecontaminationDecontaminateur.prototype.interact = function(){
	return;
}

DecontaminationDecontaminateur.prototype.drop = function(itemId){
	if(itemId == 0 && this.stock != 0 && this.work == false){
		this.decontaminateur.frame = 0;
		this.item.frame = 0;
		let tmp = this.stock;
		this.stock = 0;
		return tmp;
	}
	return itemId;
}

// ====== BOUTON ======

DecontaminationBouton = function(sprite, posx, posy, groupe, processusDecontamination, smoke){
	this.bouton = groupe.create(posx, posy, sprite);
	this.bouton.animations.add('actif', [1, 2], 5, true);
	this.bouton.frame = 0;
	this.work = false;
	this.groupeFumee = smoke;
	
	this.decontatime = 5000;
	
	this.deconta = processusDecontamination;
}

DecontaminationBouton.prototype.interact = function(){ 
	let pret = true;
	for(let i = 0; i < this.deconta.decontaminateurs.length; i++){
		if(this.deconta.decontaminateurs[i].stock != 0) pret = false;
	}
	
	// Si les decontaminateurs sont vides, nous avons des dechets radioactifs et la decontamination n'est pas en marche
	if(pret == true && this.work == false){
		this.work = true;
		this.bouton.play('actif');
		// On ferme les sas
		for(let i = 0; i < this.deconta.sas.length; i++){
			this.deconta.sas[i].ferme();
		}
		// On demarre les decontaminateurs
		for(let i = 0; i < this.deconta.decontaminateurs.length; i++){
			this.deconta.decontaminateurs[i].decontaminateur.play('actif');
			this.deconta.decontaminateurs[i].work = true;
		}
		// On lance la fumee
		for(let i = 0; i < this.deconta.sols.length; i++){
			let smoke = this.groupeFumee.create(this.deconta.sols[i].position.x, this.deconta.sols[i].position.y - 14, 'decontafumee');
			game.add.tween(smoke).to( { alpha: 0 }, this.decontatime, Phaser.Easing.Linear.None, true);
			smoke.body.immovable = true;
			game.time.events.add(this.decontatime, () => {smoke.destroy();},this);
		}
		game.time.events.add(this.decontatime, () => {
			this.bouton.frame = 0;
			// On ouvre les sas
			for(let i = 0; i < this.deconta.sas.length; i++){
				this.deconta.sas[i].ouvre();
			}
			// On arrete les decontaminateurs
			for(let i = 0; i < this.deconta.decontaminateurs.length; i++){
				this.deconta.decontaminateurs[i].decontaminateur.play('fin');
				game.time.events.add(1000, () => { // Afin d'attendre que l'animation se termine
					this.deconta.decontaminateurs[i].item.frame = itemsId.Nucleaire;
					this.deconta.decontaminateurs[i].stock = itemsId.Nucleaire;
					this.deconta.decontaminateurs[i].work = false;
				}, this);
			}
			
			// On decontamine les objets
			for(let i = 0; i < this.deconta.tables.length; i++){
				switch(this.deconta.tables[i].stock){
					case itemsId.RadCarton:
						this.deconta.tables[i].drop(0);
						this.deconta.tables[i].drop(itemsId.Carton);
						break;
					case itemsId.RadPlastique:
						this.deconta.tables[i].drop(0);
						this.deconta.tables[i].drop(itemsId.Plastique);
						break;
					case itemsId.RadMetal:
						this.deconta.tables[i].drop(0);
						this.deconta.tables[i].drop(itemsId.Metal);
						break;
					case itemsId.RadVerre:
						this.deconta.tables[i].drop(0);
						this.deconta.tables[i].drop(itemsId.Verre);
						break;
					case itemsId.RadPneu:
						this.deconta.tables[i].drop(0);
						this.deconta.tables[i].drop(itemsId.Pneu);
						break;
					case itemsId.RadPoubelle:
						this.deconta.tables[i].drop(0);
						this.deconta.tables[i].drop(itemsId.Poubelle);
						break;
				}
			}
			
			// Travail termine
			this.work = false;
		} , this);
	}
}

DecontaminationBouton.prototype.drop = function(itemId){
	return itemId;
}