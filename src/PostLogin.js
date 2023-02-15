export default function PostLogin(user, password) {
    fetch("http://localhost:8081/login", {
        method: "POST",
        body: {
            "username": user,
            "password": password
        }
    })
}