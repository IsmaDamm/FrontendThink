import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import File from '../components/File'
import {useState} from 'react';
import { Content } from 'next/font/google';
import {useEffect} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';


export default function Form1() {

  const hiddenFileInput = React.useRef(null);

  const [post, setPost] = React.useState(null);
  const [colorCategory, setColor] = useState(null);
  const [categoryName, setcategoryName] = useState(null);

  const [CookieFinal, setCookievalue] = React.useState();
  const { push } = useRouter();

  useEffect(() => {
    const cookies = new Cookies();
    const cookieValue = cookies.get('loginCookie'); 
    console.log(cookieValue);
    setCookievalue(cookieValue);
    console.log(cookieValue)
    if(cookieValue == undefined) {
      push('/login')
    }
  }, []);
  
  const handleClick = event => {
      console.log(colorCategory);
      console.log(categoryName);
      SendPdf()
    };

    const SendPdf = async() => {
      const notify = toast.loading("Subiendo Documentos", {position: toast.POSITION.TOP_RIGHT})
      notify
      console.log(CookieFinal)
      const response = await fetch("http://127.0.0.1:8000/api/subject/", {
        headers:{
          'Authorization': 'Bearer ' + CookieFinal,
        },
        method: "POST",
        body: JSON.stringify({ name: categoryName, color: colorCategory })
      });
      const data = await response.json();
      console.log(data);
      toast.update(notify, { render: "Subido Correctamente", type: "success", isLoading: false, closeOnClick: true, autoClose: true });
    }

  return (
    <div>
      <ToastContainer />
      <div className='centered'>
      <Card border="dark" style={{ width: '18rem', height: '23rem'}} className='text-center'>
      <Card.Body className='CardColor'>
        <Card.Title className='Cardtext mt-5 mb-4'>Create your Category</Card.Title>
        <Form>
      <Form.Group className="mb-3">
        <Form.Label className='White'>Name</Form.Label>
        <Form.Control type="email" placeholder="Category Name" onChange={e => setcategoryName(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3 text-center">
        <Form.Label className='White mx-3'>Color</Form.Label>
        <div className="d-flex justify-content-center">
        <Form.Control
        type="color"
        id="exampleColorInput"
        defaultValue="#563d7c"
        onChange={e => setColor(e.target.value)} 
        title="Choose your color"
      />
      </div>
      </Form.Group>
      <Button size="lg" variant="primary" style={{backgroundColor: "#342b6a", borderStyle: "none", fontSize: "large"}} onClick={handleClick} href='/'>
        Create
      </Button>
    </Form>
      </Card.Body>
    </Card>
    </div>
    </div>
  )
  }