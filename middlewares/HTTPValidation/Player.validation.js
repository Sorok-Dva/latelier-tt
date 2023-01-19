const { param } = require('express-validator');
const HTTPValidation = {};

/**
 * HTTPValidation: Player.Get Method
 * Checks:
 *      - @id exists, is numeric
 * @type {ValidationChain[]}
 */
HTTPValidation.Get = [
  param('id').exists().isNumeric().withMessage('Player\'s id cannot be empty and must be numeric.'),
];

module.exports = HTTPValidation;
