class character {
    constructor(position) {
        this.position = position;
        this.velocity = { x: 0, y: 0 }; // Initialisierung der velocity-Eigenschaft
        this.height = 40; // Höhe des Spielers
        this.width = 30; // Breite des Spielers
        this.frame = 0; // Frame für die Animation
        this.direction = 1; // Richtung des Spielers, standardmäßig nach rechts
        this.lastFrameTime = new Date().getTime(); // Zeit des letzten Frames
        this.dashPause = false; // Dash-Pause-Flag
    }
}

// Deklaration einer Konstante für den Canvas
const canvas = document.getElementById('levelselection');
// Deklaration des 2D-Kontexts für den Canvas
const ctx = canvas.getContext('2d');
// Größe eines Tiles
const tile = 20;

// Deklaration der Gravitation
const gravity = 0.5;

// Initialisierung der Bilddateien
const levelselectionbackground = new Image();
levelselectionbackground.src = '../img/levelselectionbackground.png';

const spritesheet = new Image();
spritesheet.src = '../img/spritesheet.png';

const tileset = new Image();
tileset.src = '../img/tileset.png';

// Neuen Spieler erstellen
const player = new character({ x: 30, y: 399 });

// Setzt jeden Key standardmäßig auf false
const keys = {
    a: { pressed: false },
    d: { pressed: false },
    w: { pressed: false },
}

function goBack() {										
    window.location.href = "index.html";
}

function checkCollisions(player) {
    // Spielergrenzen aktualisieren
    const playerLeft = player.position.x;
    const playerRight = player.position.x + player.width;
    const playerTop = player.position.y;
    const playerBottom = player.position.y + player.height;

    // Für jede Reihe
    for (let y = 0; y < map.length; y++) {
        // Durch jede Spalte gehen
        for (let x = 0; x < map[0].length; x++) {
            // Wenn der Kachelindex kleiner als 0 ist, überspringen Sie die Kachel
            if (map[y][x] < 0) continue;

            // Kachelgrenzen aktualisieren
            const tileLeft = x * tile;
            const tileRight = tileLeft + tile;
            const tileTop = y * tile;
            const tileBottom = tileTop + tile;

            // Kollisionserkennung prüfen
            if (playerRight > tileLeft && playerLeft < tileRight && playerBottom > tileTop && playerTop < tileBottom) {
                // Hier können Sie entsprechende Reaktionen auf die Kollision ausführen
                // Zum Beispiel: Stoppen Sie die Spielerbewegung, ändern Sie die Spielerposition usw.

				//Hier wird gecheckt ob der spieler auf einen knopf block steht wenn ja wird die collision ignoriert
                if(map[y][x] !== 20 && map[y][x] !== 21 ){
                // Hier wird die vertikale Bewegung des Spielers gestoppt, wenn eine Kollision mit einem Tile auftritt
					if (player.velocity.y > 0) {
						player.velocity.y = 0;
						player.position.y = tileTop - player.height;
					}
				
                }else{
					if(map[y][x] === 20 ){
					console.log("Jumped on Button X position kann genutzt werden um zu sagen welcher knopf gedrückt wird")
	
						switch(x){
							case 10:
								// Lade Level 1
								loadLevel(1);
								break;
							case 22:
								// Lade Level 2
								loadLevel(2);
								break;
							case 34:
								// Lade Level 3
								loadLevel(3);
								break;
							case 48:
								// Lade Level 4
								loadLevel(4);
								break;
							case 63:
								// Lade Bonus Level
								loadBonusLevel();
						}
					}
				}
				function loadLevel(levelNumber) {
					// Hier implementierst du den Code zum Laden des angegebenen Levels, z.B.:
					console.log("Lade Level " + levelNumber);
					// Füge hier den tatsächlichen Code zum Laden des Levels hinzu, z.B.:
					// window.location.href = "level" + levelNumber + ".html";
				}

				function loadBonusLevel() {
					// Hier implementierst du den Code zum Laden des Bonuslevels, z.B.:
					console.log("Lade Bonus Level");
					// Füge hier den tatsächlichen Code zum Laden des Bonuslevels hinzu, z.B.:
					// window.location.href = "bonusLevel.html";
				}

            }
        }
    }
}

// Funktion zur Aktualisierung der Spiellogik
function update() {
    // Bewegung des Spielers basierend auf den Tastatureingaben
    if (keys.a.pressed) {
        player.velocity.x = -2; // Negative Geschwindigkeit in x-Richtung für links
    } else if (keys.d.pressed) {
        player.velocity.x = 2; // Positive Geschwindigkeit in x-Richtung für rechts
    } else {
        player.velocity.x = 0; // Keine horizontale Bewegung
    }

    // Vertikale Bewegung (z.B. Springen)
    if (keys.w.pressed && player.velocity.y === 0) {
        player.velocity.y = -10; // Springen, wenn sich der Spieler am Boden befindet
    }

    // Gravitation anwenden
    player.velocity.y += gravity;

    // Spielerposition aktualisieren
    player.position.x += player.velocity.x;
    player.position.y += player.velocity.y;

    // Kollisionen überprüfen
    checkCollisions(player);

    // Begrenzung des Spielers innerhalb des Canvas
    if (player.position.x < 0) {
        player.position.x = 0;
    } else if (player.position.x > canvas.width - player.width) {
        player.position.x = canvas.width - player.width;
    }

    if (player.position.y > canvas.height - player.height) {
        player.position.y = canvas.height - player.height;
    }
}

// Funktion zum Animieren
function animate() {
    window.requestAnimationFrame(animate);

    // Neueinzeichnen des Hintergrundes um "Schmiereffekt" zu verhindern
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(levelselectionbackground, 0, 0);
    
    // Karte zeichnen
    drawMap();

    // Spiellogik aktualisieren
    update();

    // Spieler zeichnen
    drawPlayer(player);
}

function drawMap() {
    // Für jede Reihe =>
    for (let y = 0; y < map.length; y++){
        // Gehe jede Zeile durch
        for(let x = 0; x < map[0].length; x++){
            // Der map-index an Stelle x und y
            const texture_index = map[y][x];
            // Wenn map-index kleiner als 0 überspringe die Zeile und überprüfe die nächste
            if (texture_index < 0) continue;
            // Tiles einzeichnen (tileset, aus srcImg, )
            ctx.drawImage(
                // img => tileset
                tileset,
                // sx => x-Koordinate des Tiles im Tileset
                tile * texture_index,
                // sy => y-Koordinate des Tiles im Tileset
                0,
                // s-width => Tile-Breite
                tile,
                // s-height => Tile-Höhe
                tile,
                // dx => x-Koordinate des Tiles auf Canvas
                tile * x,
                // dy => y-Koordinate des Tiles auf Canvas
                tile * y,
                // d-width => Breite des Tiles auf Canvas
                tile,
                // d-height => Breite des Tiles auf Canvas
                tile
            );
        }
    } 
}


function drawPlayer(player) {
    if(new Date().getTime() > player.lastFrameTime + 100){
        player.frame++;
        if(player.velocity.x === 0){
            player.frame = 0;
        } else if(player.velocity.x < 0){
            player.direction = -1;
        } else {
            player.direction = 1;
        }
        
        if(player.frame > 3) player.frame = 0;
        player.lastFrameTime = new Date().getTime();
    }

    let row = 0;
    switch (player.direction) {
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
    // console.log(player.frame)
    ctx.drawImage(spritesheet,64*player.frame,row*64,64,64, player.position.x-5, player.position.y, 40, player.height);
   
}

window.onload = () => {
    // Canvas-Element abrufen
    const canvas = document.getElementById('levelselection');
    
    // Größe des Canvas-Elements ändern
    canvas.width = 1280;
    canvas.height = 700;

    // Starten der Animation
    animate();
}

// Eventlistener für Tastatureingaben
window.addEventListener('keydown', (event) => {
    switch(event.key){
        case 'a': keys.a.pressed = true; break;
        case 'd': keys.d.pressed = true; break;
        case 'w': keys.w.pressed = true; break;
    }
});

window.addEventListener('keyup', (event) =>{
    switch(event.key){
        case 'a': keys.a.pressed = false; break;
        case 'd': keys.d.pressed = false; break;
        case 'w': keys.w.pressed = false; break;
    }
});