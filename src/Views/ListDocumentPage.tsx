import BackButton from "../components/BackButton.tsx";

interface ListDocumentPageProps {
    PageData: string;
    TextColor: string;
}

const ListDocumentPage = ({ PageData, TextColor }: ListDocumentPageProps) => {
    return (
        <div className="relative">
            <div className="background_VP bg-white shadow flex justify-between items-center py-4">
                <style>
                    {/*Ajout de la couleur de texte pour les liens */}
                    {`dl dt span a:hover {color: ${TextColor}!important;}`}
                </style>
                <div className="absolute left-0 top-0 flex items-center">
                  <BackButton className={"w-10 h-10 ml-8 mr-2 mt-4 cursor-pointer " +
                      "transition-transform duration-200 hover:scale-125"} />
                </div>
                <h2 className=" text-3xl font-bold tracking-tight text-gray-900 ml-8"></h2>
                <div className="px-1 content font-semibold text-left flex-auto text-gray-900"
                     dangerouslySetInnerHTML={{__html: PageData}}/>
            </div>
        </div>
    );
}

export default ListDocumentPage;

