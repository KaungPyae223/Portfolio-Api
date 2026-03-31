"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFeaturedCertificateService = exports.deleteCertificateService = exports.getCertificateImage = exports.updateCertificateService = exports.createCertificateService = exports.getCertificateDetails = exports.getCertificates = void 0;
const prisma_1 = require("../../lib/prisma");
const getCertificates = async (q) => {
    const certificates = await prisma_1.prisma.certificate.findMany({
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
    const images = await prisma_1.prisma.image.findMany({
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
exports.getCertificates = getCertificates;
const getCertificateDetails = async (id) => {
    const certificate = await prisma_1.prisma.certificate.findUnique({
        where: {
            id: Number(id),
        },
    });
    const image = await prisma_1.prisma.image.findFirst({
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
exports.getCertificateDetails = getCertificateDetails;
const createCertificateService = async (certificateData) => {
    const certificate = await prisma_1.prisma.certificate.create({
        data: certificateData,
    });
    return certificate;
};
exports.createCertificateService = createCertificateService;
const updateCertificateService = async (id, certificateData) => {
    const certificate = await prisma_1.prisma.certificate.update({
        where: {
            id: Number(id),
        },
        data: certificateData,
    });
    return certificate;
};
exports.updateCertificateService = updateCertificateService;
const getCertificateImage = async (id) => {
    const image = await prisma_1.prisma.image.findFirst({
        where: {
            imageable_id: Number(id),
            imageable_type: "Certificate",
        },
    });
    return image;
};
exports.getCertificateImage = getCertificateImage;
const deleteCertificateService = async (id) => {
    const certificate = await prisma_1.prisma.certificate.delete({
        where: {
            id: Number(id),
        },
    });
    return certificate;
};
exports.deleteCertificateService = deleteCertificateService;
const updateFeaturedCertificateService = async (id) => {
    const certificate = await prisma_1.prisma.certificate.findUnique({
        where: {
            id: Number(id),
        },
    });
    const certificateUpdate = await prisma_1.prisma.certificate.update({
        where: {
            id: Number(id),
        },
        data: {
            is_featured: !certificate?.is_featured,
        },
    });
    return certificateUpdate;
};
exports.updateFeaturedCertificateService = updateFeaturedCertificateService;
//# sourceMappingURL=certificatesServices.js.map