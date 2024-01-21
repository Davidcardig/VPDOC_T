import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {CleanApi} from "../../services/CleanApi.tsx";
import DOMPurify from 'dompurify';



interface PageContent {
    content: { rendered: string };
    slug: string;
}

const fetchPageData = async (slug: string | undefined) => {
    const response = await fetch(`https://www.visual-planning.com/documentation/fr/wp-json/wp/v2/pages/?slug=${slug}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (data && data.length > 0) {
        const cleanInstance = new CleanApi();
        const content = cleanInstance.cleanContent(data[0].content.rendered);
        return {
            ...data[0],
            content: {
                ...data[0].content,
                rendered: DOMPurify.sanitize(content, { USE_PROFILES: { html: true } })
            }
        };
    }


};

const NouvellePage = () => {
    const { slug } = useParams<{ slug: string }>();
    const [data, setData] = useState<PageContent | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        fetchPageData(slug)
            .then(pageData => {
                setData(pageData);
                setIsLoading(false);

            })
            .catch(error => {
                console.error(error);
                setError(error.message);
                setIsLoading(false);
            });
    }, [slug]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!data) {
        return <div>Page not found</div>;
    }

    return (
        <div>
            <h1>{data.slug}</h1>
            <div dangerouslySetInnerHTML={{ __html: data.content.rendered }} />
        </div>
    );
};

export default NouvellePage;