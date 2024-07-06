import { Link } from 'react-router-dom'

import logo from "/src/assets/img/logo-documentation.png";
import VPDesk from '/src/assets/img/VPdesk.jpg';
import VPGO from '/src/assets/img/VPgo.png';
import VPPortal from '/src/assets/img/VPportal.jpg';

// Composant pour afficher l'en-tête de la page
function Header() {

    return (
        <div>
            <div className=" min-d-full mt-8 ">
            <nav className="bg-gray-900 ">
                <div className=" mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                            <Link to="/" className="flex-shrink-0">
                                <img className="h-10 w-10 " alt="logo" src={logo}></img>
                            </Link>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4 gap-8">

                                    <Link to="/VPdesk" className="border-light-effect flex items-center text-gray-300
                                    hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                                        <img src={VPDesk} alt="VPdesk" className="w-8 h-8 mr-2" />VPdesk
                                    </Link>

                                    <Link to="/VPportal" className="light-effect flex items-center text-gray-300
                                    hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                                        <img src={VPPortal} alt="VPportal" className="w-8 h-8 mr-2" />
                                        VPportal
                                    </Link>

                                    <Link to="/VPGO" className="light-effect flex items-center text-gray-300
                                    hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                                        <img src={VPGO} alt="VPGO" className="w-8 h-8 mr-2" />
                                        VPGO
                                    </Link>
                                </div>
                            </div>
                        <p></p>
                        </div>
                </div>
            </nav>

        </div>
    </div>


    )
}

export default Header

