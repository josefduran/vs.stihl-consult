// Copyright 2020 Spectrio, All Rights Reserved.
// Spectrio CONFIDENTIAL
//
// This script allows developers to download the current data from
// the Arbo, STIHL Rewards variants, and registration endpoints.

const path = require("path");
const fs= require("fs");
const fetch = require("node-fetch");

const env = "pro";
const arboUrl         = `http://us04-arbo-${env}.vs-networks.com:8000/api/manifest/dealer-catalog`;
const variantsUrl     = `http://us04-arbo-${env}.vs-networks.com:8000/api/manifest/variants`;
const registrationUrl = `http://us04-webapps-${env}.vs-networks.com:9001/api/product-registration/search`;

const fetchData = {
    method: "POST",
    headers: { "Accept": "application/json" },
    body: JSON.stringify({
        "package_version": 3,
        "package_minor_version": 1,
        "machine": {
            "location": {
                "city": "Lancaster",
                "extras": {
                    "stihl.dealer_email": "",
                    "stihl.distributor_number": null,
                    "stihl.dealer_number": "9846"
                },
                "postal_code": "17601",
                "state_province": "Pennsylvania",
                "street_address_one": "1811 Rohrerstown Road",
                "street_address_two": "",
                "uid": "025fcf227c"
            },
            "owner": {
                "id": 10198,
                "name": "Ken's Manager",
                "uid": "7c84d65467"
            },
            "scid": 35,
            "uid": "91278a4a62"
        },
        "manifests": [],
        "user": {
            "bdName": "PAS",
            "lite": false,
            "ber": false,
            "showPrices": true
        }
    })
};


function download(files, basePath, prefix) {
    if (files.length === 0) {
        return
    }
    const file = files.pop();
    fetch(file.url)
        .then(res => {
            console.log(`${prefix}: ${file.path}`);
            const filepath = `${basePath}/${file.path}`;
            fs.ensureDirSync(path.dirname(filepath));
            const dest = fs.createWriteStream(filepath);
            res.body.pipe(dest);
            download(files, basePath, prefix);
        })
        .catch(err => {
            console.error(err);
            download(files, basePath, prefix);
        });
}

// Main script starts here.

fetch(registrationUrl, fetchData)
    .then(res => res.json())
    .then((json) => {
        console.log(`Retrieved registration manifest`);
        console.log(json.files);
        const files = json.files.map(entry => {
            return { url: entry.url,  path: entry.name };
        });
        console.log(`Found ${files.length} entries in registrations`);
        download(files, "./arbo-data", "webapps");
    })
    .catch(console.error);


fetch(variantsUrl, { headers: { "Accept": "application/json" }})
    .then(res => res.json())
    .then((json) => {
        console.log("Retrieved variants manifest");
        const files = json.files.map(entry => {
            return { url: entry.url,  path: entry.name };
        });
        console.log(`Found ${files.length} entries in variants`);
        download(files, "./arbo-data/data/product-registration", "variants");
    })
    .catch(console.error);


    // Main script starts here.
// mainScript

export const mainScript = async () => {

  try {
    const res = await fetch(arboUrl, fetchData)
    .then(res => res.json())
    .then((json) => {
        console.log("Retrieved arbo manifest");
        const files = json.files.map(entry => {
            return { url: entry.url,  path: entry.name };
        });
        console.log(`Found ${files.length} entries in arbo`);
        download(files, "./arbo-data/data/product-catalog", "arbo");
    })
    .catch(console.error);
  } catch (error) {
    
    console.log(error)
  }

};