export const logo = "https://assets.nflxext.com/ffe/siteui/vlv3/f272782d-cf96-4988-a675-6db2afd165e0/web/IN-en-20241008-TRIFECTA-perspective_b28b640f-cee0-426b-ac3a-7c000d3b41b7_small.jpg"
export const ADD_IMG = "https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg"
export const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_TMDB_KEY}`
    }
}

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500";
export const SUPPORTED_LANGUAGES = [
    {
        identifier: "en",
        name: "English"
    },
    {
        identifier: "हिंदी",
        name: "हिंदी"
    },
    {
        identifier: "संस्कृत",
        name: "संस्कृत"
    },
    {
        identifier: "french",
        name: "French"
    }
]