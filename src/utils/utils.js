// src/utils/utils.js
export const resizeText = (element, minFontSize, maxFontSize) => {
  let fontSize = maxFontSize;
  element.style.fontSize = `${fontSize}px`;

console.log(`Initial font size: ${fontSize}px`);

  // Resize the text to fit within both height and width constraints
  while ((element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth) && fontSize > minFontSize) {
    fontSize -= 1;
    element.style.fontSize = `${fontSize}px`;

    console.log(`Adjusted font size: ${fontSize}px`);
  }

  console.log(`Final font size: ${fontSize}px`)


};
