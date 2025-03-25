/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import paystack from "paystack";
import { createUserData } from "./serverFunction";
import { v4 as uuidv4 } from "uuid";

const paystackClient = paystack(
  ""
);

async function createUser(userData: any) {
  await createUserData(userData);
}

export async function createCustomer(
  firstName: string,
  lastname: string,
  email: string,
  phone: string
) {
  paystackClient.customer
    .create({
      first_name: firstName,
      last_name: lastname,
      email: email,
      phone: phone,
    })
    .then((res) => {
      const userData = {
        name: res.data.first_name + " " + res.data.last_name,
        email: res.data.email,
        phone: res.data.phone,
        customerCode: res.data.customer_code,
      };

      createUser(userData);
    });
}

export async function getPlans() {
  const plans = await paystackClient.plan.list();

  if (plans.data) {
    return plans;
  }
}

export async function initializePayment(
  amount: number,
  email: string,
  name: string
) {
  const ref = uuidv4();

  const response = await paystackClient.transaction.initialize({
    amount: 10000,
    reference: ref,
    email: email,
    name: name,
    callback_url: "http://localhost:3000/api/verifyPaymentSubscribe",
  });

  return response;
}

export async function subscribeToPlan(customer: string, plan: string) {
  const response = await paystackClient.transaction.verify("TestPayment_02");

  return response;

  /**
   * access_code
: 
"e0rgcx6e1g73h44"
authorization_url
: 
"https://checkout.paystack.com/e0rgcx6e1g73h44"
reference
: 
"TestPayment_01"
   */

  // const response = await paystackClient.subscription.create({
  //   customer: customer,
  //   plan: plan,
  //   authorization: "AUTH_kemt4oldei",
  // });

  // return response;

  // SUB_nkzwveryepwnsuu
}
