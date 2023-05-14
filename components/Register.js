import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "../components/layout";
import Cookies from 'universal-cookie';

const Register = () => {
  const [username, setUsername] = useState('');
  const [lastname, setlastname] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [email2, setemail] = useState('');
  const [cookie, setCookie] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleLastnameChange = (event) => {
    setlastname(event.target.value);
  };

  const handleEmailChange = (event) => {
    setemail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordChange2 = (event) => {
    setPassword2(event.target.value);
  };

  const SendPdf = async() => {
    try {
      const response = await fetch("http://daniieelgs.ddns.net:8000/api/user/register/", {
        method: "POST",
        body: JSON.stringify({name: username, backname: lastname, mail: email2, password: password})
      });
      const data = await response.json();
      console.log(data);
      const Cookie = data.result.token;
      setCookie(Cookie)
      console.log(cookie)
      
      toast.success('Registred correctly !', {
        position: toast.POSITION.BOTTOM_RIGHT
      });

      return data.result.token;
    } catch (e) {
      toast.error('Mail already registred!', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
    

  }
  
  const handleSubmit = async(event) => {
    event.preventDefault();
    if(password == password2){
      const cookieFinal = await SendPdf()
      if(cookieFinal != undefined){
        const cookies = new Cookies();
        cookies.set('loginCookie', cookieFinal, { path: '/' , expires: new Date(Date.now()+9048000)});
        console.log(cookies.get('loginCookie')); 
      }
    }
    else{
      toast.error('You have different passwords!!', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
    console.log(`Username: ${username}, Password: ${password}`);
  };


  return (
    <Layout>
      <ToastContainer />
    <div className='Register'>
    <Card border="dark" style={{ width: '20rem', height: '26rem'}} className='text-center'>
      <Card.Body className='CardColor'>
        <Card.Title className='Cardtext mt-3 mb-4'>Register</Card.Title>
        <Form onSubmit={handleSubmit}>

      <Form.Group controlId="formBasicName">
        <Form.Label className='Cardtext'>Name</Form.Label>
        <Form.Control className='mb-3' type="text" placeholder="Name" value={username} onChange={handleUsernameChange} required />
      </Form.Group>

      <Form.Group controlId="formBasicLastName">
        <Form.Label className='Cardtext'>Last name</Form.Label>
        <Form.Control className='mb-3' type="text" placeholder="Last name" value={lastname} onChange={handleLastnameChange} />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label className='Cardtext'>Email</Form.Label>
        <Form.Control className='mb-3' type="email" placeholder="Enter email" value={email2} onChange={handleEmailChange} required/>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label className='Cardtext'>Password</Form.Label>
        <Form.Control className='mb-3' type="password" placeholder="Password" value={password} onChange={handlePasswordChange} required />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label className='Cardtext'>Repeat Password</Form.Label>
        <Form.Control className='mb-3' type="password" placeholder="Password" value={password2} onChange={handlePasswordChange2} required />
      </Form.Group>


      <Button variant="primary"  type="submit" className='me-5 mt-5'>
        Enter
      </Button>

      <Button variant="secondary" href="/login" className='ms-5 mt-5' >
        Login
      </Button>
    </Form>
      </Card.Body>
    </Card>
            </div>
            </Layout>
  );
};


export default Register;