class NPC {
    height = 64;
    width = 100;
    lastCollisionPositionX = undefined;
	damagedPlayer = false;
    velocity = {
        x: 0,
        y: 1
    }
    frame = 0;
    lastFrameTime = new Date().getTime();
	maxHealthnpc = 2
	Healthnpc = this.maxHealthnpc;
    constructor({position}) {
        this.position = position;
        this.moveRight();
        
    }

    draw() {
		if(new Date().getTime() > this.lastFrameTime + 98){
            this.frame++;
            if(this.velocity.x === 0){

                this.frame = 0;
            } else if(this.velocity.x < 0){
                this.direction = -1;
            }else {
                this.direction = 1;
            }
			
			if(this.frame >7) this.frame = 0;
            this.lastFrameTime = new Date().getTime();
        }
		 let row = 0;
        switch (this.direction) {
            case -1:
                row = 1;
                break;
            case 0:
                row = 1;
                break;
            case 1:
                row = 0;
                break;
        }
		ctx.drawImage(npcspritesheet, 25+this.frame*(npcspritesheet.width/8),10+row*(npcspritesheet.height/2),100,64, this.position.x, this.position.y, 100,64);
    }
	
	loseHealthnpc(){ 
		this.Healthnpc--;
		if (this.Healthnpc <= 0) {
		// ausgabe NPC tot
			console.log("npc ist Tot");
			this.position = {
				x: 5000,
				y: 5000
			};
		}
	}
	
    collisionCheckY(texture_index, distanceY, distanceX, overlapX, overlapY){
		if (distanceY > 0) { // Wenn Kollision oben =>
            // Spieler nach unten positionieren
            this.position.y += overlapY;
		}
		else if(distanceY < 0){ // Wenn Kollision oben =>
            //  Spieler nach unten positionieren
            this.position.y -= overlapY;
        }
        // Stoppt die vertikale Geschwindigkeit
        this.velocity.y = 0;
	}

	collisionCheckX(overlapX, tileCenterX){
        if (overlapX === 0) return;
		if (this.velocity.x > 0){   // Wenn Kollision rechts =>
            this.position.x -= overlapX;
            if(this.position.x !== this.lastCollisionPositionX){
                this.moveLeft()
                this.lastCollisionPositionX = this.position.x;
            }
        }
		else if (this.velocity.x < 0){    // Wenn Kollision links =>
            this.position.x += overlapX;
            if(this.position.x !== this.lastCollisionPositionX){
                this.moveRight()
                this.lastCollisionPositionX = this.position.x;
            }
        }
	}

    checkBlockTiles(texture_index, tileX, tileY){
		// Prüfen ob der Spieler mit einem Blocker kollidiert
        if(texture_index >= 0 && texture_index <= 9){
            // Berechnung des Zentrums vom Spieler und Tile
            const playerCenterX = this.position.x + this.width / 2;
            const playerCenterY = this.position.y + this.height / 2;
            const tileCenterX = tileX + tile / 2;
            const tileCenterY = tileY + tile / 2;

            // Berechnung der Entfernung von beiden Zentren
            const distanceX = playerCenterX - tileCenterX;
            const distanceY = playerCenterY - tileCenterY;

            // Berechnung der kombinierten halfHeight und -width
            const combinedHalfWidths = this.width / 2 + tile / 2;
            const combinedHalfHeights = this.height / 2 + tile / 2;

            // Prüfe nach Überlappung mit NPC und Tile
            if(Math.abs(distanceX) < combinedHalfWidths + 1 && Math.abs(distanceY) < combinedHalfHeights + 1){
                this.hasCollided = true;

                const overlapX = combinedHalfWidths - Math.abs(distanceX);
                const overlapY = combinedHalfHeights - Math.abs(distanceY);

                // Überlappung zurücksetzen nach Richtung der Kollision
                if(overlapX >= overlapY) {
                    this.collisionCheckY(texture_index, distanceY, distanceX, overlapX, overlapY);
                }
				else {
                    this.collisionCheckX(overlapX, tileCenterX);
                }
            }
        }
	}

    checkCollision(){
        // Nächste Position des Spielers berechnen
        const nextX = this.position.x + this.velocity.x;
        const nextY = this.position.y + this.velocity.y;

        const tileLeftX = nextX - tile;
        const tileRightX = nextX + this.width;
        // Durch die Tiles der Map gehen um nach Kollisionen zu prüfen
        for(let y = 0; y < map.length; y++){
            for(let x = 0; x < map[0].length; x++){
                const texture_index = map[y][x];
                // Collision der aktuellen Blocker berechnen
                const tileX = x * tile;
                const tileY = y * tile;
                const tileRight = tileX + tile;
                const tileBottom = tileY + tile;
                
                if(nextX < tileRight &&
					nextX + this.width > tileX &&
					nextY < tileBottom &&
					nextY + this.height > tileY){
						this.checkBlockTiles(texture_index, tileX, tileY);
                }
            }
        }
    }

	//Schaden NPC zu Spieler
	checkCollosionPlayer(player) {
		if (player.position.x < this.position.x + this.width &&
			player.position.x + player.width > this.position.x &&
			player.position.y < this.position.y + this.height &&
			player.position.y + player.height > this.position.y) {
			if(!this.damagedPlayer){
				this.dealDamageToPlayer();
			}
		
		}
		else {
			this.damagedPlayer = false;
		}
	}

	dealDamageToPlayer() {
		//console.log("Spieler nimmt Schaden");
		this.damagedPlayer = true;
		player.respawn();

		player.loseHealth();
	}

    // Methoden für automovement
    moveLeft(){
        this.velocity.x = -2;  
    }
    moveRight(){
        this.velocity.x = 2;
    }

    updatePosition(){
		this.velocity.y += gravity;
		this.position.y += this.velocity.y;
		this.position.x += this.velocity.x;
    }

    update(player) {
        this.draw();
        this.checkCollision();
		this.checkCollosionPlayer(player);
        this.updatePosition();
    }
}