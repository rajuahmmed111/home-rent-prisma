import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { HouseRoutes } from '../modules/house/house.route';
import { ReservationRoute } from '../modules/reservation/reservation.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/houses',
    route: HouseRoutes,
  },
  {
    path: '/reservations',
    route: ReservationRoute,
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
