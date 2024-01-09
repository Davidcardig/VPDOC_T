

const New_element = () => {
    return (

        <div>
            <div className="bg-blue-900 text-center py-4 lg:px-4">
                <div className="p-2 bg-blue-800 items-center text-blue-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                    <span className="flex rounded-full bg-blue-500 uppercase px-2 py-1 text-xs font-bold mr-3">Nouveau</span>
                    <span className="font-semibold mr-2 text-left flex-auto">Nouvelle Article : API Designer </span>
                    <svg className="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
                </div>
            </div>
        </div>
    );
};

export default New_element;