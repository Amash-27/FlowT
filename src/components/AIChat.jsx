import { useState } from "react";
import { motion } from "framer-motion";
import "../styles/aichat.css";

function AIChat({ closeChat }) {

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      text: "Hi 👋 I am Flowy. I can help you manage your business.",
      sender: "ai"
    }
  ]);


  function sendMessage(e){

    e.preventDefault();

    if(!message.trim()) return;


    setMessages([
      ...messages,
      {
        text: message,
        sender:"user"
      },
      {
        text:"I am checking your FlowT data... 🤖",
        sender:"ai"
      }
    ]);

    setMessage("");

  }


  return (

    <motion.div
      className="ai-chat"
      initial={{
        opacity:0,
        y:50
      }}
      animate={{
        opacity:1,
        y:0
      }}
    >

      <div className="ai-header">

        🧸 Flowy AI

        <button onClick={closeChat}>
          ✕
        </button>

      </div>


      <div className="messages">

        {
          messages.map((msg,index)=>(

            <div
              key={index}
              className={msg.sender}
            >
              {msg.text}
            </div>

          ))
        }

      </div>


      <form onSubmit={sendMessage}>

        <input

          value={message}

          onChange={(e)=>setMessage(e.target.value)}

          placeholder="Ask Flowy..."

        />

        <button>
          ➤
        </button>

      </form>


    </motion.div>

  );

}


export default AIChat;