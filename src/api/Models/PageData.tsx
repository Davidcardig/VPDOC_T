import  { Component } from 'react';
import DOMPurify from 'dompurify';
import { JSX } from 'react/jsx-runtime';

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

    // This method will be used in the render method to create the cards
    createCardsFromContent = (htmlContent: string) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        const sections: JSX.Element[] = [];

        // Iterate over each h4 element
        doc.querySelectorAll('h4').forEach((h4) => {
            // Find all the content that follows the h4 until the next h4
            let sibling = h4.nextElementSibling;
            const content = [];
            while (sibling && sibling.tagName !== 'H4') {
                content.push(sibling.outerHTML);
                sibling = sibling.nextElementSibling;
            }

            // Create a card component with the h4 as the title and the following content as the body
            sections.push(
                <div className="mb-1 justify-center items-center h-screen">
                    <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    <img className="w-full" src="https://source.unsplash.com/random/1600x900" alt="Sunset in the mountains">
                    </img>
                    <div className="card-header font-bold text-xl mb-2">{h4.textContent}</div>
                    <div className="card-body">
                        {/* Here, you would use a Tailwind CSS accordion or dropdown */}
                        <div className="content" dangerouslySetInnerHTML={{ __html: content.join('') }} />
                    </div>
                    </div>
                </div>
            );
        });

        return sections;
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

        cleanedContent = cleanedContent.replace(/<img[^>]*class="wp-image-[^"]*"[^>]*>/g, '');
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
                    const content = this.cleanContent(data[0].content.rendered);


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

        // Use the new method to create cards from the page content
        const cards = this.createCardsFromContent(pageData.content.rendered);

        return (
            <div>
                {cards}
            </div>
        );
    }
}

export default PageData;