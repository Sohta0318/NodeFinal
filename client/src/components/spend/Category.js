import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useLoggedIn } from "../../service/constant/useLoggedIn";

const Category = () => {
  const navigate = useNavigate();
  const { token } = useLoggedIn();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const createCategory = async (data) => {
    const category = {
      name: data.category,
      category: 1,
    };
    try {
      await axios.post("https://expense-app99.herokuapp.com/types", category, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate(-1);
    } catch (error) {}
  };
  return (
    <main className="py-4">
      <div className="col-md-5 mx-auto">
        <div className="card">
          <div className="card-header">
            <h4 className="text-center">Spending</h4>
          </div>
          <div className="card-body">
            <div className="card-body">
              <form onSubmit={handleSubmit(createCategory)}>
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  className="form-control"
                  name="category"
                  {...register("category", {
                    required: "This is required",
                  })}
                />
                <ErrorMessage errors={errors} name="category" />
                <div className="row justify-content-center">
                  <button type="submit" className="btn btn-primary w-25 mt-3">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="text-center">
          <Link to={"/"}>Back to Home</Link>
        </div>
      </div>
    </main>
  );
};

export default Category;
