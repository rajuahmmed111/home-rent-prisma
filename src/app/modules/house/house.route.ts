import express from 'express';
import { HouseController } from './house.controller';

const router = express.Router();

router.post('/add-house', HouseController.addHouse);

router.delete('/delete-house/:userId/:houseId', HouseController.deleteHouse);

router.post('/favorites/:userId/:houseId', HouseController.addFavorite);

router.get('/favorites/:userId', HouseController.getFavoriteHouses);

router.delete('/favorites/:userId/:houseId', HouseController.deleteFavorite);

router.get('/:houseId', HouseController.getHouseById);

router.get('/', HouseController.getHouses);

export const HouseRoutes = router;
