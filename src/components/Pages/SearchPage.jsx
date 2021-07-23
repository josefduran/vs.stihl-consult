
import { useEffect, useState } from 'react';
import { loadGoogleMapScript } from '../../helper/loadGoogleMapScript';
import { FormLocation } from '../FormLocation';



export const SearchPage = () => {

    const [loadMap, setLoadMap] = useState(false);

    useEffect(() => {
        loadGoogleMapScript(() => {
            setLoadMap(true)
        });
    }, []);

    return (
        <>
            {!loadMap ? <div>Loading...</div> : <FormLocation />}
        </>
    )
}
