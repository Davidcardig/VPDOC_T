
import logo from "../assets/img/logo-documentation.png";


const MenuWindow = () => {

    return (
        <div>
            <div>
                <div className=" menuwindow min-w-full">
                    <nav className=" bg-gray-900 draggable mb-0.5">
                        <div className="sm:px-6">
                            <div className="flex items-center justify-between h-8">
                                <img className="h-5 w-5 mr- -2" src={logo} alt="" />
                                <div className="flex-shrink-0 flex items-center align-self: center;">
                                    <p className="text-white text-xs">VP DOC</p>
                                </div>
                                <div className="md:block">
                                    <div className="flex items-center space-x-4 menu-btn z-100">

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