import React from 'react'
import {useState} from 'react';
import {useEffect} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Table from 'react-bootstrap/Table';
import TableContent from './TableContent';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';

export default function Tableinfo() {
    const [Tabla, setTabla] = React.useState([]);
    const [Categorias, setCategorias] = React.useState([]);
    const [SelectCategory, setSelectCategory] = React.useState();
    const [CookieFinal, setCookievalue] = React.useState();
    const { push } = useRouter();

    useEffect(() => {
      const cookies = new Cookies();
      const cookieValue = cookies.get('loginCookie'); 
      console.log(cookieValue);
      setCookievalue(cookieValue);
      if(cookieValue != undefined) {
        getPdf();
        getPdf2();
      }
      else{
        push('/login')
      }
      }, [CookieFinal]);

    async function getPdf() {
      if(CookieFinal != undefined) { 
      console.log(CookieFinal);
        const response = await fetch("http://daniieelgs.ddns.net:8000/api/file/", {
          headers:{
            'Authorization': 'Bearer ' + CookieFinal,
          }
        });
        const data = await response.json()
        console.log(data);
        setTabla(data.result);
      }
    }
  
    async function getPdf2() {
      if(CookieFinal != undefined) { 
      const response = await fetch("http://daniieelgs.ddns.net:8000/api/subject/", {
        headers:{
          'Authorization': 'Bearer ' + CookieFinal,
        }
      });
      const data = await response.json()
      //console.log(data.result[0].name);
  
      const categorias = [...Categorias]
  
      for(let i = 0; i < data.result.length; i++) {
        categorias.push(data.result[i]);
      }
      console.log(categorias);
      setCategorias(categorias);
      if(categorias.length == 0) {
        setSelectCategory("")
      }
      else{
        setSelectCategory(categorias[0].name)
      }
    }
  }

  const SelectedCategories = Tabla.map(content => {
    return content.subject.name === SelectCategory ? content : null;
  });

  const SelectedCategoriesFinal = SelectedCategories.map(content => {
    return content !== null ?                 <Col className='m-0 pt-5'>
    <TableContent key = {content.id} id = {content.id} email ={content.subject.name} color={content.subject.color} name={content.name} link = {content.url}/>
    </Col> : null;
  });

  return (
        <Container fluid>´
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
          <Row className='align-items-center m-0'>
          {SelectedCategoriesFinal}
          </Row>
        </Container>
  )
}
