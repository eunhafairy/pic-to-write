#!/usr/bin/env node

import minimist from "minimist-lite";
import csv from "csv-parser";
import * as fs from "node:fs";
import { writeFile } from "./helper/parsePdf.js";
import { homedir } from "node:os";

const main = async () => {
    try {
        const results = [];
        const args = minimist(process.argv.slice(2));
        if (!args.file){
            throw new Error(
                "File arg type is required. Set it as the file path to your csv file"
            );
        }
 
        fs.createReadStream(args.file)
            .pipe(csv())
            .on("data", (data) => results.push(data))
            .on("end", () => {
                results.forEach(async (res, index) => {
                    const result = await writeFile(res, args?.identifier);
                    console.log(`File ${result} saved in ${homedir()}`);
                });
            });
    } catch (ex) {
        console.error("Error encountered: ", ex);
        process.exit();
    }
};

main();
