
// parse url to get the resource or (product) 
export const parsRequestUrl = () => {
    // get url

    // location.hash will return the anchor part of the URL
    // anchor is anything after the '#' 
    const url = document.location.hash.toLocaleLowerCase();
    // splits the anchor into an array
    const request = url.split("/");
    // return object
    // http://localhost:8080/#/product/2
    return {
        resource: request[1], // second item - product
        id: request[2],
        action: request[3],
    }
}

