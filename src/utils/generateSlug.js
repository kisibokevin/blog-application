const slugify = (title) => {
    const slug = title
        .toLowerCase()   // convert to lowercase
        .trim()         // 
        .replace(/[^\w\s-]/g, "")  // remove non word characters 
        .replace(/[\s_-]+/g, "-")  //
        .replace(/^-+|-+$/g, "")
        .replace(/^\-+/, "")
        .replace(/\-+$/, "");
    return slug;
};

export default slugify

/** 
export function autoGenerateSlug(title) {
    const slug = title
        .toLowerCase() // Convert the title to lowercase
        .replace(/\s+/g, "-") // Replace spaces with dashes
        .replace(/[^\w\-]+/g, "") // Remove non-word characters except dashes
        .replace(/\-\-+/g, "-") // Replace multiple consecutive dashes with a single dash
        .replace(/^\-+/, "") // Remove dashes from the beginning
        .replace(/\-+$/, ""); // Remove dashes from the end
    return slug;
}

*/