const { 
    willAlive, 
    isAliveInGeneration, 
    neighbours,
    NEIGHBOURS,
    neighboursNumWithGeneration,
    combineCandidates,
    nextGeneration
} = require('./../src/index');

const blinker = [
    {x: 1, y: 0},
    {x: 1, y: 1},
    {x: 1, y: 2},
];

const blinker2 = [
    {x: 2, y: 1},
    {x: 1, y: 1},
    {x: 0, y: 1},
];

test('Game Of Life', () => {
    expect(willAlive(true, 2)).toBe(true);
    expect(willAlive(true, 3)).toBe(true);
    expect(willAlive(false, 3)).toBe(true);
    expect(willAlive(false, 2)).toBe(false);
    expect(willAlive(true, 4)).toBe(false);
});

test('check a cell where is alive in generation boundary', () => {

    expect(isAliveInGeneration({x: 1, y: 0}, blinker)).toBe(true);
    expect(isAliveInGeneration({x: 1, y: -1}, blinker)).toBe(false);
});

test('Check neighbours', () => {
    expect(neighbours({x: 0, y: 0}).length).toEqual(8);
    expect(neighbours({x: 0, y: 0})).toEqual(NEIGHBOURS);
});

test('a cell check number of neighbours besides a generation', () => {
    expect(neighboursNumWithGeneration({x: 0, y: 0}, blinker)).toEqual(2);
    expect(neighboursNumWithGeneration({x: 0, y: 1}, blinker)).toEqual(3);
    expect(neighboursNumWithGeneration({x: 0, y: 3}, blinker)).toEqual(1);
});

test('Check new candidates that combines with neigbours', () => {
    expect(combineCandidates(blinker).length).toEqual(3*9);
});

test('check next generation', () => {
    expect(nextGeneration(nextGeneration(blinker))).toEqual(blinker);
    expect(nextGeneration(blinker)).toEqual(blinker2);
});