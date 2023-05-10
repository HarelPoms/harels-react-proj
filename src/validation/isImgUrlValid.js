const isImage = (src) => {
    // Create new offscreen image to test
    let imageNew = new Image();
    imageNew.src = src;
    // Check if its a real image 
    if ((imageNew.width > 0) && (imageNew.height > 0) ){
        return true;
    } else {
        return false;
    }
}

export default isImage;