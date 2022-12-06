import React from "react";
import cn from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import { Grinch, Santa } from "components/assistants";
import { useAppContext } from "context/AppContext";

const Assistant = ({
  className,
  message,
  messagePosition = "top",
  variant = "default",
}: {
  className?: string;
  message: string;
  messagePosition?: "top" | "right";
  variant?: "default" | "eyes-closed";
}) => {
  const { mode, toggleMode } = useAppContext();
  return (
    <div className={cn([className, "relative"])}>
      <AnimatePresence>
        <motion.div
          key={message}
          className={cn([
            "absolute transform",
            {
              "left-1/2 -top-full -translate-y-full -translate-x-1/2 w-80":
                messagePosition === "top",
              "-right-4 top-1/2 translate-x-full -translate-y-1/2 w-60":
                messagePosition === "right",
            },
          ])}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.3,
          }}
        >
          <div
            className={cn([
              "bg-white rounded-lg text-black p-4 whitespace-pre-wrap border",
              {
                "animate-move-x": messagePosition === "right",
                "animate-move-y": messagePosition === "top",
              },
            ])}
          >
            <span dangerouslySetInnerHTML={{ __html: message }}></span>
            <span
              className={cn([
                "absolute rotate-45 bg-white h-4 w-4 transform border -z-10 ",
                {
                  "bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2 border-t-transparent border-l-transparent":
                    messagePosition === "top",
                  "left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 border-t-transparent border-r-transparent":
                    messagePosition === "right",
                },
              ])}
            ></span>
          </div>
        </motion.div>
      </AnimatePresence>
      <>
        {mode === "dark" && <Grinch variant={variant} />}
        {mode !== "dark" && <Santa variant={variant} />}
      </>
    </div>
  );
};

Assistant.propTypes = {};

export default Assistant;
