
import Subscription from '../models/Subscription.js';
import Payment from '../models/Payment.js';

export async function createPayment(req, res) {

   try {
     const { userId, subscriptionId, paymentStatus, amountPaid, paymentDate } = req.body;
     
     const goldRate=9315;
     const gramsEarned = amountPaid / goldRate;  // e.g. ₹5000 rate → ₹1000 / 5000 = 0.2g
 
     const payment = new Payment({
       userId,
       subscriptionId,
       paymentStatus,
       amountPaid,
       paymentDate,
       gramsEarned:Number(gramsEarned.toFixed(2)),  // round before saving
       goldRate,
     });
 
     await payment.save();

    // Update subscription totals
     let subscription = await Subscription.findById(subscriptionId).populate('planId');
     console.log(subscription);
     if (!subscription) {
       return res.status(404).json({ error: 'Subscription not found' });
     }
    const plan = subscription.planId;
     console.log(plan);
     console.log("Subscription:", subscription);
     console.log("Plan Duration:", plan.duration);

     subscription.totalAmountPaid += amountPaid;
     subscription.totalGramsEarned += gramsEarned;

     const paidMonths = await Payment.countDocuments({
      subscriptionId,
      paymentStatus: { $in: ['paid', 'SUCCESS'] } ,
    });
    console.log(plan.duration,paidMonths);
    
    // 4. Calculate remaining months and amount
     const remainingMonths = plan.duration && paidMonths > 0 
      ? plan.duration - paidMonths 
      : plan.duration;  // if no payment yet, full duration remains
      
      //const remainingAmount = remainingMonths * plan.fixedAmount;

    // 5. Save updated subscription
    subscription.remainingMonths = remainingMonths;
     await subscription.save();
 
     res.status(201).json({ message: 'Payment successful',
       payment,
       updatedSubscription: {
         totalPaid: subscription.totalAmountPaid,
         totalGold: subscription.totalGramsEarned,
         remainingMonths: subscription.remainingMonths
       }});
       
   } catch (error) {
     res.status(400).json({ message: 'Payment Failed', error: error.message });
   }
}

// Get all Payments
export const getAllPayments = async (req, res) => {
 try {
    const payments = await Payment.find()
      .populate('userId', 'username email phoneNumber')
      .populate('subscriptionId', 'planId status totalAmountPaid');
    res.status(200).json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

