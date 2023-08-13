import React, { useContext } from 'react';
import DataTable from 'react-data-table-component';
import AuthContext from '../context/auth.context';
import { Button } from 'reactstrap';

const EventTable = ({ events }) => {
  const context = useContext(AuthContext)
  console.warn({ context })

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
          <Button onClick={() => printId(row.creator._id)} className='btn btn-info text-white'>Book</Button>
        )
      ),
    });
  }

  const printId = (id) => {
    console.log(id, "this is the user id");
  }

  return (
    <div>
      <DataTable
        title="Event Table"
        columns={columns}
        data={events}
        pagination
      />
    </div>
  );
};

export default EventTable;
