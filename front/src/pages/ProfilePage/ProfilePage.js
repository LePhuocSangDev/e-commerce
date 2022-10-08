import React from "react";
import "./ProfilePage.scss";

const ProfilePage = () => {
  return (
    <div className="profile">
      <h4>Account Settings</h4>
      <div className="profile-container">
        <div className="profile-nav">
          <button>Orders</button>
          <button>Account settings</button>
          <button>Wish list</button>
        </div>

        <form action="" className="update-profile">
          <div>
            <label htmlFor="update-name">
              <p>
                <span>Email</span>
                <span>Required</span>
              </p>
              <input type="text" id="update-name" />
            </label>
            <label htmlFor="update-name">
              <p>
                <span>Email</span>
                <span>Required</span>
              </p>
              <input type="text" id="update-name" />
            </label>
          </div>
          <div>
            <label htmlFor="update-name">
              <p>
                <span>Email</span>
                <span>Required</span>
              </p>
              <input type="text" id="update-name" />
            </label>
            <label htmlFor="update-name">
              <p>
                <span>Email</span>
                <span>Required</span>
              </p>
              <input type="text" id="update-name" />
            </label>
          </div>
          <input type="submit" className="save-btn" value="Save" />
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
