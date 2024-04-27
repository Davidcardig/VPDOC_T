import {CleanPageData} from "./cleanPageData.tsx";
import DOMPurify from "dompurify";


const fetchPage = async (slug: string | undefined) => {
    const response = await fetch(`https://www.visual-planning.com/documentation/fr/wp-json/wp/v2/pages/?slug=${slug}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (data && data.length > 0) {
        const cleanInstance = new CleanPageData();
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

export default fetchPage;

