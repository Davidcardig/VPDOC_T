import {Link} from 'react-router-dom';
import data from '../Models/Data.tsx';


function HomePage() {
    return (
        <div>
            {Object.entries(data).map(([title, subSections]) => (
                <div key={title} className="mb-10 flex justify-center">
                    <div className="w-full md:max-w-[70rem]">
                        <div className="flex-col bg-white border border-gray-100 rounded-lg shadow hover:bg-gray-100">
                            <div className="flex items-center border-b-2 border-black rounded-t-lg">
                                <img className="w-1/3" src="https://source.unsplash.com/random/1600x900" alt="Image" />
                                <div className="font-bold text-xl ml-4 mt-14 flex-1">{title}</div>
                            </div>
                            {Object.entries(subSections).map(([subTitle, {Slug}]) => (
                                <div key={subTitle} className="card">
                                    <div className="card-body">
                                        <Link to={`/nouvelle-page/${Slug}`} className="font-semibold mr-2 text-left flex-auto">
                                            {subTitle}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default HomePage;
