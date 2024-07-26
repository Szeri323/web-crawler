import { JSDOM } from 'jsdom';
export { normalizeURL, getURLsFromHTML, crawlPage };

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

async function crawlPage(baseURL) {
    try {
        const response = await fetch(baseURL)
        console.log(response)
        console.log(response.status)
        if(response.status >= 400){
            throw new Error(response.statusText)
        }
        console.log(response.headers.get("content-type"))
        if(!response.headers.get("content-type").includes('text/html')){
            throw new Error('Bad conent-type')
        }
        else {
            const bodyText = await response.text(); // Read the response body as text
            console.log(bodyText); // Print the body text
        }
    }
    catch(error) {
        console.log(error)
        return
    }
}
