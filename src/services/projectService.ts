import { prisma } from "../../lib/prisma";

export const createProjectService = async (projectData: {
  name: string;
  description: string;
  technologies: string;
  demo_url: string;
  front_end: string;
  back_end: string;
  doc_url: string;
  role: string;
  challenge: string;
  solutions: string;
  key_feature: string;
  is_featured: boolean;
}) => {
  const project = await prisma.project.create({
    data: projectData,
  });

  return project;
};

export const getProjectImage = async (id: string) => {
  const image = await prisma.image.findFirst({
    where: {
      imageable_id: Number(id),
      imageable_type: "Project",
      category: "project-profile-image",
    },
  });

  return image;
};

export const getProjectDetailsImages = async (id: string) => {
  const images = await prisma.image.findMany({
    where: {
      imageable_id: Number(id),
      imageable_type: "Project",
      category: "project-details-image",
    },
  });

  return images;
};

export const updateProjectService = async (
  id: string,
  projectData: {
    name: string;
    description: string;
    technologies: string;
    demo_url: string;
    front_end: string;
    back_end: string;
    doc_url: string;
    role: string;
    challenge: string;
    solutions: string;
    key_feature: string;
    is_featured: boolean;
  },
) => {
  const project = await prisma.project.update({
    where: {
      id: Number(id),
    },
    data: projectData,
  });

  return project;
};

export const deleteProjectService = async (id: string) => {
  const project = await prisma.project.delete({
    where: {
      id: Number(id),
    },
  });

  return project;
};

export const getProjectDetails = async (id: string) => {
  const project = await prisma.project.findUnique({
    where: {
      id: Number(id),
    },
  });

  return project;
};

export const getProject = async (q: string) => {
  const projects = await prisma.project.findMany({
    where: {
      OR: [
        {
          name: {
            contains: q,
          },
        },
        {
          description: {
            contains: q,
          },
        },
        {
          technologies: {
            contains: q,
          },
        },
      ],
    },
  });

  const ids = projects.map((project) => project.id);

  const images = await prisma.image.findMany({
    where: {
      imageable_id: {
        in: ids,
      },
      imageable_type: "Project",
      category: "project-profile-image",
    },
  });

  const projectWithImages = projects.map((project) => {
    const image = images.find((image) => image.imageable_id === project.id);
    return {
      image: image?.url || null,
      ...project,
    };
  });

  return projectWithImages;
};
