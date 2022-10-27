import { Action } from "@prisma/client";
import axios from "axios";
import { atom, useAtom } from "jotai";

const eventsAtom = atom<Action[]>([]);
const loadingAtom = atom<boolean>(false);

const useActionStore = () => {
  const [actions, setActions] = useAtom(eventsAtom);
  const [loading, setLoading] = useAtom(loadingAtom);

  const fetchActions = async (event_id: string) => {
    setLoading(true);
    const response = await axios.get<Action[]>(
      `/api/action?event_id=${event_id}`
    );

    setActions(response.data);

    setLoading(false);
  };

  const createAction = async (values: any) => {
    const response = await axios.post<Action>("/api/action", values);
    setActions((current) => [...current, response.data]);
  };

  return {
    actions,
    loading,
    fetchActions,
    createAction,
  };
};

export default useActionStore;
