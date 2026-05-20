import bcrypt from 'bcryptjs';
import User from '../models/User.model';
import { ApiError } from '../utils/ApiError';
import { generateToken } from '../utils/generateToken';
import { RegisterInput, LoginInput, AuthResponse } from '../types/auth.types';

export const registerUser = async (
  input: RegisterInput
): Promise<AuthResponse> => {
  const { name, email, password, role } = input;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, 'User already exists with this email');
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || 'sales',
  });

  const token = generateToken({
    id: user._id.toString(),
    role: user.role,
  });

  return {
    token,
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

export const loginUser = async (
  input: LoginInput
): Promise<AuthResponse> => {
  const { email, password } = input;

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = generateToken({
    id: user._id.toString(),
    role: user.role,
  });

  return {
    token,
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};