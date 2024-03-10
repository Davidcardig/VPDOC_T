export class CleanApi {

    public cleanPageData = (content: string): string => {
        let cleanedPageData  = content;

        // Supprimer les shortcodes de type [et_pb...]
        cleanedPageData = cleanedPageData.replace(/\[et_pb_[^\]]*\]/g, '');

        // Supprimer des motifs spécifiques supplémentaires
        const patternsToRemove = [
            /\[\/et_pb_search\]\[\/et_pb_column\]\[\/et_pb_image\]\[\/et_pb_column\]\[\/et_pb_row\]\[\/et_pb_section\]/g,
            /\[\/et_pb_text\]\[\/et_pb_column\]/g,
            /tabindex='0' role='link'>.*? border_width_all__hover= »1px »\]/g,
            /\[\/et_pb_text\]\[\/et_pb_column\]\[\/et_pb_row\]\[\/et_pb_section\]/g,
            /\[\/et_pb_row\]/g,/\[\/et_pb_section\]/g,/\[\/et_pb_column\]/g,/\[\/et_pb_image\]/g,/\[\/et_pb_text\]\[\/et_pb_divider]\]/g,/\[\/et_pb_text\]/g,/\[\/et_pb_divider\]/g,/\[\/et_pb_code\]/g,/\[\/et_pb_blurb\]/g,/\[\/et_pb_column\]/g,/\[\/et_pb_row\]/g,/\[\/et_pb_section\]/g,/\[\/et_pb_text\]/g,/\[\/et_pb_divider\]/g,/\[\/et_pb_code\]/g,/\[\/et_pb_blurb\]/g,/\[\/et_pb_column\]/g,/\[\/et_pb_row\]/g,/\[\/et_pb_section\]/g,/\[\/et_pb_text\]/g,/\[\/et_pb_divider\]/g,/\[\/et_pb_code\]/g,/\[\/et_pb_blurb\]/g,/\[\/et_pb_column\]/g,/\[\/et_pb_row\]/g,/\[\/et_pb_section\]/g,/\[\/et_pb_text\]/g
        ];
        patternsToRemove.forEach(pattern => {
            cleanedPageData = cleanedPageData.replace(pattern, '');
        });

        cleanedPageData = cleanedPageData.replace(/<img[^>]*class="wp-image-[^"]*"[^>]*>/g, '');


        return cleanedPageData;
    }

    public cleanPageArchiDoc = (content: string): string => {
        let cleanedPageArchiDoc  = content;

        // Supprimer les shortcodes de type [et_pb...]
        cleanedPageArchiDoc = cleanedPageArchiDoc.replace(/\[et_pb_[^\]]*\]/g, '');

        // Supprimer des motifs spécifiques supplémentaires
        const patternsToRemove = [
            /\[\/et_pb_search\]\[\/et_pb_column\]\[\/et_pb_image\]\[\/et_pb_column\]\[\/et_pb_row\]\[\/et_pb_section\]/g,
            /\[\/et_pb_text\]\[\/et_pb_column\]/g,
            /tabindex='0' role='link'>.*? border_width_all__hover= »1px »\]/g,
            /\[\/et_pb_text\]\[\/et_pb_column\]\[\/et_pb_row\]\[\/et_pb_section\]/g,
            /\[\/et_pb_row\]/g,/\[\/et_pb_section\]/g,/\[\/et_pb_column\]/g,/\[\/et_pb_image\]/g,/\[\/et_pb_text\]\[\/et_pb_divider]\]/g,/\[\/et_pb_text\]/g,/\[\/et_pb_divider\]/g,/\[\/et_pb_code\]/g,/\[\/et_pb_blurb\]/g,/\[\/et_pb_column\]/g,/\[\/et_pb_row\]/g,/\[\/et_pb_section\]/g,/\[\/et_pb_text\]/g,/\[\/et_pb_divider\]/g,/\[\/et_pb_code\]/g,/\[\/et_pb_blurb\]/g,/\[\/et_pb_column\]/g,/\[\/et_pb_row\]/g,/\[\/et_pb_section\]/g,/\[\/et_pb_text\]/g,/\[\/et_pb_divider\]/g,/\[\/et_pb_code\]/g,/\[\/et_pb_blurb\]/g,/\[\/et_pb_column\]/g,/\[\/et_pb_row\]/g,/\[\/et_pb_section\]/g,/\[\/et_pb_text\]/g
        ];
        patternsToRemove.forEach(pattern => {
            cleanedPageArchiDoc = cleanedPageArchiDoc.replace(pattern, '');
        });

        return cleanedPageArchiDoc;
    }

    public cleanContentPage = (content: string): string => {
        let cleanedContent = content;

        //cleanedContent = cleanedContent.replace(/\[et_pb_section[^\]]*?\](?:[\s\S](?!&nbsp;|\[et_pb_section))*\[\/et_pb_section\]/g, '');


        cleanedContent = cleanedContent.replace(/\[et_pb_section[\s\S]*?\]/g, '');

        // Supprimer les shortcodes de type [et_pb...]
        //cleanedContent = cleanedContent.replace(/\[et_pb_[^\]]*\]/g, '');

        //cleanedContent = cleanedContent.replace(/&nbsp;&raquo;[\s\S]*?theme_builder_area=&nbsp;&raquo;post_content&nbsp;&raquo;\]/g, '');

        // Supprimer des motifs spécifiques supplémentaires
        const patternsToRemove = [
            /\[\/et_pb_search\]\[\/et_pb_column\]\[\/et_pb_image\]\[\/et_pb_column\]\[\/et_pb_row\]\[\/et_pb_section\]/g,
            /\[\/et_pb_text\]\[\/et_pb_column\]/g,
            /tabindex='0' role='link'>.*? border_width_all__hover= »1px »\]/g,
            /\[\/et_pb_text\]\[\/et_pb_column\]\[\/et_pb_row\]\[\/et_pb_section\]/g,
            /\[\/et_pb_row\]/g,/\[\/et_pb_section\]/g,/\[\/et_pb_column\]/g,/\[\/et_pb_image\]/g,/\[\/et_pb_text\]\[\/et_pb_divider]\]/g,/\[\/et_pb_text\]/g,/\[\/et_pb_divider\]/g,/\[\/et_pb_code\]/g,/\[\/et_pb_blurb\]/g,/\[\/et_pb_column\]/g,/\[\/et_pb_row\]/g,/\[\/et_pb_section\]/g,/\[\/et_pb_text\]/g,/\[\/et_pb_divider\]/g,/\[\/et_pb_code\]/g,/\[\/et_pb_blurb\]/g,/\[\/et_pb_column\]/g,/\[\/et_pb_row\]/g,/\[\/et_pb_section\]/g,/\[\/et_pb_text\]/g,/\[\/et_pb_divider\]/g,/\[\/et_pb_code\]/g,/\[\/et_pb_blurb\]/g,/\[\/et_pb_column\]/g,/\[\/et_pb_row\]/g,/\[\/et_pb_section\]/g,/\[\/et_pb_text\]/g,/\[et_pb_row _builder_[\s\S]*?\]/g,/\[et_pb_column type=[\s\S]*?\]/g,/\[et_pb_text[\s\S]*?\]/g,/\[et_pb_divider[\s\S]*?\]/g
        ];

        patternsToRemove.forEach(pattern => {
            cleanedContent = cleanedContent.replace(pattern, '');
        });


        return cleanedContent;
    }









}