import Header from "./components/Header.jsx"
import {Routes, Route} from "react-router-dom";
import ContentPage from "./ViewModels/DocumentPageViewModel.tsx";
import New_element from "./components/New_element.tsx";
import PageArchiDoc from "./ViewModels/ListDocumentPageViewModel.tsx";
import HomePageViewModel from "./ViewModels/HomePageViewModel.tsx";
import Menu_Window from "./components/Menu_Window.tsx";


function App() {
    return (
        <div >
            <Menu_Window />
            <Header />
            <New_element />
            <div>
                <Routes>
                    <Route path="/" element={<HomePageViewModel slug={"accueil"}/>} />
                    <Route path="/vpdesk" element={ <ContentPage slugProp={"VPdesk"} />} />
                    <Route path="/VPportal" element={<ContentPage slugProp={"VPportal"}/>} />
                    <Route path="/VPGO" element={ <PageArchiDoc slug={"VPGO"} TextColor={"#f79521"}/>} />
                    <Route path="/nouvelle-page/:slug" element={<ContentPage />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;