import { useState, useEffect } from 'react';
import axios from 'axios';


function NewRequest({data}) {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    setRequests((prev)=> [...prev, data]);
  }, [data]); 
 
  const handleState = (userId) => {
    const token = JSON.parse(localStorage.getItem('access_token'));
    const { id } = token;
    axios.patch('http://localhost:3000/reports/edit', { employeeId: id, userId });
  };

  const fetchAll = async () => {
    const { data } = await axios.get('http://localhost:3000/reports/new');
    setRequests(data);
  };

  useEffect(() => {
    fetchAll();
  }, []); // Fetch data only once when component mounts

  return (
    <div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Phone</th>
            <th scope="col">Title</th>
            <th scope="col">User State</th>
          </tr>
        </thead>
        <tbody>
          {requests && requests?.map((request, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{request?.phone}</td>
              <td>{request?.chatTitle}</td>
              <td>
                <button onClick={() => handleState(request?.userId)} className="btn btn-outline-primary">
                  {request?.userState}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NewRequest;
