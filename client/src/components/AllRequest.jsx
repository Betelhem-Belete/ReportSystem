import axios from 'axios';
import  { useEffect, useState } from 'react';

function AllRequest({data}) {
    const [requests, setRequests] = useState([]);
console.log(data, "prop");
    // useEffect(() => {
    //   const result =  requests.filter((prv)=>prv.id === data2.id );
    //   const dt = result.state = data2.state;
    //   setRequests((prev)=>[...prev, dt])
    //   }, [data2]); 
    useEffect(() => {
        setRequests(prevRequests => {
            const updatedRequests = prevRequests.map(request => {
                if (request.userId === data.id) {
                    // Update state property of the matched request
                    return { ...request, userState: data.state };
                }
                return request;
            });
            console.log(updatedRequests,'final')
            return updatedRequests;
        });
    }, [data]);

    const handleState =async (userId) => {
        const token = JSON.parse(localStorage.getItem("access_token"));
        const {  id } = token;
        await axios.patch('http://localhost:3000/reports/edit', { employeeId: id, userId });

    }

    const color = {
        open: 'btn-primary',
        in_session: 'btn-warning',
        resolved: 'btn-success'
    };

    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () => {
        const response = await axios.get('http://localhost:3000/reports/all');
        setRequests(response.data);
        console.log(response.data, "res");
    };

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
                    {requests.map((request, index) => (
                        <tr key={request.userId}>
                            <th scope="row">{index + 1}</th>
                            <td>{request.phone}</td>
                            <td>{request.chatTitle}</td>
                            <td>
                                <button
                                    onClick={() => handleState(request.userId)}
                                    className={`btn ${color[request.userState]}`}
                                    disabled={request.userState === 'in_session'|| request.userState === 'resolved'}
                                >
                                    {request.userState}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AllRequest;
