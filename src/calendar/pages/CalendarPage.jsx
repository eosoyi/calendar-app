import { Navbar } from "../components/Navbar";

import { Calendar } from "react-big-calendar";
import { addHours } from "date-fns";

import { localizer } from "../../helpers/CalendarLocalizer";
import { getMessagesEs } from "../../helpers/getMessages";
import { CalendarEvent } from "../components/CalendarEvent";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import { CalendarModal } from "../components/CalendarModal";
import { useUiStore } from "../../hooks/useUiStore";

const events = [
  {
    title: "Cumpleaños jefe",
    notes: "Hay que comprar un pastel",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: "#fafafa",
    user: {
      _id: "123",
      name: "Erick",
    },
  },
];

export const CalendarPage = () => {
  const { openDateModal } = useUiStore();
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#347CF7",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return { style };
  };

  const onDoubleClick = (event) => {
    //window.alert(JSON.stringify(event));
    openDateModal();
  };

  const onSelect = (event) => {
    console.log({ click: event });
  };

  const onViewChange = (event) => {
    console.log({ viewChange: event });
    localStorage.setItem("lastView", event);
    setLastView(event);
  };

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
    </>
  );
};
