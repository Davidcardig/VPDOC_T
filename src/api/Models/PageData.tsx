import  { Component } from 'react';
import DOMPurify from 'dompurify';
import { Card } from "../../components/Card";
import {CleanApi} from "../../CleanApi.tsx";

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
    private cardInstance: Card;
    private cleanInstance: CleanApi;

    constructor(props: PageDataProps) {
        super(props);
        this.state = {
            pageData: null,
            isLoading: true,
            error: null
        };

        this.cardInstance = new Card();
        this.cleanInstance = new CleanApi();

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
                    const content = this.cleanInstance.cleanContent(data[0].content.rendered);


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
    const cards = this.cardInstance.createCardsFromContentH4(pageData.content.rendered);

        return (
            <div>
                {cards}
            </div>
        );
    }


}

export default PageData;