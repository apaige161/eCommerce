import { signin } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";

const SignInScreen = {

    after_render:()=>{
        // attach event listener for signin-form submit
        document.getElementById('signin-form')
            .addEventListener('submit', async (e) => {
                // form will not refresh and post back to the server
                e.preventDefault();
                // call signin api with user data
                // server will respond with user data or an error
                // signin() comes from ../api.js
                // data holds the response from the server
                const data = await signin({
                    email: document.getElementById('email').value,
                    password: document.getElementById('password').value
                });

                // handle error
                // alert user
                if(data.error) {
                    alert(data.error);
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
        // redirect user to home page if they are already signed in
        if(getUserInfo().name) {
            document.location.hash = '/';
        }
        return `
        <div class="form-container">
            <form id="signin-form">
                <ul class="form-items">
                    <li>
                        <h1>Sign-In</h1>
                    </li>
                    <li>
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" />
                    </li>
                    <li>
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" />
                    </li>
                    <li>
                        <button type="submit" class="primary">Signin</button>
                    </li>
                    <li>
                        <div>
                            New User?
                            <a href="/#/register">Create your account</a>
                        </div>
                    </li>
                </ul>
            </form>
        </div>`;
    },
};

export default SignInScreen;