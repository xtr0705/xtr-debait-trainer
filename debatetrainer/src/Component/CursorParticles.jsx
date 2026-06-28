import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

function CursorParticles() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const handleMove = (e) => {
      const id = crypto.randomUUID();

      setParticles((prev) => [
        ...prev,
        {
          id,
          x: e.clientX,
          y: e.clientY,
        },
      ]);

      setTimeout(() => {
        setParticles((prev) =>
          prev.filter((p) => p.id !== id)
        );
      }, 700);
    };

    window.addEventListener("mousemove", handleMove);

    return () =>
      window.removeEventListener(
        "mousemove",
        handleMove
      );
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              opacity: 1,
              scale: 1,
            }}
            animate={{
              opacity: 0,
              scale: 0,
              y: -20,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
            className="absolute rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              width: 8,
              height: 8,
              background: "#8B5CF6",
              boxShadow:
                "0 0 15px rgba(139,92,246,.9), 0 0 35px rgba(139,92,246,.45)",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

export default CursorParticles;