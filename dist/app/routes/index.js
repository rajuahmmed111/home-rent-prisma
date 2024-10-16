"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/user/user.route");
const house_route_1 = require("../modules/house/house.route");
const reservation_route_1 = require("../modules/reservation/reservation.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/houses',
        route: house_route_1.HouseRoutes,
    },
    {
        path: '/reservations',
        route: reservation_route_1.ReservationRoute,
    }
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
