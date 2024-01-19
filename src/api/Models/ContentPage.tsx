import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const fetchPageData = async (slug: string) => {
    const response = await fetch(`https://www.visual-planning.com/documentation/fr/wp-json/wp/v2/pages/?slug=${slug}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data && data.length > 0 ? data[0] : null;
};

const NouvellePage = () => {
    const { slug } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchPageData(slug)
            .then(data => {
                if (data) {
                    setData(data);
                } else {
                    console.log('Page not found');
                }
            })
            .catch(error => {
                console.error(error);
            });
    }, [slug]);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: data.content.rendered }} />
        </div>
    );
};

export default NouvellePage;