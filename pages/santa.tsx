import React from "react";
import PropTypes from "prop-types";
import Santa from "components/Santa";

const santa = (props) => {
  return (
    <div className="h-full flex items-center justify-center">
      <Santa message={"Hoo hoo hoo!"} />
    </div>
  );
};

santa.propTypes = {};

export default santa;
