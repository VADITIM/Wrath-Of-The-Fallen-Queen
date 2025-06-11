// Deklaration eienr Konstante für einen Canvas
const canvas = document.getElementById('game');
// Deklaration des einer Konstante getContex('2d') für canvas
const ctx = canvas.getContext('2d');
// Größe eines Tiles
const tile = 20;

var respawnX = 40;
var respawnY = 80;

// Initialisierung der .pngs
const background = new Image();
background.src = '../img/background.jpg';

const spritesheet = new Image();
spritesheet.src = '../img/spritesheet.png';

const spritesheetattack = new Image();
spritesheetattack.src = '../img/cleopatraattack.png';

const npcspritesheet = new Image();
npcspritesheet.src = '../img/anubiswalking.png';

const tileset = new Image();
tileset.src = '../img/tileset.png';

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
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    space: {
        pressed: false
    },
	mouseLeft: {
		pressed: false
	},
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

// Funktion zum Animieren 
function animate(texture_index){
    if(!isPaused)window.requestAnimationFrame(animate);
    // Neueinzeichnen des Hintergrundes um "Schmiereffekt" zu verhindern
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0,);
    player.update(npc);
    npc.update(player);
    //npc1.update(player);
	//npc2.update(player);
    // Standartgeschwindigkeit auf 0
    if(!player.isDashing)
    {
        player.velocity.x = 0;
    } 
    drawMap();
}

window.onload = () => {
    window.requestAnimationFrame(animate);
}

// Keyup-Event checkt welche Taste gedrückt wurde => true
window.addEventListener('keydown', (event) => {
	let keycode = event.keycode || event.which;
    switch(keycode){
        case 65:     keys.a.pressed = true;
        break;
        case 68:     keys.d.pressed = true;
        break;
        case 87:     keys.w.pressed = true;
        break;
        case 32: keys.space.pressed = true;
        break;
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
        case 65:	 keys.a.pressed = false;
        break;
        case 68:	 keys.d.pressed = false;
        break;
        case 87:	 keys.w.pressed = false;
        break;
        case 32:	 keys.space.pressed = false;
        break;
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
	
	// Beispiel: Simuliere das Spielende, wenn ein bestimmtes Ereignis eintritt (z.B. Spieler stirbt)
    function checkGameOver() {
       console.log("checkGameOver");
	   // Prüfe, ob das Spiel zu Ende ist (z.B. der Spieler hat keine Leben mehr)
        if (isGameOver) {
            gameOver(); // Rufe die gameOver()-Funktion auf, um den Game Over Bildschirm anzuzeigen
        }
    }
	
	// Beispiel: Wenn der Spieler stirbt, setze isGameOver auf true und rufe dann checkGameOver() auf
	function playerDies() {
		isGameOver = true;
		checkGameOver();
	}

    // Funktion für den Neustart des Levels
    function restartGame() {
		isGameOver = false;
        // Hier kannst du den Code für den Neustart des Levels einfügen
        console.log("Das Level wird neu gestartet...");
		window.location.reload(false);
    }
	
	// Funktion, um das Spiel zu pausieren
	function pauseGame() {
		isPaused = true;
    // Hier kannst du den Code für die Pausierung des Spiels einfügen
		console.log("Spiel pausiert...");
	}

	// Funktion, um das Spiel fortzusetzen
	function resumeGame() {
		isPaused = false;
    // Hier kannst du den Code für das Fortsetzen des Spiels einfügen
		console.log("Spiel fortgesetzt...");
	}
	
	// Funktion, um das Game Over zu behandeln
	function gameOver() {
		console.log("gameOver");
		isGameOver = true;
		pauseGame(); // Spiel pausieren
    // Hier kannst du den Code für die Anzeige des GameOver-Bildschirms einfügen
		document.getElementById("gameOverScreen").style.display = "block";
	}
	
	// Hier ein Beispiel, wie du die Pausierung während des GameOver handhaben könntest:
	function handleGameOver() {
		isGameOver = true;
		pauseGame(); // Spiel pausieren
    // Hier kannst du den Code für die Anzeige des GameOver-Bildschirms einfügen
		document.getElementById("gameOverScreen").style.display = "block";
	}

    // Funktion für die Rückkehr zur Levelauswahl
    function returnToLevelSelection() {
		isGameOver = false;
        // Hier kannst du den Code für die Rückkehr zur Levelauswahl einfügen
        console.log("Zurück zur Levelauswahl...");
        // Zum Beispiel: window.location.href = "level_selection.html";
    }

    // Simuliere das Spielende nach einer gewissen Zeit (z.B. 5 Sekunden)
    // Diese Zeile kannst du entfernen oder anpassen, je nachdem, wie das Spiel endet
    setTimeout(checkGameOver, 5000);

