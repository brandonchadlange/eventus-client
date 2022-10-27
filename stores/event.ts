import { Event } from "@prisma/client";
import axios from "axios";
import { atom, useAtom } from "jotai";

const eventsAtom = atom<Event[]>([]);
const loadingAtom = atom<boolean>(false);

const useEventsStore = () => {
  const [events, setEvents] = useAtom(eventsAtom);
  const [loading, setLoading] = useAtom(loadingAtom);

  const fetchEvents = async () => {
    setLoading(true);
    const response = await axios.get<Event[]>("/api/event");
    setEvents(response.data);
    setLoading(false);
  };

  // TODO: set typing to values
  const createEvent = async (values: any) => {
    const response = await axios.post<Event>("/api/event", values);
    setEvents((current) => [...current, response.data]);
  };

  return {
    events,
    loading,
    fetchEvents,
    createEvent,
  };
};

export default useEventsStore;
