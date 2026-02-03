import express from 'express'
import { Message }  from '../controllors/chatbot.message.js'

const router = express.Router();

router.post("/message", Message)

export default router;