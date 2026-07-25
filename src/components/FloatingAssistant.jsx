import { useState } from "react";
import Flowy from "./Flowy";
import AIChat from "./AIChat";


function FloatingAssistant(){

  const [open,setOpen] = useState(false);


  return (
    <>

      {open && (
        <AIChat
          closeChat={() => setOpen(false)}
        />
      )}


      <div
        onClick={() => setOpen(true)}
      >
        <Flowy />
      </div>


    </>
  );

}


export default FloatingAssistant;