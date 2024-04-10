import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {CleanApi} from "../../services/CleanApi.tsx";
import DOMPurify from 'dompurify';
import ImageNameExtractor from "../../services/ImageNameExtractor"
import {SlugFromContent} from "../../services/SlugFromContent";


interface PageContent {
    content: { rendered: string };
    slug: string;
    title: { rendered: string };
    links: { slug: string, linkText: string }[];
}

interface slug {
    slugProp?: string;// Slug si appel composant avec slugProp
}



const fetchPageData = async (slug: string | undefined) => {
    const response = await fetch(`https://www.visual-planning.com/documentation/fr/wp-json/wp/v2/pages/?slug=${slug}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (data && data.length > 0) {
        //Instance de la classe CleanApi et SlugFromContent
        const cleanInstance = new CleanApi();


        const data_content = data[0].content.rendered;
        let Content =  cleanInstance.cleanContentPage(data_content);
        Content = DOMPurify.sanitize(Content, { USE_PROFILES: { html: true } });

        return {
            ...data[0],
            content: {
                ...data[0].content,
                rendered: Content
            },

        };

    }
};

const NouvellePage = ({ slugProp }: slug) => {
    const { slug: slugParam } = useParams<{ slug: string }>();
    const slug = slugProp || slugParam;
    const [data, setData] = useState<PageContent | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [imageData, setImageData] = useState<{ url: string, title: string }[] | null>(null); // New state for image data



    useEffect(() => {
        if (!slug) return;
        setIsLoading(true);
        fetchPageData(slug)
            .then(pageData => {
                if (pageData) {
                    const extractor = new ImageNameExtractor();
                    const div = document.createElement('body');
                    div.innerHTML = pageData.content.rendered;
                    const imageNames = extractor.extractImageNames(div.innerText);
                    if (imageNames) {
                        extractor.fetchImageData().then(imageData => {
                            if (imageData) {
                                setImageData(imageData.map((url, index) => ({ url, title: imageNames[index] })));
                            }
                        });
                    }
                    const slugExtractor = new SlugFromContent((links) => {
                        setData((data) => {
                            if (data) {
                                return {
                                    ...data,
                                    links
                                };
                            }
                            return data;
                        });

                    }
                    );
                    pageData.content.rendered = slugExtractor.extractSlugsFromContent(pageData.content.rendered);

                    setData(pageData);
                    setIsLoading(false);
                }
            })
            .catch(error => { // Catch any errors and update the error state
                console.error(error);
                setError(error.message);
                setIsLoading(false);
            });
    }, [slug]);

    if (isLoading) {
        return <div className="text-center relative mt-[200px]">
            <div role="status">
                <svg aria-hidden="true"
                     className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                     viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"/>
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!data) {
        return <div>Page not found</div>;
    }


    let content = data.content.rendered;
    const div = document.createElement('div');
    div.innerHTML = content;
    content = DOMPurify.sanitize(div.innerHTML, { USE_PROFILES: { html: true } });

    let imageIndex = 0;
     //const tabindexRegex = /\[et_pb_image/g;
    const tabindexRegex = /.*nbsp;»\]/g;


    if (imageData) {
        content = content.replace(tabindexRegex, () => {
            const image = imageData[imageIndex];
            imageIndex = (imageIndex + 1) % imageData.length; // Loop back to the first image when we've used all images

            return `<img  class="img_pagecontent" key={index}  src="${image.url}" alt="${image.title}"/>`;

        });
    }
    content = content.replace(/<h2.*?<\/h2>/g, '');
    content = content.replace(/Attention/g, '<span class="font-bold text-red-600 text-xl">Attention ! </span>');
    div.innerHTML = content;






    return (
        <div>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="text-3xl font-bold tracking-tight text-gray-900" dangerouslySetInnerHTML={{ __html: data.title.rendered }}/>
                </div>
            </header>
            <div>
                <div className="mb-10 text-wrap hover:text-balance text-left ml-5 whitespace-normal" dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </div>
    )
}

export default NouvellePage;