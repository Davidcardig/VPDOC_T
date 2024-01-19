import PageData from "../api/Models/PageData.tsx";


const VPportal = () => {
    return (
        <div>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">VPportal</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <PageData slug={"vpportal"}/>

                </div>
            </main>
        </div>
    );
};

export default VPportal;