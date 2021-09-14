const KEY = process.env.REACT_APP_KEY_PROD;

export const loadGoogleMapScript = (callback) => {
    if (typeof window.google === 'object' && typeof window.google.maps === 'object') {
        callback();
    } else {
        const googleMapScript = document.createElement("script");
        const key = process.env.REACT_APP_KEY_PROD;
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
        window.document.body.appendChild(googleMapScript);
        googleMapScript.addEventListener("load", callback);
    }
}