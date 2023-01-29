import React, { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { useNavigate } from "react-router-dom";

export const CreatePost = ({ isAuth, categories }) => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [postCategory, setPostCategory] = useState("");

  let navigate = useNavigate();
  const postCollectionRef = collection(db, "posts");
  const createPost = async () => {
    await addDoc(postCollectionRef, {
      title: title,
      postText: postText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
      postCategory: postCategory,
    });
    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create a Post</h1>
        <div className="inputGp">
          <label>Title:</label>
          <input
            placeholder="Title..."
            onChange={(event) => setTitle(event.target.value)}
          ></input>
        </div>
        <div className="inputGp">
          <label>Post:</label>
          <textarea
            placeholder="Post..."
            onChange={(event) => setPostText(event.target.value)}
          ></textarea>
        </div>
        <div className="inputGp">
          <label>Category:</label>
          <select onChange={(event) => setPostCategory(event.target.value)}>
            <option value="">Select Category...</option>
            {categories.map((categ) => {
              return (
                <option key={categ} value={categ}>
                  {categ}
                </option>
              );
            })}
          </select>
        </div>
        <button onClick={createPost}>Submit Post</button>
      </div>
    </div>
  );
};
