import Header from "./components/Header.jsx"
import {Routes, Route} from "react-router-dom";
import DocumentPageViewModel from "./ViewModels/DocumentPageViewModel.tsx";
import New_element from "./components/New_element.tsx";
import ListDocumentPageViewModel from "./ViewModels/ListDocumentPageViewModel.tsx";
import HomePageViewModel from "./ViewModels/HomePageViewModel.tsx";
import Menu_Window from "./components/MenuWindow.tsx";


function App() {
    return (
        <div >
            <Menu_Window />
            <Header />
            <New_element />
            <div>
                <Routes>
                    <Route path="/" element={<HomePageViewModel />} />
                    <Route path="/vpdesk" element={ <DocumentPageViewModel  slugProp={"VPdesk"} />} />
                    <Route path="/VPportal" element={<DocumentPageViewModel  slugProp={"VPportal"}/>} />
                    <Route path="/VPGO" element={ <ListDocumentPageViewModel slug={"VPGO"} TextColor={"#f79521"}/>} />
                    <Route path="/nouvelle-page/:slug" element={<DocumentPageViewModel  />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;