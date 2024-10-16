import { Reservation } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { IGetReservation } from './reservation.interface';

const addReservation = async (reservation: Reservation) => {
  if (
    !reservation.startDate ||
    !reservation.endDate ||
    !reservation.userId ||
    !reservation.houseId
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Missing required fields: startDate, endDate, userId, houseId'
    );
  }
  // console.log(reservation);
  const result = await prisma.reservation.create({
    data: reservation,
  });

  return result;
};

const getReservations = async (params: IGetReservation) => {
  const { houseId, userId, authorId } = params;
  //   console.log(params);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: any = {};

  if (houseId) {
    query.houseId = houseId;
  }

  if (userId) {
    query.userId = userId;
  }

  if (authorId) {
    query.house = { userId: authorId };
  }

  const reservations = await prisma.reservation.findMany({
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
};

const deleteReservation = async (userId: string, reservationId: string) => {
  if (
    !userId ||
    !reservationId ||
    typeof userId !== 'string' ||
    typeof reservationId !== 'string'
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Missing required fields: userId, reservationId'
    );
  }

  const isUserExist = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const reservation = await prisma.reservation.deleteMany({
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
};

export const ReservationService = {
  addReservation,
  getReservations,
  deleteReservation,
};
