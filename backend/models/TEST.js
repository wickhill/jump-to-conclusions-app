// Here, we're splitting a user's question into words and removing punctuation
// backendUtils.js
function extractKeywords(inputText) {
    if (!inputText) return [];
    return inputText
        .toLowerCase()
        .match(/\b(\w+)\b/g) || [];
}

module.exports = {
    extractKeywords,
};