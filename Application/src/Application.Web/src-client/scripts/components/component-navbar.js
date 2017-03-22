// IMPORTS - REACT
import React from "react";
import ReactDOM from "react-dom";

export const Navbar = React.createClass({

  render: function(){
   return (
    <div className="nav-top columns-container">
      <div className="nav-top_menu-button">Menu Icon!</div>
        <div className="nav-top_right-buttons columns-container">
          <div className="right-buttons_sign-up">Sign Up</div>
          <div className="right-buttons_log-in">Log In</div>
        </div>
    </div>
   )
  }
})
