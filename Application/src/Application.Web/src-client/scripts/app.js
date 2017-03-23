// IMPORTS - BACKBONE
import Backbone from "backbone";

// IMPORTS - REACT
import ReactDOM from "react-dom";
import React from "react";

// IMPORTS - VIEW CONTROLLER
import {ViewController} from "./viewController.js";

// STYLES COMPILING FIX
if(window.location.hostname === 'localhost'){
    let headEl = document.querySelector('head')
    let linkEl = document.querySelector('link[href="./css/styles.css"]')
    headEl.removeChild(linkEl)
};

ReactDOM.render(<ViewController/>, document.querySelector("#app-container"));
