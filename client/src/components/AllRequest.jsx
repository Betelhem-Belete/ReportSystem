import axios from 'axios';
import  { useEffect, useState } from 'react';

function AllRequest() {
    const [requests, setRequests] = useState([]);

    const handleState = (userId) => {
        const token = JSON.parse(localStorage.getItem("access_token"));
        const {  id } = token;
        axios.patch('http://localhost:3000/reports/edit', { employeeId: id, userId });
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
