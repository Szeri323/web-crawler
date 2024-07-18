import { JSDOM } from 'jsdom';
export { normalizeURL, getURLsFromHTML };

const normalizeURL = (url) => {
    try {
        const urlObj = new URL(url)
        let newURL = `${urlObj.hostname}${urlObj.pathname}`;
        if (newURL.endsWith('/')) {
            newURL = newURL.slice(0, -1);
        }
        return newURL;
    }
    catch (error) {
        throw new Error("Invalid URL")
    }
}

const getURLsFromHTML = (htmlBody, baseURL) => {
    console.log(htmlBody)
    const dom = new JSDOM(htmlBody)
    const arr = []
    const elements = dom.window.document.querySelectorAll('a');

    console.log(elements)

    elements.forEach(element => {
        if (element.hasAttribute('href')) {
            try {
                const urlObj = new URL(`${element}`)
                console.log(urlObj)
                console.log(urlObj.hostname)
                if (urlObj.hostname == "") {
                    arr.push(baseURL + `${element}`)
                }
                else {
                    arr.push(`${element}`)
                }
            }
            catch (error) {
                if (element.href) {
                    arr.push(baseURL + element.href)
                }
                else {
                    throw new Error("Invalid anchor tag")
                }
            }
        }
    });

    return arr
}
