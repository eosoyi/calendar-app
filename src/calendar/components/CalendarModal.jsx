import React, { useMemo, useState } from "react";

import Modal from "react-modal";
import { addHours, differenceInSeconds } from "date-fns";
import DatePicker, { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useUiStore } from "../../hooks/useUiStore";

registerLocale("es", es);

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
  const [formSubmited, setFormSubmited] = useState(false);
  const { isDateModalOpen, closeDateModal } = useUiStore();

  const [formValues, setFormValues] = useState({
    title: "",
    notes: "",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const titleClass = useMemo(() => {
    if (!formSubmited) return "";
    return formValues.title.length > 0 ? "is-valid" : "is-invalid";
  }, [formValues.title, formSubmited]);

  const onCloseModal = () => closeDateModal();

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const onDateChange = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmited(true);

    const difference = differenceInSeconds(formValues.end, formValues.start);
    if (isNaN(difference) || difference <= 0) {
      Swal.fire("Fechas incorrectas", "Revisar las fechas ingresadas");
      return;
    }

    if (formValues.title.length <= 0) {
      return;
    }
  };

  return (
    <Modal
      className="modal"
      overlayClassName="modal-fondo"
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker
            selected={formValues.start}
            className="form-control"
            onChange={(event) => onDateChange(event, "start")}
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker
            selected={formValues.end}
            className="form-control"
            onChange={(event) => onDateChange(event, "end")}
            dateFormat="Pp"
            minDate={formValues.start}
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass} `}
            placeholder="Título del evento"
            name="title"
            id="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChange}
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
            id="notes"
            value={formValues.notes}
            onChange={onInputChange}
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
