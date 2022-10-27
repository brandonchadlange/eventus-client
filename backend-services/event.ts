import prismaClient from "../utils/prisma-client";

const getAll = async () => {
  const events = await prismaClient.event.findMany();
  return events;
};

const create = async (event_id: string, name: string, description: string) => {
  const event = await prismaClient.event.create({
    data: {
      event_id,
      name,
      description,
    },
  });

  return event;
};

export default {
  getAll,
  create,
};
