// LoginPage.jsx
import axios from 'axios'
import { useState } from 'react';

const User_page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add your login logic here, such as calling an API to authenticate the user
    try {
      // Replace this with your actual login logic
      const response = await axios.post('http://localhost:3000/user/custemer',{
        phone:email,
        message:password 
      });
      console.log(response)
    } catch (error) {
      console.log(error, error?.message)
    }
  };

  return (
    <div>
      <h1>sms</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>phone:</label>
          <input type="number" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Message:</label>
          <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">send</button>
      </form>
    </div>
  );
};

export default User_page;
