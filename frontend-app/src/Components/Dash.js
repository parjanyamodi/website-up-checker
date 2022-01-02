import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Cookies from "universal-cookie";
import { GoogleLogout } from "react-google-login";

const clientId =
  "12442857673-tpt89aun3q39us85u5g8rlr5gj451q5g.apps.googleusercontent.com";

const cookies = new Cookies();

const Dash = (props) => {
  const [message, setMessage] = useState("");
  // get token generated on login
  const token = cookies.get("Profile-Token");
  const status = cookies.get("Status");
  console.log(token);
  console.log(status);
  // logout
  const logout = () => {
    // destroy the cookie
    cookies.remove("Profile-Token", { path: "/" });
    cookies.remove("Status", { path: "/" });
    // redirect user to the landing page
    window.location.href = "/";
  };

  return (
    <div className="text-center">
      <h1>Auth Component</h1>

      {/* displaying our message from our API call */}
      <h3 className="text-danger">{message}</h3>

      {/* logout */}
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={logout}
      ></GoogleLogout>
    </div>
  );
};

export default Dash;
