import { userDataMap, dataMapKeys } from "../Components/UserDataMap";

export const changeBannerColor = (username, color) => new Promise((resolve, reject) => {
    userDataMap.set(dataMapKeys.bannerColor = color);    
    
    const query = 'http://localhost:5000/api/changeBannerColor/:'+ username + '/:'+color;

    fetch(query, {
        mode: "cors",
        method: "GET"
    }
        ).then(response => {
            response.json().then(json=>{
                //This is the response after getting all public tag from Tag
                resolve(json);
            }).catch(error => {
                reject(error);
            })
    })
    
});