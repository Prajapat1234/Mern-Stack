import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Read() {

  const [Data, setData] = useState([]);
  const [error, setError] = useState();


  async function getData() {
    const response = await fetch("http://localhost:5100");

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);

    }
    if (response.ok) {

      setData(result);
    };


  };

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5100/${id}`, {
      method: "Delete",
    });

    const result = await response.json()

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);

    }
    if (response.ok) {

      setError("Deleted successfully");

      setTimeout(() => {
        setError("")
        getData();
      }, 2000);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='container my-4'>
      {error && <div className="alert alert-danger">{error}</div>}
      <h2 className='text-center'>All data</h2>
      <div className='row'>

        {Data.map((ele) => (


          <div className="card m-2" style={{ width: "22rem"}}>
            <div className="card-body ">
              <h5 className="card-title mb-2  ">Name :- {ele.name}</h5>
              <h6 className="card-subtitle mb-0 text-body-secondary">Email :- {ele.email}</h6>
              <p className="card-text mb-1">Age :- {ele.age}</p>
              <Link className="card-link" onClick={() => handleDelete(ele._id)}>Delete</Link>
              <Link to={`/${ele._id}`} className="card-link">Edit</Link>
            </div>
          </div>

        ))}


      </div>
    </div>
  )
};
