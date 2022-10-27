import prismaClient from "../utils/prisma-client";

const getAll = async () => {
  const projects = await prismaClient.project.findMany();
  return projects;
};

const create = async (name: string, project_id: string) => {
  const project = await prismaClient.project.create({
    data: {
      name,
      project_id,
    },
  });

  return project;
};

export default {
  getAll,
  create,
};
