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
    doorTileLimit = 2;
    items = [];
    lastFrameTime = 0;
    frame = 0;    
    hasCollided = false;
	doorTileCount = 0;
    dashTime = 100;
    dashPause = false;
    isLeft = true;
    isDashing = false;
    mapLoad = true;
	isDashing = false;
    damagedNPC = false;
	damagedNPC1 = false;
	damagedNPC2 = false;
	damageheight = 40;
	damagewidth = 40;
    attack = false;
    coinSound =  new Audio("../sounds/collectcoin.mp3");
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

        ctx.drawImage(spritesheet, 64 * this.frame, row * 64, 64, 64, this.position.x - 5, this.position.y, 40, this.height);


        

		if(!this.dashPause){
            ctx.beginPath();
            ctx.arc(this.position.x + this.width /2, this.position.y - 10, 5, 0, 2*Math.PI);
            ctx.strokeStyle = '#000000';
            ctx.stroke();
            ctx.fillStyle = '#349ce4';
            ctx.fill();
        }
        if(this.dashPause){
            
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

    // Methode zum Abspielen der Heilungsanimation
    playHealAnimation() {
        // Setze den Frame auf 0, um die Animation von Anfang an abzuspielen
        this.frame = 0;
        // Setze den letzten Frame-Zeitstempel zurück, um die Animation sofort abzuspielen
        this.lastFrameTime = 0;
        // Definiere die textuelle Ausrichtung auf 15, um die Heilungsanimation zu aktivieren
        this.draw(10);
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
            this.coinSound.play();
            this.coin++;
            this.updateCoinUI();
        }
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
            map [y][x] = -1;
            // Addieren eines doorTiles
            this.doorTileCount++;
        }
        // Wenn 2 Tiles mit Index 9 gelöscht wurden bzw doorTileCount 2 erreicht hat (Tor wurde geöffnet)
        if(this.doorTileCount >= this.doorTileLimit){
            // Konstante für Index eines Eintrags mit name: 'key'
            const indexRemove = this.items.findIndex(item => item.name === 'key');
            // Entfernen eines Eintrags an Stelle indexRemove
            this.items.splice(indexRemove, 1);
            // Zurücksetzen des doorTileCounts
            this.doorTileCount = 0;
        }
        // console.log(this.items)
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

        if (texture_index == 88 && keys.w.pressed) {
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
            this.playHealAnimation();

            this.addHealth();
            // setze texture_index auf -1
            map [y][x] = -1;
        }

        if(texture_index === 10){
            this.collectItem('heart');
            map [y][x] = -1
            console.log(this.items);
        }
        
        if (texture_index === 19) {
            this.addCoin();
            map [y][x] = -1;
        }

        // Möglichkeit vom Double Jump bei index 17
        if (texture_index == 17 && !this.jumppadCD && keys.w.pressed) {
            this.velocity.y = -9.2;
            this.jumppadCD = true;
        } 

        // MAP LOAD
        if (texture_index == undefined) {
            this.mapLoad = false;
            console.log("map");
        }

        if (texture_index == 1 || texture_index == 3 || texture_index == 5 || texture_index == 0) {
            this.jumppadCD = false;
        }

        if (texture_index == 18 && keys.w.pressed) {
            this.velocity.y = -9.2;
        }

        if(texture_index === 11){
            this.collectItem('key');
            map[y][x] = -1
        }
        // Checkpoint
        if(texture_index === 23){
            respawnX = tileX;
            respawnY = tileY - tile;
            // Checkpoint active
            map[y][x] = 24;
        }	
		
		//LevelauswahlButton Rot
		if(texture_index === 21){
            //LevelauswahlButton Grün
            map[y][x] = 20;
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
        // Nächste Position des Spielers berechnen
        const nextX = this.position.x + this.velocity.x;
        const nextY = this.position.y + this.velocity.y;

        const tileLeftX = nextX - tile;
        const tileRightX = nextX + this.width;
        // Flag für ob Spieler auf dem Boden ist = false
        this.hasCollided = false;
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
                   nextY + this.height > tileY) {
                    this.checkBlockTiles(texture_index, tileX, tileY);
					this.checkItemCollision(texture_index, y, x, tileX, tileY);
                }
				if (
                    // Kollision mit einem Tile links vom Spieler
                    (tileLeftX < tileRight && tileLeftX + tile > tileX && nextY < tileBottom && nextY + this.height > tileY) ||
                    // Kollision mit einem Tile rechts vom Spieler
                    (tileRightX < tileRight && tileRightX + tile > tileX && nextY < tileBottom && nextY + this.height > tileY)
                ) {
                    this.openDoor(texture_index, y, x);
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
    if(new Date().getTime() > this.lastFrameTime + 100){
        this.frame++;
        if(this.velocity.x === 0){

            this.frame = 0;
        } else if(this.velocity.x < 0){
            this.direction = -1;
        }else {
            this.direction = 1;
        }
        
        if(this.frame >2) this.frame = 0;
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
    
    
    
    //<------------------ nicht Fertig ----------------------
    if(!this.attack) {
        ctx.drawImage(spritesheetattack, this.frame*(spritesheetattack.width/3),35+row*(spritesheetattack.height/2),130,127, this.position.x-33, this.position.y, 80,80);
    }
    else {
        this.attack = false;
    }
    //<------------------ nicht Fertig ----------------------
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
    npc.loseHealthnpc();
    console.log(npc.Healthnpc);
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
    npc1.loseHealthnpc();
    console.log(npc1.Healthnpc);
}

//Schaden Spieler zu NPC2
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
    npc2.loseHealthnpc();
    console.log(npc2.Healthnpc);
}

    
    // Update-Methode zum ermitteln der neuen Position
    update() {
        this.handleInputDash();
        this.draw();
        this.checkCollision();
        this.checkCollisionNPC(npc);
		this.checkCollisionNPC1(npc1);
		this.checkCollisionNPC2(npc2);
        this.updatePosition();
        this.jumppad();
        this.onJumppad = false;
    }
    
}
