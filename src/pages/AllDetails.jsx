import { useEffect, useState } from "react";
import * as formApi from "../apis/form-api";
export default function Details() {
  const [details, setDetails] = useState(null);
  console.log(details);
  useEffect(() => {
    (async () => {
      const res = await formApi.getAllDetailsApi();
      setDetails(res.data);
    })();
  }, []);
  return (
    <>
      <h1>All Details</h1>
      <div>
        {details?.map(el => (
          <div className="border border-solid border-orange-950 round-sm w-64 py-2 my-4 text-center">
            <div>{el.firstName}</div>
            <div>{el.lastName}</div>
            <div>{el.email}</div>
            <div>{el.mobile}</div>
          </div>
        ))}
      </div>
    </>
  );
}
