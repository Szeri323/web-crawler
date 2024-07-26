import { argv } from 'node:process';
import readline from 'node:readline'
import { crawlPage } from './crawl.js';


function main() {
    try {
        if(argv.length < 3){
            throw new Error('no argument passed')
        }
        if(argv.length > 3) {
            throw new Error('to many arguments passed')
        }
        if(argv.length === 3){
        const baseURL = process.argv[2]
        const objURL = new URL(baseURL)
        console.log(`Start crawling ${baseURL} website ...`)
        crawlPage(baseURL)
        }
    }
    catch(error) {
        console.log(error)
        return
    }
}

main()