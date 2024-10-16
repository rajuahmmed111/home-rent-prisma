import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { HouseService } from './house.service';

const addHouse = catchAsync(async (req: Request, res: Response) => {
  const result = await HouseService.addHouse(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'House added successfully',
    data: result,
  });
});

const deleteHouse = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const houseId = req.params.houseId;

  const result = await HouseService.deleteHouse(userId, houseId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'House deleted successfully',
    data: result,
  });
});

const getHouses = catchAsync(async (req: Request, res: Response) => {
  const params = req.query;
  const result = await HouseService.getHouses(params);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'House fetched successfully',
    data: result,
  });
});

const getHouseById = catchAsync(async (req: Request, res: Response) => {
  const houseId = req.params.houseId;
  const result = await HouseService.getHouseById(houseId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'House fetched successfully',
    data: result,
  });
});

const addFavorite = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const houseId = req.params.houseId;

  const result = await HouseService.addFavorite(userId, houseId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Favorite house added successfully',
    data: result,
  });
});

const deleteFavorite = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const houseId = req.params.houseId;

  const result = await HouseService.deleteFavorite(userId, houseId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Favorite house deleted successfully',
    data: result,
  });
});

const getFavoriteHouses = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const result = await HouseService.getFavoriteHouses(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Favorite houses fetched successfully',
    data: result,
  });
});

export const HouseController = {
  addHouse,
  getHouses,
  addFavorite,
  deleteFavorite,
  getHouseById,
  getFavoriteHouses,
  deleteHouse,
};
