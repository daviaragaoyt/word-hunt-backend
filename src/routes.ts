import { Router } from 'express';
import { login, getWords, saveWords, registerUser } from './controllers';

const router = Router();

router.post('/login', login);
router.post('/register', registerUser);

router.get('/words', getWords);
router.post('/words', saveWords);

export default router;