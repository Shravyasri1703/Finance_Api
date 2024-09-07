import express from "express";
import { calculateEmi, fetchEMI, personalDetails } from "../controlers/emiCalc.js";

const router = express.Router()

router.post('/calculate-emi', calculateEmi)
router.get('/emis', fetchEMI)
router.get('/emi/:id', personalDetails)

export default router