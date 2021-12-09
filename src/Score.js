MyScore=function(){
this.score=0;
this.scoretext = game.add.bitmapText(0, 0, 'font', 'Profit : '+this.score+'$', 64);

}

MyScore.prototype.updatescore=function(value){
  this.score+=value
  this.scoretext.text ='Profit : '+this.score+'$';

}
