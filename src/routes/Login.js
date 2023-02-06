export default function Login() {
    return (
      <div>
        <h1>Login</h1>
        <form action="/login" method="post">
        <label htmlFor="nickname">NickName</label>
            <input type="text" name="nickname" id="nickname" required/>
            <label htmlFor="password">password</label>
            <input type="password" name="password" id="password" required/>
            <input type="submit" value="Send" />
        </form>
      </div>
    );
  }