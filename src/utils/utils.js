// src/utils/utils.js
export const resizeText = (element, minFontSize, maxFontSize) => {
  // Start with the maximum font size
  let fontSize = maxFontSize;
  element.style.fontSize = `${fontSize}px`;

  console.log(`Initial font size: ${fontSize}px`);

  // Loop to resize the text until it fits within the container
  while ((element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth) && fontSize > minFontSize) {
    console.log(`Before adjustment - scrollHeight: ${element.scrollHeight}, clientHeight: ${element.clientHeight}`);
    console.log(`Before adjustment - scrollWidth: ${element.scrollWidth}, clientWidth: ${element.clientWidth}`);

    // Reduce the font size by 1px
    fontSize -= 1;
    element.style.fontSize = `${fontSize}px`;

    console.log(`Adjusted font size: ${fontSize}px`);
    console.log(`After adjustment - scrollHeight: ${element.scrollHeight}, clientHeight: ${element.clientHeight}`);
    console.log(`After adjustment - scrollWidth: ${element.scrollWidth}, clientWidth: ${element.clientWidth}`);
  }

  // Ensure single words are not wrapped unnecessarily
  const words = element.textContent.split(' ');
  if (words.length === 1 && fontSize >= maxFontSize) {
    element.style.whiteSpace = 'nowrap'; // Prevents the text from wrapping
    element.style.fontSize = `${Math.min(maxFontSize, fontSize - 1)}px`; // Slightly decrease the font size for single words
    console.log(`Single word adjustment - font size: ${element.style.fontSize}`);
  } else if (words.length === 2 && fontSize >= maxFontSize) {
    element.style.fontSize = `${Math.min(maxFontSize, fontSize - 3)}px`; // Slightly decrease the font size for two words
    console.log(`Two words adjustment - font size: ${element.style.fontSize}`);
  } else {
    element.style.whiteSpace = 'normal'; // Allows normal wrapping for more than two words
  }

  console.log(`Final font size: ${fontSize}px`);
};
