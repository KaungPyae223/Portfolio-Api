"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.updateUser = exports.storedUser = exports.getTotalUsers = void 0;
const prisma_1 = require("../../lib/prisma");
const getTotalUsers = async () => {
    const totalUsers = await prisma_1.prisma.user.count();
    return totalUsers;
};
exports.getTotalUsers = getTotalUsers;
const storedUser = async (userData) => {
    const storedUser = await prisma_1.prisma.user.create({
        data: userData,
    });
    return storedUser;
};
exports.storedUser = storedUser;
const updateUser = async (id, userData) => {
    const updateUser = await prisma_1.prisma.user.update({
        where: {
            id: id,
        },
        data: userData,
    });
    return updateUser;
};
exports.updateUser = updateUser;
const getUserByEmail = async (email) => {
    const getUserByEmail = await prisma_1.prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    return getUserByEmail;
};
exports.getUserByEmail = getUserByEmail;
//# sourceMappingURL=authService.js.map