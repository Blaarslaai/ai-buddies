"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import Plan from "./plan";
import useAuth from "@reflowhq/auth-react";

const config = {
  projectID: "213565547",
};

export default function Plans() {
  const auth = useAuth(config);

  const [plans, setPlans] = useState([]);
  const [activeTab, setActiveTab] = useState("month");

  useEffect(() => {
    fetch(`https://api.reflowhq.com/v2/projects/${config.projectID}/plans/`)
      .then((response) => response.json())
      .then((r) => setPlans(r.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <div>
        <div className="tabs">
          <span
            className={activeTab === "month" ? "active" : ""}
            onClick={() => setActiveTab("month")}
          >
            Monthly
          </span>
          <span
            className={activeTab === "year" ? "active" : ""}
            onClick={() => setActiveTab("year")}
          >
            Yearly
          </span>
        </div>
        <div className="card-container">
          {plans.map((p: any) => (
            <Plan key={p.id} plan={p} activeTab={activeTab} auth={auth} />
          ))}
        </div>
      </div>
    </>
  );
}
