export const parsRequestUrl = () => {
    //get url
    const url = document.location.hash.toLocaleLowerCase();
    const request = url.split("/");
    //return object
    return {
        resource: request[1], //second item - product
        id: request[2],
        action: request[3],
    }
}