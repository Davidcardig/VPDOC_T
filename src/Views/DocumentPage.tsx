import logo_pdf from "../assets/img/logo_pdf.png";
import back_arrow from "../assets/img/back_arrow.png";

interface DocumentPageProps {
    title: string;
    content: string;
    downloadPdf: () => void;
    onGoBack: () => void;
}

const DocumentPage = ({ title, content, downloadPdf, onGoBack }: DocumentPageProps) => {
    return (
        <div>
            <header className="bg-white shadow flex justify-between items-center py-4 px-3">
                <div className="flex items-center">
                    <img className="w-10 cursor-pointer transition-transform duration-200 hover:scale-125" src={back_arrow} onClick={onGoBack} alt="Back Arrow"/>
                    <div className="text-3xl font-bold tracking-tight text-gray-900 ml-4"
                         dangerouslySetInnerHTML={{__html: title}}/>
                </div>
                <img className="w-10 cursor-pointer transition-transform duration-200 hover:scale-125" src={logo_pdf} onClick={downloadPdf} alt="PDF Logo"/>
            </header>
            <div id="container">
                <div className="mx-8 my-5 text-wrap ml-5 whitespace-normal"
                     dangerouslySetInnerHTML={{__html: content}}/>
            </div>
        </div>
    );
}

export default DocumentPage;
