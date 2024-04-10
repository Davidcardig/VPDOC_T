import { Component } from 'react';
import {SlugFromContent} from "../../services/SlugFromContent.tsx";
import {CleanApi} from "../../services/CleanApi.tsx";
import DOMPurify from 'dompurify';


interface PageDataProps {
    slug: string;
    TextColor: string ;
}

interface PageContent {
    title: { rendered: string };
    content: { rendered: string };
}

interface PageDataState {
    pageData: PageContent | null;
    isLoading: boolean;
    error: string | null;
    links: { slug: string, linkText: string }[];
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
            links: [] as { slug: string, linkText: string }[],
        };

        this.slugInstance = new SlugFromContent(
            (links) => {
                this.setState({ links });
            },
        );
        this.cleanInstance = new CleanApi();
    }



    fetchPageData() {
        fetch(`https://www.visual-planning.com/documentation/fr/wp-json/wp/v2/pages/?slug=${this.props.slug}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data && data.length > 0) {
                    let content = this.cleanInstance.cleanPageArchiDoc(data[0].content.rendered);
                    content = this.slugInstance.extractSlugsFromContent(content);
                    console.log(content);

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

    componentDidMount() {
        this.fetchPageData();
    }


    render() {
        const { isLoading, error, pageData, links } = this.state;
        console.log(links);
        if (isLoading) {
            return <div className="text-center relative mt-[100px]">
                <div role="status">
                    <svg aria-hidden="true" className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>;
        }

        if (error) {
            return <div>Error: {error}</div>;
        }

        if (!pageData) {
            return <div>Page not found</div>;
        }

        return (

        <div>
            <header className="bg-white shadow">
            </header>
            <div>
                <style>
                    {`
                    dl dt span a:hover {
    color: ${this.props.TextColor}!important;
    
}
`}
                </style>
                <div className="content" dangerouslySetInnerHTML={{ __html: pageData.content.rendered }} />
            </div>
        </div>
        );
    }
}

export default PageArchiDoc;