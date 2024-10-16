import express from 'express';
import { ReservationController } from './reservation.controller';

const router = express.Router();

router.post('/add-reservation', ReservationController.addReservation);

router.delete(
  '/:userId/:reservationId',
  ReservationController.deleteReservation
);

router.get('/', ReservationController.getReservations);

export const ReservationRoute = router;
