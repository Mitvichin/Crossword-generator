export const trimGrid = (grid) => {
  let topRow = grid.length;
  let bottomRow = -1;
  let leftCol = grid[0].length;
  let rightCol = -1;

  // Find the boundaries of the populated area
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] !== null && grid[i][j] !== '') {
        // assuming non-empty cells are not null or empty strings
        topRow = Math.min(topRow, i);
        bottomRow = Math.max(bottomRow, i);
        leftCol = Math.min(leftCol, j);
        rightCol = Math.max(rightCol, j);
      }
    }
  }

  // If the matrix is empty or doesn't contain any populated cells, return an empty matrix
  if (topRow > bottomRow || leftCol > rightCol) {
    return [];
  }

  // Slice the matrix to include only the populated region
  let trimmedGrid = [];
  for (let i = topRow; i <= bottomRow; i++) {
    trimmedGrid.push(grid[i].slice(leftCol, rightCol + 1));
  }

  return trimmedGrid;
};
