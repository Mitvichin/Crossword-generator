const getPotentialIntersectionsForWord = (wordInfo, placedWords) => {
  const wordChars = [...wordInfo.text];
  const potentialIntersectionInfos = [];

  placedWords.forEach((placedWord) => {
    const { isVertical, startingCordinates } = placedWord;
    wordChars.forEach((char) => {
      const startX = startingCordinates.x;
      const startY = startingCordinates.y;

      [...placedWord.text].forEach((placedChar, k) => {
        if (placedChar === char) {
          const cordinates = {
            placedX: isVertical ? startX + k : startX,
            placedY: isVertical ? startY : startY + k
          };
          potentialIntersectionInfos.push({
            isPlacedWordVertical: isVertical,
            char,
            ...cordinates
          });
        }
      });
    });
  });

  return potentialIntersectionInfos;
};

export { getPotentialIntersectionsForWord };
