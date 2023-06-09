import { useState } from "react";
import Input from "../components/Input";
import validateFill from "../validators/validate-fill";
import { useNavigate, Link } from "react-router-dom";
import * as formApi from "../apis/form-api";

export default function FillPage() {
  const initialInput = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: ""
  };
  const [input, setInput] = useState(initialInput);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleInput = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
    error[e.target.name] && setError({ ...error, [e.target.name]: "" });
  };

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      const result = validateFill(input);
      const numError = Object.values(result).length;
      if (numError) {
        setError(result);
      } else {
        setError({});
        const res = await formApi.createFillApi(input);
        console.log(res.data);
        setInput(initialInput);
        navigate("/details/" + res.data.id);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-center">FillPage</h1>
      <Link to="/details">To all details</Link>
      <div className="h-auto w-2/6 rounded-md bg-sky-300 mx-auto py-2 flex flex-col gap-y-7 px-4">
        {/* <div className="flex flex-col gap-y-2 px-4 mx-auto"> */}
        <h1>hi</h1>
        <div>
          <Input
            placeholder="First name"
            name="firstName"
            value={input.firstName}
            onChange={handleInput}
            error={error.firstName}
          />
        </div>
        <div>
          <Input
            placeholder="Last name"
            name="lastName"
            value={input.lastName}
            onChange={handleInput}
            error={error.lastName}
          />
        </div>
        <div>
          <Input
            placeholder="E-mail"
            name="email"
            value={input.email}
            onChange={handleInput}
            error={error.email}
          />
        </div>
        <div>
          <Input
            placeholder="Mobile phone"
            name="mobile"
            value={input.mobile}
            onChange={handleInput}
            error={error.mobile}
          />
        </div>
        <div className="flex flex-row gap-x-10 ">
          {/* <button className="text-white bg-gray-800 rounded-lg px-4" type="submit"> */}
          <button
            className="text-white w-52 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="submit"
          >
            Send
          </button>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            onClick={() => {
              setInput(initialInput);
              setError({});
            }}
          >
            Cancel
          </button>
        </div>
      </div>
      {/* </div> */}
    </form>
  );
}
