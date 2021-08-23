
import { useDispatch } from "react-redux";
import {  getProducts, setError, setLoading } from "../redux/actions/actionProducts";
import { type } from "../redux/types/types";
import dataJSON from '../assets/data.json'
    

const env = "rc";
const arboUrl = `http://us04-arbo-${env}.vs-networks.com:8000/api/manifest/dealer-catalog`;
const variantsUrl = `http://us04-arbo-${env}.vs-networks.com:8000/api/manifest/variants`;
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

export const useFetchproducts = () => {

    const dispatch = useDispatch();
    // const option_filter = useSelector(state => state.filter);

    async function download(files = [], basePath = "", prefix = "") {

        switch (prefix) {
            case "arbo": await arboResolveFetchin(files); break;
            case "variants": await variantsResolveFetchin(files); break;
            case "webapps": await webappsResolveFetchin(files); break;
            default: break;
        }

    }

    const mainScript = async () => {
        try {
            // await arboFetch();
            // await variantsFetch();
            // await webappsFetch();
            failedFetching("error")
        } catch (err) {
            failedFetching(err)
        }

    };

    const arboFetch = async () => {
        await fetch(arboUrl, fetchData)
            .then(res => res.json())
            .then((json) => {
                // console.log("Retrieved arbo manifest");
                const files = json.files.map(entry => {
                    return { url: entry.url, path: entry.name };
                });
                // console.log(`Found ${files.length} entries in arbo`);
                dispatch(setError(false));
                download(files, "./arbo-data/data/product-catalog", "arbo");

            })
            .catch((err) => {failedFetching(err) });
    };

    const variantsFetch = async () => {
        await fetch(variantsUrl, { headers: { "Accept": "application/json" } })
            .then(res => res.json())
            .then((json) => {
                // console.log("Retrieved variants manifest");
                const files = json.files.map(entry => {
                    return { url: entry.url, path: entry.name };
                });
                // console.log(`Found ${files.length} entries in variants`);
                dispatch(setError(false));
                download(files, "./arbo-data/data/product-registration", "variants");
            })
            .catch(err => {
                // console.log('error 4')
                // console.error(err)
                failedFetching(err)
            });
    };

    const webappsFetch = async () => {
        await fetch(registrationUrl, fetchData) //trae 1 JSON y un archivo sin extension
            .then(res => res.json())
            .then((json) => {
                // console.log(`Retrieved registration manifest`);
                // console.log(json.files);
                const files = json.files.map(entry => {
                    return { url: entry.url, path: entry.name };
                });
                // console.log(`Found ${files.length} entries in registrations`);
                dispatch(setError(false));
                download(files, "./arbo-data", "webapps");
            })
            .catch(err => {
                // console.log('error 3')
                // console.error(err)
                failedFetching(err)
            })
    };

    async function arboResolveFetchin(arr = []) {
        //ORIGINAL
        let arrImages = [];

        let dataWhitoutImage = {
            battery: [],
            electric: [],
            gas: [],
            others: []
        };

        //reseteo el redux
        dispatch(getProducts([]))

        while (arr.length !== 0) {
            if (arr[arr.length - 1].path.indexOf('json') !== -1) {
                const res = await fetch(arr[arr.length - 1].url);
                const data = await res.json(); //cada doc devuelve un arrray

                if (data.length !== 0) {

                    data.forEach(item => {
                        if(item?.category){
                            let category = item.category;
                            
                            if(category.toLowerCase().indexOf("battery") !== -1) dataWhitoutImage.battery.push(item);
                            if(category.toLowerCase().indexOf("electric") !== -1) dataWhitoutImage.electric.push(item);
                            if(category.toLowerCase().indexOf("gas") !== -1) dataWhitoutImage.gas.push(item);
                            if(category.toLowerCase().indexOf("battery") === -1 && 
                            category.toLowerCase().indexOf("electric") === -1 && 
                            category.toLowerCase().indexOf("gas")=== -1) dataWhitoutImage.others.push(item)
                        }
                    });
                }
            }
            else {
                arrImages.push(arr[arr.length - 1].url);
            }

            arr.pop();
        }

        let newDataWhitImage = {
            battery: [],
            electric: [],
            gas: [],
            others: []
        };
        
        let claves = Object.keys(newDataWhitImage);

        claves.forEach(clave=>{

            dataWhitoutImage[clave].forEach(product=>{

                if(product?.sku){
                    const isImageExist = matchImageProduct(product, arrImages);
                    (isImageExist?.urlImage !== "") && newDataWhitImage[clave].push(isImageExist) 
                }
            })
        })

        dispatch(getProducts(newDataWhitImage));
        dispatch(setLoading(type.endLoading));

       
    };

    const matchImageProduct = (product={},images=[]) => {
        // ORIGINAL
        let arr = {};
        images.forEach(img=>{
            let partUrl= new RegExp(`${product.sku}-1000-800.jpg`);
            if(partUrl.test(img) ){
                
                arr={
                    ...product,
                    urlImage: img
                }

            }
        })
        return arr;
    };

    async function variantsResolveFetchin(arrVariants) {
        // solo se obtiene un archivo JSON
        const res = await fetch(arrVariants[arrVariants.length - 1].url);
        const data = await res.json();
        console.log(data)
    };

    async function webappsResolveFetchin(arrWebApps = []) {
        //se obtienen dos archivos JSON
        while (arrWebApps.length !== 0) {
            const res = await fetch(arrWebApps[arrWebApps.length - 1].url);
            const data = await res.json();
            console.log(data)
            arrWebApps.pop();
        }
    };

    const failedFetching = async(error) => { 
        console.log(error)
        dispatch(getProducts(dataJSON))
        dispatch(setLoading(type.endLoading));
        dispatch(setError(false));
    };

    return {
        mainScript
    }
}
