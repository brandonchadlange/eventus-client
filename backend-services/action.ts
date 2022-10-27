import prismaClient from "../utils/prisma-client";

const getAll = async (event_id: string) => {
  const actions = await prismaClient.action.findMany({
    where: {
      event_id,
    },
  });
  return actions;
};

interface CreateActionParams {
  name: string;
  event_id: string;
  action_id: string;
  endpoint: string;
  description: string;
}

const create = async ({
  name,
  action_id,
  event_id,
  endpoint,
  description,
}: CreateActionParams) => {
  const action = await prismaClient.action.create({
    data: {
      name,
      event_id,
      action_id,
      endpoint,
      description,
    },
  });

  return action;
};

export default {
  getAll,
  create,
};
