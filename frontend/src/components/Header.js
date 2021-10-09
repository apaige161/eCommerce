import { getUserInfo } from "../localStorage";


const Header = {
    render:() => {
        // get username
        const {name} = getUserInfo();
        return `
            <!-- set urls to each menu item -->
            <div class="brand">
                <a href="/#/">Amazona</a>
            </div>
            <div>
                ${ name ? 
                    `<a href="/#/profile">${name}</a>` :
                    `<a href="/#/signin">Sign-In</a>`}
                <a href="/#/cart">Cart</a>
            </div>
        `
    },
    after_render:() => {

    }
};
export default Header;