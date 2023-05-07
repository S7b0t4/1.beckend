import './App.css';
import axios from 'axios';
import React, { useRef, useState } from 'react';

function App() {
  const [passwords, setPasswords] = useState([]);
  const [users, setUsers] = useState([]);
  const [use, setUse] = useState();
  const [pas, setPas] = useState();
  const u = useRef();
  const p = useRef();

  const enter = () =>{
    setUse(u.current.value)
    setPas(p.current.value)
  };
  const get = async () => {
    axios.get("http://localhost:5000/")
      .then((response)=>{
        console.log(response.data)
        setPasswords([])
        setUsers([])
        response.data.forEach((value, index, array) => {
          setPasswords(passwords => [...passwords, value.password])
          setUsers(users => [...users, value.usernmae])
        })
      })
  };
  const post = async () =>{
    axios.post("http://localhost:5000/", {
      use,
      pas
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  };
  const postDelit = async () =>{
    axios.post("http://localhost:5000/delit")
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  };
  return (
    <div className='colum'>
      <input className="input" ref={u}></input>
      <input className="input" ref={p}></input>
      <div className="row">
        <button className="btn" onClick={enter}>enter</button>
        <button className="btn" onClick={get}>get</button>
        <button className="btn" onClick={post}>post</button>
        <button className="btn" onClick={postDelit}>postDelit</button>
      </div>
      <div className="row">
        <div className='colum'>{
        users.map((value, index, array) => (
          <div>{value}</div>
        ))
        }
        </div>
        <div className='colum'>
        {
        passwords.map((value, index, array) => (
          <div>{value}</div>
        ))
        }
        </div>
      </div>
      <div>{passwords.length}</div>
    </div>
  );
}

export default App;
