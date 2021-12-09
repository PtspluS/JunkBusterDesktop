// Tutoriel
var Tuto ={
	id : 0,
	textCursor: 0,
	charCursor: 0,
	next : function(texte){
		if(texte.text.length >= levels[this.id].tutoText[this.textCursor].length){
			texte.text = "";
			this.textCursor++;
			this.groupeimage.callAll('kill');
			if(this.textCursor >= levels[this.id].tutoText.length){
				game.id = this.id;
				this.state.start('Game');
				this.groupeimage.callAll('kill');
				return;
			}
			this.charCursor = 0;
			this.work(texte);

		}
	},
	create : function(){
		this.textCursor = 0;
		this.charCursor = 0;

		// Fond d'ecran
		let fond = Tuto.add.sprite(Tuto.world.centerX, Tuto.world.centerY, 'backgroundtuto');
		fond.anchor.setTo(0.5,0.5);

		var texte = MenuGame.add.text(MenuGame.world.centerX + 80, 160,"",{
			align: "left",
			wordWrap: true,
			wordWrapWidth: 500
		});
		texte.fill = 'white';


		var skipButton = Tuto.add.button(1190,695,'skip',() => {
			game.id = this.id;
			this.state.start('Game');
		},this,1,0,2);
		skipButton.anchor.setTo(0.5,0.5);


		Tuto.input.onDown.add(() => {this.next(texte);}, this);
		if(levels[this.id].tutoGuys[0]==true){
			var martin = Tuto.add.image(400, 510,'martintuto');
			martin.anchor.setTo(0.5,0.5);
			martin.animations.add('vie1', [0,1,2], 5, true);
			martin.animations.play('vie1');
		}
		if(levels[this.id].tutoGuys[1]==true){
			var pe = Tuto.add.image(200, 510+20,'petuto');
			pe.anchor.setTo(0.5,0.5);
			pe.animations.add('vie2', [0,1,2], 5, true);
			pe.animations.play('vie2');
		}
		if(levels[this.id].tutoGuys[2]==true){
			var pierre = Tuto.add.image(300, 510+40,'pierretuto');
			pierre.anchor.setTo(0.5,0.5);
			pierre.animations.add('vie3', [0,1,2], 5, true);
			pierre.animations.play('vie3');
		}
		if(levels[this.id].tutoGuys[3]==true){
			var totti = Tuto.add.image(500, 510+24,'tottituto');
			totti.anchor.setTo(0.5,0.5);
			totti.animations.add('vie4', [0,1,2,3], 5, true);
			totti.animations.play('vie4');
		}
		this.groupeimage=Tuto.add.group()
		this.work(texte);
	},

	work: function(texte){

		var image=levels[this.id].tutoText[this.textCursor].match(/#.#/g);

		Tuto.time.events.repeat(25, levels[this.id].tutoText[this.textCursor].length, () => {
			let character = levels[this.id].tutoText[this.textCursor].charAt(this.charCursor++);
			if(character=='#'){
				this.charCursor+=3;
				texte.text=texte.text.concat("    ".toString());
			}else{texte.text = texte.text.concat(character.toString());}

		}, this);
		let j=0;
		if(image!=null){
			for(let i of image){
				var imagetuto=this.groupeimage.create(MenuGame.world.centerX + 330, MenuGame.world.centerY+(MenuGame.world.centerY*1/3)+j*75,'help');
				j++;
				imagetuto.scale.setTo(1.2,1.2);
				imagetuto.anchor.setTo(0.5,0.5);
				imagetuto.frame=parseInt(i.substr(1,1));
			}}
		}
	}
