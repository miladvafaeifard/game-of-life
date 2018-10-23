const RULES = [
    { isAlive: true, neighbours: 2 },
    { isAlive: true, neighbours: 3 },
    { isAlive: false, neighbours: 3 }
];

const NEIGHBOURS = [
    {x: -1, y: 1}, {x: 0, y: 1}, {x:1 , y: 1},
    {x: -1, y: 0},               {x: 1, y: 0},
    {x: -1, y:-1}, {x: 0, y:-1}, {x: 1, y:-1}
];

class GameOfLife {
    constructor(){}
    static getRules(){
        return RULES;
    }   
}

const willAlive = (isAlive, neighbours) => {
    return GameOfLife
        .getRules()
        .some( rule => rule.isAlive === isAlive && rule.neighbours === neighbours );
}

const isAliveInGeneration = (cell, generation) => {
    return generation.some( c => c.x === cell.x && c.y === cell.y );
};

const neighbours = (cell) => {
    return NEIGHBOURS.map( c => ({x: c.x + cell.x, y: c.y + cell.y}) );
};

const neighboursNumWithGeneration = (cell, generation) => {
    // return neighbours(cell).reduce( (currentCell, nextCell) => {
    //     return currentCell + (isAliveInGeneration(nextCell, generation));
    // }, 0);
    // equivalent ⏬
    return neighbours(cell).filter( c => isAliveInGeneration(c, generation)).length;
};

const combineCandidates = (generation) => {
    return generation.reduce( (condidates, cell) => [...condidates, ...neighbours(cell), cell] , []);
}

const isDeathInGeneration = (cell, generation) => {
    return !isAliveInGeneration(cell, generation);
}

const nextGeneration = (generation) => {
    return combineCandidates(generation).reduce( (nextGeneration, cell) => 
        isDeathInGeneration(cell, nextGeneration)
        && willAlive(isAliveInGeneration(cell, generation), neighboursNumWithGeneration(cell, generation)) ? 
            [cell, ...nextGeneration] : nextGeneration
    , []);
};

module.exports = {
    nextGeneration,
    combineCandidates,
    neighboursNumWithGeneration,
    NEIGHBOURS,
    willAlive,
    isAliveInGeneration,
    neighbours,
}