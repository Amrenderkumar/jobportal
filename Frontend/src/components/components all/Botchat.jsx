import React, { useEffect, useState, useRef } from "react";
import Bot from "../Bot";

const Botchat = () => {
  const [open, setOpen] = useState(false);
  const chatRef = useRef(null); // Ref for detecting outside clicks

  // Lock scroll and change background when chat is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.background = "#0d0d0d";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.background = "white";
    }
  }, [open]);

  // Detect clicks outside the chat
  useEffect(() => {
    function handleClickOutside(event) {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Chat window open state
  if (open) {
    return (
      <div ref={chatRef} className="fixed bottom-0 right-6 z- [9999]">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-6 bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg text-sm shadow-lg"
        >
          ✕
        </button>
        <Bot />
      </div>
    );
  }

  // Chat icon button
  return (
    <div
      onClick={() => setOpen(true)}
      className="fixed bottom-5 right-5 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-xl cursor-pointer text-xl z- [9999]"
    >
      💬
    </div>
  );
};

export default Botchat;
