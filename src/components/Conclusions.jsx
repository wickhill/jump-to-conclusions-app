import React from "react";
import Conclusion from "./Conclusion";

const Conclusions = (props) => {
  console.log(props);

  return (
    <div>
      <h1>Conclusions</h1>
      {Object.keys(props.conclusions).map((key, index) => {
        const conclusion = props.conclusions[key];
        return <Conclusion key={index} conclusion={conclusion} />;
      })}
    </div>
  );
};

Conclusions.defaultProps = {
  conclusions: {},
};

export default Conclusions;
