import axios from 'axios'
import React, { useEffect, useState } from 'react'


function AllRequest() {
 // const token = JSON.parse(localStorage.getItem("access_token"));
  const [reqests, setRequsests] = useState([])
  //////
  const handle_state = (userId)=>{
    const token = JSON.parse(localStorage.getItem("access_token"));
    const { access_token, id } = token;
    axios.patch('http://localhost:3000/reports/edit', {employeeId:id,userId})
  }

const color ={
  opens : 'btn-primary',
  resolved  :'btn-warning',
  in_session : 'btn-success'
}
//////////
  useEffect(()=>{
    fetch_all()
  },[])
  const fetch_all = async () => {
    const data = await axios.get('http://localhost:3000/reports/all')
    return setRequsests(data.data)  
  }
  console.log(reqests,'er ')
  return (
    <div>
      <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Phone</th>
      <th scope="col">Title</th>
      <th scope="col">User_state</th>
    </tr>
  </thead>
  <tbody>
 {
  reqests && reqests.map(m=>(
    <tr key={m.userId}>
    <th scope="row">1</th>
    <td>{m.phone}</td>
    <td>{m.chatTitle}</td>
    <td><button onClick={()=>handle_state(m.userId)} className={`btn ${m.userState === 'in_session' ?'btn-outline-warning':' btn-outline-primary'}`} disabled= {m.userState === 'in_session' ? true:false}>{m.userState}</button></td>
  </tr>
  ))
 }
    
  </tbody>
</table>
    </div>
  )
}

export default AllRequest