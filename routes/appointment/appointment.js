import express from 'express';

import { test } from '../../controllers/appointment/test.js';

import auth from '../../middleware/auth/auth.js';

const router = express.Router();

router.get('/test', auth, test); // testing route for dev

export default router;