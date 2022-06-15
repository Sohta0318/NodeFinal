import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useFetch from "../../service/constant/useFetch";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useLoggedIn } from "../../service/constant/useLoggedIn";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: incomeData } = useFetch(`/incomes/${id}`);
  const { token } = useLoggedIn();
  const { data: typeData } = useFetch("/types");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: incomeData && incomeData[0].amount,
      date: incomeData && incomeData[0].date,
      comment: incomeData && incomeData[0].comment,
      category: incomeData && incomeData[0].type,
    },
  });

  const editIncome = async (data) => {
    const income = {
      amount: data.amount,
      date: data.date,
      comment: data.comment,
      type: data.category,
    };
    try {
      await axios.patch(`/incomes/${id}`, income, {
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
          <ErrorMessage errors={errors} name="singleErrorInput" />
          <div className="card-body">
            <div className="card-body">
              <form onSubmit={handleSubmit(editIncome)}>
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
                  <option value="" hidden>
                    Category
                  </option>
                  {typeData &&
                    typeData.map((type) => {
                      return (
                        <option key={type._id} value={type._id}>
                          {type.name}
                        </option>
                      );
                    })}
                </select>
                <Link to={"/income_create_category"}>Add Category</Link>
                <br />
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
                    Edit
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

export default Edit;
