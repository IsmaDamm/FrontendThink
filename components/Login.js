import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';
import Layout from "../components/layout";

const Login = () => {
  const [email2, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cookie, setCookie] = useState('');

  const handleUsernameChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    const cookieFinal = await DoLogin()
    console.log(cookieFinal);
    if (cookieFinal != undefined) {
      const cookies = new Cookies();
      cookies.set('loginCookie', cookieFinal, { path: '/' , expires: new Date(Date.now()+9048000)});
      console.log(cookies.get('loginCookie')); 
    }
  };

  const DoLogin = async() => {
    try {
      const response = await fetch("http://daniieelgs.ddns.net:8000/api/user/login/", {
        method: "POST",
        body: JSON.stringify({mail: email2, password: password})
      });
      const data = await response.json();
      console.log(data);
      const Cookie = data.result.token;
      setCookie(Cookie)
      console.log(data.result.token)

      toast.success('Login Succeed!', {
        position: toast.POSITION.TOP_CENTER
      });

      return data.result.token;

    } catch (error) {
      toast.error('You are not registered!', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  }
  return (
    <Layout>
          <ToastContainer />
    <div className='centered'>
    <Card border="dark" style={{ width: '18rem', height: '23rem'}} className='text-center'>
      <Card.Body className='CardColor'>
        <Card.Title className='Cardtext mt-3 mb-4'>LOGIN</Card.Title>
        <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label className='Cardtext'>Email</Form.Label>
        <Form.Control className='mb-3' type="email" placeholder="Enter email" value={email2} onChange={handleUsernameChange} />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label className='Cardtext'>Password</Form.Label>
        <Form.Control className='mb-3' type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
      </Form.Group>

      <Button variant="primary" type="submit" className='me-5 mt-5'>
        Enter
      </Button>

      <Button variant="secondary" href="/register" className='ms-5 mt-5' >
        Register
      </Button>
    </Form>
      </Card.Body>
    </Card>
    </div>
      </Layout>
  );
};

export default Login;