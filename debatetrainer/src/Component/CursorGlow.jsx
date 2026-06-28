import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function CursorGlow() {
  const [mouse, setMouse] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  useEffect(() => {
    const move = (e) => {
      setMouse({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", move);

    return () =>
      window.removeEventListener("mousemove", move);
  }, []);

  return (
    <motion.div
      animate={{
        x: mouse.x - 250,
        y: mouse.y - 250,
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 18,
        mass: 0.4,
      }}
      className="
        fixed
        top-0
        left-0
        w-125
        h-125
        rounded-full
        pointer-events-none
        z-0
        blur-[140px]
      "
      style={{
        background:
          "radial-gradient(circle, rgba(139,92,246,0.18), transparent 70%)",
      }}
    />
  );
}

export default CursorGlow;