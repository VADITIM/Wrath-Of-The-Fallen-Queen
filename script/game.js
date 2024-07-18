// Scroll mit Space deaktivieren
window.onkeydown = function(e) { 
    return !(e.keyCode == 32);
};


// Deklaration eienr Konstante für einen Canvas
const canvas = document.getElementById('game');
// Deklaration des einer Konstante getContex('2d') für canvas
const ctx = canvas.getContext('2d');
// Größe eines Tiles
const tile = 20;

var respawnX = 1080;
var respawnY = 800;

const background = new Image();
background.src = '../img/background.jpg';

const backgroundPlain = new Image();
backgroundPlain.src = '../img/backgroundPlain.jpg';

const backgroundDoor = new Image();
backgroundDoor.src = '../img/backgroundDoor.jpg';

const backgroundDoor2 = new Image();
backgroundDoor2.src = '../img/backgroundDoor2.jpg';

const backgroundEye = new Image();
backgroundEye.src = '../img/backgroundEye.jpg';

const backgroundRabbit = new Image();
backgroundRabbit.src = '../img/backgroundRabbit.jpg';

const backgroundCat = new Image();
backgroundCat.src = '../img/backgroundCat.jpg';

const backgroundEyesBird = new Image();
backgroundEyesBird.src = '../img/backgroundEyesBird.jpg';


const spritesheet = new Image();
spritesheet.src = '../img/spritesheet.png';

const tileset = new Image();
tileset.src = '../img/tileset.png';

const npcspritesheet = new Image();
npcspritesheet.src = '../img/anubiswalking.png';

const spritesheetattack = new Image();
spritesheetattack.src = "../img/cleopatraattack.png";

canvas.width = 1280;
canvas.height = 720;

const canHeight = canvas.height;
// Deklaration der Gravitation
const gravity = 0.5;

// Neuen Spieler erstellen
const player = new Player({
    position: {
        x: respawnX, y: respawnY
    }
});

// NPCs         ----------------------------------------------------------------------------------------------------------------------------
// Level 1-2
const npc12one = new NPC({position: {x: 1500, y: 100}});
const npc12two = new NPC({position: {x: 1900, y: 400}});
const npc12three = new NPC({position: {x: 2300, y: 400}});
const npc12four = new NPC({position: {x: 2000, y: 1400}});
// Level 1-3
const npc13one = new NPC({position: {x: 1800, y: 1000}});
const npc13two = new NPC({position: {x: 600, y: 1350}});

// Level 2-4
// const npc24one = new NPC({position: {x: 750, y: 200}});
// const npc24two = new NPC({position: {x: 750, y: 500}});


const npc = new NPC({
    position: {
		x: 450, y: 650
    }
});

const npc1 = new NPC({
    position: {
        x: 750, y: 650
    }
});

const npc2 = new NPC({
    position: {
        x: 1050, y: 650
    }
});



// Setzt jeden Key standartmäßig auf false
const keys = {
    a: {pressed: false},
    d: {pressed: false},
    w: {pressed: false},
    space: {pressed: false},
	mouseLeft: {pressed: false},
}

// Funktion zum Animieren 
function animate(){
    if(!isPaused)window.requestAnimationFrame(animate);
    // Neueinzeichnen des Hintergrundes um "Schmiereffekt" zu verhindern
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    player.update(npc);

    // npc.update(player);
    // npc1.update(player);
	// npc2.update(player);
        // NPCs     ----------------------------------------------------------------------------------------------------------------------------
        npc12one.update(player);
        npc12two.update(player);
	    npc12three.update(player);
        npc12four.update(player);

        npc13one.update(player);
        npc13two.update(player);

        
    if(!player.isDashing)
    {
        player.velocity.x = 0;
    } 
    drawMap();
}

window.onload = () => {
    window.requestAnimationFrame(animate);
}


function drawMap() {
    const currentMap = player.mapLoad ? map : map2;

    canvas.width = currentMap[0].length * tile;
    canvas.height = currentMap.length * tile;
    // Clear the canvas if player.mapLoad is false
    if (player.mapLoad == false) {
        ctx.drawImage(backgroundPlain, 0, 0,);
        ctx.drawImage(backgroundDoor2, 0, 880,);
        ctx.drawImage(backgroundCat, 0, 1760,);
        ctx.drawImage(backgroundEyesBird, 0, 2630,);

        // Draw the second map
        
        for (let y = 0; y < map2.length; y++) { // Für jede Reihe =>
            for(let x = 0; x < map2[0].length; x++) { // Gehe jede Zeile durch
                const texture_index = map2[y][x]; // Der map-index an Stelle x und y
                if (texture_index < 0) continue; // Wenn map-index kleiner als 0 überspringe die Zeile und überprüfe die nächste
                ctx.drawImage ( // Tiles einzeichnen (tileset, aus srcImg,)
                    tileset, // img => tileset
                    tile * texture_index,  // sx => x-Koordinate des Tiles im Tileset
                    0, // sy => y-Koordinate des Tiles im Tileset
                    tile, // s-width => Tile-Breite
                    tile, // s-height => Tile-Höhe
                    tile * x, // dx => x-Koordinate des Tiles auf Canvas
                    tile * y, // dy => y-Koordinate des Tiles auf Canvas
                    tile, // d-width => Breite des Tiles auf Canvas
                    tile // d-height => Breite des Tiles auf Canvas
                    );
                }
            }
        } else {
            ctx.drawImage(background, 1, 0,);
            ctx.drawImage(backgroundEye, 1280, 880,);
            ctx.drawImage(backgroundRabbit, 1, 880,);
            ctx.drawImage(backgroundDoor, 1280, 0,);

            for (let y = 0; y < map.length; y++) { 
                for (let x = 0; x < map[0].length; x++) { 
                    const texture_index = map[y][x]; 
                    if (texture_index < 0) continue; 
                    ctx.drawImage( 
                        tileset,
                        tile * texture_index, 
                        0,
                        tile, 
                        tile,
                        tile * x, 
                        tile * y, 
                        tile,
                        tile
                    );
                }
            }
        }
        player.draw();
        
        // Gegner und Spikes einzeichnen im neuen Level
        if (player.mapLoad) {
            npc12one.draw();
            npc12two.draw();
            npc12three.draw();
            npc12four.draw();
            npc13one.draw();
            npc13two.draw();

        }
        // Gegner und Spikes entfernen im neuen Level
        else {
            // Do not draw NPCs when map is not loading
            // npc12one.draw();
            // npc12two.draw();
            // npc12three.draw();
            // npc12four.draw();
            // npc13one.draw();
            // npc13two.draw();
        }    }





// Keyup-Event checkt welche Taste gedrückt wurde => true
window.addEventListener('keydown', (event) => {
	let keycode = event.keycode || event.which;
    switch(keycode){
        case 65:     keys.a.pressed = true; break;
        case 68:     keys.d.pressed = true; break;
        case 87:     keys.w.pressed = true; break;
        case 32: keys.space.pressed = true; break;
    }
});
window.addEventListener('mousedown', (event) => {
    if (event.button === 0) {
        // Der linke Mausbutton wurde gedrückt
        keys.mouseLeft.pressed = true;
	}
    });
// Keydown-Event checkt welche Taste losgelassen wurde => false
window.addEventListener('keyup', (event) =>{
	let keycode = event.keycode || event.which;
    switch(keycode){
        case 65:	 keys.a.pressed = false; break;
        case 68:	 keys.d.pressed = false; break;
        case 87:	 keys.w.pressed = false; break;
        case 32:	 keys.space.pressed = false; break;
	}
    });
	window.addEventListener('mouseup', (event) => {
    if (event.button === 0) {
        // Der linke Mausbutton wurde gedrückt
        keys.mouseLeft.pressed = false;
	 }
	});
	
	let isGameOver = false;
	let isPaused = false;
	
    function checkGameOver() {
       console.log("checkGameOver");
        if (isGameOver) {
            gameOver(); // Rufe die gameOver()-Funktion auf, um den Game Over Bildschirm anzuzeigen
        }
    }
	
	function playerDies() {
		isGameOver = true;
		checkGameOver();
	}

    // Funktion für den Neustart des Levels
    function restartGame() {
		isGameOver = false;
        console.log("Das Level wird neu gestartet...");
		window.location.reload(false);
    }
	
	// Funktion, um das Spiel zu pausieren
	function pauseGame() {
		isPaused = true;
		console.log("Spiel pausiert...");
	}

	// Funktion, um das Spiel fortzusetzen
	function resumeGame() {
		isPaused = false;
		console.log("Spiel fortgesetzt...");
	}
	
	// Funktion, um das Game Over zu behandeln
	function gameOver() {
		console.log("gameOver");
		isGameOver = true;
		pauseGame(); // Spiel pausieren
		document.getElementById("gameOverScreen").style.display = "block";
	}
	
	// Hier ein Beispiel, wie du die Pausierung während des GameOver handhaben könntest:
	function handleGameOver() {
		isGameOver = true;
		pauseGame(); // Spiel pausieren
		document.getElementById("gameOverScreen").style.display = "block";
	}

    // Funktion für die Rückkehr zur Levelauswahl
    function returnToMainMenu() {
        isGameOver = false;
        window.location.href = "../pages/index.html"
    }
    setTimeout(checkGameOver, 5000);