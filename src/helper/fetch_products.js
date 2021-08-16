// Copyright 2020 Spectrio, All Rights Reserved.
// Spectrio CONFIDENTIAL
//
// This script allows developers to download the current data from
// the Arbo, STIHL Rewards variants, and registration endpoints.

import { useDispatch } from "react-redux";
import { getPathImages, getProducts } from "../redux/actions/actionProducts";

// const path = require("path");
// const fs = require("fs");

// const fetch = require("node-fetch");

const env = "rc";
const arboUrl = `http://us04-arbo-${env}.vs-networks.com:8000/api/manifest/dealer-catalog`;
const variantsUrl = `http://us04-arbo-${env}.vs-networks.com:8000/api/manifest/variants`;
const registrationUrl = `http://us04-webapps-${env}.vs-networks.com:9001/api/product-registration/search`;


let filesjpg = []
let contador = 0;
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

export const useFetchproducts = () => {

    const dispatch = useDispatch();

    async function download(files, basePath, prefix) {
   
        if (files.length === 0) {
            return
        }
        const file = files.pop();
        
        try {
            
            if (file.path === 'products/protective-work-wear.json') {
                const res = await fetch(file.url);
                const data = await res.json();
                console.log(data)
                dispatch(getProducts(data));                
                
            }else{
                // Guarda el path de las img en un array
                if(file.path.split('.')[1] === "jpg" && contador <= 10){
                    filesjpg.push(file.url);
                    // console.log(filesjpg)
                    dispatch(getPathImages(filesjpg));
                    contador++
                }

                if(file.path.indexOf('json')!== -1){
                    const res = await fetch(file.url);
                    const data = await res.json();
                    console.log(data)
                }
               
                if(file.path.indexOf('jpg')!== -1){
                    const res = await fetch(file.url);
                    const data = await res.json();
                    console.log(data)
                }
            }
            
            // else{
            //     const res = await fetch(file.url);

            //     const filepath = `${basePath}/${file.path}`;
            //     fs.ensureDirSync(path.dirname(filepath));
            //     const dest = fs.createWriteStream(filepath);
            //     res.body.pipe(dest);
            // }


            download(files, basePath, prefix);

        } catch (error) {
            
            download(files, basePath, prefix);
        }


    }

    // Main script starts here.

    fetch(registrationUrl, fetchData)
        .then(res => res.json())
        .then((json) => {
            // console.log(`Retrieved registration manifest`);
            // console.log(json.files);
            const files = json.files.map(entry => {
                return { url: entry.url,  path: entry.name };
            });
            // console.log(`Found ${files.length} entries in registrations`);
            download(files, "./arbo-data", "webapps");
        })
        .catch(err => {
            // console.log('error 3')
            // console.error(err)
        })


    fetch(variantsUrl, { headers: { "Accept": "application/json" }})
        .then(res => res.json())
        .then((json) => {
            // console.log("Retrieved variants manifest");
            const files = json.files.map(entry => {
                return { url: entry.url,  path: entry.name };
            });
            // console.log(`Found ${files.length} entries in variants`);
            download(files, "./arbo-data/data/product-registration", "variants");
        })
        .catch(err=>{
            // console.log('error 4')
            // console.error(err)
        });


    // Main script starts here.
    // mainScript

    const mainScript = async () => {

        try {
            await fetch(arboUrl, fetchData)
                .then(res => res.json())
                .then((json) => {
                    // console.log("Retrieved arbo manifest");
                    const files = json.files.map(entry => {
                        return { url: entry.url, path: entry.name };
                    });
                    // console.log(`Found ${files.length} entries in arbo`);
                    download(files, "./arbo-data/data/product-catalog", "arbo");
                })
                .catch(() => { });
        } catch (error) {
            // console.log('error 1')
            console.log(error)
        }

    };

    return {
        mainScript,
        filesjpg
    }
}
