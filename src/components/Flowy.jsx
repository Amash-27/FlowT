import { motion } from "framer-motion";
import "../styles/flowy.css";

function Flowy() {

  return (
    <motion.div
      className="flowy"
      animate={{
        y: [0, -12, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >

      <div className="flowy-face">

        <div className="eyes">
          <span>◕</span>
          <span>◕</span>
        </div>

        <div className="mouth">
          ᴗ
        </div>

      </div>


      <div className="flowt-badge">
        FlowT
      </div>


    </motion.div>
  );
}

export default Flowy;