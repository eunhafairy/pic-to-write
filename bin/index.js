#!/usr/bin/env node

import minimist from 'minimist-lite';
import csv from 'csv-parser'
import * as fs from 'node:fs'
import { writeFile } from './helper/parsePdf.js';

const main = async () => {
    const results = [];
    const args = minimist(process.argv.slice(2))
    const { file } = args

    fs.createReadStream(file)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            
            results.forEach( async (res) =>{
                await writeFile(res.NAME)
            })
            console.log("File/s saved in the current working directory! muhahahahah")
          });
}


main()