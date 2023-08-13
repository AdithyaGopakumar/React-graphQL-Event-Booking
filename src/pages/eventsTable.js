import React from 'react';
import DataTable from 'react-data-table-component';

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

const EventTable = ({ events }) => {
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