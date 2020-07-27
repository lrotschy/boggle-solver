import scrabble from 'scrabble';

const solver = {
  boardSize: 4,
  findAllWords: function (board) {
    const dictionary = scrabble(board.flat().join(''));
    let result = [];
    let i;
    let j;

    for (i = 0; i < board.length; i += 1) {
      for (j = 0; j < board[0].length; j += 1) {
        let words = this.findWords(board, dictionary, [i, j]);
        result = result.concat(words);
      }
    }

    return result.filter((word, idx) => {
      return idx === result.lastIndexOf(word);
    });
  },
  findWords: function (board, dictionary, start) {
    const string = board[start[0]][start[1]];
    const queue = [
      [string, [start]]
    ];
    let result = [];

    while (queue.length > 0) {
      const currentValue = queue.pop();
      const currentString = currentValue[0];
      const visitedCoordinates = currentValue[1];
      const lastCoordinates = visitedCoordinates[visitedCoordinates.length - 1];
      const neighbors = this.listNeighbors(lastCoordinates);

      neighbors.forEach(newCoordinates => {
        const v = newCoordinates[0];
        const h = newCoordinates[1];

        if (this.legitimateCoordinates(v, h) && !visitedCoordinates.includes(newCoordinates)) {
          let newString = currentString + board[v][h];

          if (newString.length > 2 && dictionary.includes(newString) && !result.includes(newString)) {
            result.push(newString);
          }

          if (this.prefix(newString, dictionary) && newString.length < 16) {
            let visited = visitedCoordinates.concat([newCoordinates]);
            queue.unshift([newString, visited]);
          }

        }
      })
    }
    return result;
  },
  legitimateCoordinates: function (v, h) {
    return (v >= 0 && v < this.boardSize && h >= 0 && h < this.boardSize);
  },
  listNeighbors: function (coordinates) {
    let v = coordinates[0];
    let h = coordinates[1];

    return [
      [v, h + 1],
      [v, h - 1],
      [v - 1, h],
      [v + 1, h],
      [v + 1, h + 1],
      [v + 1, h - 1],
      [v - 1, h + 1],
      [v - 1, h - 1]
    ]
  },
  prefix: function (string, dictionary) {
    let i;
    let reg = new RegExp('^' + string + '\\B');

    for (i = 0; i < dictionary.length; i += 1) {
      if (reg.test(dictionary[i])) {
        return true;
      }
    }
    return false;
  }
}

export default solver;
