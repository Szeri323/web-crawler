import { JSDOM } from 'jsdom';
export { normalizeURL, getURLsFromHTML, crawlPage };

const normalizeURL = (url) => {
    const urlObj = new URL(url)
    let newURL = `${urlObj.host}${urlObj.pathname}`;
    if (newURL.endsWith('/')) {
        newURL = newURL.slice(0, -1);
    }
    return newURL;

}

const getURLsFromHTML = (htmlBody, baseURL) => {
    // console.log(htmlBody)
    const dom = new JSDOM(htmlBody)
    const urls = []
    const anchors = dom.window.document.querySelectorAll('a');

    for (const anchor of anchors) {
        if (anchor.hasAttribute('href')) {
            let href = anchor.getAttribute('href')

            try {
                // convert any relative URLs to absolute URLs
                href = new URL(href, baseURL).href
                urls.push(href)
            } catch (err) {
                console.log(`${err.message}: ${href}`)
            }
        }
    }

    return urls
}

async function fetchHTML(url) {
    let res
    try {
        res = await fetch(url)
    }
    catch (err) {
        throw new Error(`Got Network error: ${err.message}`)
    }

    if (res.status > 399) {
        throw new Error(`Got HTTP error: ${res.status} ${res.statusText}`)
    }

    const contentType = res.headers.get('content-type')
    if (!contentType || !contentType.includes('text/html')) {
        throw new Error(`Got non-HTML response: ${contentType}`)
    }

    return res.text()
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {


    const objBaseURL = new URL(baseURL)
    const objCurrentURL = new URL(currentURL)
    if (objCurrentURL.hostname != objBaseURL.hostname) {
        return pages
    }
    const normalizedCurrentURL = normalizeURL(currentURL)


    if (pages[normalizedCurrentURL] > 0) {
        pages[normalizedCurrentURL]++
        return pages;
    }
    pages[normalizedCurrentURL] = 1;
    console.log(`crawling ${currentURL}`)

    let html = ''
    try {
        html = await fetchHTML(currentURL)
    }
    catch (err) {
        console.log(`${err.message}`)
        return pages
    }


    const nextURLs = getURLsFromHTML(html, baseURL)
    for (let nextURL of nextURLs) {
        await crawlPage(baseURL, nextURL, pages);
    }
    return pages
}
