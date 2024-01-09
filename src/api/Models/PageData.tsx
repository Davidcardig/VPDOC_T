import { useEffect, useState } from 'react';
import DOMPurify from "dompurify";

const PageData = () => {
    interface PageData {
        title: { rendered: string };
        content: { rendered: string };
    }

    const [pageData, setPageData] = useState<PageData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    function cleanContent(content: string) {
        // Remplacer les shortcodes de type [et_pb... ] par une chaîne vide
        return content.replace(/\[et_pb_[^\]]*\]/g, '');
    }




    useEffect(() => {

        const cachedData = localStorage.getItem('pageData');
        if (cachedData) {
            setPageData(JSON.parse(cachedData));
            setIsLoading(false);
            return;
        }
        fetch('https://www.visual-planning.com/documentation/fr/wp-json/wp/v2/pages/?slug=icone')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data && data.length > 0) {
                    const cleanedData = {
                        ...data[0],
                        content: {
                            ...data[0].content,
                            rendered: DOMPurify.sanitize(cleanContent(data[0].content.rendered), { USE_PROFILES: { html: true } })
                        }
                    };
                    localStorage.setItem('pageData', JSON.stringify(cleanedData));
                    setPageData(cleanedData);
                }
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

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

};

export default PageData;