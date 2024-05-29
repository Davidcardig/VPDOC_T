import logo from "../assets/img/Logo-Documentation.png";

const MenuWindow = () => {
    return (
        <div>
            <div className="z-50 menuwindow min-w-full top-0">
                <nav className="bg-gray-900 draggable mb-0.5 border-b-2 border-white">
                    <div className="sm:px-6">
                        <div className="flex items-center justify-between h-8">
                            <img className="h-5 w-5 mr-2" src={logo} alt="Logo" />
                            <div className="flex-shrink-0 flex items-center">
                                <p className="text-white text-xs">VP DOC</p>
                            </div>
                            <p className="text-white text-xs"></p>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default MenuWindow;
