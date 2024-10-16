"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationRoute = void 0;
const express_1 = __importDefault(require("express"));
const reservation_controller_1 = require("./reservation.controller");
const router = express_1.default.Router();
router.post('/add-reservation', reservation_controller_1.ReservationController.addReservation);
router.delete('/:userId/:reservationId', reservation_controller_1.ReservationController.deleteReservation);
router.get('/', reservation_controller_1.ReservationController.getReservations);
exports.ReservationRoute = router;
