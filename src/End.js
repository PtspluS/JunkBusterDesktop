var end = {
    target : 0,
    musicEnd : 0,
    equationResult : 0,//donne le nombre de point que peut raporter un joueur sur la levels[MenuGame.cursorMap] au max
    create : function(){
		this.equationResult = -(game.pollution.pollution-100)/10 * (Math.floor((game.score.score*levels[MenuGame.cursorMap].itemSpeed)/(MenuOpt.nbPlayers*levels[MenuGame.cursorMap].chrono)));//pollution*score par joueur par seconde
		this.target = levels[MenuGame.cursorMap].score;
		if (this.target*0.42==this.equationResult) {this.musicEnd = end.add.audio('easterEgg');}
		else {this.musicEnd = end.add.audio('endMusic');}

		this.musicEnd.play('',0,1,true);

    let info = '';
		if(levels[MenuGame.cursorMap].tips){
		    info = levels[MenuGame.cursorMap].tips; //+'\n'+citations[Math.floor(Math.random()*citations.length)];
		}
		else {
		    info = citations[Math.floor(Math.random()*citations.length)];
		}

		let success = false;
		let successGrade = "";
		if(this.equationResult>=2*this.target && game.pollution.pollution == 0){
			successGrade = 'S';
			success = true;
      MenuGame.cursorMap += 1;
	    }else if(this.equationResult>=1.9*this.target && game.pollution.pollution != 0){
		    successGrade = 'A+';
		    success = true;
		    MenuGame.cursorMap += 1;
		}else if(this.target*2>this.equationResult && this.equationResult>=1.7*this.target){
		    successGrade = 'A';
		    success = true;
		    MenuGame.cursorMap += 1;
		}else if(this.target*1.7>this.equationResult && this.equationResult>=1.5*this.target){
		    successGrade = 'A-';
	  	    success = true;
		    MenuGame.cursorMap += 1;
		}else if(this.target*1.5>this.equationResult && this.equationResult>=1.3*this.target){
		    successGrade = 'B';
		    success = true;
		    MenuGame.cursorMap += 1;
		}else if(this.target*1.3>this.equationResult && this.equationResult>=1.2*this.target){
		    successGrade = 'B-';
		    success = true;
		    MenuGame.cursorMap += 1;
		}else if(this.target*1.2>this.equationResult && this.equationResult>=1.1*this.target){
		    successGrade = 'C+';
		    success = true;
		    MenuGame.cursorMap += 1;
		}else if(this.target*1.1>this.equationResult && this.equationResult>=1*this.target){
		    successGrade = 'C';
		    success = true;
		    MenuGame.cursorMap += 1;
		}else if(this.target*1>this.equationResult && this.equationResult>=0.95*this.target){
		    successGrade = 'C-';
		    success = false;
		}else if(this.target*0.95>this.equationResult && this.equationResult>=0.75*this.target){
		    successGrade ='D';
		    success = false;
		}else if(this.target*0.75>this.equationResult && this.equationResult>=0.5*this.target){
		    successGrade = 'E';
		    success = false;
		}else {
		    successGrade = 'F';
		    success = false;
		}

		// Fond d'ecran
		let fond = end.add.sprite(end.world.centerX, end.world.centerY, ( (success) ? 'backgroundendg' : 'backgroundendb') );
		fond.anchor.setTo(0.5,0.5);

		var tab = Array(99);
		for(let i = 0; i < 99; i++){
		    tab[i] = i;
		}

		//affichage du recap de partie et de la note
		let indication = ['Player : '+MenuOpt.nbPlayers,'Time : '+Math.floor(levels[MenuGame.cursorMap].chrono/60)+':'+levels[MenuGame.cursorMap].chrono%60,'Pollution : '+game.pollution.pollution+' %','Profit : '+game.score.score +'$','Score : '+this.equationResult];//tableau contenant toutes les infos à afficher pour résumer la partie
		let Result = end.add.bitmapText(end.world.width-450, 150,'font', 'Result :', 56);
		let message = end.add.bitmapText(end.world.width-450, 150+Result.height+40*indication.length+100,'fontred','',60);
		let posY = 150+Result.height;
		let iteration = 0;
		end.time.events.repeat(Phaser.Timer.SECOND * 1.5,indication.length+1,()=>{
		    if(iteration < indication.length){
				let txt = end.add.bitmapText(end.world.width-450+Result.width/2,posY+=40,'font',indication[iteration++],30);
				txt.anchor.setTo(0.5,0.5);
		    }else{
				let GradeL = end.add.bitmapText(end.world.width-300, 150+Result.height+40*indication.length+60,'fontred','',60);
				GradeL.anchor.setTo(0.5,0.5);
				GradeL.text = successGrade;
				message.text = (success) ? "SUCCESS" : "FAILURE";
		   }
		},this);
		let Grade = end.add.bitmapText(end.world.width-400, posY+40*indication.length+60,'font','Grade : ',42);
		Grade.anchor.setTo(0.5,0.5);


		let tip = end.add.text(95, 500,info,{
		    align: "left",
		    wordWrap: true,
		    wordWrapWidth: 500
		});
		tip.fill = 'white';

		if(success){
			let next = end.add.button(1225, 690,'next',()=>{
			    if(MenuGame.cursorMap >= levels.length-1){this.state.start('MenuGame');
					Menu.musicMenu.play("",0,0.6,true);
				}else{
				    if(levels[MenuGame.cursorMap].tutoText.length < 1){
						game.id =   MenuGame.cursorMap;
						game.playersskins = MenuGame.playersskins;
						game.nbPlayers = MenuOpt.nbPlayers;
						this.state.start('Game');
				    }else{
						Tuto.id =   MenuGame.cursorMap;
						game.id =  MenuGame.cursorMap;
						game.playersskins = MenuGame.playersskins;
						game.nbPlayers = MenuOpt.nbPlayers;
						this.state.start('Tuto');
				    }
			    }

			    this.musicEnd.stop();
			},this,1,0,2);
			next.anchor.setTo(0.5,0.5);
		}

		let restart = end.add.button(1000,690,'restart',()=>{
			this.state.start('Game');
			this.musicEnd.stop();
		},this,1,0,2);
		restart.anchor.setTo(0.5,0.5);

		let toMenu = end.add.button(775, 690,'menu',()=>{
			this.state.start('MenuGame');
			Menu.musicMenu.play("",0,0.6,true);
			this.musicEnd.stop();
		},this,1,0,2);
		toMenu.anchor.setTo(0.5,0.5);
    },
};
