
class ImageNameExtractor {
    private imageNames: string[] | null;

    // Initialisation de la propriété imageNames à null
    constructor() {
        this.imageNames = null;
    }

    // Méthode pour extraire les noms d'images depuis un message
    extractImageNames(message: string): string[] | null {
        // Expression régulière pour trouver les noms d'images dans le message
        const regex = /title_text= »(.*?) »/g;
        const matches = [...message.matchAll(regex)];
        if (matches.length > 0) {
            // Remplacement des guillemets spéciaux par des apostrophes
            this.imageNames = matches.map(match => match[1].replace(/″/g, "'"));
        }
        return this.imageNames;
    }

    // Méthode asynchrone pour récupérer les données des images
    async fetchImageData(): Promise<string[] | null> {
        // Si aucun nom d'image n'a été extrait, retourner null
        if (!this.imageNames) {
            return null;
        }

        // Créer des requêtes pour chaque nom d'image
        const requests = this.imageNames.map(async (imageName) => {
            const response = await fetch(`https://www.visual-planning.com/documentation/fr/wp-json/wp/v2/media/?slug=${imageName}`);
            const data = await response.json();
            if (data && data.length > 0 && data[0].source_url) { // Vérifier si data[0].source_url existe
                return data[0].source_url;
            } else {
                console.error(`No source_url found for imageName: ${imageName}`);
                return null;
            }
        });

        // Attendre que toutes les requêtes soient complètes et retourner les résultats
        return await Promise.all(requests);
    }
}

export default ImageNameExtractor;