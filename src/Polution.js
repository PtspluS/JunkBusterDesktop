PollutionObject = function(taux, envirronement){
  this.pollution = taux;
  this.pollutionText = game.add.bitmapText(game.world.centerX-100,0,'font','Pollution : ' + this.pollution + '%',64);
  this.envirronement = envirronement;
}

PollutionObject.prototype.updatePollution = function(val){
    this.pollution += val;
	if(this.pollution > 70){
		this.pollutionText.font ='fontred';
	}
	if(this.pollution < 100){
		for(let i = 0; i < this.envirronement.length; i++){
			this.envirronement[i].frame = Math.floor(this.pollution / 10);
		}
	}
	this.pollutionText.text = 'Pollution : ' + this.pollution + '%';
}
