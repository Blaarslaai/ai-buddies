/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Loader from "./loader";
import {
  getPicture,
  getUserProfile,
  updateUserProfile,
  uploadPicture,
} from "../utils/serverFunction";
import Popup from "./popup";
import Image from "next/image";
import { useAppContext } from "../context/AppContext";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertToPng } from "../utils/utilities";

export default function ProfileForm() {
  const { state } = useAppContext();

  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const [userPhoto, setUserPhoto] = useState("");

  const [userProfile, setUserProfile] = useState<any>({
    user_id: state.supabaseUser && state.supabaseUser[0].id,
    birthday: "",
    gender: "",
    occupation: "",
    origin: "",
    hobbies: "",
    weekends: "",
    locationPreference: "",
    careerLikes: "",
    careerGoals: "",
    partnerPreferences: "",
    relationshipCategory: "",
    loveLanguage: "",
    funFacts: "",
    threeWordDescription: "",
    funActivity: "",
    family: "",
    familyImportance: "",
    traveled: "",
    dreamDestination: "",
    favoriteFood: "",
    coffeeOrTea: "",
    favoriteMovie: "",
    favoriteShow: "",
    entertainmentPreference: "",
    philosophies: "",
    stress: "",
  });

  useEffect(() => {
    async function getUserProfileDetails() {
      setIsLoading(true);

      const userProfileDetails = await getUserProfile(state.supabaseUser[0].id);

      if (userProfileDetails) {
        setUserProfile({
          user_id: state.supabaseUser[0].id,
          birthday:
            (userProfileDetails && userProfileDetails[0].birthday) || "",
          gender: (userProfileDetails && userProfileDetails[0].gender) || "",
          occupation:
            (userProfileDetails && userProfileDetails[0].occupation) || "",
          origin: (userProfileDetails && userProfileDetails[0].origin) || "",
          hobbies: (userProfileDetails && userProfileDetails[0].hobbies) || "",
          weekends:
            (userProfileDetails && userProfileDetails[0].weekends) || "",
          locationPreference:
            (userProfileDetails && userProfileDetails[0].locationPreference) ||
            "",
          careerLikes:
            (userProfileDetails && userProfileDetails[0].careerLikes) || "",
          careerGoals:
            (userProfileDetails && userProfileDetails[0].careerGoals) || "",
          partnerPreferences:
            (userProfileDetails && userProfileDetails[0].partnerPreferences) ||
            "",
          relationshipCategory:
            (userProfileDetails &&
              userProfileDetails[0].relationshipCategory) ||
            "",
          loveLanguage:
            (userProfileDetails && userProfileDetails[0].loveLanguage) || "",
          funFacts:
            (userProfileDetails && userProfileDetails[0].funFacts) || "",
          threeWordDescription:
            (userProfileDetails &&
              userProfileDetails[0].threeWordDescription) ||
            "",
          funActivity:
            (userProfileDetails && userProfileDetails[0].funActivity) || "",
          family: (userProfileDetails && userProfileDetails[0].family) || "",
          familyImportance:
            (userProfileDetails && userProfileDetails[0].familyImportance) ||
            "",
          traveled:
            (userProfileDetails && userProfileDetails[0].traveled) || "",
          dreamDestination:
            (userProfileDetails && userProfileDetails[0].dreamDestination) ||
            "",
          favoriteFood:
            (userProfileDetails && userProfileDetails[0].favoriteFood) || "",
          coffeeOrTea:
            (userProfileDetails && userProfileDetails[0].coffeeOrTea) || "",
          favoriteMovie:
            (userProfileDetails && userProfileDetails[0].favoriteMovie) || "",
          favoriteShow:
            (userProfileDetails && userProfileDetails[0].favoriteShow) || "",
          entertainmentPreference:
            (userProfileDetails &&
              userProfileDetails[0].entertainmentPreference) ||
            "",
          philosophies:
            (userProfileDetails && userProfileDetails[0].philosophies) || "",
          stress: (userProfileDetails && userProfileDetails[0].stress) || "",
        });
      }

      setIsLoading(false);
    }

    if (state.supabaseUser) {
      getUserProfileDetails();
    }
  }, [state.supabaseUser]);

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const pngFile = await convertToPng(file);
    await uploadPicture(state.supabaseUser[0].id, pngFile);

    const pictureUrl = await getPicture(state.supabaseUser[0].id);

    if (pictureUrl.data) {
      setUserPhoto(pictureUrl.data?.signedUrl);
    }
  };

  useEffect(() => {
    async function getProfilePicture() {
      const pictureUrl = await getPicture(state.supabaseUser[0].id);

      if (pictureUrl.data) {
        setUserPhoto(pictureUrl.data?.signedUrl);
      }
    }

    getProfilePicture();
  }, [state.supabaseUser]);

  async function updateSupabaseProfile() {
    await updateUserProfile(userProfile);
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="w-full px-52">
        <form
          className="text-slate-400"
          onSubmit={(e) => {
            e.preventDefault();

            updateSupabaseProfile();
            setShowPopup(true);
          }}
        >
          <div className="flex">
            {/* Image Section */}
            <div className="flex-1 mr-5">
              <div className="flex justify-center">
                {userPhoto ? (
                  <Image src={userPhoto} alt="" width={300} height={300} />
                ) : (
                  <FontAwesomeIcon icon={faUser} size="10x" />
                )}
              </div>
              <div className="flex justify-center">
                <input
                  type="file"
                  className="file-input file-input-bordered w-full max-w-xs mt-5"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>

              <div className="flex justify-center mt-5">
                <button type="submit" className="btn btn-accent">
                  Save Details
                </button>
              </div>
            </div>

            {/* Basic Information Section (fields) */}
            <div className="flex-1 overflow-auto max-h-[60vh] border border-black rounded-xl px-20 pb-10">
              {/* Heading above both fields columns */}
              <h1 className="text-xl text-slate-800 mb-4">Basic Information</h1>

              <div className="flex">
                {/* Left Fields Column */}
                <div className="flex-1 mr-10">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-slate-800">Name</span>
                    </div>
                    <input
                      disabled
                      type="text"
                      className="input input-bordered w-full max-w-lg"
                      value={state.supabaseUser[0].name}
                      readOnly
                    />
                  </label>

                  <label className="form-control w-full mt-4">
                    <div className="label">
                      <span className="label-text text-slate-800">Email</span>
                    </div>
                    <input
                      disabled
                      type="text"
                      className="input input-bordered w-full max-w-lg"
                      readOnly
                      value={state.supabaseUser[0].email}
                    />
                  </label>

                  <label className="form-control w-full mt-4">
                    <div className="label">
                      <span className="label-text text-slate-800">
                        What do you do for a living?
                      </span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-lg"
                      value={userProfile.occupation}
                      onChange={(e) => {
                        setUserProfile({
                          ...userProfile,
                          occupation: e.target.value,
                        });
                      }}
                    />
                  </label>
                </div>

                {/* Right Fields Column */}
                <div className="flex-1">
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text text-slate-800">
                        Birthday
                      </span>
                    </div>
                    <input
                      type="date"
                      className="input input-bordered w-full max-w-xs"
                      value={userProfile.birthday}
                      onChange={(e) => {
                        setUserProfile({
                          ...userProfile,
                          birthday: e.target.value,
                        });
                      }}
                    />
                  </label>

                  <label className="form-control w-full max-w-xs mt-4">
                    <div className="label">
                      <span className="label-text text-slate-800">Gender</span>
                    </div>
                    <select
                      className="select select-bordered"
                      value={userProfile.gender}
                      onChange={(e) => {
                        setUserProfile({
                          ...userProfile,
                          gender: e.target.value,
                        });
                      }}
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </label>

                  <label className="form-control w-full mt-4">
                    <div className="label">
                      <span className="label-text text-slate-800">
                        Where are you from originally?
                      </span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-xs"
                      value={userProfile.origin}
                      onChange={(e) => {
                        setUserProfile({
                          ...userProfile,
                          origin: e.target.value,
                        });
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Heading above both fields columns */}
              <h1 className="text-xl text-slate-800 mb-4 mt-10">
                Lifestyle & Interests
              </h1>

              <div className="flex">
                {/* Left Fields Column */}
                <div className="flex-1 mr-10">
                  <label className="form-control w-full mt-4">
                    <div className="label">
                      <span className="label-text text-slate-800">
                        What are your hobbies and passions?
                      </span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-lg"
                      value={userProfile.hobbies}
                      onChange={(e) => {
                        setUserProfile({
                          ...userProfile,
                          hobbies: e.target.value,
                        });
                      }}
                    />
                  </label>

                  <label className="form-control w-full mt-4">
                    <div className="label">
                      <span className="label-text text-slate-800">
                        Are you more of an indoor or outdoor person?
                      </span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-lg"
                      value={userProfile.locationPreference}
                      onChange={(e) => {
                        setUserProfile({
                          ...userProfile,
                          locationPreference: e.target.value,
                        });
                      }}
                    />
                  </label>
                </div>

                {/* Right Fields Column */}
                <div className="flex-1">
                  <label className="form-control w-full mt-4">
                    <div className="label">
                      <span className="label-text text-slate-800">
                        How do you usually spend your weekends?
                      </span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-xs"
                      value={userProfile.weekends}
                      onChange={(e) => {
                        setUserProfile({
                          ...userProfile,
                          weekends: e.target.value,
                        });
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Heading above both fields columns */}
              <h1 className="text-xl text-slate-800 mb-4 mt-10">
                Career & Ambitions
              </h1>

              <div className="flex">
                {/* Left Fields Column */}
                <div className="flex-1 mr-10">
                  <label className="form-control w-full mt-4">
                    <div className="label">
                      <span className="label-text text-slate-800">
                        What do you love (or dislike) about your job?
                      </span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-lg"
                      value={userProfile.careerLikes}
                      onChange={(e) => {
                        setUserProfile({
                          ...userProfile,
                          careerLikes: e.target.value,
                        });
                      }}
                    />
                  </label>
                </div>

                {/* Right Fields Column */}
                <div className="flex-1">
                  <label className="form-control w-full mt-4">
                    <div className="label">
                      <span className="label-text text-slate-800">
                        Do you have any big career goals or dreams?
                      </span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-xs"
                      value={userProfile.careerGoals}
                      onChange={(e) => {
                        setUserProfile({
                          ...userProfile,
                          careerGoals: e.target.value,
                        });
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Heading above both fields columns */}
              <h1 className="text-xl text-slate-800 mb-4 mt-10">
                Relationships & Values
              </h1>

              <div className="flex">
                {/* Left Fields Column */}
                <div className="flex-1 mr-10">
                  <label className="form-control w-full mt-4">
                    <div className="label">
                      <span className="label-text text-slate-800">
                        What do you look for in a partner?
                      </span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-lg"
                      value={userProfile.partnerPreferences}
                      onChange={(e) => {
                        setUserProfile({
                          ...userProfile,
                          partnerPreferences: e.target.value,
                        });
                      }}
                    />
                  </label>

                  <label className="form-control w-full mt-4">
                    <div className="label">
                      <span className="label-text text-slate-800">
                        How do you approach relationships—casual or serious?
                      </span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-lg"
                      value={userProfile.relationshipCategory}
                      onChange={(e) => {
                        setUserProfile({
                          ...userProfile,
                          relationshipCategory: e.target.value,
                        });
                      }}
                    />
                  </label>
                </div>

                {/* Right Fields Column */}
                <div className="flex-1">
                  <label className="form-control w-full mt-4">
                    <div className="label">
                      <span className="label-text text-slate-800">
                        What’s your love language?
                      </span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-xs"
                      value={userProfile.loveLanguage}
                      onChange={(e) => {
                        setUserProfile({
                          ...userProfile,
                          loveLanguage: e.target.value,
                        });
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Heading above both fields columns */}
              <h1 className="text-xl text-slate-800 mb-4 mt-10">
                Personality & Fun Facts
              </h1>

              <div className="flex">
                {/* Left Fields Column */}
                <div className="flex-1 mr-10">
                  <label className="form-control w-full mt-4">
                    <div className="label">
                      <span className="label-text text-slate-800">
                        What’s a fun fact about you that most people don’t know?
                      </span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-lg"
                      value={userProfile.funFacts}
                      onChange={(e) => {
                        setUserProfile({
                          ...userProfile,
                          funFacts: e.target.value,
                        });
                      }}
                    />
                  </label>

                  <label className="form-control w-full mt-4">
                    <div className="label">
                      <span className="label-text text-slate-800">
                        How would your friends describe you in three words?
                      </span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-lg"
                      value={userProfile.threeWordDescription}
                      onChange={(e) => {
                        setUserProfile({
                          ...userProfile,
                          threeWordDescription: e.target.value,
                        });
                      }}
                    />
                  </label>
                </div>

                {/* Right Fields Column */}
                <div className="flex-1">
                  <label className="form-control w-full mt-4">
                    <div className="label">
                      <span className="label-text text-slate-800">
                        What’s your go-to fun activity?
                      </span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-xs"
                      value={userProfile.funActivity}
                      onChange={(e) => {
                        setUserProfile({
                          ...userProfile,
                          funActivity: e.target.value,
                        });
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Heading above both fields columns */}
              <h1 className="text-xl text-slate-800 mb-4 mt-10">
                Family & Background
              </h1>

              <div className="flex">
                {/* Left Fields Column */}
                <div className="flex-1 mr-10">
                  <label className="form-control w-full mt-4">
                    <div className="label">
                      <span className="label-text text-slate-800">
                        Do you have any siblings or a close-knit family?
                      </span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-lg"
                      value={userProfile.siblings}
                      onChange={(e) => {
                        setUserProfile({
                          ...userProfile,
                          siblings: e.target.value,
                        });
                      }}
                    />
                  </label>
                </div>

                {/* Right Fields Column */}
                <div className="flex-1">
                  <label className="form-control w-full mt-4">
                    <div className="label">
                      <span className="label-text text-slate-800">
                        How important is family in your life?
                      </span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-xs"
                      value={userProfile.familyImportance}
                      onChange={(e) => {
                        setUserProfile({
                          ...userProfile,
                          familyImportance: e.target.value,
                        });
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Heading above both fields columns */}
              <h1 className="text-xl text-slate-800 mb-4 mt-10">
                Travel & Experiences
              </h1>

              <div className="flex">
                {/* Left Fields Column */}
                <div className="flex-1 mr-10">
                  <label className="form-control w-full mt-4">
                    <div className="label">
                      <span className="label-text text-slate-800">
                        Have you traveled anywhere exciting recently?
                      </span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-lg"
                      value={userProfile.traveled}
                      onChange={(e) => {
                        setUserProfile({
                          ...userProfile,
                          traveled: e.target.value,
                        });
                      }}
                    />
                  </label>
                </div>

                {/* Right Fields Column */}
                <div className="flex-1">
                  <label className="form-control w-full mt-4">
                    <div className="label">
                      <span className="label-text text-slate-800">
                        What’s your dream travel destination?
                      </span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-xs"
                      value={userProfile.dreamDestination}
                      onChange={(e) => {
                        setUserProfile({
                          ...userProfile,
                          dreamDestination: e.target.value,
                        });
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Heading above both fields columns */}
              <h1 className="text-xl text-slate-800 mb-4 mt-10">
                Food & Drink Preferences
              </h1>

              <div className="flex">
                {/* Left Fields Column */}
                <div className="flex-1 mr-10">
                  <label className="form-control w-full mt-4">
                    <div className="label">
                      <span className="label-text text-slate-800">
                        What’s your favorite type of cuisine?
                      </span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-lg"
                      value={userProfile.favoriteFood}
                      onChange={(e) => {
                        setUserProfile({
                          ...userProfile,
                          favoriteFood: e.target.value,
                        });
                      }}
                    />
                  </label>
                </div>

                {/* Right Fields Column */}
                <div className="flex-1">
                  <label className="form-control w-full mt-4">
                    <div className="label">
                      <span className="label-text text-slate-800">
                        Are you a coffee or tea person?
                      </span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-xs"
                      value={userProfile.coffeeOrTea}
                      onChange={(e) => {
                        setUserProfile({
                          ...userProfile,
                          coffeeOrTea: e.target.value,
                        });
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Heading above both fields columns */}
              <h1 className="text-xl text-slate-800 mb-4 mt-10">
                Entertainment & Pop Culture
              </h1>

              <div className="flex">
                {/* Left Fields Column */}
                <div className="flex-1 mr-10">
                  <label className="form-control w-full mt-4">
                    <div className="label">
                      <span className="label-text text-slate-800">
                        What’s your favorite movie?
                      </span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-lg"
                      value={userProfile.favoriteMovie}
                      onChange={(e) => {
                        setUserProfile({
                          ...userProfile,
                          favoriteMovie: e.target.value,
                        });
                      }}
                    />
                  </label>

                  <label className="form-control w-full mt-4">
                    <div className="label">
                      <span className="label-text text-slate-800">
                        What’s your favorite TV show?
                      </span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-lg"
                      value={userProfile.favoriteShow}
                      onChange={(e) => {
                        setUserProfile({
                          ...userProfile,
                          favoriteShow: e.target.value,
                        });
                      }}
                    />
                  </label>
                </div>

                {/* Right Fields Column */}
                <div className="flex-1">
                  <label className="form-control w-full mt-4">
                    <div className="label">
                      <span className="label-text text-slate-800">
                        Do you prefer books, podcasts, or music for
                        entertainment?
                      </span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-xs"
                      value={userProfile.entertainmentPreference}
                      onChange={(e) => {
                        setUserProfile({
                          ...userProfile,
                          entertainmentPreference: e.target.value,
                        });
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Heading above both fields columns */}
              <h1 className="text-xl text-slate-800 mb-4 mt-10">
                Personal Growth & Mindset
              </h1>

              <div className="flex">
                {/* Left Fields Column */}
                <div className="flex-1 mr-10">
                  <label className="form-control w-full mt-4">
                    <div className="label">
                      <span className="label-text text-slate-800">
                        Do you follow any philosophies or self-improvement
                        practices?
                      </span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-lg"
                      value={userProfile.philosophies}
                      onChange={(e) => {
                        setUserProfile({
                          ...userProfile,
                          philosophies: e.target.value,
                        });
                      }}
                    />
                  </label>
                </div>

                {/* Right Fields Column */}
                <div className="flex-1">
                  <label className="form-control w-full mt-4">
                    <div className="label">
                      <span className="label-text text-slate-800">
                        How do you handle stress or challenges?
                      </span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-xs"
                      value={userProfile.stress}
                      onChange={(e) => {
                        setUserProfile({
                          ...userProfile,
                          stress: e.target.value,
                        });
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
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
