import React, { useState, useEffect } from 'react';
import {SlugFromContent} from "../Models/SlugFromContent.tsx";
import DOMPurify from 'dompurify';
import fetchPage from "../Models/fetchPage.tsx"; // Assurez-vous que le chemin d'accès est correct
import ListDocumentPage from "../Views/ListDocumentPage.tsx";

interface PageDataProps {
    slug: string;
    TextColor: string ;
}

interface PageContent {
    title: { rendered: string };
    content: { rendered: string };
}

const PageArchiDoc: React.FC<PageDataProps> = (props) => {
    const [pageData, setPageData] = useState<PageContent | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [, setLinks] = useState<{ slug: string, linkText: string }[]>([]);

    const slugInstance = new SlugFromContent((links) => setLinks(links));

    useEffect(() => {
        fetchPage(props.slug)
            .then(data => {
                if (data) {
                    let content = data.content.rendered;
                    content = slugInstance.extractSlugsFromContent(content);
                    console.log(content);

                    const cleanedData = {
                        ...data,
                        content: {
                            ...data.content,
                            rendered: DOMPurify.sanitize(content, { USE_PROFILES: { html: true } })
                        }
                    };

                    setPageData(cleanedData);
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                }
            })
            .catch(error => {
                setError(error.message);
                setIsLoading(false);
            });
    }, [props.slug]);

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
        <ListDocumentPage PageData={pageData.content.rendered} TextColor={props.TextColor} />
    );
}

export default PageArchiDoc;