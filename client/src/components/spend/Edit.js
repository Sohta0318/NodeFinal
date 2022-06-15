import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useFetch from "../../service/constant/useFetch";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useLoggedIn } from "../../service/constant/useLoggedIn";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: spendData } = useFetch(
    `https://expense-app99.herokuapp.com/spends/${id}`
  );
  const { token } = useLoggedIn();
  const { data: typeData } = useFetch(
    "https://expense-app99.herokuapp.com/types"
  );

  const [data, setData] = useState([]);
  useEffect(() => {
    if (typeData) {
      const filteredType = typeData.filter((type) => {
        return type.category === 1;
      });
      setData(filteredType);
    }
  }, [typeData]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: spendData && spendData.amount,
      date: spendData && spendData.date,
      comment: spendData && spendData.comment,
      category: spendData && spendData.type,
    },
  });

  const editSpend = async (data) => {
    const spend = {
      amount: data.amount,
      date: data.date,
      comment: data.comment,
      type: data.category,
    };
    try {
      await axios.patch(
        `https://expense-app99.herokuapp.com/spends/${id}`,
        spend,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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
            <h4 className="text-center">Spending</h4>
          </div>
          <ErrorMessage errors={errors} name="singleErrorInput" />
          <div className="card-body">
            <div className="card-body">
              <form onSubmit={handleSubmit(editSpend)}>
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
                  {data &&
                    data.map((type) => {
                      return (
                        <option key={type._id} value={type._id}>
                          {type.name}
                        </option>
                      );
                    })}
                </select>
                <Link to={"/spend_create_category"}>Add Category</Link>
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
