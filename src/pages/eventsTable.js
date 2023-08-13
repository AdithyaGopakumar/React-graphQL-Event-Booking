import React, { useContext, useState } from 'react';
import DataTable from 'react-data-table-component';
import AuthContext from '../context/auth.context';
import { Button } from 'reactstrap';
import EventBookingModal from './confirmBookingModal';

const EventTable = ({ events}) => {
  const context = useContext(AuthContext)
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedEventID, setSelectedEventID] = useState("");

  const toggleBookingModal = () => {
    setBookingModalOpen(!bookingModalOpen);
  };


  const columns = [
    {
      name: 'Title',
      selector: row => row.title,
      sortable: true,
    },
    {
      name: 'Description',
      selector: row => row.description,
    },
    {
      name: 'Price',
      selector: row => row.price,
    },
    {
      name: 'Date',
      selector: row => row.date,
    },
    {
      name: 'Creator',
      selector: row => row.creator.email,
    },
  ];

  if (context.token) {
    columns.push({
      name: 'Action',
      cell: row => (
        context.user_id === row.creator._id ? (
          <span>Your Event</span>
        ) : (
          <Button onClick={() => setModal(row._id)} className='btn btn-info text-white'>Book</Button>
        )
      ),
    });
  }

  const setModal = (id) => {
    console.log(id, "this is the event id");
    setSelectedEventID(id)
    setBookingModalOpen(true)
  }

  return (
    <div>
      <DataTable
        title="Event Table"
        columns={columns}
        data={events}
        pagination
      />
      <EventBookingModal toggleModal={toggleBookingModal} modalOpen={bookingModalOpen} event_id={selectedEventID}/>
    </div>
  );
};

export default EventTable;
