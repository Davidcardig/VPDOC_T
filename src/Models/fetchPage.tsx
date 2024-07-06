import { CleanPageData } from "./cleanPageData.tsx";
import DOMPurify from "dompurify";

// Fonction pour récupérer une page en utilisant un slug
const fetchPage = async (slug: string | undefined) => {
    // Récupérer la page depuis l'API WordPress en utilisant le slug
    const response = await fetch(`https://www.visual-planning.com/documentation/fr/wp-json/wp/v2/pages/?slug=${slug}`);
    if (!response.ok) {
        throw new Error('Network response was not ok'); // Gestion des erreurs de réseau
    }
    const data = await response.json();
        const cleanInstance = new CleanPageData();
        const data_content = data[0].content.rendered;
        // Nettoyer le contenu de la page en utilisant CleanPageData
        let Content = cleanInstance.cleanContentPage(data_content);
        Content = DOMPurify.sanitize(Content, { USE_PROFILES: { html: true } });

        return {
            ...data[0],
            content: {
                ...data[0].content,
                rendered: Content // Mise à jour du contenu nettoyé et assaini
            },
        };


};

export default fetchPage;
