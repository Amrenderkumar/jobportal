import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { FaUserCircle } from 'react-icons/fa'
function Bot() {
    const [messages,setMessages]=useState([])
    const [input,setInput]=useState("")
    const [loading,setLoading]=useState(false)
    const messagesEndRef=useRef(null)

    useEffect(()=>{
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    },[messages])

    const handleSendMessage = async () => {
        setLoading(true);
        if(!input.trim()) return;
        try {
           const res=await axios.post("http://localhost:5000/bot/v1/message",{
                text: input
            })
            if(res.status === 200) {
                setMessages([...messages, { text: res.data.userMessage, sender: 'user' }, { text: res.data.botMessage, sender: 'bot' }]);
               
            }
            console.log(res.data)
        } catch (error) {
            console.log("Error sending message:", error);
        }
         setInput("");
            setLoading(false);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSendMessage()}
            
  return (
    <div className='flex flex-col h-120 w-100 bg-[#0d0d0d] text-white'>
         {/* Navbar & Header */}
      <header className="top-0 left-0 w-100 border-b border-gray-800 bg-[#0d0d0d] z-10">
        <div className=" container mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-lg font-bold">BotSpoof</h1>
          <FaUserCircle size={30} className="cursor-pointer" />
        </div>
      </header>

      {/* Chat area */}
      <main className="flex-1 overflow-y-auto pt-20 pb-24 flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto px-4 flex flex-col space-y-3">
          {messages.length === 0 ? (
            // Centered welcome message
            <div className="text-center text-gray-400 text-lg">
              👋 Hi, I'm{" "}
              <span className="text-green-500 font-semibold">BotSpoof</span>.
            </div>
          ) : (
            <>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`px-4 py-2 rounded-xl max-w-[75%] ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white self-end"
                      : "bg-gray-800 text-gray-100 self-start"
                  }`}
                >
                  {msg.text}
                </div>
              ))}

              {loading && (
                <div className="bg-gray-700 text-gray-300 px-4 py-2 rounded-xl max-w-[60%] self-start">
                  Bot is typing...
                </div>
              )}
           <div ref={messagesEndRef}/>
            </>
          )}
        </div>
      </main>

      {/* Input & Footer */}
      <footer className=" bottom-0 left-0 w-full border-t border-gray-800 bg-[#0d0d0d] z-10">
        <div className="max-w-4xl mx-auto flex justify-center px-4 py-3">
          <div className="w-full flex bg-gray-900 rounded-full px-4 py-2 shadow-lg">
            <input
              type="text"
              className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 px-2"
              placeholder="Ask BotSpoof..."
             value={input}
             onChange={(e) => setInput(e.target.value)}
             onKeyDown={handleKeyPress}
            />
            <button
             onClick={handleSendMessage}
              className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded-full text-white font-medium transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Bot