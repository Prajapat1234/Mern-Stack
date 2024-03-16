import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function Update() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState(0)
  const [error, setError] = useState('')
  const navigate = useNavigate();
  const { id } = useParams();

  const getSingleUser = async () => {

    const response = await fetch(`http://localhost:5100/${id}`)

    const result = await response.json();


    if (!response.ok) {
      console.log(result.error);
      setError(result.error);

    }
    if (response.ok) {

      setError("");
      setName(result.name)
      setEmail(result.email)
      setAge(result.age)


    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updateUser = { name, email, age }
    const response = await fetch(`http://localhost:5100/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateUser),
      headers: {
        "Content-Type": "application/json",
      },

    });

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }

    if (response.ok) {
      console.log(result);
      setError("");
      navigate('/all');

    }

  }

  useEffect(() => {

    getSingleUser();
  }, []);


  return (

    <div className='container my-2'>

      {error && <div className="alert alert-danger">{error}</div>}
      <h2 className='text-center'>Edit the Data</h2>

      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input type="number" className="form-control" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
