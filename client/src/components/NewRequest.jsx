import React, { useState, useEffect } from 'react'
import axios from 'axios'


function NewRequest() {
  // const token = JSON.parse(localStorage.getItem("access_token"));
  const [reqests, setRequsests] = useState([])
  //////
// const color ={
//   opens : 'btn-primary',
//   resolved  :'btn-warning',
//   in_session : 'btn-success'
// }
//////////
const handle_state = (userId)=>{
  // console.log(userId, "userid")
  const token = JSON.parse(localStorage.getItem("access_token"));
  const { id } = token;
  axios.patch('http://localhost:3000/reports/edit', {employeeId:id,userId})
}
console.log(reqests, 'new')

  useEffect(()=>{
    fetch_all()
  },[])
  const fetch_all = async () => {
    const data = await axios.get('http://localhost:3000/reports/new')
    return setRequsests(data.data)  
  }
  return (
    <div>
      <table className="table table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Phone</th>
      <th scope="col">Title</th>
      {/* <th scope="col">Chat Id</th> */}
      <th scope="col">User_state</th>
    </tr>
  </thead>
  <tbody>
 {
  reqests && reqests.map(m=>(
    <tr key={m.id}>
    <th scope="row">1</th>
    <td>{m.phone}</td>
    <td>{m.chatTitle}</td>
    {/* <td>{m.chatId}</td> */}
    <td><button onClick={()=>handle_state(m.userId)} className={`btn btn-outline-primary`}>{m.userState}</button></td>
  </tr>
  ))
 }
    
  </tbody>
</table>
    </div>
  )
}

export default NewRequest