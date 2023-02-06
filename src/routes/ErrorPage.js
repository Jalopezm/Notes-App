import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <div>
        <h1>404</h1>
        <p>Oh the irony of developing software which helps find and fix broken links, 
          and then having some yourself! This was just a test, honest. </p>
        <p> Or perhaps you entered an incorrect URI? Contact us, if you need any help at all.</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    );
  }

}