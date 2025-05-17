import { useState, useEffect } from 'react';
import * as formApi from '../apis/form-api'
import ContactList from '../components/ContactList';
import { useNavigate } from 'react-router-dom';

export default function AllContacts() {
  const [details, setDetails] = useState([]);
  const navigate = useNavigate();  
  useEffect(() => {
    (async () => {
      const res = await formApi.getAllContactsApi();
      setDetails(res.data);
    })();
  }, []);
 
    return (
        <>
            <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">All Contancts</h1>
                <button className="mb-4" type="button" onClick={() => navigate(-1)}>
                    Back
                </button>
            <ContactList contacts={details} setContacts={setDetails} />
            
        </>
    )
};