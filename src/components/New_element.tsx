import { useEffect, useState } from 'react';

const New_element = ({ articleName, articleUrl }: { articleName: string, articleUrl: string }) => {
    return (
        <div>
            <div className="bg-blue-900 text-center py-4 lg:px-4">
                <div className="p-2 bg-blue-800 items-center text-blue-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                    <span className="flex rounded-full bg-blue-500 uppercase px-2 py-1 text-xs font-bold mr-3">Nouveau</span>
                    <a href={articleUrl} className="font-semibold mr-2 text-left flex-auto">Nouvelle Article : {articleName}</a>
                    <svg className="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
                </div>
            </div>
        </div>
    );
};

const App = () => {
    const [newArticle, setNewArticle] = useState<{ name: string, url: string } | null>(null);

    useEffect(() => {
        // Remplacez cette URL par l'URL de votre API WordPress
        const apiUrl = 'https://www.visual-planning.com/documentation/fr/wp-json/wp/v2/pages';

        // Utilisez l'API fetch pour obtenir les articles
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                // Supposons que chaque élément de données contienne une propriété 'date' au format ISO
                const articleDates = data.map((article: { date: string }) => new Date(article.date));

                // Convertir la date actuelle en nombre
                const currentDate = new Date().getTime();

                // Trouver l'index du nouvel article (si existant)
                const newIndex = articleDates.findIndex((date: { getTime: () => number; }) => date.getTime() < currentDate);

                if (newIndex !== -1) {
                    // Si un nouvel article a été trouvé, mettez à jour l'état
                    const newArticleData = data[newIndex];
                    setNewArticle({
                        name: newArticleData.title.rendered, // Supposons que le nom de l'article soit dans title.rendered
                        url: newArticleData.link, // URL de l'article WordPress
                    });
                }
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des articles : ', error);
            });
    }, []);

    return (
        <div>
            {newArticle && (
                <New_element articleName={newArticle.name} articleUrl={newArticle.url} />
            )}
        </div>
    );
};

export default App;