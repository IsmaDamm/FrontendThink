import React from 'react'
import profilePic from '../public/Biene.png'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useState, useEffect } from "react";
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Layout from "../components/layout";
//import TypingAnimation from "../components/TypingAnimation";
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from 'react-bootstrap/Form';

export default function About() {

  const [CookieFinal, setCookievalue] = React.useState();
  const { push } = useRouter();

  const [chatLog, setChatLog] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [Categorias, setCategorias] = React.useState([]);
  const [SelectCategory, setSelectCategory] = React.useState();
  const [SelectCategoryColor, setSelectCategoryColor] = React.useState();
  const [disabledInput, setdisabledInput] = React.useState();
  const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
    const cookies = new Cookies();
    const cookieValue = cookies.get('loginCookie'); 
    console.log(cookieValue);
    setCookievalue(cookieValue);
    if(cookieValue == undefined) {
      push('/login');
    }
    else{
      getPdf2()
    }
  }, [CookieFinal]);

  useEffect(() => {
    RecogerColor();
  }, [SelectCategory]);


  async function getPdf2() {
    if(CookieFinal != undefined) { 
    const response = await fetch("http://127.0.0.1:8000/api/subject/", {
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
      toast.warning('To talk with the iThinkBot you need categories and notes!', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      setdisabledInput(true)
    }
    else{
      setSelectCategory(categorias[0].name)
    }
  }
}

  const handleSubmit = (event) => {
    event.preventDefault();

    setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: inputValue }])
    const id = RecogerId()
    console.log(id);
    getPdf(inputValue, id)
    setInputValue('');
  }

  const handleClick = (event) => {
    event.preventDefault();
    setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: inputValue }])
    getPdf(inputValue);
    setInputValue('');

    //console.log(query);
    //getPdf(query);
    //setQuery2(query);
  };

  function RecogerId(){
      let Cat = Categorias.filter(cat => cat.name === SelectCategory)
      return Cat[0].id
  }
  function RecogerColor(){
    if(Categorias.length > 0){
    let Cat = Categorias.filter(cat => cat.name === SelectCategory)
    console.log(Cat[0].color);
    setSelectCategoryColor(Cat[0].color);
  }
  }

  const handleCheckChange = (e) => {
    setIsChecked(e.target.checked);
    console.log(e.target.checked);
  }


  async function getPdf(query, id) {
    console.log(query);
    try {
      if(isChecked == true){
        query = query.concat("&use_internet")
        console.log(query);
      }
      const response = await fetch("http://127.0.0.1:8000/api/query/" +id+"?q=" + query, {
        headers:{
          'Authorization': 'Bearer ' + CookieFinal,
        }});
      const data = await response.json()
      console.log(data.result.response);
      console.log(data)
      setChatLog((prevChatLog) => [...prevChatLog, { type: 'bot', message: data.result.response}])
    } catch (error) {
      toast.error('To talk with the iThinkBot you need categories and notes!', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  };  

  return (
    <Layout>
      <ToastContainer/>
    <div className="container m-0 p-0 min-w-full">
      <div className="flex flex-col h-screen bg-gray-900">
        <h1 className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text text-center py-3 font-bold text-6xl">iThinkBot</h1>
        <Dropdown className='d-flex justify-content-center align-items-center'>
          <Form>
            <Button className='me-2' style={{backgroundColor: SelectCategoryColor, borderStyle: "none", fontSize: "large"}}>
            <Form.Check 
              type="switch"
              id="custom-switch"
              label="Internet?"
              style= {{color: '#FFFFFF'}}
              onChange={handleCheckChange}
            />
            </Button>
          </Form> 
                <Dropdown.Toggle id="dropdown-button-dark-example1" variant="primary" className='px-4 pb-2' style={{backgroundColor: SelectCategoryColor, borderStyle: "none", fontSize: "large"}}>
                   {SelectCategory} 
                </Dropdown.Toggle>
                <Dropdown.Menu variant="dark">
                {Categorias.map((content, key) => {
                  return (<Dropdown.Item key = {content.id}  onClick={() => setSelectCategory(content.name)}>{content.name}</Dropdown.Item>)
                })}
                  <Dropdown.Divider />
                  <Dropdown.Item href="/newCategory">Add Category</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
        <div className="flex-grow p-6">
          <div className="flex flex-col space-y-4">
          {
        chatLog.map((message, index) => (
          <div key={index} className={`flex ${
            message.type === 'user' ? 'justify-end' : 'justify-start'
            }`}>
              {console.log(SelectCategoryColor)}
            <div className={`${
              message.type === 'user' ? `bg-[#342b6a]` : 'bg-[#3f3f3f]'
            } rounded-lg p-4 text-white max-w-sm`}>
            {message.message}
            </div>
            </div>
        ))
            }
            {
              isLoading &&
              <div key={chatLog.length} className="flex justify-start">
                  <div className="bg-gray-800 rounded-lg p-4 text-white max-w-sm">
                    <TypingAnimation />
                  </div>
              </div>
            }
      </div>
        </div>
        <form onSubmit={handleSubmit} className="flex-none p-6">
          <div className="flex rounded-lg border border-gray-700 bg-gray-800">  
        <input type="text" className="flex-grow px-4 py-2 bg-transparent text-white focus:outline-none" placeholder="Type your message..." disabled = {disabledInput} value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <button type="submit" disabled = {disabledInput} style = {{backgroundColor: SelectCategoryColor}}className={`rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-purple-900 transition-colors duration-300`}>Send</button>
            </div>
        </form>
        </div>
    </div>
    </Layout>
  )
}
