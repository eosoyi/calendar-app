import React, { useState } from "react";
import ModalPortal from "react-modal/lib/components/ModalPortal";
import Modal from "react-modal";
import { addHours } from "date-fns";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const [formValues, setFormValues] = useState({
    title: "erick",
    notes: "osoy",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const onCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      className="modal"
      overlayClassName="modal-fondo"
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container">
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <input className="form-control" placeholder="Fecha inicio" />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <input className="form-control" placeholder="Fecha inicio" />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className="form-control"
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
