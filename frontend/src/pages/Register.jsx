import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  })

  // store error for displaying
  const [err, setError] = useState(null);

  const navigate = useNavigate()

  const handleChange = e=>{
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async e=>{ // async as api request
    e.preventDefault() // prevent page reload

    try {
      await axios.post("/api/auth/register", inputs)
      navigate("/login")
    }
    catch (err) {
      // console.log(err)
      setError(err.response.data)
    }
  }
  console.log(inputs)
  return (
    <div className='auth'>
      <h1>Register</h1>
      <form>
        <input required type="text" placeholder='username' name='username' onChange={handleChange}/>
        <input required type="email" placeholder='email' name='email' onChange={handleChange}/>
        <input required type="password" placeholder='password' name='password' onChange={handleChange}/>
        <button onClick={handleSubmit}>Register</button>
        {err && <p>{err}</p>}
        <span>
          Do you have account?
          <Link to="/login"> Login </Link>
        </span>
      </form>
    </div>
  )
}

export default Register