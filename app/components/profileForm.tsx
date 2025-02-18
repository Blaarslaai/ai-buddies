/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Loader from "./loader";
import {
  getUserData,
  getUserProfile,
  updateUserProfile,
} from "../utils/serverFunction";
import Popup from "./popup";

type props = {
  user: any;
  isComponentLoading: boolean;
};

export default function ProfileForm({ user, isComponentLoading }: props) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [userDetails, setUserDetails] = useState<any>([
    {
      id: 0,
      name: "",
    },
  ]);

  const [userProfile, setUserProfile] = useState<any>({
    user_id: 0,
    name: "",
    birthday: "",
    gender: "",
  });

  useEffect(() => {
    async function getUserDetails() {
      setIsLoading(true);

      const userDetails = await getUserData(user.email);
      setUserDetails(userDetails);

      setIsLoading(false);
    }

    getUserDetails();
  }, [user]);

  useEffect(() => {
    async function getUserProfileDetails() {
      setIsLoading(true);

      const userProfileDetails = await getUserProfile(userDetails[0].id);

      if (userProfileDetails) {
        setUserProfile({
          user_id: userProfileDetails[0].user_id,
          name: userDetails[0].name,
          birthday: userProfileDetails[0].birthday,
          gender: userProfileDetails[0].gender,
        });
      }

      setIsLoading(false);
    }

    if (userDetails[0].id != 0) {
      getUserProfileDetails();
    }
  }, [user.name, userDetails]);

  if (isComponentLoading || isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="w-full px-52">
        <form
          className="text-slate-400"
          onSubmit={(e) => {
            e.preventDefault();

            const userProfileValues = {
              user_id: userProfile.user_id,
              name: userProfile.name,
              birthday: userProfile.birthday,
              gender: userProfile.gender,
            };

            updateUserProfile(userProfileValues);
            setShowPopup(true);
          }}
        >
          <div className="flex">
            <div className="flex-1 mr-10">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-slate-800">Name</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-lg"
                  value={userProfile.name}
                  onChange={(e) => {
                    setUserProfile({ ...userProfile, name: e.target.value });
                  }}
                  required
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-slate-800">Email</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-lg"
                  readOnly
                  value={user?.email}
                />
              </label>
            </div>
            <div className="flex-1">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-slate-800">Birthday</span>
                </div>
                <input
                  type="date"
                  className="input input-bordered w-full max-w-xs"
                  required
                  value={userProfile.birthday}
                  onChange={(e) => {
                    setUserProfile({
                      ...userProfile,
                      birthday: e.target.value,
                    });
                  }}
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-slate-800">Gender</span>
                </div>
                <select
                  className="select select-bordered"
                  required
                  value={userProfile.gender}
                  onChange={(e) => {
                    setUserProfile({ ...userProfile, gender: e.target.value });
                  }}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </label>
            </div>
          </div>
          <div className="float-right mt-10">
            <button type="submit" className="btn btn-accent">
              Save Details
            </button>
          </div>
        </form>
      </div>

      {showPopup && (
        <div className="absolute bottom-10 flex w-full justify-center items-center">
          <div className="w-1/2">
            <Popup
              message="Details saved successfully."
              type="info"
              showPopup={showPopup}
              setShowPopup={setShowPopup}
            />
          </div>
        </div>
      )}
    </>
  );
}
