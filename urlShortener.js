class URLShortener{
    constructor(originalURL, shortURL, clickCount = '0'){
        this.originalURL = originalURL;
        this.shortURL = shortURL;
        this.clickCount = clickCount;
    }
    shorten(urlData) {
        const pool = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        let shorts = 'http://localhost:3000/';
        let flag = false;
        while(!flag){
            flag = true;
            for(let i = 0; i < 6; i++){
                shorts += pool[Math.floor(Math.random() * Math.floor(pool.length))];
            }     
            urlData.forEach((url) => {
                if(url.shortURL === shorts){
                    flag = false;
                }
            })
        }
        this.shortURL = shorts;
        return shorts;
    }
	// Returns Expanded URL
    expand() {
    }
	// Updates Click count
    updateClickCount() {
    }
}



module.exports = {URLShortener: URLShortener};