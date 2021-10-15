import { update } from "../api";
import { clearUser, getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, showLoading, showMessage } from "../utils";

const ProfileScreen = {

    // fires when data changes
    after_render:()=>{

        // signout button listener
        document.getElementById('signout-button'). addEventListener('click', () => {
            // clear user data from local storage
            clearUser();
            // redirect user to home page
            document.location.hash = '/';
        }) 

        // attach event listener for register-form submit
        document.getElementById('profile-form')
            .addEventListener('submit', async (e) => {
                
                // form will not refresh and post back to the server
                e.preventDefault();

                // call loading elements
                showLoading();

                // get user data and save it to DB
                const data = await update({
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    password: document.getElementById('password').value
                });

                //hide loading elements
                hideLoading();

                // handle error
                // alert user with custom error message
                if(data.error) {
                    showMessage(data.error);
                } else { // success case
                    //save user data in local storage
                    setUserInfo(data);
                    // redirect user to the home page
                    document.location.hash = '/';
                }
            })

    },

    // render product sreen
    render:() => {


        // if user is not loged in redirect to the homepage
        // work with data from local storage
        const { name, email } = getUserInfo();

        // redirect user to home page if they are already signed in
        if(!name) {
            document.location.hash = '/';
        }
        return `
        <div class="form-container">
            <form id="profile-form">
                <ul class="form-items">
                    <li>
                        <h1>User Profile</h1>
                    </li>
                    <li>
                        <label for="name">Name</label>
                        <input type="name" name="name" id="name" value="${name}" />
                    </li>
                    <li>
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" value="${email}" />
                    </li>
                    <li>
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" />
                    </li>
                    <li>
                        <button type="submit" class="primary">Update</button>
                    </li>
                    <li>
                        <button type="button" id="signout-button">Sign Out</button>
                    </li>
                </ul>
            </form>
        </div>`;
    },
};

export default ProfileScreen;