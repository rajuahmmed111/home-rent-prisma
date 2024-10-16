"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HouseService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const addHouse = (house) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.house.create({
        data: house,
    });
    return result;
});
const deleteHouse = (userId, houseId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized to delete this house ');
    }
    if (!houseId || typeof houseId !== 'string') {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid house id');
    }
    const result = yield prisma_1.default.house.deleteMany({
        where: {
            id: houseId,
            userId,
        },
    });
    // console.log(result);
    return result;
});
const getHouses = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, roomCount, guestCount, bathroomCount, locationValue, startDate, endDate, category, } = params;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query = {};
    if (userId) {
        query.userId = userId;
    }
    if (category) {
        query.category = category;
    }
    if (roomCount) {
        query.roomCount = {
            gte: +roomCount,
        };
    }
    if (guestCount) {
        query.guestCount = {
            gte: +guestCount,
        };
    }
    if (bathroomCount) {
        query.bathroomCount = {
            gte: +bathroomCount,
        };
    }
    if (locationValue) {
        query.locationValue = locationValue;
    }
    if (startDate && endDate) {
        query.NOT = {
            reservations: {
                some: {
                    OR: [
                        {
                            endDate: { gte: startDate },
                            startDate: { lte: startDate },
                        },
                        {
                            startDate: { lte: endDate },
                            endDate: { gte: endDate },
                        },
                    ],
                },
            },
        };
    }
    const houses = yield prisma_1.default.house.findMany({
        where: query,
        orderBy: {
            createdAt: 'desc',
        },
    });
    // console.log(houses);
    return houses;
});
const getHouseById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const house = yield prisma_1.default.house.findUnique({
        where: {
            id,
        },
        include: {
            user: true,
        },
    });
    if (!house) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'House not found');
    }
    return house;
});
const addFavorite = (userId, houseId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    if (!houseId || typeof houseId !== 'string') {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid house id');
    }
    const favoriteIds = [...(user.favoriteIds || [])];
    favoriteIds.push(houseId);
    const result = yield prisma_1.default.user.update({
        where: {
            id: userId,
        },
        data: {
            favoriteIds,
        },
    });
    // console.log(result, 'add');
    return result;
});
const deleteFavorite = (userId, houseId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    if (!houseId || typeof houseId !== 'string') {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid house id');
    }
    let favoriteIds = [...(user.favoriteIds || [])];
    favoriteIds = favoriteIds.filter(id => id !== houseId);
    const result = yield prisma_1.default.user.update({
        where: {
            id: userId,
        },
        data: {
            favoriteIds,
        },
    });
    // console.log(result);
    return result;
});
const getFavoriteHouses = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const result = yield prisma_1.default.house.findMany({
        where: {
            id: {
                in: [...(isUserExist.favoriteIds || [])],
            },
        },
    });
    return result;
});
exports.HouseService = {
    addHouse,
    getHouses,
    addFavorite,
    deleteFavorite,
    getHouseById,
    getFavoriteHouses,
    deleteHouse,
};
