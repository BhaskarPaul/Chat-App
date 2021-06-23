import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../Firebase";
import { useAuth } from "../Context/AuthContext";
import { chatEngineProjectId, chatEnginePrivateKey } from "../config";
import axios from "axios";

const Chats = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  // console.log(user);

  const getUserImage = async (url) => {
    const response = await fetch(url);
    // binary format of bulk storage like image etc...
    const data = await response.blob();

    return new File([data], "userImage.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!user) {
      history.push("/");
      return;
    }
    axios
      .get("https://api.chatengine.io/users/me", {
        "project-id": chatEngineProjectId,
        "user-name": user.email,
        "user-secret": user.uid,
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formData = new FormData();
        formData.append("email", user.email);
        formData.append("username", user.email);
        formData.append("secret", user.uid);

        getUserImage(user.photoURL)
          .then((avatar) => {
            formData.append("avatar", avatar, avatar.name);
            axios
              .post("https://api.chatengine.io/users", formData, {
                headers: { "private-key": chatEnginePrivateKey },
              })
              .then(() => setLoading(false))
              .catch((error) => console.error(error));
          })
          .catch((error) => console.error(error));
      });
  }, [user, history]);

  const handleLogout = async () => {
    await auth.signOut();
    history.push("/");
  };

  if (!user || loading) return "Loading ... ";

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">UniChat</div>
        <div onClick={handleLogout} className="logout-tab">
          LogOut
        </div>
      </div>
      <ChatEngine
        height="calc(100vh - 66px)"
        projectID={chatEngineProjectId}
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
