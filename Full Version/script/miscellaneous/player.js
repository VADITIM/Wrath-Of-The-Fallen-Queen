// Erstellen einer Player-Klasse
class Player{
    height = 40;
    width  = 30;
    velocity = {
        x: 0,
        y: 1
    };
    onGround = false;
    onSpike = false;

    onJumppad = false;
    jumppadCD = false;
    
    maxHealth = 5;
    health = this.maxHealth;

    maxCoin = 3;
    coin = 0;

    doorTileLimit = 3;
	doorTileCount = 0;
    items = [];

    lastFrameTime = 0;
    frame = 0;    

    hasCollided = false;

    dashTime = 100;
    dashPause = false;

    isLeft = true;

    isDashing = false;

    mapLoad = true;
    
	damagewidth = 40;
	damageheight = 40;

    damagedNPC = false;
	damagedNPC1 = false;
	damagedNPC2 = false;
	damagedNPC3 = false;
	damagedNPC4 = false;
	damagedNPC5 = false;
	damagedNPC6 = false;

	attack = false;

    constructor({position}) {
        this.position = position;

    }
    // Draw-Methode zum einzeichnen des Players
    draw(texture_index){
        if(new Date().getTime() > this.lastFrameTime + 100){
            this.frame++;
            if(this.velocity.x === 0){

                this.frame = 0;
            } else if(this.velocity.x < 0){
                this.direction = -1;
            } else {
                this.direction = 1;
            }
			
			if(this.frame > 3) this.frame = 0;
            this.lastFrameTime = new Date().getTime();
        }

        let row = 0;
        switch (this.direction) {
            case -1:
                row = 0;
                break;
            case 0:
                row = 0;
                break;
            case 1:
                row = 1;
                break;
        }

        if (texture_index === 10) {
            ctx.drawImage(spritesheetHeal, 64 * this.frame, row * 64, 64,64, this.position.x - 5, this.position.y, 40, this.height);
        } else {
            ctx.drawImage(spritesheet, 64 * this.frame, row * 64, 64, 64, this.position.x - 5, this.position.y, 40, this.height);
        }

        if (texture_index === 10) {
            if (this.isLeft) {
            ctx.drawImage(spritesheetHeal, 64 * this.frame, 1 * 64, 64, 64, this.position.x - 5, this.position.y, 40, this.height);
            } else {
            ctx.drawImage(spritesheetHeal, 64 * this.frame, 0 * 64, 64, 64, this.position.x - 5, this.position.y, 40, this.height);
            }
        }

		if(this.dashPause == false){
            ctx.beginPath();
            ctx.arc(this.position.x + this.width /2, this.position.y - 10, 5, 0, 2 * Math.PI);
            ctx.strokeStyle = '#349ce4';
            ctx.stroke();
            ctx.fillStyle = '#349ce4';
            ctx.fill();
        }
    }

    // RESPAWN
    respawn(){
        this.position = {
            x: respawnX,
            y: respawnY
        };
    }

    // ITEMS -----------------------------------------
    // Methode zum Einsammeln von Items
    collectItem(itemName) {
        this.items.push({name: itemName});
    }


    // HEALTH -----------------------------------------
    // Methode zum updaten der Lebensanzeige
    updateHealthUI() {
        // Geht <img> mit id = heart + i durch 
        for (let i = 1; i <= 5; i++) {
            const heart = document.getElementById(`heart${i}`);
            if (i <= this.health) {
                heart.src = '../img/heart.png'; // Herz anzeigen
            } else {
                heart.src = '../img/heart_empty.png';  // Herz verstecken
            }
        }
    }
        
    playheartSound() {
        const heartSound =  new Audio("../sounds/heart.mp3");
        heartSound.addEventListener("canplay", () => {
            heartSound.play();
        })
    }
    
    // Leben hinzufügen
    addHealth() {
        if(this.health < this.maxHealth){
            this.health++;
            heartSound.play();
        }
        this.updateHealthUI();
    }
    // Methode zum Verlieren von Leben
	loseHealth() {
        this.health--;
        if (this.health <= 0) {
            // Logik für Spielende
           // alert('Game Over!');
		   pauseGame();
			document.getElementById("gameOverScreen") .style.display="block";
           // window.location.reload(false);
        }
        // Aktualisiere die Lebensanzeige
        this.updateHealthUI(); 
    }



    // COIN -----------------------------------------
    // Coin UI 
    updateCoinUI() {
        for (let i = 1; i <= 3; i++) {
            const coin = document.getElementById(`coin${i}`);
            if (i <= this.coin) {
                coin.src = '../img/coin.png'; // Herz anzeigen
            } else {
                coin.src = '../img/coin_empty.png';  // Herz verstecken
            }
        }
    }

    playCoinSound() {
        coinSound.addEventListener("canplay", () => {
            coinSound.play()
        ;})
    }

    // Coin hinzufügen
    addCoin() {
        if(this.coin < this.maxCoin){
            this.coin++;
            this.updateCoinUI();
        }
    }    
    
    resetCoin() {
        while (this.coin != 0) {
            this.coin--;
        }
        this.updateCoinUI();
    }


    // INPUT -----------------------------------------
    // Dash
    dash() {
        // Variable für die einzelnen Dash Schritte
        let miniDash = 7.1; 
        // Wenn Player nicht am Dashen, Dash nicht pausiert und Leertaste gedrückt
        if(!this.isDashing && !this.dashPause && keys.space.pressed) {
            this.isDashing = true;
            // Wenn Dash rechts => velocity erhöhen
            if(!this.isLeft){
                this.velocity.x += 8.2;
            // Wenn Dash links => velocity erhöhen
            } else if(this.isLeft){
                this.velocity.x -= 8.2;
            } 
            // Timeout stoppt Dash durch DashPause
            setTimeout(()=>{
                this.isDashing = false;
                this.dashPause = true;
            },  this.dashTime);
            // Dash Cooldown
            setTimeout(() => {
                this.dashPause = false;
            }, 1000);
        }
    }
    
    handleInputDash(){
        if(this.isDashing){
            return;
        }
        if(keys.a.pressed) {
                this.velocity.x = -3.5;
                this.isLeft = true;
        // Ansonsten wenn Taste d gedrückt = true => Geschwindigkeit auf 3(rechts)
        } else if(keys.d.pressed) {
                this.velocity.x = 3.5;
                this.isLeft = false;
        }
        if(keys.w.pressed){
            if(this.onGround) {
                this.velocity.y += -9.2;
                this.onGround = false;
            } 
        }
        if(!this.isDashing)
        {
            this.dash();
        }
    }

    // Jumppad
    jumppad() {
        if (this.onJumppad) {
            this.velocity.y = -5.5;
        }
    }

    handleInputJumppad() {
        if(this.onJumppad){
            return;
        }
        if(keys.a.pressed) {
                this.velocity.x = -3.5;
                this.isLeft = true;
        } else if(keys.d.pressed) {
                this.velocity.x = 3.5;
                this.isLeft = false;
        }
        if(keys.w.pressed){
            if(this.onGround) {
                this.velocity.y += -9.2;
                this.onGround = false;
            } 
        }
        if(keys.mouseLeft.pressed){
			this.damagebox()
		}
        if(!this.isDashing)
        {
            this.dash();
        }
    }


	// COLLISION -----------------------------------------
    // Tür öffnen
	openDoor(texture_index, y, x){
		// Wenn Spieler eine Tür berührt und ein Eintrag mit 'key' existiert
        if(texture_index === 9 && this.items.some(item => item.name === 'key')){
            // Das Tile wird zu -1
            currentCollisionMap [y][x] = -1;
            // Addieren eines doorTiles
            this.doorTileCount++;
        }
        // Wenn 3 Tiles mit Index 9 gelöscht wurden bzw doorTileCount 3 erreicht hat (Tor wurde geöffnet)
        if(this.doorTileCount >= this.doorTileLimit){
            // Konstante für Index eines Eintrags mit name: 'key'
            const indexRemove = this.items.findIndex(item => item.name === 'key');
            // Entfernen eines Eintrags an Stelle indexRemove
            this.items.splice(indexRemove, 1);
            // Zurücksetzen des doorTileCounts
            this.doorTileCount = 0;
        }
	}

	// KOLLISION Y
	collisionCheckY(texture_index, distanceY, distanceX, overlapX, overlapY){
		if (distanceY > 0) { // Wenn Kollision oben =>
            // Wenn texture_index nicht 8 =>
            if (texture_index != 8) {
                this.onSpike = false;
            }
            // Wenn texture_index = 8 und spieler ist auf keinem Spike =>
            if(texture_index == 8 && !this.onSpike){
                this.onSpike = true;
                this.respawn();
                this.loseHealth();
            }
            // Spieler nach unten positionieren
            this.position.y += overlapY;
            this.onGround = false;
            } else if(distanceY < 0){ // Wenn Kollision oben =>
            // Wenn texture_index nicht 7 =>
            if (texture_index != 7) {
                this.onSpike = false;
            }
            // Wenn texture_index = 7 und spieler ist auf keinem Spike =>
            if(texture_index == 7 && !this.onSpike){
                this.onSpike = true;
                this.respawn();
                this.loseHealth()
            }
            //  Spieler nach unten positionieren
            this.position.y -= overlapY;
            this.onGround = true;
        }
        
        if (texture_index != 0) {
            this.onJumppad = false;
        }

        if (texture_index == 0 && keys.w.pressed) {
            this.onJumppad = true;
        }
        // Stoppt die vertikale Geschwindigkeit
        this.velocity.y = 0;
	}
	
    // KOLLISION X
	collisionCheckX(overlapX){
		if (this.velocity.x > 0){   // Wenn Kollision links =>
            // Spieler nach rechts positionieren
            this.position.x -= overlapX;
            this.velocity.x = 0;
            this.onGround = false;

        } else if (this.velocity.x < 0){
            // Wenn Kollision rechts > Spieler nach links positionieren
            this.position.x += overlapX;
            this.velocity.x = 0;
            this.onGround = false;
        }                   
        // Stoppt die horizontale Geschwindgkeit
        this.velocity.x = 0;
	}
	
	checkItemCollision(texture_index, y, x, tileX, tileY){
        const currentCollisionMap = this.mapLoad ? map : map2;
        
		// Wenn texture_index 10 ist =>
        if(texture_index === 10){
            // füge Leben hinzu
            this.addHealth();
            // setze texture_index auf -1
            currentCollisionMap [y][x] = -1;
        }
        
        if (texture_index === 19) {
            this.addCoin();
            currentCollisionMap [y][x] = -1;
        }

        // Möglichkeit vom Double Jump bei index 17
        if (texture_index == 17 && !this.jumppadCD && keys.w.pressed) {
            this.velocity.y = -9.2;
            this.jumppadCD = true;
        } 

        // MAP LOAD
        if (texture_index === 22 && this.items.some(item => item.name === 'key')) {
            this.mapLoad = false;
            this.position = {
                x: 600, y: 3350
            };
            this.resetCoin();
        }

        if (texture_index === 23 && this.items.some(item => item.name === 'key2')) {
            this.resetCoin();
            this.gameEnd();
            this.pauseGame();
        }


        if (texture_index == 1 || texture_index == 3 || texture_index == 5 || texture_index == 0) {
            this.jumppadCD = false;
        }

        if (texture_index == 18 && keys.w.pressed) {
            this.velocity.y = -9.2;
        }

        if(texture_index === 11){
            this.collectItem('key');
            currentCollisionMap[y][x] = -1
        }
        
        if(texture_index === 27){
            this.collectItem('key2');
            currentCollisionMap[y][x] = -1
        }

        // Checkpoint De-
        if(texture_index === 25){
            respawnX = tileX;
            respawnY = tileY - tile;
            // Checkpoint Activated
            currentCollisionMap[y][x] = 26;
        }	
		
		//LevelauswahlButton Rot
		if(texture_index === 21){
            //LevelauswahlButton Grün
            currentCollisionMap[y][x] = 20;
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
            
            // Prüfe nach Überlappung mit Spieler und Tile
            if(Math.abs(distanceX) < combinedHalfWidths + 1 && Math.abs(distanceY) < combinedHalfHeights + 1){
                this.hasCollided = true;

                const overlapX = combinedHalfWidths - Math.abs(distanceX);
                const overlapY = combinedHalfHeights - Math.abs(distanceY);
                
                // Überlappung zurücksetzen nach Richtung der Kollision
                if(overlapX >= overlapY) {
                    this.collisionCheckY(texture_index, distanceY, distanceX, overlapX, overlapY);
                } else {
                    this.collisionCheckX(overlapX);
                }
            } 
        }
	}
	
    checkCollision(){
        const currentCollisionMap = this.mapLoad ? map : map2;
        // Nächste Position des Spielers berechnen
        const nextX = this.position.x + this.velocity.x;
        const nextY = this.position.y + this.velocity.y;

        const tileLeftX = nextX - tile;
        const tileRightX = nextX + this.width;
        // Flag für ob Spieler auf dem Boden ist = false
        this.hasCollided = false;
        // Durch die Tiles der Map gehen um nach Kollisionen zu prüfen
        for(let y = 0; y < currentCollisionMap.length; y++){
            for(let x = 0; x < currentCollisionMap[0].length; x++){
                const texture_index = currentCollisionMap[y][x];
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
					this.checkItemCollision(texture_index, y, x, tileX, tileY);
                }
				if (
                    // Kollision mit einem Tile links vom Spieler
                    (tileLeftX < tileRight && tileLeftX + tile > tileX && nextY < tileBottom && nextY + this.height > tileY) ||
                    // Kollision mit einem Tile rechts vom Spieler
                    (tileRightX < tileRight && tileRightX + tile > tileX && nextY < tileBottom && nextY + this.height > tileY)
                ) {
                    this.openDoor(texture_index, this.doorTileCount, y, x);
                }
            }
        }
        if (this.hasCollided == false) this.onGround = false;
    }

    updatePosition(){
        if (!this.onGround) {
            this.velocity.y += gravity;
        }
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    gameEnd() {
        document.getElementById("gameEnd").style.display="flex";
    }



    //schadensbox Spieler
	damagebox(){

        let damageboxX, damageboxY, damageboxWidth, damageboxheight;

        if(this.isLeft) {
            damageboxX = this.position.x - this.damagewidth;
            damageboxY = this.position.y + (this.height - this.damageheight) / 2;
        }
        else {
            damageboxX = this.position.x + this.width;
            damageboxY = this.position.y + (this.height - this.damageheight) / 2;
        }
        damageboxWidth = this.damagewidth;
        damageboxheight = this.damageheight;

        return {
            x: damageboxX,
            y: damageboxY,
            width: damageboxWidth,
            height: damageboxheight
        };
}
    

//Schaden Spieler zu NPC
checkCollisionNPC(NPC) {
    if(keys.mouseLeft.pressed){
        const DamageBox = this.damagebox();
        if (
            DamageBox.x < NPC.position.x + NPC.width &&
            DamageBox.x + DamageBox.width > NPC.position.x &&
            DamageBox.y < NPC.position.y + NPC.height &&
            DamageBox.y + DamageBox.height > NPC.position.y
        ) 
        {
            if (!this.damagedNPC) {
                this.dealDamageToNPC();
            }
        }
        else {
            this.damagedNPC = false;
        }
    }
}

dealDamageToNPC() {
    this.damagedNPC = true;
    npc12one.loseHealthnpc();
}

//Schaden Spieler zu NPC1
checkCollisionNPC1(npc) {
    if(keys.mouseLeft.pressed){
    const DamageBox = this.damagebox();
    
    if (
        DamageBox.x < npc.position.x + npc.width &&
        DamageBox.x + DamageBox.width > npc.position.x &&
        DamageBox.y < npc.position.y + npc.height &&
        DamageBox.y + DamageBox.height > npc.position.y
    ) 
    {

        if (!this.damagedNPC1) {
            this.dealDamageToNPC1();
        }
    }
    else {
        this.damagedNPC1 = false;
    }
    }
}

dealDamageToNPC1() {
    this.damagedNPC1 = true;
    npc12two.loseHealthnpc();
}



//Schaden Spieler zu NPC3
checkCollisionNPC2(npc) {
    if(keys.mouseLeft.pressed){
    const DamageBox = this.damagebox();
    if (
        DamageBox.x < npc.position.x + npc.width &&
        DamageBox.x + DamageBox.width > npc.position.x &&
        DamageBox.y < npc.position.y + npc.height &&
        DamageBox.y + DamageBox.height > npc.position.y
    ) 
    {
        if (!this.damagedNPC2) {
            this.dealDamageToNPC2();
        }
    }
    else {
        this.damagedNPC2 = false;
    }
    }
}

dealDamageToNPC2() {
    this.damagedNPC2 = true;
    npc12four.loseHealthnpc();
}



//Schaden Spieler zu NPC2
checkCollisionNPC3(npc) {
    if(keys.mouseLeft.pressed){
    const DamageBox = this.damagebox();
    if (
        DamageBox.x < npc.position.x + npc.width &&
        DamageBox.x + DamageBox.width > npc.position.x &&
        DamageBox.y < npc.position.y + npc.height &&
        DamageBox.y + DamageBox.height > npc.position.y
    ) 
    {
        if (!this.damagedNPC3) {
            this.dealDamageToNPC3();
        }
    }
    else {
        this.damagedNPC3 = false;
    }
    }
}

dealDamageToNPC3() {
    this.damagedNPC3 = true;
    npc12three.loseHealthnpc();
}



//Schaden Spieler zu NPC2
checkCollisionNPC4(npc) {
    if(keys.mouseLeft.pressed){
    const DamageBox = this.damagebox();
    if (
        DamageBox.x < npc.position.x + npc.width &&
        DamageBox.x + DamageBox.width > npc.position.x &&
        DamageBox.y < npc.position.y + npc.height &&
        DamageBox.y + DamageBox.height > npc.position.y
    ) 
    {
        if (!this.damagedNPC4) {
            this.dealDamageToNPC4();
        }
    }
    else {
        this.damagedNPC4 = false;
    }
    }
}

dealDamageToNPC4() {
    this.damagedNPC4 = true;
    npc13one.loseHealthnpc();
}



//Schaden Spieler zu NPC2
checkCollisionNPC5(npc) {
    if(keys.mouseLeft.pressed){
    const DamageBox = this.damagebox();
    if (
        DamageBox.x < npc.position.x + npc.width &&
        DamageBox.x + DamageBox.width > npc.position.x &&
        DamageBox.y < npc.position.y + npc.height &&
        DamageBox.y + DamageBox.height > npc.position.y
    ) 
    {
        if (!this.damagedNPC5) {
            this.dealDamageToNPC5();
        }
    }
    else {
        this.damagedNPC5 = false;
    }
    }
}

dealDamageToNPC5() {
    this.damagedNPC5 = true;
    npc13two.loseHealthnpc();
}

//Schaden Spieler zu NPC2
checkCollisionNPC6(npc) {
    if(keys.mouseLeft.pressed){
    const DamageBox = this.damagebox();
    if (
        DamageBox.x < npc.position.x + npc.width &&
        DamageBox.x + DamageBox.width > npc.position.x &&
        DamageBox.y < npc.position.y + npc.height &&
        DamageBox.y + DamageBox.height > npc.position.y
    ) 
    {
        if (!this.damagedNPC6) {
            this.dealDamageToNPC6();
        }
    }
    else {
        this.damagedNPC6 = false;
    }
    }
}

dealDamageToNPC6() {
    this.damagedNPC6 = true;
    npc12four.loseHealthnpc();
}

    
    // Update-Methode zum ermitteln der neuen Position
    update() {
        this.handleInputDash();
        this.draw();
        this.checkCollision();
        this.checkCollisionNPC(npc12one);
		this.checkCollisionNPC1(npc12two);
		this.checkCollisionNPC2(npc12three);
        this.checkCollisionNPC3(npc12four);
        this.checkCollisionNPC4(npc13one);
        this.checkCollisionNPC5(npc13two);
        this.checkCollisionNPC6(npc12four);

        this.updatePosition();
        this.jumppad();
        this.onJumppad = false;
    }
    
}
