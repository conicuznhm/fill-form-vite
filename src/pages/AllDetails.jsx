import { useEffect, useState } from "react";
import * as formApi from "../apis/form-api";
import { useNavigate } from "react-router-dom";
import {X, Edit2} from 'lucide-react';
import Input from "../components/Input";

export default function Details() {
  // const [details, setDetails] = useState([]);

  /////////////////////////////
  const [details, setDetails] = useState([{
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "johnD@example.com",
    phone: "0123456789"
  },
  {
    id: 2,
    firstName: "Marry",
    lastName: "Doe",
    email: "marry@example.com",
    phone: "0123456888"
  }
]);

  const [originDetail, setOriginDetail] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleEdit = el => {
    setOriginDetail({...el})
    setIsEditing(true);
    setEditingId(el.id)
  };

  const handleCancel = () => {};
  
  const handleChange = (e,id) => {
    const {name, value} = e.target;
    setDetails(prev => (
      prev.map(item =>(
        item.id===id? {...item,[name]:value} : item
      ))
    ));
  };
  
  const handleDelete = () => {};
  /////////////////////////////
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
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            // onClick={() => handleClick(el.id)}
            // onClick={event => handleClick(el.id, event)}   //#2 to attach event
            // onClick={handleClick(el.id)}                   //#3 to attach event
            key={el.id}
            className="relative bg-orange-300 block w-96 p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 hover:cursor-pointer"
          >
            {isHovering && (
              <>
                <button
                  onClick={handleDelete}
                  className="absolute top-2 right-2 text-grey-500 hover:text-red-800 transition-colors"
                >
                  <X size={20}/>
                </button>

                <button
                  onClick={() => handleEdit(el)}
                  className="absolute top-2 left-2 text-grey-500 hover:text-red-800 transition-colors"
                  disabled={isEditing}
                >
                  <Edit2 size={20}/>
                </button>
              </>
            )}
            <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Details</h1>
            <div className="box-border border-t-4 border-black pt-2 pl-2">
              <div className="font-medium text-xl text-slate-900">
                {editingId===el.id && isEditing? (
                  <div className="flex items-center space-x-2 space-y-0.5">
                    <p>First name:</p>
                    <Input
                      type="text"
                      name="firstName"
                      value={el?.firstName}
                      onChange={(e) => handleChange(e,el.id)}
                      // error={error.firstName}
                      // className="text-sm rounded-lg block w-full p-1 bg-orange-300 hover:bg-gray-100"
                      className="text-sm rounded-lg block w-full p-1"
                    />
                  </div>
                ) : (
                  <p>First name: <span className="font-normal text-md">{el?.firstName}</span></p>
                )}
              </div>
              <div className="font-medium text-xl text-slate-900">
                {editingId===el.id && isEditing? (
                  <div className="flex items-center space-x-2 space-y-0.5">
                    <p>Last name:</p>
                    <Input
                      label="Last name:"
                      name="lastName"
                      value={el?.lastName}
                      onChange={(e) => handleChange(e,el.id)}
                      // error={error.lastName}
                      className="text-sm rounded-lg block w-full p-1"
                    />
                  </div>
                ) : (
                  <p>Last name: <span className="font-normal text-md">{el?.lastName}</span></p>
                )}
              </div>
              <div className="font-medium text-xl text-slate-900">
                E-mail: <span className="font-normal text-md">{el?.email}</span>
              </div>
              <div className="font-medium text-xl text-slate-900">
                Phone: <span className="font-normal text-md">{el?.phone}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
