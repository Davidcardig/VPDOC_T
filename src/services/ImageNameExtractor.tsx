class ImageNameExtractor {
    private imageNames: string[] | null;

    constructor() {
        this.imageNames = null;
    }

    extractImageNames(message: string): string[] | null {
        const regex = /title_text= »(.*?) »/g;
        const matches = [...message.matchAll(regex)];
        if (matches.length > 0) {
            this.imageNames = matches.map(match => match[1].replace(/″/g, "'"));//problème de syntaxe de API Wordpress
            //this.imageNames.forEach(imageName => {
                //message = message.replace(`title_text= »${imageName} »`, '');
            //});
            console.log(this.imageNames);
        }
        return this.imageNames;
    }

    async fetchImageData(): Promise<string[] | null> {
        if (!this.imageNames) {
            return null;
        }

        const requests = this.imageNames.map(async (imageName) => {
            const response = await fetch(`https://www.visual-planning.com/documentation/fr/wp-json/wp/v2/media/?slug=${imageName}`);
            const data = await response.json();
            if (data && data.length > 0 && data[0].source_url) { // regarde si data[0].source_url existe
                return data[0].source_url;
            } else {
                console.error(`No source_url found for imageName: ${imageName}`);
                return null;
            }
        });

        return await Promise.all(requests);
    }


}



export default ImageNameExtractor