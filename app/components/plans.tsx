"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import Plan from "./plan";
import getAuth from "../auth";
import { isSubscribed, modifySubscription } from "@reflowhq/auth-next/client";

type props = {
  subscription: any;
};

export default function Plans({ subscription }: props) {
  const auth = getAuth();

  const [plans, setPlans] = useState([]);
  const [activeTab, setActiveTab] = useState("month");
  const [isSubbed, setIsSubbed] = useState(false);

  useEffect(() => {
    async function getPlans() {
      const plans = await fetch(
        `https://test-api.reflowhq.com/v2/projects/${auth.projectID}/plans/`
      ).then((r) => r.json());

      const orderedPlans = plans.data.sort(
        (
          a: { parameters: { index: number } },
          b: { parameters: { index: number } }
        ) => a.parameters.index - b.parameters.index
      );

      setPlans(orderedPlans);
    }

    getPlans();
  }, [auth.projectID]);

  useEffect(() => {
    async function checkSubscribed() {
      const isSubbed = await isSubscribed();

      setIsSubbed(isSubbed);
    }

    checkSubscribed();
  }, [isSubbed]);

  async function refreshCookie() {
    await auth.refresh();
  }

  return (
    <>
      {!isSubbed ? (
        <>
          <div className="w-full flex justify-center">
            <div className="tabs tabs-boxed">
              <a
                role="tab"
                className={`tab ${activeTab === "month" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("month")}
              >
                Monthly
              </a>
              <a
                role="tab"
                className={`tab ${activeTab === "year" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("year")}
              >
                Yearly
              </a>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center mt-10">
            {plans.map((p: any, index: number) => (
              <div
                key={index}
                className="flex flex-row flex-1 bg-slate-200 mx-10 rounded-lg p-5 h-full"
              >
                <Plan key={p.id} plan={p} activeTab={activeTab} auth={auth} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center">
          <div className="card bg-slate-200 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{subscription.plan.name}</h2>
              <p>{subscription.plan.description}</p>
              <br />
              <p>
                <strong>{subscription.price.price_formatted}</strong>
                {" - "}
                {subscription.price.billing_period === "month"
                  ? "Monthly"
                  : "Yearly"}
              </p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary mt-5"
                  onClick={() => {
                    modifySubscription({
                      onSuccess: () => {
                        refreshCookie();
                      },
                    });
                  }}
                >
                  Modify Subscription
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
