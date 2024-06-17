import React from 'react';

function BotonesPildoraMain(props) {
  return (
    <button type="button" id='button' className="btn rounded-pill mx-lg-5 mx-3">
      {props.title}
    </button>
  );
}

export default BotonesPildoraMain;