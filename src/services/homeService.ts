import { prisma } from "../../lib/prisma";

export const updateHome = async (language: string, homeData: any) => {
  const updateHome = await prisma.home.updateMany({
    where: {
      language: language,
    },
    data: homeData,
  });
};

export const getHomeCertificates = async () => {
  const certificates = await prisma.certificate.findMany({
    where: {
      is_featured: true,
    },
  });

  const ids = certificates.map((certificate) => certificate.id);

  const images = await prisma.image.findMany({
    where: {
      imageable_id: {
        in: ids,
      },
      imageable_type: "Certificate",
    },
  });

  const certificateWithImages = certificates.map((certificate) => {
    const image = images.find((image) => image.imageable_id === certificate.id);
    return {
      image: image?.url || null,
      ...certificate,
    };
  });

  return certificateWithImages;
};

export const getHomeProjects = async () => {
  const projects = await prisma.project.findMany({
    where: {
      is_featured: true,
    },
  });

  const ids = projects.map((project) => project.id);

  const images = await prisma.image.findMany({
    where: {
      imageable_id: {
        in: ids,
      },
      category: "project-profile-image",
      imageable_type: "Project",
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

export const getAllHome = async () => {
  const getAllHomeData = await prisma.home.findMany();
  return getAllHomeData;
};

export const updateHomeMetaData = async (metaData: any) => {
  const updateMetaData = await prisma.home.updateMany({
    data: metaData,
  });
};

export const storeSkill = async (name: string) => {
  const skill = await prisma.skill.create({
    data: {
      name: name,
    },
  });

  return skill;
};

export const skillDelete = async (id: number) => {
  await prisma.skill.delete({
    where: {
      id: id,
    },
  });
};

export const getSkillImage = async (id: number) => {
  const skill = await prisma.image.findFirst({
    where: {
      imageable_id: id,
      imageable_type: "Skill",
    },
  });

  return skill;
};

export const createHomeEducationService = async (educationData: any) => {
  await prisma.education.create({
    data: {
      ...educationData,
      educationable_type: "Home",
    },
  });
};

export const deleteEducation = async (id: number) => {
  await prisma.education.delete({
    where: {
      id: id,
    },
  });
};