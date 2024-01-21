import { Component } from 'react';
import { Link } from "react-router-dom";
import {SlugFromContent} from "../../services/SlugFromContent.tsx";
import {CleanApi} from "../../services/CleanApi.tsx";
import DOMPurify from 'dompurify';
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
    links: { slug: string, linkText: string }[]; // Uniformisation de la propriété
}

class PageArchiDoc extends Component<PageDataProps, PageDataState> {
    private slugInstance: SlugFromContent;
    private cleanInstance: CleanApi;

    constructor(props: PageDataProps) {
        super(props);
        this.state = {
            pageData: null,
            isLoading: true,
            error: null,
            links: [] // Initialisation des liens
        };

        this.slugInstance = new SlugFromContent(
            (links) => {
                this.setState({ links });
            },
            (content) => {
                this.setState((prevState) => {
                    if (prevState.pageData) {
                        return {
                            pageData: {
                                ...prevState.pageData,
                                content: {
                                    ...prevState.pageData.content,
                                    rendered: content
                                }
                            }
                        };
                    }
                    return null;
                });
            }
        );
        this.cleanInstance = new CleanApi();

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
                    this.slugInstance.extractSlugsFromContent(data[0].content.rendered);
                    const content = this.cleanInstance.cleanContent(data[0].content.rendered);

                    const cleanedData = {
                        ...data[0],
                        content: {
                            ...data[0].content,
                            rendered: DOMPurify.sanitize(content, { USE_PROFILES: { html: true } })
                        }
                    };

                    this.setState({ pageData: cleanedData, isLoading: false });
                } else {
                    this.setState({isLoading: false});
                }
            })
            .catch(error => {
                this.setState({error: error.message, isLoading: false});
            });
    }



    render() {
        const { isLoading, error, pageData, links } = this.state;
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
                        {links.map((link, index) => (
                            <li key={index}>
                                <Link to={`/nouvelle-page/${link.slug}`}>{link.linkText}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default PageArchiDoc;