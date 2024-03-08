import AllRequest from "./AllRequest";
import NewRequest from "./NewRequest";
import Chat from "./Chat";
import io from 'socket.io-client';
import { useEffect, useState } from "react";


function Leyout() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return;
    }
    const { access_token } = JSON.parse(token);
    const socket = io('http://localhost:3000', {
      extraHeaders: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    socket.on('resquest', (data) => {
      console.log('request received', data);
     setData(data)
    });

    socket.on('session', (data2) => {
      console.log('request received', data2);
setData2(data2)    });

    return () => {
      socket.disconnect(); // Disconnect the socket when component unmounts
    };
  }, []); // Empty dependency array ensures that this effect runs only once


  return (
    <>
      <ul class="nav nav-pills mb-3 mt-5 container" id="pills-tab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-home"
            type="button"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
          >
            New_req
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="pills-profile-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-profile"
            type="button"
            role="tab"
            aria-controls="pills-profile"
            aria-selected="false"
          >
            All_req
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="pills-contact-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-contact"
            type="button"
            role="tab"
            aria-controls="pills-contact"
            aria-selected="false"
          >
            Chats
          </button>
        </li>
      </ul>
      <div class="tab-content" id="pills-tabContent">
        <div
          class="tab-pane fade show active"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
        >
          <NewRequest data={data} />
        </div>
        <div
          class="tab-pane fade"
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab"
        >
          <AllRequest data={data2}/>
        </div>
        <div
          class="tab-pane fade"
          id="pills-contact"
          role="tabpanel"
          aria-labelledby="pills-contact-tab"
        >
          <Chat />
        </div>
      </div>
    </>
  );
}

export default Leyout;
