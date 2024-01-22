class ImageNameExtractor {
    private imageName: string | null;

    constructor() {
        this.imageName = null;
    }

    extractImageName(message: string): string | null {
        const regex = /title_text= »(.*?) »/;
        const match = message.match(regex);
        if (match && match[1]) {
            this.imageName = match[1];
            message = message.replace(regex, '');
        }
        return this.imageName;
    }

    async fetchImageData(): Promise<string | null> {
        if (!this.imageName) {
            return null;
        }

        const response = await fetch(`https://www.visual-planning.com/documentation/fr/wp-json/wp/v2/media/?slug=${this.imageName}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data && data.length > 0) {

            console.log(data[0].guid.rendered);

            return data[0].guid.rendered;

        }
        return null;
    }
}

export default ImageNameExtractor;