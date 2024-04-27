import logo_pdf from "../assets/img/logo_pdf.png";



interface DocumentPageProps {
    title: string;
    content: string;
    downloadPdf: () => void;
}


const DocumentPage = ({ title, content, downloadPdf }: DocumentPageProps ) => (
    <div>
        <header className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="text-3xl font-bold tracking-tight text-gray-900"
                     dangerouslySetInnerHTML={{__html: title}}/>
                <img className="w-10 cursor-pointer transition-transform duration-200 hover:scale-125 " src={logo_pdf} onClick={downloadPdf}></img>
            </div>
        </header>
        <div id="container">
            <div className="mb-10 text-wrap hover:text-balance text-left ml-5 whitespace-normal" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    </div>
);

export default DocumentPage;
