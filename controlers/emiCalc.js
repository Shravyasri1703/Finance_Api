import Finance from "../models/Finance.js";

export const calculateEmi = async (req, res)=>{
    try{
          const { loan_amount , intrest_rate, loan_tenure_months, prepayment_amount  } = req.body

          const monthly_intrest_rate = (intrest_rate / 12) / 100;
          const tenure_in_months = loan_tenure_months

          const emi = (loan_amount * monthly_intrest_rate * Math.pow(1 + monthly_intrest_rate, tenure_in_months))/
                      (Math.pow(1 + monthly_intrest_rate, tenure_in_months) - 1)

          if(isNaN(emi) || emi <= 0){
            return res.status(400).json({
                error: "Invalid Calculation"
            })
          }

           const financeSlip = await Finance.create({
            loan_amount,
            intrest_rate,
            loan_tenure_months,
            emi: emi.toFixed(2),
            payment_amount: prepayment_amount,
            remaining_balance: loan_amount
           })   
           
           const BreakDown = []
           let balance = loan_amount;
           for(let month = 1; month <= tenure_in_months; month++){
                 const intrest_Paid = balance * monthly_intrest_rate
                 const principal_Paid = emi - intrest_Paid
                 balance = balance - principal_Paid

                 if(balance < 0) balance = 0

                 BreakDown.push({
                    month,
                    EMI_Amount: emi.toFixed(2),
                    intrest_Paid: intrest_Paid.toFixed(2),
                    principal_Paid: principal_Paid.toFixed(2),
                    payment_Done: prepayment_amount,
                    remaining_balance: balance.toFixed(2)
                 })
           }

           res.status(200).json({
            emi: emi.toFixed(2),
            prepayment_amount,
            BreakDown
           })
    }
    catch(err){
        res.status(500).json({
            "message": "Internal Server Error !!"
        })
        console.log(err)
    }
}

export const fetchEMI = async (req, res)=>{
  try{
        const emiData = await Finance.findAll()
        res.status(200).json(emiData)
  }
  catch(err){
    console.log(err)
    res.status(500).json({
        "message": 'Internal Server Error !'
    })
  }
}

export const personalDetails = async (req, res)=>{

          const { id } = req.params
    try{
        const emiRec = await Finance.findByPk(id)

        if(!emiRec) return res.status(404).json({"message":"Record not found"})

         const { loan_amount, intrest_rate, loan_tenure_months, emi } = emiRec
         
         const principal = parseFloat(loan_amount)
         const emiAmount = parseFloat(emi)
         const monthlyRate = parseFloat(intrest_rate) / 100 / 12

         const BreakDown = []
         let remainingBalance = principal

         for(let month = 1; month <= loan_tenure_months; month++){
            const intrestPayment = remainingBalance * monthlyRate
            const principalPayment = emiAmount - intrestPayment
            remainingBalance = remainingBalance - principalPayment

            BreakDown.push({
                emi: emiAmount.toFixed(2),
                intrestPayment: intrestPayment.toFixed(2),
                principalPayment: principalPayment.toFixed(2),
                remainingBalance: remainingBalance.toFixed(2)
            })
         }

         res.status(200).json({
            emiRec,
            monthWiseBreakdown: BreakDown
         })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            "message": "Internal Server Error"
        })
    }
}