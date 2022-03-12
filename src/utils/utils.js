const extract = (fileName) => {
    let fileNameLength = fileName.length;

    let lastDot = fileName.lastIndexOf('.');

    let fileExtension = fileName.substring(lastDot + 1, fileNameLength);
    return fileExtension;
}

export { extract }