import React, { useState,useEffect, useContext } from 'react';
import DataTable from 'react-data-table-component';
import { Container } from 'reactstrap';
import AuthContext from '../context/auth.context';

const Booking = () => {

  const [bookingsList, setBookingsList] = useState([])
  const context = useContext(AuthContext)
  console.warn({bookingsList})

  useEffect(()=>{
    fetchEvents()
  },[])

  const fetchEvents =()=>{
    const requestBody = {
      query: `
      query{
        bookings{
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
  ];

  return (
    <div className='m-5'>
      <DataTable
        title="Bookings"
        columns={columns}
        data={bookingsList}
        pagination
      />
    </div>
  );
};

export default Booking;
