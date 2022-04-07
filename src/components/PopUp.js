import { useEffect, useState } from "react";
import popupStyles from "../assets/style/pop-up.css"
import PropTypes from "prop-types";

const PopUp = (props) => {
  const [show, setShow] = useState(false);

  const closeHandler = (e) => {
    setShow(false);
    props.onClose(false);
  };

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  return (
    <div className='overlay'
      style={{
        visibility: show ? "visible" : "hidden",
        opacity: show ? "1" : "0"
      }}
     
    >
      <div className='popup'>
        <h2>{props.title}</h2>
        <span className='close' onClick={(e) => closeHandler(e)}>
          &times;
        </span>
        <div className='content'>{props.children}</div>
      </div>
    </div>
  );
};

PopUp.propTypes = {
  title: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
export default PopUp;