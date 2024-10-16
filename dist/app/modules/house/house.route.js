"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HouseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const house_controller_1 = require("./house.controller");
const router = express_1.default.Router();
router.post('/add-house', house_controller_1.HouseController.addHouse);
router.delete('/delete-house/:userId/:houseId', house_controller_1.HouseController.deleteHouse);
router.post('/favorites/:userId/:houseId', house_controller_1.HouseController.addFavorite);
router.get('/favorites/:userId', house_controller_1.HouseController.getFavoriteHouses);
router.delete('/favorites/:userId/:houseId', house_controller_1.HouseController.deleteFavorite);
router.get('/:houseId', house_controller_1.HouseController.getHouseById);
router.get('/', house_controller_1.HouseController.getHouses);
exports.HouseRoutes = router;
