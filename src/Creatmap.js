 Creatmap= function(level){
	
	var matrice = level.matrice;

	var map = Array(matrice.length);
	for(let i = 0; i < matrice.length; i++){
	  map[i] = Array(matrice[0].length);
	}
	
	game.pollution = [];
	var processDeconta = new Decontamination();

	// Groupes de sprites
	platformsSolid = game.add.group();
	platformsSolid.enableBody = true;
	truckGroup=game.add.group();
	truckGroup.enableBody = true;
	object=game.add.group();
	object.enableBody = true;
	itemGui=game.add.group();
	itemGui.enableBody = true;
	smokeGroup=game.add.group();
	smokeGroup.enableBody = true;

	// Generation de la map
	for(let j = 0; j < matrice.length; j++){
	  for(let i = 0; i < matrice[0].length; i++){
		if(map[j][i] == undefined){ // Si rien n'est encore present a l'emplacement [j][i] de map
		  switch(matrice[j][i]){
		  case -1:
			let herbe;
			switch(Math.floor(Math.random() * 15)){
				case 0:
					herbe = platformsSolid.create(i*64, j*64, 'grass');
					herbe.body.immovable = true;
					let puddle = object.create(i*64, j*64, 'puddle');
					puddle.frame = Math.floor(level.pollution / 10);
					game.pollution.push(puddle);
					break;
				case 1:
					herbe = platformsSolid.create(i*64, j*64, 'grass');
					herbe.body.immovable = true;
					let flower = object.create(i*64, j*64, 'flower');
					flower.frame = Math.floor(level.pollution / 10);
					game.pollution.push(flower);
					break;
				case 2:
					herbe = platformsSolid.create(i*64, j*64, 'grass');
					herbe.body.immovable = true;
					let tree = object.create(i*64, j*64 - 40, 'tree');
					tree.frame = Math.floor(level.pollution / 10);
					game.pollution.push(tree);
					break;
				case 3:
					herbe = platformsSolid.create(i*64, j*64, 'grass');
					herbe.body.immovable = true;
					let fox = object.create(i*64, j*64, 'fox');
					fox.frame = Math.floor(level.pollution / 10);
					game.pollution.push(fox);
					break;
				default:
					herbe = game.add.sprite(i*64, j*64, 'grass');
					break;
			}
			herbe.frame = Math.floor(level.pollution / 10);
			game.pollution.push(herbe);
			map[j][i] = 0;
			break;
		  case 0: // SOL
			game.add.sprite(i*64, j*64, 'ground');
			map[j][i] = 0;
		  break;

		  case 1:{ // FOUR
			let tuile = platformsSolid.create(i*64, j*64, 'ground');
			tuile.body.immovable = true;
			map[j][i] = new Oven('oven',i*64,j*64 - (94-64),object,itemGui);
		  break;}

		  case 2: {// TABLE
			let tuile=platformsSolid.create(i*64, j*64, 'ground');
			tuile.body.immovable = true;
			map[j][i] = new Table('table', i*64, j*64 - (84-64),object,itemGui);
			break;}

		case 3: {// MUR
			let tuile = platformsSolid.create(i*64, j*64, 'ground');
			tuile.body.immovable = true;
			map[j][i] = 0;
			let wall = object.create(i*64, j*64 - (74-64), 'wall');
			// Generation du mur
			let left = true;
			let right = true;
			let down = true;
			if(j == matrice.length - 1){ // Bas
			  down = false;
			}else if(matrice[j+1][i] != 3 && matrice[j+1][i] != 4 && matrice[j+1][i] != 29){
			  down = false;
			}
			if(i == 0){ // Gauche
			  left = false;
			}else if(matrice[j][i-1] != 3 && matrice[j][i-1] != 4 && matrice[j][i-1] != 29 && matrice[j][i-1] != 31){
			  left = false;
			}
			if(i == matrice[0].length - 1){ // Droite
			  right = false;
			}else if(matrice[j][i+1] != 3 && matrice[j][i+1] != 4 && matrice[j][i+1] != 29 && matrice[j][i+1] != 31){
			  right = false;
			}

			if(left && right && down){ // Selection de la bonne frame
			  wall.frame = 4;
			}else if(!left && right && down){
			  wall.frame = 5;
			}else if(left && !right && down){
			  wall.frame = 3;
			}else if(left && right && !down){
			  wall.frame = 6;
			}else if(!left && !right && down){
			  wall.frame = 7;
			}else if(!left && right && !down){
			  wall.frame = 1;
			}else if(left && !right && !down){
			  wall.frame = 2;
			}else{
			  wall.frame = 0;
			}
		  break;}

		case 4 :{ // MUR POSTERS
			let tuile = platformsSolid.create(i*64, j*64, 'ground');
			tuile.body.immovable = true;
			map[j][i] = 0;
			let wall = object.create(i*64, j*64 - (74-64), 'wallposters');
			wall.frame = Math.floor(Math.random() * 12);
		  break;}


		  case 5: {// BROYEUR
			let tuile = platformsSolid.create(i*64, j*64, 'ground');
			tuile.body.immovable = true;
			map[j][i] = new Broyeur('broyeur',i*64,j*64 - (74-64),object,itemGui);
		  break;}

		  case 6:{ // COMPRESSEUR
			let tuile = platformsSolid.create(i*64, j*64, 'ground')
			let tuile2 = platformsSolid.create((i+1)*64, j*64, 'ground');
			tuile.body.immovable = true;
			tuile2.body.immovable = true;
			map[j][i] = new Compresseur('compresseur',i*64,j*64,object,itemGui);
			map[j][i+1] = map[j][i];
			break;}

			case 7:{ // ETABLI
			let tuile = platformsSolid.create(i*64, j*64, 'ground')
			let tuile2 = platformsSolid.create((i+1)*64, j*64, 'ground');
			let tuile3 = platformsSolid.create((i+2)*64, j*64, 'ground');
			tuile.body.immovable = true;
			tuile2.body.immovable = true;
			tuile3.body.immovable = true;
			map[j][i] = new Etabli('etabli',i*64,j*64 - (96-64),level.items,object,itemGui);;
			map[j][i+1] = map[j][i].table2;
			map[j][i+2] = map[j][i].table3;
			break;}

		  case 8: {// PRESSE
			let tuile = platformsSolid.create(i*64, j*64, 'ground');
			tuile.body.immovable = true;
			map[j][i] = new Presse('presse',i*64,j*64 - (108-64),object,itemGui);
		    break;}

		  case 9:{ // BASSINE
			let tuile = platformsSolid.create(i*64, j*64, 'ground');
			tuile.body.immovable = true;
			map[j][i] = new Bassine('bassine',i*64,j*64 - (82-64),object,itemGui);
			break;}

		  case 10: {// ROULEAU HAUT
			let tuile = platformsSolid.create(i*64, j*64, 'ground');
			tuile.body.immovable = true;
			map[j][i] = new Conveyor('conveyor',i*64,j*64 - (74-64),object,itemGui,'up');
			break;}

		  case 11:{ // ROULEAU BAS
			let tuile = platformsSolid.create(i*64, j*64, 'ground');
			tuile.body.immovable = true;
			map[j][i] = new Conveyor('conveyor',i*64,j*64 - (74-64),object,itemGui,'down');
			break;}

			case 12:{ // ROULEAU DROITE
			let tuile = platformsSolid.create(i*64, j*64, 'ground');
			tuile.body.immovable = true;
			map[j][i] = new Conveyor('conveyor',i*64,j*64 - (74-64),object,itemGui,'right');
			break;}

			case 13: {// ROULEAU GAUCHE
			let tuile = platformsSolid.create(i*64, j*64, 'ground');
			tuile.body.immovable = true;
			map[j][i] = new Conveyor('conveyor',i*64,j*64 - (74-64),object,itemGui,'left');
			break;}

			case 14:{ // INCINERATEUR
			let tuile = platformsSolid.create(i*64, j*64, 'ground');
			tuile.body.immovable = true;
			map[j][i] = new Incinerateur('incinerateur',i*64,j*64,object);
			break;}

		  case 15: {// ARRIVE
			let tuile = platformsSolid.create(i*64, j*64, 'ground');
			tuile.body.immovable = true;
			map[j][i] = new Arrive('arrive',i*64,j*64 - (90-64),object, level.items, level.itemsTime-((MenuOpt.nbPlayers-2)*1000), level.itemsPattern);
			break;}

	      case 16:{ // BENNE VERRE
			let tuile = platformsSolid.create(i*64, j*64, 'ground');
			tuile.body.immovable = true;
			map[j][i] = new Benne('benneverre',i*64,j*64 - (84-64),object,'verre');
			break;}

			case 17: {// BENNE METAL
			let tuile = platformsSolid.create(i*64, j*64, 'ground');
			tuile.body.immovable = true;
			map[j][i] = new Benne('bennemetal',i*64,j*64 - (84-64),object,'metal');
			break;}

		  case 18 :{ // BENNE PLASTIQUE
			let tuile = platformsSolid.create(i*64, j*64, 'ground');
			tuile.body.immovable = true;
			map[j][i] = new Benne('benneplastique',i*64,j*64 - (84-64),object,'plastique');
			break;}

			case 19: {// BENNE PNEU
			let tuile = platformsSolid.create(i*64, j*64, 'ground');
			tuile.body.immovable = true;
			map[j][i] = new Benne('bennepneu',i*64,j*64 - (84-64),object,'pneu');
			break;}

			case 20: {// BENNE CARTON
			let tuile = platformsSolid.create(i*64, j*64, 'ground');
			tuile.body.immovable = true;
			map[j][i] = new Benne('bennecarton',i*64,j*64 - (84-64),object,'carton');
			break;}

			case 21:{ // SOUFFLERIE
			let tuile = platformsSolid.create(i*64, j*64, 'ground');
			tuile.body.immovable = true;
			map[j][i] = new Soufflerie('soufflerie',i*64,j*64 - (90-64),object,itemGui);
			break;}

			case 22:{ // CAMION ET ROUTE // TOUJOURS EN PREMIERE LIGNE DE MATRICE!!!
			let barrieres = [];
			for(let y = 0; y < matrice.length; y++){
				if(matrice[y][i] == 23 || matrice[y][i+1] == 23){ // 23 sur l'une des deux cases pour mettre une barriere
					let tuile = platformsSolid.create(i*64, y*64, 'route');
					tuile.body.immovable = true;
					let barre = object.create(i*64, y*64 - 30, 'barriere');
					barrieres.push(barre);
				}else{
					game.add.sprite(i*64, y*64, 'route');
				}
				map[y][i] = 0;
				map[y][i+1] = 0;
			}
			map[0][i] = new Camion('truck',i*64,truckGroup, barrieres);
			break;}
			
			case 24:{ // CAISSE
			let tuile = platformsSolid.create(i*64, j*64, 'ground');
			tuile.body.immovable = true;
			object.create(i*64, j*64 - 20, 'crate');
			map[j][i] = 0;
			break;}
			
			case 25:{ // BARILS // CASE A GAUCHE
			let tuile = platformsSolid.create(i*64, j*64, 'ground');
			tuile.body.immovable = true;
			object.create(i*64, j*64 - 20, 'barrel');
			map[j][i] = 0;
			if(i < matrice[j].length - 1){
				map[j][i+1] = 0;
				let tuile2 = platformsSolid.create((i+1)*64, j*64, 'ground');
				tuile2.body.immovable = true;
			}
			break;}
			
			case 26:{ // TUYAU // CASE DU HAUT
			let tuile = platformsSolid.create(i*64, j*64, 'ground');
			tuile.body.immovable = true;
			object.create(i*64, j*64 - 42, 'pipe');
			map[j][i] = 0;
			if(j < matrice.length - 1){
				map[j+1][i] = 0;
				let tuile2 = platformsSolid.create(i*64, (j+1)*64, 'ground');
				tuile2.body.immovable = true;
			}
			break;}
			
			case 27:{ // DECONTAMINATION BENNE
				let tuile = platformsSolid.create(i*64, j*64, 'ground');
				tuile.body.immovable = true;
				map[j][i] = new Benne('decontabarrils',i*64,j*64 - (74-64),object,'nucleaire');
			break;}
			
			case 28:{ // DECONTAMINATION SOL
				processDeconta.sols.push(game.add.sprite(i*64, j*64, 'decontasol'));
				map[j][i] = 0;
			break;}
			
			case 29:{ // DECONTAMINATION BOUTON
				let tuile = platformsSolid.create(i*64, j*64, 'ground');
				tuile.body.immovable = true;
				map[j][i] = new DecontaminationBouton('decontabouton', i*64, j*64 - (74 - 64), object, processDeconta, smokeGroup);
			break;}
			
			case 30:{ // DECONTAMINATION TABLE
				let tuile=platformsSolid.create(i*64, j*64, 'decontasol');
				tuile.body.immovable = true;
				processDeconta.sols.push(tuile);
				let table = new Table('decontatable', i*64, j*64 - (84-64), object, itemGui);
				processDeconta.tables.push(table);
				map[j][i] = table;
			break;}
			
			case 31:{ // DECONTAMINATION SAS
				game.add.sprite(i*64, j*64, 'ground');
				let porte = new DecontaminationSAS('decontasas', i*64, j*64 - 6, object, platformsSolid);
				processDeconta.sas.push(porte);
				map[j][i] = 0;
			break;}
			
			case 32:{ // DECONTAMINATION DECONTAMINATEUR
				let tuile=platformsSolid.create(i*64, j*64, 'ground');
				tuile.body.immovable = true;
				let decontaminateur = new DecontaminationDecontaminateur('decontaminateur', i*64, j*64 - (96 - 64), object, itemGui);
				processDeconta.decontaminateurs.push(decontaminateur);
				map[j][i] = decontaminateur;
			break;}
			
			default:
			game.add.sprite(i*64, j*64, 'ground');
			map[j][i] = 0;
		    break;
		  }
		}
	  }}
    for(let i =0;i<level.seauSpawnpoints.length;i++){
      map[level.seauSpawnpoints[i][1]][level.seauSpawnpoints[i][0]].drop(itemsId.Sceau);
    }

	game.world.bringToTop(platformsSolid);
	game.world.bringToTop(truckGroup);
	game.world.bringToTop(object);
	game.world.bringToTop(itemGui);
	game.world.bringToTop(smokeGroup);

	  return map;
  }
