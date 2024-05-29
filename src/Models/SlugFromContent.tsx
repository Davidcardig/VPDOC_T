export class SlugFromContent {
    private  updateLinks: (links: { slug: string, linkText: string }[]) => void;
    //private updateContent: (content: string) => void;

    constructor(updateLinks: (links: { slug: string, linkText: string }[]) => void, /*updateContent: (content: string) => void*/) {
        this.updateLinks = updateLinks;
    }

    extractSlugFromHref(href: string | null): string | null {
        if (!href) return null;
        const match = href.match(/\/([a-zA-Z0-9-]+)\/?$/);
        return match ? match[1] : null;
    }


    extractSlugsFromContent(htmlContent: string): string {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        const anchors = doc.querySelectorAll('a');

        const links = Array.from(anchors).map(anchor => {
            const slug = this.extractSlugFromHref(anchor.getAttribute('href'));
            const linkText = anchor.textContent || '';
            // On ajoute attribut href
            if (slug) {
                anchor.setAttribute('href', `http://127.0.0.1:5173/#/nouvelle-page/${slug}`);

            }
            return { slug: slug || '', linkText };
        });

        this.updateLinks(links);
        // Retourne le contenu HTML modifié
        return doc.body.innerHTML;
    }



}
