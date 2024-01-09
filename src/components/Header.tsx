import { Link } from 'react-router-dom'
import New_element from './New_element'

import logo from '/src/assets/img/logo-documentation.png';
import VPDesk from '/src/assets/img/VPdesk.png';
import VPGO from '/src/assets/img/VPgo.png';
import VPPortal from '/src/assets/img/VPportal.png';
import Settings_logo from '/src/assets/img/gear-solid.svg';



function Header() {

    return (
        <div>

            <div className="min-d-full">
            <nav className="bg-gray-900">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <Link to="/" className="flex-shrink-0">
                                <img className="h-10 w-10 " alt="logo" src={logo}></img>
                            </Link>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">

                                    <Link to="/VPdesk" className="border-light-effect flex items-center text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                                        <img src={VPDesk} alt="VPdesk" className="w-8 h-8 mr-2" />VPdesk
                                    </Link>

                                    <Link to="/VPportal" className="light-effect flex items-center text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                                        <img src={VPPortal} alt="VPportal" className="w-8 h-8 mr-2" />
                                        VPportal
                                    </Link>

                                    <Link to="/VPGO" className="light-effect flex items-center text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                                        <img src={VPGO} alt="VPGO" className="w-8 h-8 mr-2" />
                                        VPGO
                                    </Link>
                                    <Link to="/Settings" className="light-effect flex justify-end items-end">
                                        <img src={Settings_logo} alt="Settings" className="h-9 w-9" />
                                    </Link>

                                </div>
                            </div>
                        </div>
                        <div className="-mr-2 flex md:hidden">

                            <button type="button" className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" aria-controls="mobile-menu" aria-expanded="false">
                                <span className="absolute -inset-0.5"></span>
                                <span className="sr-only">Open main menu</span>

                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24"  stroke="currentColor" aria-hidden="true">

                                </svg>

                                <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24"  stroke="currentColor" aria-hidden="true">

                                </svg>
                            </button>
                        </div>
                    </div>
                </div>


                <div className="md:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                        <Link to="/" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Accueil</Link>
                        <Link to="/VPdesk" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">VPdesk</Link>
                        <Link to="/VPportal" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">VPportal</Link>
                        <Link to="/VPGO" className=" test text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">VPGO</Link>
                    </div>
                </div>
            </nav>


                <New_element />
        </div>
    </div>


    )
}

export default Header

