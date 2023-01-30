function brightness(color: string) {
    color = color.substring(1); 
    let rgb = parseInt(color, 16); 
    let r = (rgb >> 16) & 0xff; 
    let g = (rgb >> 8) & 0xff; 
    let b = (rgb >> 0) & 0xff; 

    let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    if (luma < 40) {
        return false; 
    }
    return true; 
}
