import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
  onLoadEvents
} from "../store/calendar/calendarSlice";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvent } from "../helpers/convertEventsToDateEvents";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    try{
      // actualizando
      if (calendarEvent.id) {
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent(calendarEvent));
        return;
      }
      
      // creando
      const { data } = await calendarApi.post('/events', calendarEvent);
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
    } catch(error){
      Swal.fire('Error al guardar ', error.response.data.msg, 'error');
    }
  };

  const startDeletingEvent = async () => {
    try{
      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(onDeleteEvent());
    }catch(error){
      Swal.fire('Error al eliminar ', error.response.data.msg, 'error');
    }
  };

  const startLoadingEvent = async () => {
    try{
      const { data } = await calendarApi.get('/events');
      const events = convertEventsToDateEvent(data.eventos);
      dispatch(onLoadEvents(events));
    } catch(error){
      console.log('Error cargando eventos');
      console.log(error)
    }
  }

  return {
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    setActiveEvent,
    startLoadingEvent,
    startSavingEvent,
    startDeletingEvent,
  };
};
