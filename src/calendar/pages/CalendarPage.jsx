import { Navbar } from "../components/Navbar";

import { Calendar } from "react-big-calendar";

import { localizer } from "../../helpers/CalendarLocalizer";
import { getMessagesEs } from "../../helpers/getMessages";
import { CalendarEvent } from "../components/CalendarEvent";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import { CalendarModal } from "../components/CalendarModal";
import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { FabAddNew } from "../components/FabAddNew";
import { FabDelete } from "../components/FabDelete";
import { useAuthStore } from "../../hooks/useAuthStore";

export const CalendarPage = () => {
  const { user } = useAuthStore();
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvent } = useCalendarStore();
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );

  const eventStyleGetter = (event, start, end, isSelected) => {
    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid); 
    const style = {
      backgroundColor: isMyEvent ? "#347CF7" : "#465660",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return { style };
  };

  const onDoubleClick = (event) => {
    openDateModal();
  };

  const onSelect = (event) => {
    setActiveEvent(event);
  };

  const onViewChange = (event) => {
    console.log({ viewChange: event });
    localStorage.setItem("lastView", event);
    setLastView(event);
  };

  useEffect(() => {
    startLoadingEvent();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <Calendar
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        culture="es"
        messages={getMessagesEs()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onSelectEvent={onSelect}
        onDoubleClickEvent={onDoubleClick}
        onView={onViewChange}
      />
      <CalendarModal></CalendarModal>
      <FabAddNew></FabAddNew>
      <FabDelete></FabDelete>
    </>
  );
};
