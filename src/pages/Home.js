import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase-config";

export const Home = ({isAuth}) => {
  const [postList, setPostList] = useState([]);
  const postCollectionRef = collection(db, "posts");
  const getPosts = async () => {
    const data = await getDocs(postCollectionRef);
    setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    getPosts();
  }, []);

  const deletePost = async (docID) => {
    const postDoc = doc(db, "posts", docID);
    await deleteDoc(postDoc);
    getPosts();
  };
  return (
    <div className="homePage">
      {postList.map((post) => {
        return (
          <div key={post.id} className="post">
            <div className="postHeader">
              <div className="title">
                <h1> {post.title}</h1>
              </div>
              <div className="deletePost">
               { (isAuth&&post.author.id===auth.currentUser.uid)&& <button
                  onClick={() => {
                    deletePost(post.id);
                  }}
                >
                 <i class="fa fa-trash" aria-hidden="true"></i>
                </button>}
              </div>
            </div>
            <div className="postTextContainer">{post.postText}</div>
            <h3>@{post.author.name}</h3>
          </div>
        );
      })}
    </div>
  );
};