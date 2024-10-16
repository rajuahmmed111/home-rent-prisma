import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const userRegister = async (data: User): Promise<User> => {
  if (!data.password) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Please provide password');
  }
  const hashedPassword = await bcrypt.hash(
    data.password,
    Number(config.bycrypt_salt_rounds)
  );

  data.password = hashedPassword;

  const result = await prisma.user.create({
    data,
  });

  return result;
};

const userLogin = async (data: Partial<User>): Promise<User> => {
  if (!data.email || !data.password) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Please provide email and password'
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user || !user.password) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User not found');
  }

  const isCorrectPassword = await bcrypt.compare(data.password, user.password);

  if (!isCorrectPassword) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect password');
  }

  return user;
};

const githubLogin = async (data: Partial<User>): Promise<User> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { id, ...userData } = data;

  if (!userData.email) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Please provide email');
  }

  const user = await prisma.user.findUnique({
    where: {
      email: userData.email,
    },
  });

  if (user) {
    return user;
  }

  const response = await prisma.user.create({
    data: userData,
  });

  return response;
};

const googleLogin = async (data: Partial<User>): Promise<User> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { id, ...userData } = data;

  if (!userData.email) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Please provide email');
  }

  const user = await prisma.user.findUnique({
    where: {
      email: userData.email,
    },
  });

  if (user) {
    return user;
  }

  const response = await prisma.user.create({
    data: userData,
  });

  return response;
}

const getUserByEmail = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User not found');
  }

  return user;
};

export const UserService = {
  userRegister,
  userLogin,
  getUserByEmail,
  githubLogin,
  googleLogin
};
