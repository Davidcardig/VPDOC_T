interface ListDocumentPageProps {
   PageData: string;
    TextColor: string ;
}


const ListDocumentPage = ({ PageData, TextColor }: ListDocumentPageProps) => {
    return (
        <div>
            <header className="bg-white shadow">
            </header>
            <div>
                <style>
                    {`dl dt span a:hover {color: ${TextColor}!important;}`}

                </style>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900"></h2>
                <div className="content" dangerouslySetInnerHTML={{__html: PageData}}/>
            </div>
        </div>
    );
}

export default ListDocumentPage;