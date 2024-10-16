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
exports.ReservationService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const addReservation = (reservation) => __awaiter(void 0, void 0, void 0, function* () {
    if (!reservation.startDate ||
        !reservation.endDate ||
        !reservation.userId ||
        !reservation.houseId) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Missing required fields: startDate, endDate, userId, houseId');
    }
    // console.log(reservation);
    const result = yield prisma_1.default.reservation.create({
        data: reservation,
    });
    return result;
});
const getReservations = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { houseId, userId, authorId } = params;
    //   console.log(params);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query = {};
    if (houseId) {
        query.houseId = houseId;
    }
    if (userId) {
        query.userId = userId;
    }
    if (authorId) {
        query.house = { userId: authorId };
    }
    const reservations = yield prisma_1.default.reservation.findMany({
        where: query,
        include: {
            house: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    //   console.log(reservations, 'reservations');
    return reservations;
});
const deleteReservation = (userId, reservationId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userId ||
        !reservationId ||
        typeof userId !== 'string' ||
        typeof reservationId !== 'string') {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Missing required fields: userId, reservationId');
    }
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const reservation = yield prisma_1.default.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                {
                    userId: userId,
                },
                {
                    house: {
                        userId: userId,
                    },
                },
            ],
        },
    });
    return reservation;
});
exports.ReservationService = {
    addReservation,
    getReservations,
    deleteReservation,
};
