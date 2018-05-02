export function getPreviousBodyPart(bodyPartIndex, scoreSheet) {
  let previousIndex;

  if (bodyPartIndex === 0) {
    previousIndex = scoreSheet.size - 1;
  } else if (bodyPartIndex > 0) {
    previousIndex = bodyPartIndex - 1;
  }

  return scoreSheet.keySeq().get(previousIndex);
}


export function getNextBodyPart(bodyPartIndex, scoreSheet) {
  let nextIndex;

  if (bodyPartIndex === scoreSheet.size - 1) {
    nextIndex = 0;
  } else if (bodyPartIndex < scoreSheet.size - 1) {
    nextIndex = bodyPartIndex + 1;
  }

  return scoreSheet.keySeq().get(nextIndex);
}
