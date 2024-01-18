import Header from "./components/Header.jsx"
import MenuWindow from "./components/Menu-window.jsx"
import {Routes, Route} from "react-router-dom";
import Accueil from "./pages/Accueil.jsx";
import VPdesk from "./pages/VPdesk.jsx";
import VPportal from "./pages/VPportal.jsx";
import Vpgo from "./pages/VPGO.jsx";
import ContentPage from "./api/Models/ContentPage.tsx";

function App() {
    return (
        <div>
            <MenuWindow />
            <Header />
            <div>
                <Routes>
                    <Route path="#/nouvelle-page/:slug" element={<ContentPage />} />
                    <Route path="/" element={<Accueil />} />
                    <Route path="/VPdesk" element={<VPdesk />} />
                    <Route path="/VPportal" element={<VPportal />} />
                    <Route path="/VPGO" element={<Vpgo />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;