export default function SignUp() {
    return (
      <div>
        <h1>SignUp</h1>
        <form action="/signup" method="post">
        <label htmlFor="nickname">NickName</label>
            <input type="text" name="nickname" id="nickname" required/>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" required/>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password"required />
            <input type="submit" value="Send" />
        </form>
      </div>
    );
  }