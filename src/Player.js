Player=function(sprite,posx,posy,groupe,itemgroupe){
	// Stockage du spawnpoint
	this.spawnx = posx;
	this.spawny = posy;
	
	this.stun = false;
	//constructeur du player
	this.player = groupe.create(posx, posy,sprite);
	game.physics.arcade.enable(this.player);
	this.player.body.collideWorldBounds = true;
	this.player.enableBody=true;
	// Animations Normales
	this.player.animations.add('down', [1, 2, 3,2], 10, true);
	this.player.animations.add('downright', [5, 6, 7,6], 10, true);
	this.player.animations.add('right', [9,10,11,10], 10, true);
	this.player.animations.add('upright', [13,14,15,14], 10, true);
	this.player.animations.add('up', [17,18,19,18], 10, true);
	this.player.animations.add('upleft', [21,22,23,22], 10, true);
	this.player.animations.add('left', [25, 26, 27,26], 10, true);
	this.player.animations.add('downleft', [29,30,31,30], 10, true);
	// Animations Port
	this.player.animations.add('adown', [33, 34, 35, 34], 10, true);
	this.player.animations.add('adownright', [37, 38, 39, 38], 10, true);
	this.player.animations.add('aright', [41, 42, 43, 42], 10, true);
	this.player.animations.add('aupright', [45, 46, 47, 46], 10, true);
	this.player.animations.add('aup', [49, 50, 51, 50], 10, true);
	this.player.animations.add('aupleft', [53, 54, 55, 54], 10, true);
	this.player.animations.add('aleft', [57, 58, 59, 58], 10, true);
	this.player.animations.add('adownleft', [61, 62, 63, 62], 10, true);

	this.direction=null;
	this.speed=150;
	this.player.body.setSize(40,34,2,32);

	// Port des items
	this.carry = 0;
	this.item = itemgroupe.create(this.player.x - 6, this.player.y - 36, 'items');
	this.item.frame = 0;

	this.dropActive = false;

}
//deplacement du player en diagonale basdroite
Player.prototype.downright=function(){
	this.player.body.velocity.x = (this.speed/2)+20;
	this.player.body.velocity.y = (this.speed/2)+20;
	if(this.carry == 0){
		this.player.animations.play('downright');
	}else{
		this.player.animations.play('adownright');
	}
	this.direction='downright';
}
//deplacement du player en diagonale hautdroite
Player.prototype.upright=function(){
	this.player.body.velocity.x = (this.speed/2)+20;
	this.player.body.velocity.y = -((this.speed/2)+20);
	if(this.carry == 0){
		this.player.animations.play('upright');
	}else{
		this.player.animations.play('aupright');
	}
	this.direction='upright';
}
//deplacement du player en diagonale basgauche
Player.prototype.downleft=function(){
	this.player.body.velocity.x = -((this.speed/2)+20);
	this.player.body.velocity.y = (this.speed/2)+20;
	if(this.carry == 0){
		this.player.animations.play('downleft');
	}else{
		this.player.animations.play('adownleft');
	}
	this.direction='downleft';
}
//deplacement du player en diagonale hautgauche
Player.prototype.upleft=function(){
	this.player.body.velocity.x = -((this.speed/2)+20);
	this.player.body.velocity.y = -((this.speed/2)+20);
	if(this.carry == 0){
		this.player.animations.play('upleft');
	}else{
		this.player.animations.play('aupleft');
	}
	this.direction='upleft';
}
//deplacement du player en bas
Player.prototype.down=function(){
	this.player.body.velocity.y = this.speed;
	if(this.carry == 0){
		this.player.animations.play('down');
	}else{
		this.player.animations.play('adown');
	}
	this.direction='down';
}
//deplacement du player en bas
Player.prototype.up=function(){
	this.player.body.velocity.y = -this.speed;
	if(this.carry == 0){
		this.player.animations.play('up');
	}else{
		this.player.animations.play('aup');
	}
	this.direction='up';
}
//deplacement du player a droite
Player.prototype.right=function(){
	this.player.body.velocity.x = this.speed;
	if(this.carry == 0){
		this.player.animations.play('right');
	}else{
		this.player.animations.play('aright');
	}
	this.direction='right';
}
//deplacement du player a gauche
Player.prototype.left=function(){
	this.player.body.velocity.x = -this.speed;
	if(this.carry == 0){
		this.player.animations.play('left');
	}else{
		this.player.animations.play('aleft');
	}
	this.direction='left';
}
//action du joueur
Player.prototype.wait=function(){
	let port = 0;
	if(this.carry != 0){
		port = 32;
	}
	switch(this.direction){
		case "downright":
		this.player.frame = 4 + port;
		break;
		case "downleft":
		this.player.frame = 28 + port;
		break;
		case "upright":
		this.player.frame = 12 + port;
		break;
		case "upleft":
		this.player.frame = 20 + port;
		break;
		case "up":
		this.player.frame = 16 + port;
		break;
		case "down":
		this.player.frame = 0 + port;
		break;
		case "left":
		this.player.frame = 24 + port;
		break;
		case "right":
		this.player.frame = 8 + port;
		break;
	}
}

Player.prototype.update=function(cursorup,cursordown,cursorleft,cursorright,cursordrop,cursorinteract,platforms,trucks,fumee,otherplayer){
	for(let i = 0; i < otherplayer.length; i++){ // Eviter que les joueurs rentre dans les autres joueurs ou murs
		var hitPlatform = game.physics.arcade.collide(otherplayer[i].player,platforms);
		var hitPlayer = game.physics.arcade.collide(this.player,otherplayer[i].player);
	}
	
	for(let i = 0; i < trucks.children.length; i++){ // Collisions avec les camions
		let hitTruck = game.physics.arcade.collide(this.player,trucks.children[i]);
		if(hitTruck && trucks.children[i].position.y + 128 < this.player.position.y){
			this.stun = true;
			this.player.position.x = this.spawnx;
			this.player.position.y = this.spawny;
			this.player.alpha = 0.2;
			let stuntime = 3000; // Duree de la paralysie
			game.add.tween(this.player).to( { alpha: 1 }, stuntime, Phaser.Easing.Linear.None, true);
			game.time.events.add(stuntime, () => {this.stun = false;} , this);
			
			game.cameraShake(0);
		}
	}
	
	if(game.physics.arcade.collide(this.player,fumee)){
		this.stun = true;
		this.player.position.x = this.spawnx;
		this.player.position.y = this.spawny;
		this.player.alpha = 0.2;
		let stuntime = 4000; // Duree de la paralysie
		game.add.tween(this.player).to( { alpha: 1 }, stuntime, Phaser.Easing.Linear.None, true);
		game.time.events.add(stuntime, () => {this.stun = false;} , this);
		game.cameraShake(0);
	}
	
	this.item.x = this.player.x - 6;
	this.item.y = this.player.y - 36;

	this.player.body.velocity.x = 0;
	this.player.body.velocity.y = 0;
	
	if(!this.stun){
		if (cursorright() && cursordown())
		{
			this.downright();
		}
		else if (cursorright() && cursorup())
		{
			this.upright();
		}
		else if (cursorleft() && cursordown())
		{
			this.downleft();
		}
		else if (cursorleft() && cursorup())
		{
			this.upleft();
		}
		else if (cursordown())
		{
			this.down();
		}
		else if (cursorright())
		{
			this.right();
		}
		else if (cursorup())
		{
			this.up();
		}
		else if (cursorleft())
		{
			this.left();
		}
		else{
			this.wait();
		}

		if(cursordrop() && this.dropActive == false){
			this.drop();
			this.dropActive = true;
		}else if(cursordrop()){
			this.dropActive = true;
		}else {
			this.dropActive = false;
		}

		if(cursorinteract() && this.interactActive == false && this.carry == 0){
			this.interact();
			this.interactActive = true;
		}else if(cursorinteract()){
			this.interactActive = true;
		}else {
			this.interactActive = false;
		}
	}
}

Player.prototype.checkfront=function(){
	var x=0;
	var y=0;

	switch(this.direction){
		case "downright":

		x=1;
		y=1;
		break;
		case "downleft":
		x=-1;
		y=1;
		break;
		case "upright":
		x=1;
		y=-1;
		break;
		case "upleft":
		x=-1;
		y=-1;
		break;
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
		x=+1;
		break;
	}
	if(Math.round(parseInt((this.player.y+32)/64))+y < 0 || Math.round(parseInt((this.player.y+32)/64))+y >= map.length || Math.round(parseInt((this.player.x+22)/64))+x < 0 || Math.round(parseInt((this.player.x+22)/64))+x >= map[0].length){
		return 0;
	}
	return map[Math.round(parseInt((this.player.y+32)/64))+y][Math.round(parseInt((this.player.x+22)/64))+x];

}

Player.prototype.drop=function(){
	let machine= this.checkfront()
	if(machine != 0){
		this.carry = machine.drop(this.carry);
		this.item.frame = this.carry;
	}
}

Player.prototype.interact=function(){
	let machine= this.checkfront()
	if(machine != 0){
		machine.interact();
	}
}
