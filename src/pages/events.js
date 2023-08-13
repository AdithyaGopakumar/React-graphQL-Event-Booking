import React, { useState, useContext, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import AuthContext from '../context/auth.context';
import EventTable from './eventsTable';

function Events() {
  const context = useContext(AuthContext)
  const [modalOpen, setModalOpen] = useState(false);
  const [eventsList, setEventsList] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    date: '',
  });

  useEffect(()=>{
    fetchEvents()
  },[])

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const fetchEvents =()=>{
    const requestBody = {
      query: `
      query{
        events{
          _id
          title
          description
          price
          date
          creator{
            _id
            email
          }
        }
      }
    `
    }
    fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status !== 200 && res.status !== 200) {
        throw new Error("Failed")
      }
      return res.json()
    }).then((data) => {
      const eventsList = data.data.events
      setEventsList(eventsList)
    })
      .catch((err) => { console.log(err); })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.title.trim().length === 0 ||
      formData.description.trim().length === 0 ||
      formData.price < 0 ||
      formData.date.trim().length === 0) {
      return
    }

    const requestBody = {
      query: `
      mutation{
        createEvent(eventInput: {title : "${formData.title}", description : "${formData.description}", price : "${Number(formData.price)}", date : "${formData.date}"}){
          title
          description
          price
          date
          creator{
            _id
            email
          }
        }
      }
    `
    }
    fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${context.token}`
      },
    }).then((res) => {
      if (res.status !== 200 && res.status !== 200) {
        throw new Error("Failed")
      }
      return res.json()
    }).then((data) => {
      fetchEvents()
    })
      .catch((err) => { console.log(err); })
    // You can perform additional actions here, like sending the data to an API
    toggleModal();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  return (
    <div className='m-5'>
    { eventsList && <EventTable events={eventsList} />}
      {context.token && <Button className='btn btn-info text-white' onClick={toggleModal}>Create</Button>}

      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Create Event</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for='title'>Title</Label>
              <Input type='text' name='title' id='title' value={formData.title} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for='description'>Description</Label>
              <Input type='textarea' name='description' id='description' value={formData.description} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for='price'>Price</Label>
              <Input type='number' name='price' id='price' value={formData.price} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for='date'>Date</Label>
              <Input type='date' name='date' id='date' value={formData.date} onChange={handleChange} />
            </FormGroup>
            <Button color='primary'>Submit</Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Events;
