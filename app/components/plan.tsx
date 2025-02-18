/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

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
    if (chosenPrice.price > 0) {
      alert(
        "Subscribing for paid plans is disabled in the demo in order to prevent accidental charges. You can try the free one instead."
      );
    } else {
      auth.createSubscription({
        priceID: chosenPrice.id,
        paymentProvider: "paddle",
      });
    }
  }

  return (
    <div className="card">
      <h1>{plan.name}</h1>
      <p>{plan.description}</p>
      <ul>
        {plan.features.map((f: any, i: any) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
      <h2>
        {chosenPrice.price === 0
          ? "Free"
          : chosenPrice.price_formatted + " / " + chosenPrice.billing_period}
      </h2>
      <button onClick={subscribeToPlan}>Subscribe</button>
    </div>
  );
}
