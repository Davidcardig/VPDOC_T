import Header from "./components/Header.jsx"
import MenuWindow from "./components/Menu-window.jsx"
import {Routes, Route} from "react-router-dom";
import Accueil from "./pages/Accueil.jsx";
import VPdesk from "./pages/VPdesk.jsx";
import VPportal from "./pages/VPportal.jsx";
import Vpgo from "./pages/VPGO.jsx";
import ContentPage from "./api/Models/ContentPage.tsx";
import New_element from "./components/New_element.tsx";

function App() {
    return (
        <div >
            <MenuWindow />
            <Header />
            <New_element />
            <div>
                <Routes>
                    <Route path="/" element={<Accueil />} />
                    <Route path="/vpdesk" element={<VPdesk />} />
                    <Route path="/VPportal" element={<VPportal />} />
                    <Route path="/VPGO" element={<Vpgo />} />
                    <Route path="/nouvelle-page/:slug" element={<ContentPage />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;