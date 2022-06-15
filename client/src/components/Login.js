import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useNavigate } from "react-router-dom";
import { useLoggedIn } from "../service/constant/useLoggedIn";

const Login = () => {
  const navigate = useNavigate();
  const { account } = useLoggedIn();
  useEffect(() => {
    if (account) {
      navigate("/");
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginUser = async (data) => {
    const user = {
      email: data.email,
      password: data.password,
    };
    try {
      const res = await axios.post(
        "https://expense-app99.herokuapp.com/users/login",
        user
      );
      const userInfo = res.data.user;
      const token = res.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userInfo._id);
      localStorage.setItem("name", userInfo.name);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col col-md-offset-3 col-md-6">
          <nav className="card mt-5">
            <div className="card-header">Login</div>
            <div className="card-body">
              <form onSubmit={handleSubmit(loginUser)}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    {...register("email", {
                      required: true,
                      maxLength: 60,
                      pattern: {
                        value:
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: "Please input valid email",
                      },
                    })}
                  />
                  <ErrorMessage errors={errors} name="email" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    {...register("password", {
                      required: true,
                      maxLength: 60,
                    })}
                  />
                  <ErrorMessage errors={errors} name="password" />
                </div>
                <div className="text-right">
                  <button type="submit" className="btn btn-primary">
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </nav>
          <div className="text-center">
            <Link to={"/register"}>Create Account?</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
