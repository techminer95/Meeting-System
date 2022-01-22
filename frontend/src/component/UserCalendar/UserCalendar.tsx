import { FunctionComponent } from "react";
import { useGetEventsQuery } from "src/services/backend";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enAU from "date-fns/locale/en-AU";
import { startOfMonth, endOfMonth, formatISO } from "date-fns";

const locales = {
  "en-AU": enAU,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const UserCalendar: FunctionComponent = () => {
  const currentDate = new Date();
  const { data } = useGetEventsQuery({
    minDate: formatISO(startOfMonth(currentDate)),
    maxDate: formatISO(endOfMonth(currentDate)),
  });

  console.log(data);
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={data?.items}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};
