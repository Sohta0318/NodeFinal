import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoggedIn } from "../service/constant/useLoggedIn";
import axios from "axios";
import useFetch from "../service/constant/useFetch";

const Home = () => {
  const navigate = useNavigate();
  const { account, token } = useLoggedIn();
  const { data: incomeData } = useFetch("/incomes");
  const { data: spendData } = useFetch("/spends");
  const logoutHandler = async () => {
    try {
      if (account) {
        axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
        await axios.post("users/logout");
        localStorage.clear();
        navigate("/register");
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div id="app">
      <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
        <div className="container">
          <Link to={"/"} className="navbar-brand">
            Expense
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="{{ __('Toggle navigation') }}"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className="my-navbar-control">
          {account ? (
            <div
              style={{
                display: "flex",
                marginRight: "3em",
                marginTop: "1em",
              }}
            >
              <span className="my-navbar-item">{account}</span>/
              <p onClick={logoutHandler} style={{ cursor: "pointer" }}>
                Logout
              </p>
            </div>
          ) : (
            <>
              <Link className="my-navbar-item" to={"/login"}>
                Login
              </Link>
              /
              <Link className="my-navbar-item" to={"/register"}>
                Register
              </Link>
            </>
          )}
        </div>
      </nav>

      <main className="py-4">
        <div className="row justify-content-around">
          <div className="d-flex justify-content-around mb-3">
            <Link to={"/create_income"}>
              <button type="button" className="btn btn-primary">
                +Income
              </button>
            </Link>
            <Link to="/create_spend">
              <button type="button" className="btn btn-secondary">
                -Spending
              </button>
            </Link>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <div className="text-center">Incomes</div>
              </div>
              <div className="card-body">
                <div className="card-body">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Detail</th>
                        <th scope="col">Date</th>
                        <th scope="col">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {incomeData &&
                        incomeData.map((income) => {
                          return (
                            <tr key={income._id}>
                              <th scope="col">
                                <Link to={`/income/${income._id}/detail`}>
                                  #
                                </Link>
                              </th>
                              <th scope="col">{income.date}</th>
                              <th scope="col">{income.amount}</th>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <div className="text-center">Spendings</div>
              </div>
              <div className="card-body">
                <div className="card-body">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Detail</th>
                        <th scope="col">Date</th>
                        <th scope="col">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {spendData &&
                        spendData.map((spend) => {
                          return (
                            <tr key={spend._id}>
                              <th scope="col">
                                <Link to={`/spend/${spend._id}/detail`}>#</Link>
                              </th>
                              <th scope="col">{spend.date}</th>
                              <th scope="col">{spend.amount}</th>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
