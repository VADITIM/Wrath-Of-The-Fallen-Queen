const map = [
    [ 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ,3 ,3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ,3 ,5],
    [ 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 5,-1, 1, 3, 5,-1,-1,-1,-1,-1,-1,-1, 2, 3, 3, 3, 3, 3, 4, 3, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 2, 3, 4, 3, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3],
    [ 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3,-1,-1,-1, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1, 8, 8, 8, 8, 8, 8, 8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3, 2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,-1, 3],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,  ,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,  ,  ,-1, 3],
    [ 3, 1, 3, 3, 3, 3, 3, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,  ,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,  ,  ,-1, 3],
    [ 3, 3, 3, 3, 3, 3, 3, 3,-1,-1,-1,-1,-1,10,-1,-1,-1,-1,-1,  ,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,  ,  ,-1, 3],
    [ 3, 3, 3,-1,-1,-1, 1, 3, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,  ,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 3, 3, 5, 3],
    [ 3, 3,-1,-1,-1,-1,-1, 1, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 5,-1,-1,-1,-1,-1, 1, 3, 5, 7, 7, 7, 1, 3, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 3, 3, 3, 5,-1,-1,-1,-1, 1, 3, 3, 3, 2, 3],
    [ 3, 3,-1,-1,-1,-1,-1,-1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 5,-1,-1,-1,-1,-1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5,-1,-1,-1,-1,-1,-1,-1, 1, 3, 3, 3, 3, 3, 3, 3,-1,-1,-1,-1, 1, 3, 3, 3, 3, 3],
    [ 3, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3, 3, 3, 3,-1,-1,-1, 3, 3, 3,-1,-1,-1,-1,-1, 5, 4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 5, 3, 3, 3, 3, 1,-1,-1,-1,-1, 3, 3, 3, 3, 3, 3],
    [ 3, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3, 3,-1,-1,-1,-1,-1, 3, 3, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,  ,-1,-1, 3, 3, 3,-1,-1,-1,-1, 1, 3, 3, 3, 3, 3],
    [ 3, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 8, 8,-1,-1,-1,-1,-1, 3, 3, 3, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,  ,-1,-1, 3, 3, 5,-1,-1,-1,-1, 5, 3, 3, 3, 3, 3],
    [ 3, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3, 3, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3, 3, 3, 7, 7, 7, 7, 3, 3, 3, 3, 3, 3],
    [ 3, 3,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [ 3, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3, 3, 3],
    [ 3, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3, 3],
    [ 3, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3, 3],
    [ 3, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3, 3],
    [ 3, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3, 3,-1,-1,-1,-1,-1,-1, 1, 3, 3, 3, 3, 3, 5, 3,-1,-1,-1,-1,-1,-1,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3, 3],
    [ 3, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 3, 3, 5, 7, 7, 7, 7, 1, 5, 2,-1,-1, 4, 3, 3, 3,-1,-1,-1,-1,-1,-1,-1, 3,-1,-1,-1,-1,-1,-1,-1, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3, 3],
    [ 3, 3,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 3, 3, 5,-1,-1,-1,-1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5,-1,-1,-1,-1,-1,-1,-1, 3, 3, 3, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3, 3],
    [ 3, 3,-1,-1,-1,-1,-1,-1,-1, 7, 3, 2,-1,-1,-1, 8, 8, 8, 8, 8, 8, 8, 8, 2,-1,-1,-1,-1,-1, 3, 3,-1,-1, 3, 3, 3, 3, 3, 3,-1,-1,-1,-1,-1,-1,-1, 3, 3, 3, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3, 3, 3],
    [ 3, 3,-1,-1,-1,-1,-1, 1, 3, 3, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3, 3, 3, 3, 3, 3,-1,-1,-1,-1,-1,-1,-1, 3, 3, 3, 3, 4,-1,-1,-1,-1,-1,-1,-1,-1,10,-1, 3, 3, 3],
    [ 3, 3,  ,  ,  ,  , 1, 3, 3, 3, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3, 3, 3, 3, 3, 3,-1,-1,-1,-1,-1,-1,-1, 3, 3, 3, 3, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3, 3, 3],
    [ 3,-1,-1,-1,-1,-1,-1,-1,-1, 3, 3,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3, 3, 3, 3, 3, 3,-1,-1,-1,-1,-1,-1,-1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 5, 3],
    [ 3,-1,-1,-1,-1,-1,-1,-1,-1, 3, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3, 3, 3, 3, 3, 3,-1,-1,-1,-1,-1,-1,-1, 3, 3, 3, 3, 3, 2, 3, 3, 3, 2, 3, 3, 3, 4, 3, 3, 5, 3],
    [ 3,-1,-1,-1,-1,-1,-1,-1,-1, 3, 1,-1,-1,-1,-1, 7, 7, 7, 7, 7, 7, 7, 7, 1, 5,-1,-1,-1,-1,-1,-1,-1,-1, 3, 3, 3, 3, 3, 3, 7, 7, 7, 7, 7, 7, 7, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3],
    [ 3, 1, 5,-1,-1,-1,-1,-1,-1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 5,-1,-1,-1,-1,-1,-1,-1,-1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 5, 3],
    [ 3, 3,-1,-1,-1,-1,-1,-1,-1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5,-1,-1,-1,-1,-1,-1,-1, 3, 3, 3, 3, 3, 3, 3, 5,-1,-1, 1, 3,-1,-1, 3, 3, 3, 3, 3, 4, 3, 3, 3, 2, 3, 3, 3, 3, 3, 5, 3],
    [ 3, 1, 3, 5,-1,-1,-1, 1, 3, 3, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 3, 3, 3, 7,-1,-1,-1,-1,-1,-1, 3, 3, 3, 3, 3, 3,-1,-1,-1,-1,-1,-1,-1,-1, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 5, 3],
    [ 3, 3,-1,-1,-1,-1,-1,-1, 1, 3, 3, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 3, 3, 3, 3, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,  ,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 4, 2, 3],
    [ 3, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 5, 8, 8, 8, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,  ,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3, 3],
    [ 3, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3],
    [ 3, 3, 3, 3, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3],
    [ 3, 3, 3, 3, 3, 3, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3],
    [ 3, 3, 3, 3, 3, 3, 3,-1,-1,-1,-1,-1,-1,-1, 3, 3, 3, 3, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3],
    [ 3, 3, 3, 3, 3, 3, 3, 3, 3,-1,-1,-1,-1, 3, 3, 3, 3, 3, 3,-1,-1,-1,-1,-1,  ,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 3, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3],
    [ 3, 3, 3, 3, 3, 3, 3, 3, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,  ,-1,-1,-1,-1,-1,-1,-1,-1, 1, 5,-1,-1,-1,-1, 1, 5,-1,-1,-1,-1,-1,-1, 1, 3, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3],
    [ 3, 3, 3, 3, 3, 3, 3, 3,-1,-1,-1,-1,-1,-1,-1,-1,10,-1,10,-1,-1,-1,-1,-1,  ,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3,-1,-1,-1,-1, 3, 5,-1,-1,-1,-1,-1,-1, 1, 3, 3, 5,-1,-1,-1,-1,-1,-1,10,-1,-1,-1,-1,-1, 3],
    [ 3, 3, 3, 3, 3, 3, 3, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,  ,-1,-1,-1,-1,-1,-1,-1, 1, 3, 3, 7, 7, 7, 7, 3, 4, 2,-1,-1,-1,-1, 1, 3, 3, 3, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3],
    [ 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1,-1,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
];
