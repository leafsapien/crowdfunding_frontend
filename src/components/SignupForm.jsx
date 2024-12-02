

function SignupForm() {
        return (
        <form>
        <div>
            <label htmlFor="first_name">First name:</label>
            <input type="text" id="first_name" placeholder="Your first name" />
        </div>
        <div>
            <label htmlFor="last_name">Last name:</label>
            <input type="text" id="last_name" placeholder="Your surname" />
        </div>
        <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" placeholder="Your email address" />
        </div>
        <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" placeholder="Choose your username" />
        </div>
        <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" placeholder="Create your password" />
        </div>
        <button type="submit">Sign Up</button>
        </form>
    );
    }

export default SignupForm;