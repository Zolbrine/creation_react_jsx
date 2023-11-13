class App {
    constructor(file) {
      this.file = "test.extention";
    }
  
    fileCherche() {
      fetch(this.file)
        .then(response => response.text())
        .then(data => {
          console.log('Contenu du fichier :', data);
          this.domContent(data);
        })
    }
  
    domContent(data) {
        const startTag = "App.domContent(<div>";
        const endTag = "</div>);";
    
        // Trouver la position de la première occurrence de "App.domContent(<div>"
        let startIndex = data.indexOf(startTag);
    
        // Si la chaîne est trouvée, continuer le traitement
        while (startIndex !== -1) {
          // Ignorer le préfixe "App.domContent(<div>"
          const contentWithoutPrefix = data.substring(startIndex + startTag.length);
    
          // Trouver la position de la première occurrence de "</div>);"
          const endIndex = contentWithoutPrefix.indexOf(endTag);
    
          // Si la chaîne est trouvée, extraire le contenu HTML entre les balises
          if (endIndex !== -1) {
            const extractedHTML = contentWithoutPrefix.substring(0, endIndex);
            document.querySelector("#run").innerHTML += extractedHTML;
    
            // Exécuter le code JavaScript avant et après la balise "</div>);"
            const jsCodeBefore = data.substring(0, startIndex);
            const jsCodeAfter = data.substring(startIndex + startTag.length + endIndex + endTag.length);
    
            if (jsCodeBefore.trim() !== "") {
              eval(jsCodeBefore);
            }
            if (jsCodeAfter.trim() !== "") {
              eval(jsCodeAfter);
            }
    
            // Trouver la position de la prochaine occurrence de "App.domContent(<div>"
            startIndex = data.indexOf(startTag, startIndex + 1);
          } else {
            break;
          }
        }
    }
}
  
let html_generator = new App();
html_generator.fileCherche(); 