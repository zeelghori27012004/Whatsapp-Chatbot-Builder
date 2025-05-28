
import bcrypt from "bcryptjs";
import { User } from "../../models/User.js";
import generateToken from "../../utils/generateToken.js";
import { register } from '../authController';


import httpMocks from 'node-mocks-http';


jest.mock("bcryptjs");
jest.mock("../../models/User.js");
jest.mock("../../utils/generateToken.js");

describe('register() register method', () => {
  let req, res;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
  });

  describe('Happy paths', () => {
    it('should register a new user and return a token', async () => {
      // Arrange
      req.body = {
        fullname: 'John Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        password: 'password123',
        role: 'user',
      };

      User.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue('hashedPassword');
      User.create.mockResolvedValue({ _id: 'userId' });
      generateToken.mockReturnValue('token');

      // Act
      await register(req, res);

      // Assert
      expect(User.findOne).toHaveBeenCalledWith({ email: 'john.doe@example.com' });
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(User.create).toHaveBeenCalledWith({
        email: 'john.doe@example.com',
        password: 'hashedPassword',
      });
      expect(generateToken).toHaveBeenCalledWith('userId');
      expect(res._getJSONData()).toEqual({ token: 'token' });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('Edge cases', () => {
    it('should return 400 if any required field is missing', async () => {
      // Arrange
      req.body = {
        fullname: 'John Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        password: 'password123',
        // role is missing
      };

      // Act
      await register(req, res);

      // Assert
      expect(res.statusCode).toBe(400);
      expect(res._getJSONData()).toEqual({
        message: 'Something is missing',
        success: false,
      });
    });

    it('should return 400 if user already exists', async () => {
      // Arrange
      req.body = {
        fullname: 'John Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        password: 'password123',
        role: 'user',
      };

      User.findOne.mockResolvedValue({ email: 'john.doe@example.com' });

      // Act
      await register(req, res);

      // Assert
      expect(User.findOne).toHaveBeenCalledWith({ email: 'john.doe@example.com' });
      expect(res.statusCode).toBe(400);
      expect(res._getJSONData()).toEqual({
        message: 'User already exist with this email.',
        success: false,
      });
    });
  });
});