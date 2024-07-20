// Here, we're splitting a user's question into words and removing punctuation
// backendUtils.js
function extractKeywords(text) {
    if (!text) return [];
    return text
        .toLowerCase()
        .match(/\b(\w+)\b/g) || [];
}

module.exports = {
    extractKeywords,
};
