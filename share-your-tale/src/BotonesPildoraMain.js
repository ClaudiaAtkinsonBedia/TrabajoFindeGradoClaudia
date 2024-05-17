import React from 'react';

function BotonesPildoraMain(props) {
  return (
    <button type="button" className="btn btn-primary rounded-pill mx-lg-5 mx-3">
      {props.title}
    </button>
  );
}

export default BotonesPildoraMain;