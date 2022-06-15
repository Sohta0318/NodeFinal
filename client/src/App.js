import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import SpendCreate from "./components/spend/Create";
import IncomeCreate from "./components/income/Create";
import SpendEdit from "./components/spend/Edit";
import IncomeEdit from "./components/income/Edit";
import SpendCategory from "./components/spend/Category";
import IncomeCategory from "./components/income/Category";
import SpendDetail from "./components/spend/Detail";
import IncomeDetail from "./components/income/Detail";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/create_spend"} element={<SpendCreate />} />
        <Route path={"/create_income"} element={<IncomeCreate />} />
        <Route path={"/edit_spend_form/:id"} element={<SpendEdit />} />
        <Route path={"edit_income_form/:id"} element={<IncomeEdit />} />
        <Route path={"/spend_create_category"} element={<SpendCategory />} />
        <Route path={"/income_create_category"} element={<IncomeCategory />} />
        <Route path={"/spend/:id/detail"} element={<SpendDetail />} />
        <Route path={"/income/:id/detail"} element={<IncomeDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
