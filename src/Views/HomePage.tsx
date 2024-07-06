import { useState } from 'react';
import { Link } from 'react-router-dom';
import HomeData from '../Models/HomeData.json';
import fleche_bas from '../assets/img/fleche_bas.png';
import fleche_droite from '../assets/img/fleche_droite.png';

// Le composant HomePage affiche les différentes sections de la page d'accueil
function HomePage() {

    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

    const toggleMenu = (title: string) => {
        setOpenMenus(prevState => ({
            ...prevState,
            [title]: !prevState[title]
        }));
    };

    return (
        <div className="background_VP">
            {Object.entries(HomeData).map(([title, sectionData]) => {
                const { image, ...subSections } = sectionData;
                return (
                    <div key={title} className="mb-10 flex justify-center" onClick={() => toggleMenu(title)}>
                        <div className="w-full md:max-w-[70rem] p-4">
                            <div className="flex-col bg-white border border-gray-100 rounded-lg shadow cursor-pointer">
                                <div className="flex items-center border-black rounded-t-lg p-4 hover:bg-gray-100">
                                    {image && <img src={image} alt={title} className="h-24 w-24 object-cover rounded-md" />}
                                    <div className="font-bold text-xl ml-4 flex-1">{title}</div>
                                    <button
                                        className="ml-auto text-gray-500 focus:outline-none"
                                        onClick={() => toggleMenu(title)}
                                    >
                                        {openMenus[title] ? <img className="h-8 w-8" src={fleche_bas} alt="arrow down" /> :
                                            <img className="h-8 w-8" src={fleche_droite} alt="arrow right" />}
                                    </button>
                                </div>
                            </div>
                            {/* quand le contenu du menu est ouvert */}
                            {openMenus[title] && (
                                <div className="mt-1 bg-white border border-gray-100 rounded-lg shadow p-4 transition-all duration-400 h-auto">
                                    {Object.entries(subSections).map(([Title, SectionData]) =>
                                        (SectionData && 'Slug' in SectionData && (
                                            <div key={Title} className="mb-2">
                                                <Link to={`/nouvelle-page/${SectionData.Slug}`}
                                                      className="font-semibold text-left flex-auto text-gray-900 hover:text-gray-600">
                                                    {Title}
                                                </Link>
                                            </div>
                                        )
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default HomePage;
