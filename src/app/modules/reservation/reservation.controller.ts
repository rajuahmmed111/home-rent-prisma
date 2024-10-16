import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ReservationService } from './reservation.service';

const addReservation = catchAsync(async (req: Request, res: Response) => {
  const result = await ReservationService.addReservation(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reservation added successfully',
    data: result,
  });
});

const getReservations = catchAsync(async (req: Request, res: Response) => {
  const result = await ReservationService.getReservations(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reservations fetched successfully',
    data: result,
  });
});

const deleteReservation = catchAsync(async (req: Request, res: Response) => {
  const { userId, reservationId } = req.params;

  const result = await ReservationService.deleteReservation(
    userId,
    reservationId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reservation deleted successfully',
    data: result,
  });
});

export const ReservationController = {
  addReservation,
  getReservations,
  deleteReservation,
};
