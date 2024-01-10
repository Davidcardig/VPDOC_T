import  { Component } from 'react';
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
}

class PageData extends Component<PageDataProps, PageDataState> {
    constructor(props: PageDataProps) {
        super(props);
        this.state = {
            pageData: null,
            isLoading: true,
            error: null
        };
    }

    modifyH4Elements = (htmlString: string): string => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const h4Elements = doc.querySelectorAll('h4');

        h4Elements.forEach(h4 => {
            h4.style.color = 'blue'; // Exemple de modification
            h4.classList.add('ma-classe-personnalisee');
        });

        return doc.body.innerHTML;
    };

    cleanContent = (content: string): string => {
        let cleanedContent = content;

        // Supprimer les shortcodes de type [et_pb...]
        cleanedContent = cleanedContent.replace(/\[et_pb_[^\]]*\]/g, '');

        // Supprimer des motifs spécifiques supplémentaires
        const patternsToRemove = [
            /\[\/et_pb_search\]\[\/et_pb_column\]\[\/et_pb_image\]\[\/et_pb_column\]\[\/et_pb_row\]\[\/et_pb_section\]/g,
            /\[\/et_pb_text\]\[\/et_pb_column\]/g,
            /tabindex='0' role='link'>.*? border_width_all__hover= »1px »\]/g,
            /\[\/et_pb_text\]\[\/et_pb_column\]\[\/et_pb_row\]\[\/et_pb_section\]/g,
            /\[\/et_pb_row\]/g,/\[\/et_pb_section\]/g,/\[\/et_pb_column\]/g,/\[\/et_pb_image\]/g,/\[\/et_pb_text\]\[\/et_pb_divider]\]/g,/\[\/et_pb_text\]/g,/\[\/et_pb_divider\]/g,
        ];

        patternsToRemove.forEach(pattern => {
            cleanedContent = cleanedContent.replace(pattern, '');
        });

        return cleanedContent;
    }

    componentDidMount() {
        fetch(`https://www.visual-planning.com/documentation/fr/wp-json/wp/v2/pages/?slug=${this.props.slug}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data && data.length > 0) {
                    let content = this.cleanContent(data[0].content.rendered);
                    content = this.modifyH4Elements(content); // Appliquer les modifications aux éléments h4

                    // Utilisez le contenu modifié ici
                    const cleanedData = {
                        ...data[0],
                        content: {
                            ...data[0].content,
                            rendered: DOMPurify.sanitize(content, { USE_PROFILES: { html: true } })
                        }
                    };
                    this.setState({ pageData: cleanedData, isLoading: false });
                } else {
                    this.setState({ isLoading: false });
                }
            })
            .catch(error => {
                this.setState({ error: error.message, isLoading: false });
            });
    }

    render() {
        const { isLoading, error, pageData } = this.state;

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
                <h3 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{pageData.title.rendered}</h3>
                <div dangerouslySetInnerHTML={{ __html: pageData.content.rendered }} />
            </div>
        );
    }
}

export default PageData;