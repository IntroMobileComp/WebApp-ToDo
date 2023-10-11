import SideBar from "./SideBar";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function SignOut() {
  const [cookies, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      removeCookie("token");
      navigate("/"); 
    }, 1500);
  }, []);

  return (
    <div id="outer-container">
      <SideBar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />
      <div id="page-wrap">
        <center>
          <h1>Signing out...</h1>
        </center>
      </div>
    </div>
  );
}

export default SignOut;
