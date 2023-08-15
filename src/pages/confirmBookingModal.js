import React, { useContext, useState } from 'react';
import { Modal, ModalBody, Button } from 'reactstrap';
import AuthContext from '../context/auth.context';

const EventBookingModal = ({ event_id, modalOpen, toggleModal }) => {

  const context = useContext(AuthContext)

  const handleConfirmBooking = () => {
    const requestBody = {
      query: `
      mutation ConfirmBooking($id : ID!){
        bookEvent(event_id : $id){
          _id
          event_id{
            title
          }
          user_id{
            email
          }
        }
      }
    `,
      variable: {
        id: event_id
      }
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
      console.warn({ data })
      toggleModal();
    }).catch((err) => {
      console.log(err);
      toggleModal();
    })
  };

  return (
    <div>
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalBody>
          Are you sure you want to book this event?
        </ModalBody>
        <div className="modal-footer">
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleConfirmBooking}>
            Confirm
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default EventBookingModal;
