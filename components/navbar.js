import Reat from 'react'
import Link from "next/link";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Image from 'next/image';
import Navbar from 'react-bootstrap/Navbar';

const Navbar1 = () => {
  return (
      <Navbar className='testing px-2 text-center' variant="dark">
          <Navbar.Brand href="#home"><Image
      src="/Upc.png"
      width={70}
      height={70}
      alt="Picture of the author"
    /></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">ADD</Nav.Link>
            <Nav.Link href="/about">Chat</Nav.Link>
            <Nav.Link href="/table/table">Info</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
      </Navbar>
  );
};

export default Navbar1;
