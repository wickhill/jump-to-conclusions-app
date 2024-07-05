// src/utils/utils.js
export const resizeText = (element, minFontSize, maxFontSize) => {
  // Start with the maximum font size
  let fontSize = maxFontSize;
  element.style.fontSize = `${fontSize}px`;

  // console.log(`Initial font size: ${fontSize}px`);

  // Loop to resize the text until it fits within the container
  while ((element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth) && fontSize > minFontSize) {
    // console.log(`Before adjustment - scrollHeight: ${element.scrollHeight}, clientHeight: ${element.clientHeight}`);
    // console.log(`Before adjustment - scrollWidth: ${element.scrollWidth}, clientWidth: ${element.clientWidth}`);

    // Reduce the font size by 1px
    fontSize -= 1;
    element.style.fontSize = `${fontSize}px`;

    // console.log(`Adjusted font size: ${fontSize}px`);
    // console.log(`After adjustment - scrollHeight: ${element.scrollHeight}, clientHeight: ${element.clientHeight}`);
    // console.log(`After adjustment - scrollWidth: ${element.scrollWidth}, clientWidth: ${element.clientWidth}`);
  }

  // Ensure single words and specific conditions are handled correctly
  const words = element.textContent.split(' ');
  // console.log(`Words: ${words}`);
  if (words.length === 1) {
    element.style.whiteSpace = 'nowrap'; // Prevents the text from wrapping
    fontSize = Math.min(maxFontSize, fontSize - 1); // Slightly decrease the font size for single words
    // console.log(`Single word adjustment - font size: ${fontSize}px`);
  } else if (words.length === 2) {
    fontSize = Math.min(maxFontSize, fontSize - 3); // Slightly decrease the font size for two words
    // console.log(`Two words adjustment - font size: ${fontSize}px`);
  } else if (words[0].length >= 6 || words[0] === "ACCEPT") {
    fontSize = Math.min(maxFontSize, fontSize - 3); // Slightly decrease the font size if the first word is longer than 6 characters
    // console.log(`Long first word adjustment - font size: ${fontSize}px`);
  } else {
    element.style.whiteSpace = 'normal'; // Allows normal wrapping for more than two words
    // console.log(`Normal wrapping - font size: ${fontSize}px`);
  }

  // Ensure the font size is set properly for all cases
  element.style.fontSize = `${fontSize}px`;
  // console.log(`Final font size: ${fontSize}px`);
};
