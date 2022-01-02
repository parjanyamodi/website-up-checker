import { Container, Col, Row } from "react-bootstrap";
import Cookies from "universal-cookie";
import { GoogleLogin } from "react-google-login";

import Dash from "./Components/Dash";

const cookies = new Cookies();

const clientId =
  "12442857673-tpt89aun3q39us85u5g8rlr5gj451q5g.apps.googleusercontent.com";

function App() {
  const onSuccess = (res) => {
    console.log("[Login Success] currentUser:", res.profileObj);
    cookies.set("Profile-Token", res.profileObj, { path: "/" });
    fetch(
      `http://localhost:4500/login/${res.profileObj.googleId}/${res.profileObj.email}/${res.profileObj.name}`
    )
      .then((response) => response.json())
      .then((data) => {
        cookies.set("Status", data.status, { path: "/" });
        window.location.reload();
      });
  };
  const onFailure = (res) => {
    console.log("[Login failed] res: ", res);
  };
  return (
    <div className="App">
      {cookies.get("Profile-Token") ? (
        <Dash />
      ) : (
        <GoogleLogin
          clientId={clientId}
          buttonText="Login"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          style={{ marginTop: "100px" }}
          isSignedIn={true}
        />
      )}
    </div>
  );
}

export default App;
