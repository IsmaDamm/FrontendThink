import React from 'react'
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdInfo } from "react-icons/md";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/navigation';
import {useEffect} from 'react';
import Cookies from 'universal-cookie';

export default function TableContent(props) {

  const [CookieFinal, setCookievalue] = React.useState();
  const { push } = useRouter();

  useEffect(() => {
    const cookies = new Cookies();
    const cookieValue = cookies.get('loginCookie'); 
    console.log(cookieValue);
    setCookievalue(cookieValue);
    if(cookieValue == undefined) {
      push('/login');
    }
  }, [CookieFinal]);

    async function deletePdf() {
        const response = await fetch("http://127.0.0.1:8000/api/file/" + props.id, {
          headers:{
            'Authorization': 'Bearer ' + CookieFinal,
          },
            method: "DELETE",
        });
        const data = await response
        console.log(data);
        window.location.reload(false);
    }

    function PdfInfo(){

    }

  return (
        <Card style={{ width: '9rem'}}>
          <a href={`http://127.0.0.1:8000/${props.link}`} target='blanket'>
          <Card.Img variant="top" src="/PdfImage.png" />
          </a>
          <Card.Body style={{backgroundcolor: props.color}}>
            <Card.Title className='mb-2 p-0 ' style={{fontSize: '12px'}}>{props.name}</Card.Title>
            <Button variant='danger' className='me-1' size='sm'><MdDelete size={16} onClick={deletePdf} /></Button> 
           <Button className='me-1' size='sm'><MdEdit size={16} /></Button> 
           <a href={`http://127.0.0.1:8000/${props.link}`} target='blanket'><Button variant = "success" size='sm'><MdInfo size={16}/></Button></a>
          </Card.Body>
        </Card>

      );
    };
    
//     export default ResponsiveCard;
//     <tr id="remove">
//         <td>{props.name}</td>
//         <td style={{backgroundColor: props.color}}>{props.email}</td>
//         <td><a href={"http://127.0.0.1:8000" + props.link} target="_blank">{props.link}</a></td>
//         <td className='text-center'>
//           <Button variant='danger' className='me-1'><MdDelete size={23} onClick={deletePdf} /></Button> 
//           <Button className='me-1'><MdEdit size={23} /></Button> 
//           <a href={`/table/${props.id}`}><Button variant = "success"><MdInfo size={23}/></Button></a></td>
//     </tr>
//   )
// }
