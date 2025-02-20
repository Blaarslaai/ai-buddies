/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { faSearch, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  createAIModel,
  createUserChat,
  getUserChats,
  getUserData,
  getUserModels,
  sendWhatsAppMessage,
} from "../utils/serverFunction";
import { supabase } from "../utils/supabase";
import Loader from "./loader";
import Popup from "./popup";

type props = {
  user: any;
};

export default function ChatSpace({ user }: props) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [userDetails, setUserDetails] = useState<any>([
    {
      id: 0,
      name: "",
    },
  ]);
  const [userModels, setUserModels] = useState<any>([]);
  const [chatHistory, setChatHistory] = useState<any>([]);
  // State for user input
  const [input, setInput] = useState("");
  const [currentModel, setCurrentModel] = useState("");

  const [modelName, setModelName] = useState("");
  const [personality, setPersonality] = useState("");

  // Reference for chat container
  const chatRef = useRef<HTMLDivElement>(null);

  function createModel(name: string, personality: string) {
    createAIModel({
      model: name,
      from: "llama3:latest",
      system: personality,
    });
  }

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
    async function getModels() {
      setIsLoading(true);

      const userModels = await getUserModels(userDetails[0].id);
      setUserModels(userModels);

      setIsLoading(false);
    }

    if (userDetails[0].id != 0) {
      getModels();
    }
  }, [userDetails]);

  useEffect(() => {
    async function getChats() {
      setIsLoading(true);

      const userChats = await getUserChats(
        userDetails[0].id,
        userModels.filter((x: any) => x.modelName === currentModel)
      );
      setChatHistory(userChats);

      setIsLoading(false);

      // Subscribe to realtime INSERT events on the "users" table
      const channel = supabase
        .channel("realtime-chats")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "userChats" },
          (payload) => {
            setChatHistory((prevChats: any) => [...prevChats, payload.new]);
          }
        )
        .subscribe();

      // Cleanup subscription on component unmount
      return () => {
        supabase.removeChannel(channel);
      };
    }

    if (userModels && userModels.length > 0 && userDetails[0].id != 0) {
      getChats();
    }
  }, [currentModel, userDetails, userModels]);

  // Scroll to the bottom when chat updates
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Function to handle sending a message
  function sendMessage() {
    if (currentModel === "") {
      setShowPopup(true);
    } else {
      if (!input.trim()) return; // Prevent sending empty messages

      const newMessage = {
        user_id: userDetails[0].id,
        model_id: (
          userModels.filter((x: any) => x.modelName === currentModel) as any
        )[0].id,
        position: "start", // Adjust as needed ("start" for user, "end" for bot)
        name: "User",
        date: new Date().toDateString(),
        time: new Date().toLocaleTimeString(),
        to: currentModel,
        message: input,
      };

      // setChatHistory((prevChat: any) => [...prevChat, newMessage]); // Append message
      createUserChat(newMessage);
      setInput(""); // Clear input field
    }
  }

  function receiveWhatsapp() {
    sendWhatsAppMessage(
      userDetails[0].id,
      (userModels.filter((x: any) => x.modelName === currentModel) as any)[0].id
    );
  }

  // Function to handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents form submission (if inside a form)
      sendMessage();
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="text-slate-800">
      <div className="flex">
        <div className="flex-1">
          <div
            ref={chatRef}
            className="border border-slate-800 rounded-xl m-10 p-10 h-96 overflow-auto"
          >
            {chatHistory &&
              chatHistory
                .filter(
                  (chat: any) =>
                    chat.name === currentModel || chat.to === currentModel
                )
                .sort((a: any, b: any) => {
                  const dateTimeA = new Date(`${a.date}T${a.time}`);
                  const dateTimeB = new Date(`${b.date}T${b.time}`);
                  return dateTimeA.getTime() - dateTimeB.getTime();
                })
                .map((value: any, index: number) =>
                  value.position === "start" ? (
                    <div key={index} className="chat chat-start">
                      <div className="chat-bubble">{value.message}</div>
                      <div className="chat-footer opacity-50">
                        {value.date} {value.time}
                      </div>
                    </div>
                  ) : (
                    <div key={index} className="chat chat-end">
                      <div className="chat-bubble">{value.message}</div>
                      <div className="chat-footer opacity-50">
                        {value.date} {value.time}
                      </div>
                    </div>
                  )
                )}
          </div>

          <div className="flex justify-center items-center text-slate-400">
            <label className="input input-bordered flex items-center gap-2 m-10 w-1/2">
              <input
                type="text"
                className="grow"
                placeholder="Type Here"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress} // Trigger sendMessage on Enter key press
              />
              <button onClick={sendMessage}>
                <FontAwesomeIcon icon={faSearch} className="text-slate-400" />
              </button>
            </label>
            <button className="btn btn-error" onClick={receiveWhatsapp}>
              Receive Reply
            </button>
          </div>
        </div>

        <div className="flex-1 ml-10">
          <div className="h-full mb-[-100]">
            {userModels.map((model: any, index: number) => (
              <div key={index} className="flex mt-5">
                <div className="flex-1">
                  <div className="flex justify-start items-center">
                    <div className="avatar">
                      <div className="w-12 rounded-full">
                        <Image
                          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                          alt=""
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                    <label className="pl-10">
                      {(model.modelName as string).split("_")[0]}
                    </label>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-center items-center h-full">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        setCurrentModel(model.modelName);
                      }}
                    >
                      OPEN CHAT
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center mb-10 text-slate-400">
            <ul className="menu bg-base-200 lg:menu-horizontal rounded-box">
              <li>
                <button
                  onClick={() => {
                    (
                      document.getElementById(
                        "create_model_modal"
                      ) as HTMLDialogElement
                    )?.showModal();
                  }}
                >
                  <FontAwesomeIcon icon={faUpload} width={25} height={25} />
                  Create Model
                  <span className="badge badge-sm badge-warning">NEW</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="absolute bottom-10 flex w-full justify-center items-center">
          <div className="w-1/2">
            <Popup
              message="Warning! No AI model selected."
              type="warning"
              showPopup={showPopup}
              setShowPopup={setShowPopup}
            />
          </div>
        </div>
      )}

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="create_model_modal" className="modal text-slate-400">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">
            Hello!
            <br />
            Create your new friend below!
          </h3>
          <form
            className="py-4"
            onSubmit={(e) => {
              e.preventDefault(); // Prevent the default form submission
              // Check if form is valid
              if (e.currentTarget.checkValidity()) {
                createModel(modelName, personality);
                // Optionally clear the fields after submitting
                setModelName("");
                setPersonality("");
              }
            }}
          >
            <input
              type="text"
              placeholder="Model name"
              className="input input-bordered w-full max-w-xs mb-5"
              required
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
            />
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Personality"
              required
              value={personality}
              onChange={(e) => setPersonality(e.target.value)}
            ></textarea>
            <button type="submit" className="btn btn-warning float-right mt-5">
              Create Model
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
}
