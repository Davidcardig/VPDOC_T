import { JSX } from 'react/jsx-runtime';
export class Card {

    public CardsPageData(htmlContent: string): JSX.Element[] {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        const sections: JSX.Element[] = [];

        doc.querySelectorAll('h4').forEach((h4) => {
            let sibling = h4.nextElementSibling;
            const content: string[] = [];
            while (sibling && sibling.tagName !== 'H4') {
                content.push(sibling.outerHTML);
                sibling = sibling.nextElementSibling
            }
            sections.push(
// <div className="mb-1 justify-center items-center my-10 w-screen ">
                <div className="mb-1 justify-center items-center my-10 w-screen ">
                    <div className=" flex-col items-center bg-white border border-gray-100 rounded-lg shadow md:flex-row md:max-w-[70rem] hover:bg-gray-100 ">
                        <div className="flex border-b-black-300 border-b-2 border-black rounded-lg md:rounded-none md:rounded-l-lg">
                            <img className="w-1/3" src="https://source.unsplash.com/random/1600x900" alt="Image"></img>
                            <div className="card-header font-bold text-xl mb-2 ml-4 mt-14 flex-1">{h4.textContent}</div>
                        </div>
                        <div className="card-body">
                            <div className="content" dangerouslySetInnerHTML={{ __html: content.join('') }} />
                        </div>
                    </div>
                </div>

            );
        });

        return sections;
    }




}


