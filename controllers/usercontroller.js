const http       = require('http');
const url        = require('url');
const bodyParser = require('body-parser');
const express    = require('express');
const router     = express.Router();

const UserRepository = require('./../modules/users/userrepository');
const UserValidator  = require('./../modules/users/uservalidator');
const responseSender = require('./../modules/http/responsesender');

router.get('/:id', function(request, response) {
    UserRepository.get(request.params.id, (error, user) => {
        if (error) {
            return responseSender.missing(response);
        }

        if (!user) {
            return responseSender.invalidInput(response, 'User does not exist with ID: ' + request.params.id);
        }

        return responseSender.ok(response, user);
    });
});

router.get('/', function(request, response) {
    let params = url.parse(request.url, true).query;

    UserRepository.list(params, (error, result) => {
        if (error) {
            return responseSender.internalError(response);
        }

        return responseSender.ok(response, result);
    });
});

router.post('/', function(request, response) {
    try {
        UserRepository.get(request.body.id, (error, user) => {
            if (error) {
                return responseSender.invalidInput(response, error.message);
            }

            if (!user) {
                return responseSender(response, 'Invalid ID: ' + id);
            }

            let validatedUser = UserValidator.getValidatedUser(request.body);

            UserRepository.update(user, validatedUser, (error, user) => {
                if (error) {
                    return responseSender.invalidInput(response, error.message);
                }

                return responseSender.ok(response, user);
            });
        });
    } catch (exception) {
        return responseSender.invalidInput(response, exception.message);
    }
});

router.put('/', function(request, response) {
    try {
        let user = UserValidator.getValidatedUser(request.body);

        UserRepository.create(user, (error) => {
            if (error) {
                return responseSender.invalidInput(response, error.message);
            }

            return responseSender.ok(response);
        });
    } catch (exception) {
        return responseSender.invalidInput(response, exception.message);
    }
});

router.delete('/:id', function(request, response) {
    try {
        UserRepository.get(request.params.id, (error, user) => {
            UserRepository.remove(user, (error, user) => {
                if (error) {
                    return responseSender.internalError(response);
                }

                if (!user) {
                    return responseSender.invalidInput(response, 'User does not exist with ID: ' + request.params.id);
                }

                return responseSender.ok(response);
            });
        });
    } catch (error) {
        responseSender.internalError(error.message);
    }
});

module.exports = router;