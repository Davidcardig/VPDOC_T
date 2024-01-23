import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {CleanApi} from "../../services/CleanApi.tsx";
import DOMPurify from 'dompurify';
import ImageNameExtractor from "../../services/ImageNameExtractor"

interface PageContent {
    content: { rendered: string };
    slug: string;
    title: { rendered: string };
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
    const [imageData, setImageData] = useState<{ url: string, title: string }[] | null>(null); // New state for image data

    useEffect(() => {
        setIsLoading(true);
        fetchPageData(slug)
            .then(pageData => {
                if (pageData) {
                    const extractor = new ImageNameExtractor();
                    const div = document.createElement('div');
                    div.innerHTML = pageData.content.rendered;
                    const imageNames = extractor.extractImageNames(div.innerText);
                    if (imageNames) {
                        extractor.fetchImageData().then(imageData => {
                            if (imageData) {
                                setImageData(imageData.map((url, index) => ({ url, title: imageNames[index] })));
                            }
                        });
                    }
                    setData(pageData);
                    setIsLoading(false);
                }
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

    let content = data.content.rendered;

    //clean html content with textcontent
    const div = document.createElement('div');
    div.innerHTML = content;
     content = div.textContent || div.innerText ;
    console.log(content);



    if (imageData) {
        imageData.forEach(image => {
            content = content.replace(`title_text= »${image.title} »`, `<img src="${image.url}" alt="${image.title}"/>`);
        });
    }

    return (
        <div>
            <h1>{data.title.rendered}</h1>
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    )

}

export default NouvellePage;