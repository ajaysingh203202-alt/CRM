import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const logcode = async (e) => {
    e.preventDefault();
    const admin = { email, password };
    // console.log(admin);
    const res = await axios.post("http://localhost:5000/api/admin/log", admin);

    // console.log(res);
    if (res.data.msg == "success") {
      toast.success("Login Success");
      localStorage.setItem(res.data.role, res.data.id);
      localStorage.setItem("role", res.data.role);
      setPassword("");
      setEmail("");
      if (res.data.role == "admin") {
        navigate("/dash");
      } else if (res.data.role == "Manager") {
        navigate("/manager/");
      } else {
        navigate("/counselor");
      }
    } else {
      window.alert(res.data.msg);
      setPassword("");
    }
  };
  function showpass() {
    const t = document.querySelector("input[name=password]");
    if (t.type == "password") {
      t.type = "text";
      eye.className = "fa-solid fa-eye eye";
    } else {
      eye.className = "fa-solid fa-eye-slash eye";
      t.type = "password";
    }
  }

  const validate = () => {
    if (localStorage.getItem("admin")) {
      localStorage.removeItem("admin");
    }
  };

  useEffect(() => {
    validate();
  }, []);
  return (
    <>
      <div className="row  mt-5 mb-5 d-flex justify-content-center">
        <div className="col-sm-4 px-4 login-deg  ">
          <div className="d-flex justify-content-center">
            <img
              src="/src/assets/spilogo.png"
              alt=""
              height={100}
              className="spi-img-login mt-3  "
            />
          </div>
          <p
            className="text-center mt-2"
            style={{ fontWeight: "700", fontSize: "22px" }}
          >
            CRM
          </p>
          <p style={{ fontWeight: "700", fontSize: "18px", color: "#ff6d04" }}>
            Welcome Back 👋
            <br />
            <span
              style={{ fontSize: "15px", fontWeight: "350", color: "#595c5f" }}
            >
              Sign in to continue
            </span>{" "}
          </p>

          <form method="post" onSubmit={logcode}>
            <div className="mb-3">
              <label
                for="exampleInputEmail1"
                className="form-label"
                style={{ fontWeight: "500" }}
              >
                username *
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <label
              for="inputPassword5"
              className="form-label"
              style={{ fontWeight: "500" }}
            >
              Password *
            </label>
            <div className="d-flex">
              <input
                type="password"
                id="inputPassword5"
                name="password"
                className="form-control"
                aria-describedby="passwordHelpBlock"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span onClick={showpass}>
                <i id="eye" className="fa-solid fa-eye eye"></i>
              </span>
            </div>
            <small><Link to="/forgot">forgot password</Link></small>
            <button
              type="submit"
              className="btn sign-btn  mt-2 w-100"
              to={"/login/dash"}
            >
              <i className="fa-solid fa-arrow-right-to-bracket"></i> Sign In
            </button>
          </form>
          <p className="login-footer ps-3 py-2 mt-3">
            {" "}
            <span
              style={{
                fontSize: "13px",
                fontWeight: "200",
                color: "#595c5f",
              }}
            >
              {" "}
              Designed & Developed By{" "}
            </span>
            Softpro India Computer Technologies (P). Ltd.
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
