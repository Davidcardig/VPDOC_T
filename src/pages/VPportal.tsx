import ContentPage from "../api/Models/ContentPage.tsx";
import {Link} from "react-router-dom";


const VPportal = () => {



    return (
        <div>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">VPPortal</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <ContentPage slugProp={"VPportal"}   />
                    <div className="flex justify-around">
                        <Link to={"/nouvelle-page/vpportal-parametrage"}><span className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-5">Paramétrage</span></Link>
                        <Link to={"/nouvelle-page/vpportal-utilisation"}><span className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-5">Utilisation</span></Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default VPportal;
