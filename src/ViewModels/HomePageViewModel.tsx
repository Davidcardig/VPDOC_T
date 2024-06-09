// Importation du composant HomePage
import HomePage from "../Views/HomePage.tsx";

// Définition du composant HomePageViewModel en utilisant TypeScript et React.FC pour les composants fonctionnels
const HomePageViewModel: React.FC = () => {
    return (
        <div>
            <HomePage />
        </div>
    );
}

// Exportation du composant HomePageViewModel pour qu'il puisse être utilisé dans d'autres parties de l'application
export default HomePageViewModel;
