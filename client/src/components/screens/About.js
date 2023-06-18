import React from "react";
import "../../Css/about.scss";
const About = () => {
  return (
    <>
      <div className="parent-c">      
        <div class="container-2">
          <div class="boxes-2">
            <img
              class="icon"
              src="https://www.linsero.com/assets/images/Rectangle%20623.png"
              alt="logo"
            />
            <h5>Vision</h5>
            <p>
              Our vision is to inspire people to explore the world,
              <br />
              connect with different cultures.
            </p>
          </div>
          <div class="boxes-2">
            <img
              class="icon"
              src="https://www.linsero.com/assets/images/Rectangle%20625.png"
              alt="logo"
            />
            <h5>Mission</h5>
            <p>
              Our website will be a hub for travel enthusiasts to share their
              stories,
              <br />
              connect with other travelers
            </p>
          </div>{" "}
          <br />
          <br />
          <br />
          <div class="boxes-2">
            <img
              class="icon"
              src="https://th.bing.com/th/id/R.068867772dcd59b4def6fbb01588b997?rik=JNdU0XCV0BNmZA&pid=ImgRaw&r=0"
              alt="logo"
            />
            <h5>Goal</h5>
            <p>
              Our goal is to help people discover the beauty and diversity of
              our world
              <br />
              and to inspire them to become responsible and conscious travelers,
              <br />
              who respect and care for our planet and its inhabitants.
            </p>
          </div>
          <div class="boxes-2">
            <img
              class="icon"
              src="https://www.linsero.com/assets/walk_through_img/about%201.png"
              alt="logo"
            />
            <h5>Strategic Statement</h5>
            <span>
              To promote sustainable travel practices by providing information
              <br />
              on eco-friendly accommodations ,transportation, and activities.
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
