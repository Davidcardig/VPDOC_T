class ImageNameExtractor {
    private imageNames: string[] | null;

    constructor() {
        this.imageNames = null;
    }

    extractImageNames(message: string): string[] | null {
        const regex = /title_text= »(.*?) »/g;
        const matches = [...message.matchAll(regex)];
        if (matches.length > 0) {
            this.imageNames = matches.map(match => match[1]);
            //this.imageNames.forEach(imageName => {
                //message = message.replace(`title_text= »${imageName} »`, '');
            //});
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
            if (data) { // Check if data.guid exists

                return data[0].source_url;

            } else {
                console.error(`No guid found for imageName: ${imageName}`);
                return null;
            }

        });

        return await Promise.all(requests);
    }


}



export default ImageNameExtractor