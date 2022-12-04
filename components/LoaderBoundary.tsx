import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Santa from "components/Santa";

const LoaderBoundary = ({
  children,
  loading,
  message,
}: {
  children: React.ReactNode;
  loading: boolean;
  message: string;
}) => {
  return (
    <>
      {children}

      <AnimatePresence mode={"popLayout"}>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 right-0 bottom-0 backdrop-filter backdrop-blur-sm flex items-center justify-center bg-black bg-opacity-100"
          >
            <Santa message={message} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

LoaderBoundary.propTypes = {};

export default LoaderBoundary;
