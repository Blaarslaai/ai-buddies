"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  getPlans,
  initializePayment,
  subscribeToPlan,
} from "../utils/paystack";
import { useAppContext } from "../context/AppContext";

export default function Plans() {
  const [isMounted, setIsMounted] = useState(false);
  const [plans, setPlans] = useState([]);

  const { state } = useAppContext();

  useEffect(() => {
    async function getPlanData() {
      const planData = await getPlans();

      const order = ["Soloist", "Groupie", "Socialite"];

      if (planData && planData.data) {
        const sortedData = planData?.data.sort(
          (a: any, b: any) => order.indexOf(a.name) - order.indexOf(b.name)
        );
        setPlans(sortedData);
      }
    }

    getPlanData();
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  async function subscribe(plan: any) {
    // const result = await initializePayment(plan.amount, );

    // console.log(result);

    console.log(state.user);
  }

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-row justify-center items-center mt-10">
      {plans &&
        plans.map((plan: any, index: number) => (
          <div
            key={index}
            className="flex flex-row flex-1 bg-slate-200 mx-10 rounded-lg p-5 h-full"
          >
            <div className="card flex flex-col h-full">
              <div className="flex flex-col justify-center items-center flex-1">
                <h1 className="text-5xl">{plan.name}</h1>
                <p className="text-sm text-center">
                  <strong>{plan.description}</strong>
                </p>
                <ul className="list-disc my-5">
                  {plan.name === "Soloist" ? (
                    <>
                      <li>Support for one AI model</li>
                      <li>Zero WhatsApp functionality</li>
                    </>
                  ) : plan.name === "Groupie" ? (
                    <>
                      <li>Support for up to two AI models</li>
                      <li>Limited WhatsApp functionality</li>
                    </>
                  ) : plan.name === "Socialite" ? (
                    <>
                      <li>Support for up to three AI models</li>
                      <li>Full WhatsApp functionality</li>
                    </>
                  ) : null}
                </ul>
                <h2 className="font-bold">Price: R{plan.amount / 100}.00</h2>
              </div>
              <div className="flex justify-center my-5">
                <button
                  className="btn btn-accent w-1/2"
                  onClick={() => {
                    subscribe(plan);
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
