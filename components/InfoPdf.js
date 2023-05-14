import React from 'react'
import {useState} from 'react';
import {useEffect} from 'react';
import Card from 'react-bootstrap/Card';


export default function InfoPdf(props) {
    console.log(props.id)
    const [tabla, setTabla] = React.useState([]);

    
    useEffect(() => {
      if(props.id != undefined) {
        getPdf()
      }
      }, [props]);

    
    async function getPdf() {
        const response = await fetch("http://daniieelgs.ddns.net:8000/api/file/" + props.id)
        const data = await response.json()
        console.log(data.result);
        setTabla(data.result);
    }

  return (
    <div className='centered'>

<Card style={{ width: '18rem', height: '18rem' }}>
      <Card.Body>
        <Card.Title className='mt-3'>{tabla.name}</Card.Title>
        <Card.Subtitle className="mb-4 text-muted">{tabla.age} años</Card.Subtitle>
        <Card.Text>
          Edad: {tabla.age}
          <br></br>
          Telefono: {tabla.tlf}
          <br></br>
          Dirección: {tabla.address}
        </Card.Text>
        Email: 
        <Card.Link href="#"> {tabla.email}</Card.Link>
        <br/>
        URL : <Card.Link href={"http://daniieelgs.ddns.net:8000" + tabla.url}>Pdf</Card.Link>
      </Card.Body>
    </Card>
    </div>
  )
}
