import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../../services/apiService";
import Title from "../Title/Title";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, confPassword] = useState("");
  const navigate = useNavigate();

  function submit() {
    const data = {
      name,
      email,
      password,
    };

    if (password !== passwordConf) {
      console.log("no match");
      return;
    }

    postRequest("users/signup", data).then((res) => {
      navigate("/login");
    });
  }

  return (
    <>
      <Title text="Sing Up"></Title>
      <div className="p-3 form-max-w m-auto col-xs-12 col-md-4 offset-md-4 mt-5">
        {/* <Title text="Sign Up" /> */}

        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <input
            className="form-control"
            type="password"
            placeholder="Confirm Password"
            value={passwordConf}
            onChange={(e) => confPassword(e.target.value)}
          />
        </div>

        <button onClick={submit} className="btn btn-primary btn-lg w-100">
          Sign Up
        </button>
      </div>
    </>
  );
}

export default SignUp;
