import PageArchiDoc from "../api/Models/PageArchiDoc.tsx";


const Vpgo = () => {
    return (
        <div>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">VPGO</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <PageArchiDoc slug={"VPGO"} TextColor={"#f79521"}/>
                </div>
            </main>
        </div>
    );
};

export default Vpgo;