class URLShortener{
    constructor(originalURL, shortURL, clickCount){
        this.originalURL = originalURL;
        this.shortURL = shortURL;
        this.clickCount = clickCount;
    }
}



module.exports = {URLShortener: URLShortener};