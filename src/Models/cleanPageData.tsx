export class CleanPageData {

    private patternsToRemove: RegExp[] = [
        /\[(\/et_pb_(search|column|image|row|section|text|divider|code|blurb))\]/g,
        /\[\/et_pb_text\]\[\/et_pb_divider\]/g,
        /tabindex='0' role='link'>.*? border_width_all__hover= »1px »\]/g,
        /\[et_pb_(row _builder_|column type=|text|divider|testimonial|section)[\s\S]*?\]/g,
        /\[dsm_button button_one_text=[\s\S]*/g,
    ];

    // Méthode pour nettoyer le contenu de la page
    public cleanContentPage = (content: string): string => {
        let cleanedContent = content;

        // Applique chaque motif de suppression au contenu
        this.patternsToRemove.forEach(pattern => {
            cleanedContent = cleanedContent.replace(pattern, '');
        });

        return cleanedContent;
    }

}