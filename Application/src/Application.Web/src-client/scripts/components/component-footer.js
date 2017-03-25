// IMPORTS - REACT
import React from "react";

// REACT COMPONENT - FOOTER
export const FooterComponent = React.createClass({
  render: function(){
    let currDate = new Date;
    return (
      <div className="page-footer">
        <div className="page-footer_legal">
          <p>&#9400; {currDate.getFullYear()} - Created by Ian Bolling, Avery Effa and Jeff Weinreich.</p>
          <p>All rights reserved.</p>
        </div>
      </div>
    )
  }
})
