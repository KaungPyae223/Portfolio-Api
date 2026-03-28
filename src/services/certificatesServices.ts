import { prisma } from "../../lib/prisma";

export const getCertificates = async (q: string) => {
  const certificates = await prisma.certificate.findMany({
    where: {
      OR: [
        {
          title: {
            contains: q,
          },
        },
        {
          lecture: {
            contains: q,
          },
        },
        {
          url: {
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

export const getCertificateDetails = async (id: string) => {
  const certificate = await prisma.certificate.findUnique({
    where: {
      id: Number(id),
    },
  });

  const image = await prisma.image.findFirst({
    where: {
      imageable_id: Number(id),
      imageable_type: "Certificate",
    },
  });

  const certificateWithImage = {
    image: image?.url || null,
    ...certificate,
  };

  return certificateWithImage;
};

export const createCertificateService = async (certificateData: {
  title: string;
  lecture: string;
  url: string;
  complete_date: string;
  technologies: string;
}) => {
  const certificate = await prisma.certificate.create({
    data: certificateData,
  });

  return certificate;
};

export const updateCertificateService = async (
  id: string,
  certificateData: {
    title: string;
    lecture: string;
    url: string;
    complete_date: string;
    technologies: string;
  },
) => {
  const certificate = await prisma.certificate.update({
    where: {
      id: Number(id),
    },
    data: certificateData,
  });

  return certificate;
};

export const getCertificateImage = async (id: string) => {
  const image = await prisma.image.findFirst({
    where: {
      imageable_id: Number(id),
      imageable_type: "Certificate",
    },
  });

  return image;
};

export const deleteCertificateService = async (id: string) => {
  const certificate = await prisma.certificate.delete({
    where: {
      id: Number(id),
    },
  });

  return certificate;
};
