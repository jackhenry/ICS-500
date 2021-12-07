import axios from 'axios';
import crypto from 'crypto';
import { expect } from 'chai';
import { step } from 'mocha-steps';
import request from 'supertest';
import { refreshDB } from './helper.js';

import { app } from '../src/app.js';
import db from '../src/config/db.js';
import { create_user } from './helpers.test.js';

const PORT = 9001;
const REQUIRED_FIELDS = Object.keys(db.rom.rawAttributes);

describe('POST /signup', () => {
    let dummyUser = {
        email: "testemail",
        password: "testpassword",
        title: "Admin"
    };
    
    beforeEach(async () => {
        await refreshDB();
    });
    
    step('should return 200 status OK', async () => {
        const response = await create_user(dummyUser);        
        expect(response.status).to.equal(200);
    });

    step('should return an object containing new user data fields', async () => {
        const response = await create_user(dummyUser);        
        expect(response.status).to.equal(200);
        const user = response.json;
        expect(user.email).to.equal(dummyUser.email);
        expect(user.user_id).to.not.be.null;
    });
    
})