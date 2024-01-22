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
    const [imageUrl, setImageUrl] = useState<string | null>(null); // Ajout d'un nouvel état pour l'URL de l'image

    useEffect(() => {
        setIsLoading(true);
        fetchPageData(slug)
            .then(pageData => {
                if (pageData) {
                    const extractor = new ImageNameExtractor();
                    const div = document.createElement('div');
                    div.innerHTML = pageData.content.rendered;
                    const cleanedContent = div.textContent || div.innerText || '';
                    const imageName = extractor.extractImageName(cleanedContent);
                    extractor.fetchImageData().then((imageUrl: any) => {
                        if (imageUrl) {
                            setImageUrl(imageUrl); // Mise à jour de l'état de l'URL de l'image
                            const img = `<img src="${imageUrl}" />`;
                            pageData.content.rendered = pageData.content.rendered.replace(`tabindex='0' role='link'>${imageName}`, `tabindex='0' role='link'>${imageName}${img}`);
                        }
                        setData(pageData);
                        setIsLoading(false);
                    });
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

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">{data.title.rendered}</h1>
            <div dangerouslySetInnerHTML={{ __html: data.content.rendered }} />
            {imageUrl && <img className="h-auto max-w-lg transition-all duration-300 rounded-lg blur-sm hover:blur-none" src={imageUrl} alt="Extracted" />} {/* Affichage de l'image si l'URL est disponible */}
        </div>
    );
};

export default NouvellePage;