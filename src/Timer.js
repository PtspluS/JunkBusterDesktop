MyTimer=function(duration){
  this.timemax=duration;
  this.valuetime=0;
  this.timer = game.time.create(false);//timer
  this.timer.loop(1000,()=>{this.valuetime++;}, this);
  this.timer.start();
  this.timertext = game.add.bitmapText(21*64, 0, 'font', 'Temps '+(this.timemax/60)+':'+(this.timemax%60), 64);

  this.timertext.anchor.x=1;


}

MyTimer.prototype.updatetimer=function(){
  if(this.valuetime>this.timemax-30){
    this.timertext.font ='fontred';

  }

  this.timertext.text ='Time '+(Math.floor((this.timemax-this.valuetime)/60))+':'+((this.timemax-this.valuetime)%60);

}
