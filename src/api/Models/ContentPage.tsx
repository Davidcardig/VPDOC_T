import { useParams } from 'react-router-dom'; // Si vous utilisez React Router

const NouvellePage = () => {
    const { slug } = useParams();



    return (
        <div>
            <h1>Page pour le Slug: {slug}</h1>
            {/* Contenu supplémentaire... */}
        </div>
    );
};

export default NouvellePage;