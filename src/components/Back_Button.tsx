import { useNavigate } from 'react-router-dom';
import back_arrow from "../assets/img/back_arrow.png";

interface BackButtonProps {
    className: string;
}

//Composant butto pour revenir en arrière
const BackButton: React.FC<BackButtonProps> = ({ className }) => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <img src={back_arrow}
             className={`${className}`}
             onClick={handleGoBack}/>
    );
}

export default BackButton;



