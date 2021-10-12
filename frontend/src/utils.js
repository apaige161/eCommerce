
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
        id: request[2], // ID
        action: request[3], // verb, ex./ POST, GET, PUT
    }
}

export const rerender = async component => {
    // re-render everything but the header and footer
    document.getElementById('main-container').innerHTML = 
        await component.render();
        await component.after_render();
}

// show/hide loading elements
export const showLoading = () => {
    document.getElementById('loading-overlay').classList.add('active');
}

export const hideLoading = () => {
    document.getElementById('loading-overlay').classList.remove('active');
}

// custom error message
    // takes a message and a callback that is fired after ok is click in a message box
export const showMessage = (message, callback) => {
    // create loading message
    document.getElementById('message-overlay').innerHTML = `
        <div>
            <div id="message-overlay-content">${message}</div>
            <button id="message-overlay-close-button">OK</button>
        </div>
    `;
    // set and remove active class on message-overlay
    document.getElementById('message-overlay').classList.add('active');

    document.getElementById('message-overlay-close-button').addEventListener('click', () => {
        document.getElementById('message-overlay').classList.remove('active');
        if(callback) {
            callback();
        }
    });
}