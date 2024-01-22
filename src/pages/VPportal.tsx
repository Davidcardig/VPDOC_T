import ContentPage from "../api/Models/ContentPage.tsx";


const VPportal = () => {

const extractor = new ImageNameExtractor();
const message = "tabindex='0' role='link'>VPGO-LISTE-EVENEMENT.jpg » alt= »Visual-Planning-VPGO-LISTE-EVENEMENT » title_text= »Visual-Planning-VPGO-LISTE-EVENEMENT » show_in_lightbox= »on » align= »center » _builder_version= »4.16″ width= »45% » box_shadow_style= »preset3″ global_colors_info= »{} »]";
const imageName = extractor.extractImageName(message);
extractor.fetchImageData().then(imageUrl => {
    if (imageUrl) {
        const img = document.createElement('img');
        img.src = imageUrl;
        document.body.appendChild(img);
    }
    console.log(imageName);
});

    return (
        <div>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">VPportal</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <ContentPage/>

                </div>
            </main>
        </div>
    );
};

export default VPportal;