import React from 'react';

function SectionComponentBigDiv(props) {
  return (
    <div className="col-md-3 d-flex align-items-center justify-content-center border border-primary rounded-4 my-2 bigDiv">
      <p>{props.title}</p>
    </div>
  );
}

export default SectionComponentBigDiv;
