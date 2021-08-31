import React from "react";
import './WelcomeScreen.css';

function WelcomeScreen(props) {
  return props.showWelcomeScreen ?
  (
    <div className="WelcomeScreen">
    <h1>Welcome to the Meet app</h1>
    <h4>This is an app developed while taking the <a href="https://careerfoundry.com/">Career Foundry</a> Full-Stack Developer Course</h4>
    <h4>It is a React based app built via test-driven development.  The only calendar accessed is one created for the Career Foundry curiculum.  No user calendars are accessed.</h4>
    <div>
    <img
            class="react-icon"
            src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            alt="React logo"
          />
    </div>
    
    <h4>Log in to see upcoming events around the world for full-stack developers</h4>
    <div className="button_cont" align="center">
      <div class="google-btn">
        <div class="google-icon-wrapper">
          <img
            class="google-icon"
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google sign-in"
          />
        </div>
        <button onClick={() => { props.getAccessToken() }}
          rel="nofollow noopener"
          class="btn-text"
        >
          <b>Sign in with google</b>
        </button>
      </div>
    </div>
    <a
    href="https://rosswyman.github.io/meet/privacy.html"
    rel="nofollow noopener"
    >
    Privacy policy
    </a>
    </div>
  )
  : null
}
export default WelcomeScreen;
