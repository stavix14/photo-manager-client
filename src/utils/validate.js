export const validateDate = userDate => {
    const date = new Date();
    const isDate = /(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])/i;

    let day = date.getDate();
    let month = date.getMonth() + 1;
    const year = date.getFullYear();

    month = month < 10 ? '0' + month.toString() : month.toString();
    day = day < 10 ? '0' + day.toString() : day.toString();

    const maxDate = year + '-' + month + '-' + day;
    
    if (!isDate.test(userDate)) {
        return "Date is invalid!";
    }
    if (userDate > maxDate) {
        return  "Future dates are not valid";
    }
    return "";
}

export const validateImage = image => {
    const imageTypes = ["image/png", "image/jpeg"];

    if (!image) {
        return "Choose an image to upload!";
    }
    if (!imageTypes.some(type => type === image.type)) {
        return "The file uploaded is not an image or is not an accepted image format"
    }
    if (image.size > 3145728) {
        return "Image file exceeds 3MP limit. Please upload a smaller image";
    }
    return "";
}