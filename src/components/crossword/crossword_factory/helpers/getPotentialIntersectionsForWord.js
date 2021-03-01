const getPotentialIntersectionsForWord = (wordInfo, placedWords) => {
  const wordChars = [...wordInfo.text];
  const potentialIntersectionsInfo = [];

  placedWords.forEach((placedWord) => {
    const { isVertical, startingCordinates } = placedWord;
    const startX = startingCordinates.x;
    const startY = startingCordinates.y;

    wordChars.forEach((char) => {
      //if the placed word includes the charecter calculate the potential intersection coordinate and save them
      if (placedWord.text.includes(char)) {
        [...placedWord.text].forEach((placedChar, k) => {
          if (placedChar === char) {
            const cordinate = {
              placedX: isVertical ? startX + k : startX,
              placedY: isVertical ? startY : startY + k
            };

            potentialIntersectionsInfo.push({
              isPlacedWordVertical: isVertical,
              char,
              ...cordinate
            });
          }
        });
      }
    });
  });
  return potentialIntersectionsInfo;
};

export { getPotentialIntersectionsForWord };
