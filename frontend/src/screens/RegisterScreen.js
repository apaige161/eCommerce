import { register } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, showLoading, showMessage } from "../utils";

const RegisterScreen = {

    after_render:()=>{
        // attach event listener for register-form submit
        document.getElementById('register-form')
            .addEventListener('submit', async (e) => {
                
                // form will not refresh and post back to the server
                e.preventDefault();

                // call loading elements
                showLoading();

                // get user data and save it to DB
                const data = await register({
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
        // redirect user to home page if they are already signed in
        if(getUserInfo().name) {
            document.location.hash = '/';
        }
        return `
        <div class="form-container">
            <form id="register-form">
                <ul class="form-items">
                    <li>
                        <h1>Create Account</h1>
                    </li>
                    <li>
                        <label for="name">Name</label>
                        <input type="name" name="name" id="name" />
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
                        <label for="repassword">Re-Enter Password</label>
                        <input type="password" name="repassword" id="repassword" />
                    </li>
                    <li>
                        <button type="submit" class="primary">Register</button>
                    </li>
                    <li>
                        <div>
                            Already have an account?
                            <a href="/#/signin">Sign In</a>
                        </div>
                    </li>
                </ul>
            </form>
        </div>`;
    },
};

export default RegisterScreen;