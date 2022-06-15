import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useFetch from "../../service/constant/useFetch";
import { useLoggedIn } from "../../service/constant/useLoggedIn";
import axios from "axios";

const Detail = () => {
  const { account, token } = useLoggedIn();
  const navigate = useNavigate();
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
  const { id } = useParams();
  const { data: spendData } = useFetch(`/spends/${id}`);
  const { data: typeData } = useFetch(`/types/${spendData && spendData.type}`);
  const deleteHandler = async () => {
    try {
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
      await axios.delete(`/spends/${id}`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div id="app">
      <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
        <div className="container">
          <a className="navbar-brand" href="{{ url('/') }}">
            Expense
          </a>
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
        <div className="">
          <div className="col-md-4 mx-auto">
            <div className="card">
              <div className="card-header">
                <div className="text-center">Spending</div>
              </div>
              <div className="card-body">
                <div className="card-body">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Category</th>
                        <th scope="col">Comment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {spendData && (
                        <tr>
                          <th scope="col">{spendData.date}</th>
                          <th scope="col">{spendData.amount}</th>
                          <th scope="col">{typeData && typeData[0].name}</th>
                          <th scope="col">{spendData.comment}</th>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center mt-3">
              <button
                name="delete"
                className="btn btn-danger me-2"
                onClick={deleteHandler}
              >
                Delete
              </button>
              <Link to={`/edit_spend_form/${id}`}>
                <button className="btn btn-secondary me-2">Edit</button>
              </Link>
              <form action="" method="post">
                <button
                  type="submit"
                  name="invisible"
                  className="btn btn-warning"
                >
                  Hide
                </button>
                <input type="hidden" value="1" />
              </form>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
      </main>
    </div>
  );
};

export default Detail;
