import { useEffect, useState } from "react";
import * as formApi from "../apis/form-api";
import { useParams } from "react-router-dom";

export default function Details() {
  const [detail, setDetail] = useState(null);
  //   const params =useParams()
  const { id } = useParams();

  useEffect(() => {
    const fetch = async params => {
      const res = await formApi.getDetailApi(params);
      setDetail(res.data);
    };
    // fetch(params.id)
    fetch(id);
  }, []);
  return (
    <>
      <h1>Details</h1>
      <div>{detail?.firstName}</div>
      <div>{detail?.lastName}</div>
      <div>{detail?.email}</div>
      <div>{detail?.mobile}</div>
    </>
  );
}
