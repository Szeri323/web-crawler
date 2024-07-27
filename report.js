import { sortingPages } from "./sort.js";

export { printReport };

function printReport(pages) {
    console.log("The begining of the report...")
    const sortedPages = sortingPages(pages)
    for(const page of sortedPages){
        const url = page[0]
        const count = page[1]
        console.log(`Found ${count} internal links to ${url}`)
    }
    

}