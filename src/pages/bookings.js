import React, { useState, useEffect, useContext } from 'react';
import DataTable from 'react-data-table-component';
import { Container, Button, Modal, ModalBody } from 'reactstrap';
import AuthContext from '../context/auth.context';

const Booking = () => {

  const [bookingsList, setBookingsList] = useState([])
  const [selectedBookingID, setSelectedBookingID] = useState(null)
  const [isModal, setIsModal] = useState(false)

  const context = useContext(AuthContext)
  console.warn({ bookingsList })

  const toggleModal = () => {
    setIsModal(!isModal);
  };

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = () => {
    const requestBody = {
      query: `
      query{
        bookings{
          _id
          event_id{
            title
          }
          user_id{
            email
          }
          createdAt
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
      const bookingsList = data.data.bookings
      setBookingsList(bookingsList)
    })
      .catch((err) => { console.log(err); })
  }

  const deleteBooking = (id) => {
    const requestBody = {
      query: `
      mutation{
        cancelBooking( booking_id : "${id}"){
          event{
            title
          }
          message
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
      toggleModal()
      setSelectedBookingID(null)
      console.log(data);
    })
      .catch((err) => { console.log(err); })
  }

  const columns = [
    {
      name: 'Event',
      selector: row => row.event_id.title,
    },
    {
      name: 'User',
      selector: row => row.user_id.email,
    },
    {
      name: 'Created At',
      selector: row => row.createdAt,
    },
    {
      name: 'Action',
      cell: row => (
        <Button
          onClick={() => {
            setSelectedBookingID(row._id)
            setIsModal(true)
          }}
          className='btn btn-danger text-white'>Cancel</Button>
      ),
    }
  ];

  return (
    <div className='m-5'>
      <DataTable
        title="Bookings"
        columns={columns}
        data={bookingsList}
        pagination
      />
       <Modal isOpen={isModal} toggle={toggleModal}>
        <ModalBody>
          Are you sure you want to cancel this booking?
        </ModalBody>
        <div className="modal-footer">
          <Button color="secondary" onClick={()=>toggleModal()}>
            Cancel
          </Button>
          <Button color="danger" onClick={() => deleteBooking(selectedBookingID)}>
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Booking;
