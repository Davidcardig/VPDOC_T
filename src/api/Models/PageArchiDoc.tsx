import { Component, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal} from 'react';
import {Link} from "react-router-dom";

interface PageDataProps {
    slug: string;
}

interface PageContent {
    title: { rendered: string };
    content: { rendered: string };
}

interface PageDataState {
    pageData: PageContent | null;
    isLoading: boolean;
    error: string | null;
    slugs: string[]; // Ajout d'une propriété pour les slugs
}

class PageArchiDoc extends Component<PageDataProps, PageDataState> {

    constructor(props: PageDataProps) {
        super(props);
        this.state = {
            pageData: null,
            isLoading: true,
            error: null,
            slugs: [] // Initialisation des slugs
        };
    }

    componentDidMount() {
        this.fetchPageData(this.props.slug);
    }

    fetchPageData(slug: string) {
        fetch(`https://www.visual-planning.com/documentation/fr/wp-json/wp/v2/pages/?slug=${slug}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data && data.length > 0) {
                    this.setState({
                        pageData: data[0],
                        isLoading: false
                    });
                    this.extractSlugsFromContent(data[0].content.rendered);
                } else {
                    this.setState({isLoading: false});
                }
            })
            .catch(error => {
                this.setState({error: error.message, isLoading: false});
            });
    }


    extractSlugsFromContent(htmlContent: string) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        const anchors = doc.querySelectorAll('a');
        const links = Array.from(anchors).map(anchor => {
            const slug = this.extractSlugFromHref(anchor.getAttribute('href'));
            const linkText = anchor.textContent;
            if (slug) {
                anchor.setAttribute('href', `/nouvelle-page/${slug}`); // Remplacer par un nouveau lien
            }
            return {slug, linkText};
        }).filter((link): link is { slug: string, linkText: string } => link.slug !== null);

        this.setState({links});

        // Mettre à jour le contenu rendu
        const newHtmlContent = doc.body.innerHTML;
        this.setState(prevState => ({
            pageData: prevState.pageData ? {
                ...prevState.pageData,
                content: {...prevState.pageData.content, rendered: newHtmlContent}
            } : null
        }));

    }

    extractSlugFromHref(href: string | null): string | null {
        if (!href) return null;
        const match = href.match(/\/([a-zA-Z0-9-]+)$/);
        return match ? match[1] : null;
    }


    render() {
        const {isLoading, error, pageData, links} = this.state;
        if (isLoading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error}</div>;
        }

        if (!pageData) {
            return <div>Page not found</div>;
        }

        return (
            <div>
                <div>
                    <ul>
                        {links.map((link: {
                            slug: any;
                            linkText: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined;
                        }, index: Key | null | undefined) =>  <li key={index}>  <Link to={`/nouvelle-page/${link.slug}`}>{link.linkText}</Link></li>)}
                    </ul>
                </div>
            </div>
        );
    }
}

export default PageArchiDoc;