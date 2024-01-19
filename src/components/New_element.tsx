import { useEffect, useState } from 'react';



const App = () => {
    const [newArticles, setNewArticles] = useState<{ name: string, url: string }[]>([]);

    useEffect(() => {
        const apiUrl = 'https://www.visual-planning.com/documentation/fr/wp-json/wp/v2/pages';

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {

                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);


                const recentArticles = data.filter((article: { date: string }) => {
                    const articleDate = new Date(article.date);
                    return articleDate > sevenDaysAgo;
                });


                const recentArticlesData = recentArticles.map((article: { title: { rendered: any; }; link: any; }) => ({
                    name: article.title.rendered,
                    url: article.link,
                }));
                setNewArticles(recentArticlesData);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des articles : ', error);
            });
    }, []);

    return (
        <div>
            {newArticles.map(article => (
                <New_element key={article.url} articleName={article.name} articleUrl={article.url} />
            ))}
        </div>
    );
};

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

export default App;