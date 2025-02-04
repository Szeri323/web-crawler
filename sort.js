export { sortingPages };

function sortingPages(pages) {
    const pagesArr = Object.entries(pages)
    pagesArr.sort((pageA, pageB) => {
        if (pageB[1] === pageA[1]) {
            return pageA[0].localeCompare(pageB[0])
        }
        return pageB[1] - pageA[1]
    })
    return pagesArr
}
