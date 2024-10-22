const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
    let statusCode = constants.SERVER_ERROR;
    let message = err.message || 'An unknown error occurred';

    switch (err.name) {
        case 'ValidationError':
            statusCode = constants.VALIDATION_ERROR;
            message = Object.values(err.errors).map(val => val.message).join(', ');
            break;

        case 'CastError':
            statusCode = constants.NOT_FOUND;
            message = `Resource not found with id of ${err.value}`;
            break;

        case 'JsonWebTokenError':
            statusCode = constants.UNAUTHORIZED;
            message = 'Invalid token, please log in again.';
            break;

        case 'TokenExpiredError':
            statusCode = constants.UNAUTHORIZED;
            message = 'Session expired, please log in again.';
            break;

        case 'ForbiddenError':
            statusCode = constants.FORBIDDEN;
            message = 'You do not have permission to access this resource.';
            break;

        default:
            if (err.code === 11000) {
                statusCode = constants.VALIDATION_ERROR;
                message = `Duplicate field value entered: ${JSON.stringify(err.keyValue)}`;
            }
            break;
    }

    res.status(statusCode).json({
        success: false,
        message: message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
};

module.exports = errorHandler;
