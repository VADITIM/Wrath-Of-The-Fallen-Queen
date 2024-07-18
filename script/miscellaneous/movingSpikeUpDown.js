class movingSpikeUpDown  {
    constructor( {position})  {
        this.position = position;
        this.height = 30;
        this.width = 30;
        this.lastCollisionPositionY = undefined;
		this.damagedPlayer = false;
        this.velocity =  {
            x: 0,
            y: 0
        }
        this.moveDown();
    }

    draw()  {
        ctx.fillStyle = '#ff00ff';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    collisionCheckY(texture_index, distanceY, distanceX, overlapX, overlapY) {
        if (overlapY === 0) return;
		if (this.velocity.y > 0) {
            this.position.y -= overlapY;    
            if(this.position.y !== this.lastCollisionPositionY) {
                this.moveUp()
                this.lastCollisionPositionY = this.position.y;
            }
        } else if (this.velocity.y < 0) {   
            this.position.y += overlapY;
            if(this.position.y !== this.lastCollisionPositionY) {
                this.moveDown()
                this.lastCollisionPositionY = this.position.y;
            }
        }
	}

	collisionCheckX(overlapX, tileCenterX) {
        if (overlapX === 0) return;
		if (this.velocity.x > 0) {
            this.position.x -= overlapX;
            if(this.position.x !== this.lastCollisionPositionY) {
                this.moveUp()
                this.lastCollisionPositionY = this.position.x;
            }
        } else if (this.velocity.x < 0) {   
            this.position.x += overlapX;
            if(this.position.x !== this.lastCollisionPositionY) {
                this.moveDown()
                this.lastCollisionPositionY = this.position.x;
            }
        }
	}

    checkBlockTiles(texture_index, tileX, tileY) {
        if(texture_index >= 0 && texture_index <= 9) {
        // if(texture_index >= 0 && texture_index == 99) {
            const playerCenterX = this.position.x + this.width / 2;
            const playerCenterY = this.position.y + this.height / 2;
            const tileCenterX = tileX + tile / 2;
            const tileCenterY = tileY + tile / 2;

            const distanceX = playerCenterX - tileCenterX;
            const distanceY = playerCenterY - tileCenterY;

            const combinedHalfWidths = this.width / 2 + tile / 2;
            const combinedHalfHeights = this.height / 2 + tile / 2;

            if(Math.abs(distanceX) < combinedHalfWidths + 1 && Math.abs(distanceY) < combinedHalfHeights + 1) {
                this.hasCollided = true;

                const overlapX = combinedHalfWidths - Math.abs(distanceX);
                const overlapY = combinedHalfHeights - Math.abs(distanceY);

                if(overlapX >= overlapY)  {
                    this.collisionCheckY(texture_index, distanceY, distanceX, overlapX, overlapY);
                } else  {
                    this.collisionCheckX(overlapX, tileCenterX);
                }
            }
        }
	}

    checkCollision() {
        const nextX = this.position.x + this.velocity.x;
        const nextY = this.position.y + this.velocity.y;

        const tileLeftX = nextX - tile;
        const tileRightX = nextX + this.width;
        for(let y = 0; y < map.length; y++) {
            for(let x = 0; x < map[0].length; x++) {
                const texture_index = map[y][x];
                const tileX = x * tile;
                const tileY = y * tile;
                const tileRight = tileX + tile;
                const tileBottom = tileY + tile;

                if(nextX < tileRight &&
                   nextX + this.width > tileX &&
                   nextY < tileBottom &&
                   nextY + this.height > tileY) {
                    this.checkBlockTiles(texture_index, tileX, tileY);
                }
            }
        }
    }

	//Schaden NPC zu Spieler
	checkCollosionPlayer(player)  {
		if (player.position.x < this.position.x + this.width &&
			player.position.x + player.width > this.position.x &&
			player.position.y < this.position.y + this.height &&
			player.position.y + player.height > this.position.y
		)
		 {
			if(!this.damagedPlayer)
			 {
				this.dealDamageToPlayer();
			}
		
		} else
		 {
			this.damagedPlayer = false;
		}
	}

	dealDamageToPlayer()  {
		console.log("Spieler nimmt Schaden");
		this.damagedPlayer = true;
        player.position = {
            x: 500,
            y: 60
            // respawn(){
            //     this.position = {
            //         x: respawnX,
            //         y: respawnY
            //     };
            // }
        };
player.loseHealth();
	}

    // Methoden für automovement
    moveDown() {
        this.velocity.y = 2;  
    }
    moveUp() {
        this.velocity.y = -2;
    }

    updatePosition() {
    this.position.y += this.velocity.y;
    }

    update(player)  {
        this.draw();
        this.checkCollision();
		this.checkCollosionPlayer(player);
        this.updatePosition();
    }
}