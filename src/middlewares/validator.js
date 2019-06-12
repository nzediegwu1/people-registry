/* eslint-disable import/prefer-default-export */
import { check, validationResult } from 'express-validator/check';

const getErrors = (req, next) => {
  const errors = validationResult(req)
    .array()
    .map(error => error.msg);
  if (!errors.length) {
    return next();
  }
  return errors;
};

export const handleValidation = async (req, res, next) => {
  const result = getErrors(req, next);
  return Array.isArray(result) ? res.status(400).json({ errors: result, status: 'error' }) : result;
};

export const validateUser = [
  check('id')
    .trim()
    .isMongoId()
    .optional()
    .withMessage('ID parameter is invalid'),
  check('fullname')
    .isString()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Fullname is a required string')
    .isLength({ min: 6, max: 40 })
    .withMessage('Fullname should be at least 6 characters and not more than 40'),
  check('email')
    .trim()
    .isEmail()
    .withMessage('Email not provided or invalid'),
  check('phone')
    .isString()
    .isMobilePhone()
    .withMessage('Please enter a valid phone number'),
  check('address')
    .isString()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Address is a required string')
    .isLength({ min: 8, max: 100 })
    .withMessage('Address should be at least 8 characters and not more than 100'),
  check('facebook')
    .isString()
    .optional()
    .withMessage('Facebook should be a string')
    .trim()
    .isLength({ min: 4, max: 40 })
    .withMessage('Facebook ID should be at least 4 characters and not more than 40'),
  check('twitter')
    .isString()
    .optional()
    .withMessage('Twitter should be a string')
    .trim()
    .isLength({ min: 4, max: 40 })
    .withMessage('Twitter ID should be at least 6 characters and not more than 40'),
  check('linkedIn')
    .isString()
    .optional()
    .withMessage('Twitter should be a string')
    .trim()
    .isLength({ min: 4, max: 40 })
    .withMessage('LinkedIn should be at least 4 characters and not more than 40'),
  check('occupation')
    .isString()
    .optional()
    .withMessage('Occupation should be string')
    .trim()
    .isLength({ min: 5, max: 70 })
    .withMessage('Occupation should be at least 5 characters and not more than 70'),
  check('gender')
    .isString()
    .optional()
    .trim()
    .isIn(['male', 'female'])
    .withMessage('Gender should be either male or female'),
];

export const validateId = [
  check('id')
    .trim()
    .isMongoId()
    .withMessage('ID parameter is invalid'),
];
