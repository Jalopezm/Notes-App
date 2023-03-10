import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PostLogin() {
    let navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { username, password };

        await fetch("http://localhost:8081/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem("jwt", data.token);
                localStorage.setItem("jwtExp",data.expiration)
                
                console.log(data)
                return navigate("/notes");
            })
    }
    return (
        <div>
            <h1 className="login">Login</h1>
            <div className='border'>
                <span className="vertical-border-right"></span>
                <span className="vertical-border-left"></span>
                <span className="horizontal-border-top"></span>
                <span className="horizontal-border-bottom"></span>
            </div>
            <form onSubmit={handleSubmit} className="login-form">
                <div id="chincheta">
                    <svg>
                        <path d="M 24.32 1.382 C 24.789 1.415 25.256 1.445 25.725 1.472 C 33.743 1.898 41.76 4.423 42.676 6.811 C 42.722 6.946 42.795 7.08 42.824 7.112 C 42.889 7.173 42.328 9.668 42.155 10.062 C 41.886 10.669 41.337 11.179 40.476 11.611 C 39.006 12.346 37.016 12.776 34.095 12.992 C 33.552 13.032 33.588 12.961 33.492 14.1 C 33.456 14.544 33.373 15.472 33.314 16.163 C 33.012 19.448 32.712 22.733 32.416 26.019 C 32.315 27.095 32.238 28.066 32.238 28.172 C 32.238 28.366 32.249 28.38 32.69 28.644 C 34.889 29.981 36.497 31.42 37.662 33.099 C 38.911 34.889 39.479 36.611 39.49 38.593 C 39.49 39.586 39.424 40.118 39.228 40.707 C 38.625 42.488 36.383 43.752 32.506 44.493 C 29.405 45.085 25.755 45.256 22.17 44.969 C 21.74 44.933 21.37 44.919 21.345 44.942 C 21.315 44.96 21.107 45.8 20.879 46.808 C 19.732 51.89 19.679 52.101 19.451 52.429 C 18.788 53.366 17.575 53.787 15.957 53.649 C 15.382 53.599 15.084 53.488 14.833 53.232 C 14.72 53.119 14.72 53.089 14.779 52.806 C 14.821 52.64 15.077 51.532 15.358 50.347 C 15.834 48.345 16.302 46.342 16.763 44.336 C 16.763 44.327 16.811 44.314 16.864 44.305 C 16.924 44.29 16.703 44.237 16.375 44.184 C 15.316 44.016 14.263 43.796 13.221 43.528 C 9.325 42.504 6.547 41.38 4.371 39.945 C 3.254 39.203 1.928 37.714 1.707 36.957 C 1.647 36.754 1.652 36.606 1.73 36.149 C 1.981 34.714 2.34 33.803 3.105 32.626 C 3.96 31.327 4.999 30.258 6.421 29.227 C 7.993 28.097 9.88 27.165 11.953 26.504 C 12.915 26.194 14.611 25.79 14.827 25.817 C 14.935 25.832 15.031 25.822 15.049 25.799 C 15.102 25.733 20.049 11.346 20.049 11.257 C 20.049 11.188 19.882 11.104 19.314 10.896 C 17.701 10.3 16.404 9.641 15.442 8.924 C 14.791 8.43 14.462 8.107 14.145 7.635 C 13.674 6.935 13.662 6.469 14.074 4.733 C 14.362 3.523 14.385 3.46 14.588 3.235 C 15.358 2.392 17.175 1.805 19.809 1.543 C 21.37 1.387 23.532 1.31 24.32 1.382 Z">
                        </path>
                    </svg>
                </div>
                <label htmlFor="username">UserName</label>
                <input type="text" name="username" id="nickname" onChange={(event) => setUsername(event.target.value)} required />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" onChange={(event) => setPassword(event.target.value)} required />
                <input type="submit" value="Send" />
            </form>

        </div>
    );
}