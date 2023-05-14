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
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';


export default function Carta() {

  const hiddenFileInput = React.useRef(null);
  const [fileUploaded, setFileUploaded] = useState([]);
  const [post, setPost] = React.useState(null);
  const [Categorias, setCategorias] = React.useState([]);
  const [SelectCategory, setSelectCategory] = React.useState();
  const [CookieFinal, setCookievalue] = React.useState();
  const { push } = useRouter();
  const [disableButton, setDisableButton] = React.useState(false);
  

  useEffect(() => {
    const cookies = new Cookies();
    const cookieValue = cookies.get('loginCookie'); 
    console.log(cookieValue);
    setCookievalue(cookieValue);
    if(cookieValue != undefined) {
      HandleResults()
    }
    else{
      push('/login');
    }
  }, [CookieFinal]);

  async function getPdf() {
    if(CookieFinal != undefined) {
    console.log(CookieFinal);
    const response = await fetch("http://daniieelgs.ddns.net:8000/api/subject/", {
      headers:{
        'Authorization': 'Bearer ' + CookieFinal,
      }
    })
    const data = await response.json()
    console.log(data.result);
    return data
  }
}

  async function HandleResults(){
    const data = await getPdf();

    if (!data || !data.result) {
      // handle error or return early
      return;
    }

    const largo = data.result.length
    const categorias = [...Categorias]

    for(let i = 0; i < largo; i++) {
      categorias.push(data.result[i]);
    }
    console.log(categorias);
    setCategorias(categorias);
    if(categorias.length == 0) {
      setSelectCategory("")
      setDisableButton(true);
    }
    else{
      setSelectCategory(categorias[0].name)
    }
  }

  const handleClick = event => {
      hiddenFileInput.current.click();
    };

    const handleChange = event => {
      const files = event.target.files;
      const tempFiles = [...fileUploaded];
    
      for(let i = 0; i < files.length; i++) {
        tempFiles.push(files[i]);
      }
    
      setFileUploaded(tempFiles);
      console.log(fileUploaded);
    }

    function getIndex(name) {
      console.log(Categorias.findIndex(obj => obj.name === name))
     return Categorias.findIndex(obj => obj.name === name);
 }

    const SendPdf = async() => {
      const ID = Categorias[getIndex(SelectCategory)].id;
      console.log(ID);
      const notify = toast.loading("Subiendo Documentos", {position: toast.POSITION.TOP_RIGHT})
      notify
      for(let i = 0; i < fileUploaded.length; i++) {
      const form = new FormData();
      console.log(fileUploaded[i].name)
      form.append("pdf_file", fileUploaded[i])
      form.append("name", fileUploaded[i].name)
      const response = await fetch("http://daniieelgs.ddns.net:8000/api/file/" + ID, {
        headers:{
          'Authorization': 'Bearer ' + CookieFinal,
        },
        method: "POST",
        body: form
      });
      const data = await response.json();
      console.log(data);
    }
    toast.update(notify, { render: "Subido Correctamente", type: "success", isLoading: false, closeOnClick: true, autoClose: true });
    }

    const DeleteAllPdf = event => {
      setFileUploaded([]);
    }

   function getIndex(name) {
        console.log(Categorias.findIndex(obj => obj.name === name))
       return Categorias.findIndex(obj => obj.name === name);
   }
    


  return (
    <div>
      <ToastContainer />
      <div className='centered'>
      <Card border="dark" style={{ width: '18rem', height: '23rem'}} className='text-center'>
      <Card.Body className='CardColor'>
        <Card.Title className='Cardtext mt-5'>Sube tus Apuntes</Card.Title>
        <Card.Subtitle className="mb-4 text-muted mt-2">Modo : PDF.</Card.Subtitle>
        <Container>
          <Row className='justify-content-md-center'>
          <Col xs={7}>
              <Dropdown>
                <Dropdown.Toggle id="dropdown-button-dark-example1" variant="primary" className='px-4 pb-2' style={{backgroundColor: "#342b6a", borderStyle: "none", fontSize: "large"}}>
                   {SelectCategory} 
                </Dropdown.Toggle>
                <Dropdown.Menu variant="dark">
                {Categorias.map((content, key) => {
                  return (<Dropdown.Item key = {content.id} onClick={() => setSelectCategory(content.name)}>{content.name}</Dropdown.Item>)
                })}
                  <Dropdown.Divider />
                  <Dropdown.Item href="/newCategory">Add Category</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col>
            <Button size="lg" variant="primary" className='mt-0' style={{backgroundColor: "#342b6a", borderStyle: "none", fontSize: "large"}} onClick={handleClick}>
              ADD
            </Button>
            
            <input type="file"
              multiple
              accept='application/pdf'
              ref={hiddenFileInput}
              onChange={handleChange}
              style={{display:'none'}} 
            />
            </Col>
          </Row>
        </Container>
        <ListGroup className='mt-4 mb-3'>
        {fileUploaded.map(content => (
          <File contenido={content} key ="content" color={Categorias[getIndex(SelectCategory)].color} />
          ))} 
        </ListGroup>
          <div className="d-flex justify-content-between mt-auto">
            <Button variant="danger" className="" onClick={DeleteAllPdf}>
              Eliminar
            </Button>
            <Button variant="primary" style={{backgroundColor: "#342b6a", borderStyle: "none"}} disabled = {disableButton} onClick={SendPdf}>
              Subir
            </Button>
          </div>
      </Card.Body>
    </Card>
    </div>
    </div>
  )
  }