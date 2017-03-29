// IMPORTS - REACT
import React from "react";
import ReactDOM from "react-dom";

export const WelcomeComponent = React.createClass({

	render: function(){
		return (
			<div className="component-welcome">
	      <div className="welcome-promo-blurb">
	        <div className="welcome-promo-blurb_block">
	          <h3><span>Make</span> a to-do list &middot; <span>Share</span> it with those who need it</h3>
						<div className="welcome-rows-article">
						<div className="welcome-row welcome-col1 columns-container">
							<div className="box1"><h4>Great for sharing household shopping lists, tracking individual accomplishments, and planning group events</h4></div>
							<div className="box2"><h4>Receive real-time updates that display when a task is completed and by whom</h4></div>
						</div>
						<div className="welcome-row welcome-col2 columns-container">
							<div className="box3"><h4>View and edit your lists on mobile, tablet, and desktop devices for your convenience</h4>
								<i className="icon-mobile" aria-hidden="true"></i><i className="icon-tablet" aria-hidden="true"></i><i className="icon-desktop" aria-hidden="true"></i>
							</div>
							<div className="box4"><h4>Mark your tasks as important or add due dates for additional organization</h4></div>
						</div>
					</div>
	        </div>
	      </div>
			</div>
		)
	}
})
