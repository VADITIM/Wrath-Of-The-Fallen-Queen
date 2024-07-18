class NPC {
	//Definintion der Eigenschaften der Klasse
    constructor({position}) {
        this.position = position;
        this.height = 64;
        this.width = 100;
        this.lastCollisionPositionX = undefined;
		this.damagedPlayer = false;
        this.velocity = {
            x: 0,
            y: 1
        }
        this.moveRight();
		this.frame = 0;
		this.lastFrameTime = new Date().getTime();
		this.maxHealthnpc = 2
		this.Healthnpc = this.maxHealthnpc;
    }
	// Zeichnet den NPC in die Map
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
		//ctx.strokeRect(this.position.x -1, this.position.y -1, this.width, this.height);
    }
	// Methode zum verlieren von Leben des NPC´s
	loseHealthnpc(){ 
		this.Healthnpc--;
		if (this.Healthnpc <= 0) {
			this.position = {
				x: 5000,
				y: 5000
			};
		}
	}
	// Collisions kontrolle mit dem Tileset in der Vertikalen
    collisionCheckY(texture_index, distanceY, distanceX, overlapX, overlapY){
		if (distanceY > 0) {
            this.position.y += overlapY;
		}
		else if(distanceY < 0){
            this.position.y -= overlapY;
        }
        this.velocity.y = 0;
	}
	// Collisions kontrolle mit dem Tileset in der Horizontalen
	collisionCheckX(overlapX, tileCenterX){
        if (overlapX === 0) return;
		if (this.velocity.x > 0){
            this.position.x -= overlapX;
            if (this.position.x !== this.lastCollisionPositionX){
                this.moveLeft()
                this.lastCollisionPositionX = this.position.x;
            }
        }
		else if (this.velocity.x < 0){
            this.position.x += overlapX;
            if (this.position.x !== this.lastCollisionPositionX){
                this.moveRight()
                this.lastCollisionPositionX = this.position.x;
            }
        }
	}
	// Collision mit Blockern im Tile
    checkBlockTiles(texture_index, tileX, tileY){
        if(texture_index >= 0 && texture_index == 99 || texture_index >= 0 && texture_index <= 99){
            // Berechnung des Zentrums vom NPC und Tile
            const playerCenterX = this.position.x + this.width / 2;
            const playerCenterY = this.position.y + this.height / 2;
            const tileCenterX = tileX + tile / 2;
            const tileCenterY = tileY + tile / 2;
            // Berechnung der Entfernung von beiden Zentren
            const distanceX = playerCenterX - tileCenterX;
            const distanceY = playerCenterY - tileCenterY;

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
	// Nächste Position des NPC`s berechnen
    checkCollision(){
        const nextX = this.position.x + this.velocity.x;
        const nextY = this.position.y + this.velocity.y;

        const tileLeftX = nextX - tile;
        const tileRightX = nextX + this.width;
        //Prüft die Tiles der Map auf Kollision
        for(let y = 0; y < map.length; y++){
            for(let x = 0; x < map[0].length; x++){
                const texture_index = map[y][x];
                // Kollision der aktuellen Blocker berechnen
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
	// Prüft die Kollision von NPC und Spieler
	checkCollosionPlayer(player) {
		if (player.position.x < this.position.x + this.width &&
			player.position.x + player.width > this.position.x &&
			player.position.y < this.position.y + this.height &&
			player.position.y + player.height > this.position.y) 
			{
			// Schaden NPC zu SPieler
			if(!this.damagedPlayer){
				this.dealDamageToPlayer();
			}
		}
		else {
			this.damagedPlayer = false;
		}
	}
	// Methode Schaden NPC zu Spieler
	dealDamageToPlayer() {
		this.damagedPlayer = true;
        player.position = {
            x: respawnX, y: respawnY
        };
		player.loseHealth();
	}
    // Methode Bewegung NPC Links
    moveLeft(){
        this.velocity.x = -2;  
    }
	// Methode Bewegung NPC Rechts
    moveRight(){
        this.velocity.x = 2;
    }
	// Aktualisiert die Position des NPC´s
    updatePosition(){
		this.velocity.y += gravity;
		this.position.y += this.velocity.y;
		this.position.x += this.velocity.x;
    }
	// Aktualisiert den NPC
    update(player) {
        this.draw();
        this.checkCollision();
		this.checkCollosionPlayer(player);
        this.updatePosition();
    }
}