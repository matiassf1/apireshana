function summarizeText(text, maxLength = Math.floor(text.length * 0.66)) {
    // Eliminar los saltos de línea y los espacios innecesarios
    text = text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
  
    // Dividir el texto en oraciones
    const sentences = text.match(/[^\.!\?]+[\.!\?]+/g);
  
    // Calcular la puntuación de cada oración
    const scores = sentences?.map(sentence => {
      const words = sentence.split(' ');
      const count = words.length;
      let score = 0;
  
      words.forEach(word => {
        if (/^[a-zA-Z]+$/.test(word)) { // Only count words containing letters
          if (word.length > 6) {
            score++;
          }
        }
      });
  
      return score / count;
    });
  
    // Seleccionar las oraciones con mayor puntuación
    let summary = '';
    let length = 0;
  
    scores?.forEach((score, index) => {
      if (length < maxLength && score > 0) {
        summary += sentences[index];
        length += sentences[index].length;
      }
    });
  
    return summary.trim();
  }
  

function divideConcepts(text) {
    const sentences = text.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
    const concepts = {};
    const threshold = 0.5; // Minimum score required to assign a sentence to an existing concept
  
    for (let sentence of sentences) {
      const words = sentence.split(" ");
      let maxScore = 0;
      let selectedConcept = "";
  
      for (let concept in concepts) {
        const conceptWords = concepts[concept].filter(word => /^[a-zA-Z]+$/.test(word)); // Only consider words containing letters
        let score = words.filter(word => conceptWords.includes(word)).length / words.length;
  
        if (score > maxScore) {
          maxScore = score;
          selectedConcept = concept;
        }
      }
  
      if (maxScore >= threshold) {
        concepts[selectedConcept].push(sentence);
      } else {
        const newConcept = `Concept ${Object.keys(concepts).length + 1}`;
        concepts[newConcept] = [sentence];
      }
    }
  
    return Object.values(concepts);
  }
  
  
  module.exports = {
    summarizeText,
    divideConcepts
  };
  