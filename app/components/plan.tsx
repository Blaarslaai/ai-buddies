/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { createSubscription } from "@reflowhq/auth-next/client";

type props = {
  plan: any;
  activeTab: any;
  auth: any;
};

export default function Plan({ plan, activeTab, auth }: props) {
  let chosenPrice = plan.prices[0];

  for (const p of plan.prices) {
    if (p.billing_period === activeTab) {
      chosenPrice = p;
    }
  }

  function subscribeToPlan() {
    createSubscription({
      priceID: chosenPrice.id,
      paymentProvider: "paddle",
      onSubscribe: () => {
        refreshCookie();

        window.location.reload();
      },
    });
  }

  async function refreshCookie() {
    await auth.refresh();
  }

  return (
    <div className="card flex flex-col h-full">
      <div className="flex flex-col justify-center items-center flex-1">
        <h1 className="text-5xl">{plan.name}</h1>
        <p className="text-sm text-center">
          <strong>{plan.description}</strong>
        </p>
        <ul className="list-disc my-5">
          {plan.features.map((f: any, i: any) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
        <h2
          className={`font-bold ${
            activeTab === "month" ? "text-primary" : "text-secondary"
          }`}
        >
          {chosenPrice.price === 0
            ? "Free"
            : chosenPrice.price_formatted + " / " + chosenPrice.billing_period}
        </h2>
      </div>
      <div className="flex justify-center my-5">
        <button className="btn btn-accent w-1/2" onClick={subscribeToPlan}>
          Subscribe
        </button>
      </div>
    </div>
  );
}
