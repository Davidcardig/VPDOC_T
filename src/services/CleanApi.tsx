
export class CleanApi {

   public cleanContent = (content: string): string => {
        let cleanedContent = content;


        // Supprimer les shortcodes de type [et_pb...]
        //cleanedContent = cleanedContent.replace(/\[et_pb_[^\]]*\]/g, '');

        // Supprimer des motifs spécifiques supplémentaires
        const patternsToRemove = [
            /\[\/et_pb_search\]\[\/et_pb_column\]\[\/et_pb_image\]\[\/et_pb_column\]\[\/et_pb_row\]\[\/et_pb_section\]/g,
            /\[\/et_pb_text\]\[\/et_pb_column\]/g,
            /tabindex='0' role='link'>.*? border_width_all__hover= »1px »\]/g,
            /\[\/et_pb_text\]\[\/et_pb_column\]\[\/et_pb_row\]\[\/et_pb_section\]/g,
            /\[\/et_pb_row\]/g,/\[\/et_pb_section\]/g,/\[\/et_pb_column\]/g,/\[\/et_pb_image\]/g,/\[\/et_pb_text\]\[\/et_pb_divider]\]/g,/\[\/et_pb_text\]/g,/\[\/et_pb_divider\]/g,/\[\/et_pb_code\]/g,/\[\/et_pb_blurb\]/g,/\[\/et_pb_column\]/g,/\[\/et_pb_row\]/g,/\[\/et_pb_section\]/g,/\[\/et_pb_text\]/g,/\[\/et_pb_divider\]/g,/\[\/et_pb_code\]/g,/\[\/et_pb_blurb\]/g,/\[\/et_pb_column\]/g,/\[\/et_pb_row\]/g,/\[\/et_pb_section\]/g,/\[\/et_pb_text\]/g,/\[\/et_pb_divider\]/g,/\[\/et_pb_code\]/g,/\[\/et_pb_blurb\]/g,/\[\/et_pb_column\]/g,/\[\/et_pb_row\]/g,/\[\/et_pb_section\]/g,/\[\/et_pb_text\]/g,/\[\/et_pb_divider\]/g,/\[\/et_pb_code\]/g,/\[\/et_pb_blurb\]/g,/\[\/et_pb_column\]/g,/\[\/et_pb_row\]/g,/\[\/et_pb_section\]/g,/\[\/et_pb_text\]/g,/\[\/et_pb_divider\]/g,/\[\/et_pb_code\]/g,/\[\/et_pb_blurb\]/g,/\[\/et_pb_column\]/g,/\[\/et_pb_row\]/g,/\[\/et_pb_section\]/g,/\[\/et_pb_text\]/g,/\[\/et_pb_divider\]/g,/\[\/et_pb_code\]/g,/\[\/et_pb_blurb\]/g,/\[\/et_pb_column\]/g,/\[\/et_pb_row\]/g,/\[\/et_pb_section\]/g,/\[\/et_pb_text\]/g,/\[\/et_pb_divider\]/g,/\[\/et_pb_code\]/g,/\[\/et_pb_blurb\]/g,/\[\/et_pb_column\]/g,/\[\/et_pb_row\]/g,/\[\/et_pb_section\]/g,/\[\/et_pb_text\]/g
        ];


        patternsToRemove.forEach(pattern => {
            cleanedContent = cleanedContent.replace(pattern, '');
        });

        cleanedContent = cleanedContent.replace(/<img[^>]*class="wp-image-[^"]*"[^>]*>/g, '');
        return cleanedContent;
    }

}
