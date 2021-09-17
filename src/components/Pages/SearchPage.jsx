
import { useEffect, useState } from 'react';
import { loadGoogleMapScript } from '../../helper/loadGoogleMapScript';
import { FormLocation } from '../FormLocation';
// import { EmailPage } from '../../helper/views/email/page'
import { Loader } from '../Loader';



export const SearchPage = () => {

    const [loadMap, setLoadMap] = useState(false);

    useEffect(() => {
        loadGoogleMapScript(() => {
            setLoadMap(true)
        });
    }, []);

    return (
        <>
            {
                (!loadMap) 
                    ? <Loader/>  
                    : <div>
                        <FormLocation />
                        {/* <EmailPage /> */}
                        </div>}
        </>
    )
}
