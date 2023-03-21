"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto) {
        const data = Object.assign(Object.assign({}, createUserDto), { password: await bcrypt.hash(createUserDto.password, 10) });
        const createdUser = await this.prisma.user.create({ data });
        createdUser.password = undefined;
        return createdUser;
    }
    async findByEmail(email) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new Error(`Can't find user`);
        }
        return user;
    }
    async findAll() {
        const allUsers = await this.prisma.user.findMany({
            select: {
                password: false,
                email: true,
                id: true,
                name: true,
            },
        });
        return allUsers;
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: { id: id.toString() },
            select: {
                password: false,
                email: true,
                id: true,
                name: true,
            },
        });
        if (!user) {
            throw new Error(`Can't find user`);
        }
        return user;
    }
    async update(id, updateUserDto) {
        const userUpdated = await this.prisma.user.update({
            where: { id: id.toString() },
            data: updateUserDto,
        });
        if (!userUpdated) {
            throw new Error(`User ${id} not updated`);
        }
        return userUpdated;
    }
    async remove(id) {
        const userDeleted = await this.prisma.user.delete({
            where: { id: id.toString() },
        });
        if (!userDeleted) {
            throw new Error(`User ${id} does not deleted`);
        }
        return userDeleted;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map