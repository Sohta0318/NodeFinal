import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useLoggedIn } from "../../service/constant/useLoggedIn";
import useFetch from "../../service/constant/useFetch";

const Create = () => {
  const navigate = useNavigate();
  const { token } = useLoggedIn();
  const { data: typeData } = useFetch("/types");
  const [data, setData] = useState([]);
  useEffect(() => {
    if (typeData) {
      const filteredType = typeData.filter((type) => {
        return type.category === 0;
      });
      setData(filteredType);
    }
  }, [typeData]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const createIncome = async (data) => {
    const income = {
      amount: data.amount,
      date: data.date,
      comment: data.comment,
      type: data.category,
    };
    try {
      await axios.post("/incomes", income, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="py-4">
      <div className="col-md-5 mx-auto">
        <div className="card">
          <div className="card-header">
            <h4 className="text-center">Income</h4>
          </div>
          <div className="panel-body">
            <ErrorMessage errors={errors} name="singleErrorInput" />
          </div>
          <div className="card-body">
            <div className="card-body">
              <form onSubmit={handleSubmit(createIncome)}>
                <label htmlFor="amount">Amount</label>
                <input
                  type="text"
                  className="form-control"
                  name="amount"
                  {...register("amount")}
                />
                <label htmlFor="date" className="mt-2">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  id="date"
                  {...register("date")}
                />
                <label htmlFor="type" className="mt-2">
                  Category
                </label>
                <select
                  name="type_id"
                  className="form-control"
                  {...register("category")}
                >
                  <option value="test" hidden>
                    Category
                  </option>
                  {data &&
                    data.map((category) => {
                      return (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      );
                    })}
                </select>
                <Link to={"/income_create_category"}>Add Category</Link>
                <br></br>
                <label htmlFor="comment" className="mt-2">
                  Comment
                </label>
                <textarea
                  className="form-control"
                  name="comment"
                  {...register("comment")}
                ></textarea>
                <div className="row justify-content-center">
                  <button type="submit" className="btn btn-primary w-25 mt-3">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Create;
