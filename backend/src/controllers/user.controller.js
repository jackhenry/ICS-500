import UserService from '../services/user.service.js';
import { validationResult } from 'express-validator';

const signup = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    const { body } = req;
    
    const existingAccount = await UserService.existingAccount(body);
    
    if (existingAccount) {
        return res.status(422).json({ error: `A user account with that email already exists.`})
    }

    const user = await UserService.signup(body);
    
    if (user === null) {
        return res.status(422).json({ error: "User signup failed."});
    }
    
    return res.status(200).send();
}

const login = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    const { body } = req;
    const login_session = await UserService.login(body);
    
    if (login_session === null) {
        return res.status(422).json({ message: "Invalid email or password"});
    }

    return res.status(200).json(login_session);
}

const validateSession = async(req, res, next) => {
    next();
}

export default {
    signup,
    validateSession,
    login
}
