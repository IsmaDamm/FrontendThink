import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
//rfc

export default function File(props) {
    return (
            <ListGroup.Item variant="Dark" className="d-flex justify-content-between align-items-start" key={props.contenido.size} style={{backgroundColor: props.color}}>{props.contenido.name}
                    <Badge bg="dark" pill>
                    {props.contenido.size} Kb
                    </Badge>
            </ListGroup.Item>
    )
}
