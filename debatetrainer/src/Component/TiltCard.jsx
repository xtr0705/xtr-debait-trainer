import { motion } from "framer-motion";
import { useState } from "react";

function TiltCard({ children, className = "" }) {
  const [rotate, setRotate] = useState({
    x: 0,
    y: 0,
  });

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 35;
    const rotateX = ((y / rect.height) - 0.5) * -35;

    setRotate({
      x: rotateX,
      y: rotateY,
    });
  }

  function handleMouseLeave() {
    setRotate({
      x: 0,
      y: 0,
    });
  }

  return (
    <div
      style={{
        perspective: "1000px",
      }}
    >
      <motion.div
        animate={{
          rotateX: rotate.x,
          rotateY: rotate.y,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 20,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default TiltCard;