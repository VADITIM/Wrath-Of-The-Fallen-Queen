const map = [
     [ 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 2, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5],
     [ 1,-1,-1,-1,-1,-1, 3, 3, 3, 3, 5,-1,-1,-1,-1,-1,-1, 1, 3, 3, 3, 3, 2, 5,-1,-1,-1, 1, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 2, 5],
     [ 1,-1,-1,-1,-1,-1, 4, 3, 2, 3, 5,-1,-1,-1,-1,-1,-1,-1, 1, 3, 3, 3, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 2, 5,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 3, 3, 3, 5],
     [ 1,-1,-1,-1,-1,-1, 3, 3, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 3, 3, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 5],
     [ 1,-1,-1,-1,-1,-1, 5, 8, 8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 8, 8, 8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 5],
     [ 1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 2, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 2, 5],
     [ 1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 5],
     [ 1, 3, 3, 3, 3, 3, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 5],
     [ 1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 2,-1,-1,19,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 5],
     [ 1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 5,-1,-1, 6,-1,-1,-1,-1,-1,23,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 5],
     [ 1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 5,-1,-1,-1,-1,-1,-1,-1,-1,22,-1,-1,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 5],
     [ 1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 8, 8, 8,-1,-1,-1,-1,-1,-1,-1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 5,-1,-1,-1,-1,-1, 1, 3, 3, 3, 3, 3, 5,-1,-1,-1,-1,-1, 5],
     [ 1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 2, 3, 3, 5,-1,-1,-1,-1,-1, 1, 3, 3, 3, 3, 3, 2,-1,-1,-1,-1,-1, 5],
     [ 1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5,-1,-1,-1,-1,-1, 1, 2, 3, 3, 3, 3, 5,-1,-1,-1,-1,-1, 5],
     [ 1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 3, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 3, 5,-1,-1,-1,-1,-1, 1, 3, 5,-1, 1, 3, 5,-1,-1,-1,-1,-1, 5],
     [ 1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3, 5,-1,-1,-1,-1,-1, 2, 3, 5,-1, 1, 3, 5,-1,-1,-1,-1,-1, 5],
     [ 1,-1,-1,-1,-1,-1, 6,-1,-1,-1,-1,-1,-1,-1, 1, 3, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11, 1, 5,-1,-1,-1,-1,-1, 1, 5,-1,-1,-1, 1, 5,-1,-1,-1,-1,-1, 5],
     [ 1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 5,-1,-1,-1,-1,-1,-1, 7, 7, 7, 1, 3, 3, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 3, 3, 7, 7, 7, 7, 7, 3, 5,-1,-1,-1, 1,-1,-1,-1,-1,-1,-1, 5],
     [ 1,19,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 5,-1,-1, 1, 3, 5,-1, 1, 3, 3, 4, 3, 3, 5,-1,-1,-1,-1,-1,-1, 6,-1,-1,-1,-1,-1,-1,-1, 1, 3, 3, 3, 3, 3, 3, 3, 5,-1,-1,-1, 3,-1,-1,-1, 6,-1,-1, 5],
     [ 1, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 5,-1,-1, 1, 3, 5,-1, 1, 3, 3, 3, 3, 3, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 3, 8, 8, 1, 5,-1,-1,-1,-1, 3,-1,-1,-1,-1,-1,-1, 5],
     [ 1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 5,-1,-1, 1, 4, 5,-1, 1, 3, 3, 3, 3, 3, 5,-1, 6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 5],
     [ 1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 5,-1,-1, 1, 3, 5,-1, 1, 4, 3, 3, 5,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 5],
     [ 1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 2, 5,-1,-1, 1, 3, 5,-1, 1, 3, 3, 3, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 5],
     [ 1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 5,-1,-1, 1, 3, 5,-1, 1, 3, 3, 3, 5,-1,-1,-1,-1, 6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 5],
     [ 1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 5,-1,-1, 1, 3, 5,-1,-1,-1, 1, 3, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 6,-1,-1,-1,-1,-1,-1,-1,-1,23,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 5],
     [ 1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 5,-1,-1, 1, 3, 5,-1,-1,-1, 1, 3, 3, 19,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,-1,22,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,-1,-1,-1,-1,-1, 5],
     [ 1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 5,-1,-1, 1, 5,-1,-1,-1,-1,-1, 1, 3, 3, 3, 4, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 2, 3, 3, 3, 3, 3, 3, 7, 7, 3, 5,-1,-1,-1, 1, 3, 7, 7, 7, 7, 7, 5],
     [ 1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 5, 7, 7, 3, 5,-1,-1,-1,-1,-1,-1, 1, 3, 3, 3, 4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3, 3, 3, 3, 4, 3, 3, 3, 4, 3, 5,-1,-1,-1, 1, 3, 3, 3, 3, 3, 3, 5],
     [ 1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 3, 3, 3, 5,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 3, 3, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5,-1,-1,-1, 1, 3, 3, 3, 3, 3, 3, 5],
     [ 1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 4, 3, 3, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 5,-1,-1,-1, 1, 3, 3, 2, 3, 3, 3, 5],
     [ 1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 3, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 4, 5,-1,-1,-1, 1, 3, 3, 3, 3, 3, 3, 5],
     [ 1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 5,-1,-1,-1, 1, 3, 3, 3, 3, 3, 3, 5],
     [ 1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 6,-1,-1,-1,-1, 1, 3, 3, 3, 3, 3, 5],
     [ 1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 9,-1,-1,-1,-1,-1, 1, 3, 2, 3, 3, 5],
     [ 1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1, 3, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 9,-1,-1,-1,-1,10, 1, 3, 3, 3, 3, 5],
     [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

    // 0  = Sand
    // 1  = Sandstein Links
    // 2  = Sandstein Mitte (Riss Oben)
    // 3  = Sandstein Mitte
    // 4  = Sandstein Mitte (Riss Unten)
    // 5  = Sandstein Rechts
    // 6  = Sandstein Einzeln
    // 7 = Spikes Oben
    // 8  = Spikes Unten
    // 9  = Gate

    // 10 = Herz
    // 11 = Schlüssel
    // 12 = Hebel Rechts
    // 13 = Helel Links
    // 14 = Jumppad Links
    // 15 = Jumppad Mitte
    // 16 = Jumppad Rechts
    // 17 = Flamme Lila
    // 18 = Flamme Rot
    // 19 = Coin
    // 20 = Button Grün
    // 21 = Button Rot
 