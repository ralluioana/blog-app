import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase-config";
import { Categories } from "./Categories";
import { Search } from "./Search";

export const Home = ({ isAuth, categories }) => {
  const [searchInput, setSearchInput] = useState("");
  const [postList, setPostList] = useState([]);
  const [postListByCategory, setPostListByCategory] = useState([]);
  const postCollectionRef = collection(db, "posts");
  const getPosts = async () => {
    const data = await getDocs(postCollectionRef);
    setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setPostListByCategory(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
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

  const handleSelectCategory = (categ) => {
    console.log("Selected categ" + categ);
    console.log("posts", postList);
    setPostListByCategory(
      postList.filter((post) => post.postCategory === categ)
    );
    console.log("posts by category", postListByCategory);
    setSearchInput("");
  };
  const handleShowAll = () => {
    setPostListByCategory(postList);
    setSearchInput("");
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    if (e.target.value.length === 0) {
      setPostListByCategory(postList);
    }
    if (e.target.value.length > 2) {
      setPostListByCategory(
        postList.filter(
          (post) =>
            post.title.includes(searchInput) ||
            post.postText.includes(searchInput)
        )
      );
    }
  };
  return (
    <div className="homePageContainer">
      <Categories
        categories={categories}
        handleSelectCategory={handleSelectCategory}
        handleShowAll={handleShowAll}
      />
      <div className="homePage">
        <Search handleSearch={handleSearch} searchInput={searchInput} />
        {postListByCategory.length === 0 && <h3>There are no posts .</h3>}
        {postListByCategory.map((post) => {
          return (
            <div key={post.id} className="post">
              <div className="postHeader">
                <div className="title">
                  <h1> {post.title}</h1>
                </div>
                <div className="deletePost">
                  {isAuth && post.author.id === auth.currentUser.uid && (
                    <button
                      onClick={() => {
                        deletePost(post.id);
                      }}
                    >
                      <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                  )}
                </div>
              </div>
              <div className="postTextContainer">{post.postText}</div>
              <h3>@{post.author.name}</h3>
              {post.postCategory && <h4>~{post.postCategory}~</h4>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
