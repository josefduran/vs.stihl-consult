// Copyright 2020 Spectrio, All Rights Reserved.
// Spectrio CONFIDENTIAL
//
// This script allows developers to download the current data from Arbo
/* eslint-disable import/no-extraneous-dependencies, no-console */

const path = require("path");


const fs = require("fs"); 
// const fs = require("fs-extra"); //TODO: problema en este paquete


const fetch = require("node-fetch");

const arboUrl = "http://us04-arbo-dev.vs-networks.com:8000/api/manifest/catalog";

const fetchData = {
  method: "POST",
  headers: { Accept: "application/json" },
  body: JSON.stringify({
    package_version: 3,
    package_minor_version: 1,
    machine: {
      location: {
        city: "Lancaster",
        extras: {
          "stihl.dealer_email": "",
          "stihl.distributor_number": null,
          "stihl.dealer_number": "611"
        },
        postal_code: "17601",
        state_province: "Pennsylvania",
        street_address_one: "1811 Rohrerstown Road",
        street_address_two: "",
        uid: "025fcf227c",
      },
      owner: {
        id: 10198,
        name: "Ken's Manager",
        uid: "7c84d65467",
      },
      scid: 35,
      uid: "91278a4a62",
    },
    manifests: [],
    user: {
      bdName: "PAS",
      lite: false,
      ber: false,
      showPrices: true,
    },
  }),
};

async function download(files, basePath, prefix) {
  if (files.length === 0) return;

  try {

    const file = files.pop();

    const res = await fetch(file.url);

    console.log(`${prefix}: ${file.path}`);
    const filepath = `${basePath}/${file.path}`;
    
    fs.ensureDirSync(path.dirname(filepath));
    const dest = fs.createWriteStream(filepath);
    res.body.pipe(dest);
    download(files, basePath, prefix);

  } catch (error) {

    console.log(error);
    download(files, basePath, prefix);
  }

}

// Main script starts here.
// mainScript

export const mainScript = async () => {

  try {
    const res = await fetch(arboUrl, fetchData);

    const json = await res.json();

    console.log("Retrieved arbo manifest");
    const files = json.files.map((entry) => ({ url: entry.url, path: entry.name }));
    console.log(`Found ${files.length} entries in arbo`);
    download(files, "./data/product-catalog", "arbo");

  } catch (error) {
    
    console.log(error)
  }

};