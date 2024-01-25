export class SlugFromContent {
    private updateLinks: (links: { slug: string, linkText: string }[]) => void;
    //private updateContent: (content: string) => void;

    constructor(updateLinks: (links: { slug: string, linkText: string }[]) => void, /*updateContent: (content: string) => void*/) {
        this.updateLinks = updateLinks;
       // this.updateContent = updateContent;
    }
    extractSlugFromHref(href: string | null): string | null {
        if (!href) return null;
        const match = href.match(/\/([a-zA-Z0-9-]+)$/);
        return match ? match[1] : null;
    }


    extractSlugsFromContent(htmlContent: string) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        const anchors = doc.querySelectorAll('a');
        const links = Array.from(anchors).map(anchor => {
            const slug = this.extractSlugFromHref(anchor.getAttribute('href'));
            const linkText = anchor.textContent || ''; // Assure-toi que linkText est toujours une chaîne
            return { slug, linkText };
        }).filter((link): link is { slug: string, linkText: string } => link.slug !== null);


        this.updateLinks(links);
        //const newHtmlContent = doc.body.innerHTML;
        //this.updateContent(newHtmlContent);

    }



}
