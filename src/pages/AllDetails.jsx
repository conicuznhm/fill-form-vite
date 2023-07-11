import { useEffect, useState } from "react";
import * as formApi from "../apis/form-api";
import { useNavigate } from "react-router-dom";
export default function Details() {
  const [details, setDetails] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const res = await formApi.getAllDetailsApi();
      setDetails(res.data);
    })();
  }, []);
  const handleClick = id => {
    navigate("/details/" + id);
  };

  // #2 if need event
  // const handleClick = (id, event) => {
  //   console.log(event);
  //   navigate("/details/" + id);
  // };

  // #3 if need event
  // const handleClick = id => event => {
  //   console.log(event);
  //   navigate("/details/" + id);
  // };
  return (
    <>
      <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">All Details</h1>
      <button className="mb-4" type="button" onClick={() => navigate(-1)}>
        Back
      </button>
      <div className="flex flex-wrap justify-center lg:justify-start gap-4">
        {details?.map(el => (
          <div
            onClick={() => handleClick(el.id)}
            // onClick={event => handleClick(el.id, event)}   //#2 to attach event
            // onClick={handleClick(el.id)}                   //#3 to attach event
            key={el.id}
            className="bg-orange-300 block w-96 p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 hover:cursor-pointer"
          >
            <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Details</h1>
            <div className="box-border border-t-4 border-black pt-2 pl-2">
              <div className="font-medium text-xl text-slate-900">
                First name: <span className="font-normal text-md">{el?.firstName}</span>
              </div>
              <div className="font-medium text-xl text-slate-900">
                Last name: <span className="font-normal text-md">{el?.lastName}</span>
              </div>
              <div className="font-medium text-xl text-slate-900">
                E-mail: <span className="font-normal text-md">{el?.email}</span>
              </div>
              <div className="font-medium text-xl text-slate-900">
                Phone: <span className="font-normal text-md">{el?.mobile}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
