
import logo from "../assets/img/Logo-Documentation.png";
import Settings_logo from "../assets/img/Logo-Settings.svg";
import {Link} from "react-router-dom";


const MenuWindow = () => {
    const reduceBtn = document.getElementById('reduceBtn')

    reduceBtn?.addEventListener('click', () => {
        console.log('reduce')
            window.ipcRenderer.send('reduce-window')
        }
    )



    return (
        <div>
            <div>
                <div className="z-50 menuwindow min-w-full top-0">
                    <nav className=" bg-gray-900 draggable mb-0.5">
                        <div className="sm:px-6">
                            <div className="flex items-center justify-between h-8">
                                <img className="h-5 w-5 mr- -2" src={logo} alt="" />
                                <div className="flex-shrink-0 flex items-center align-self: center;">
                                    <p className="text-white text-xs">VP DOC</p>
                                </div>
                                <div className="md:block">
                                    <div className="flex items-center space-x-4 menu-btn z-100">
                                        <Link to="/Settings" className="light-effect flex justify-end items-end">
                                            <img src={Settings_logo} alt="Settings" className="h-4 w-4" />
                                        </Link>
                                    <button id="reduceBtn" className="text-gray-300 hover:text-white">&#128469;</button>
                                    <button id="sizeBtn" className="text-gray-300 hover:text-white">&#128471;</button>
                                    <button id="closeBtn" className="text-gray-300 hover:text-white">&#128473;</button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default MenuWindow;