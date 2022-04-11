import "./App.css";

import { useEffect, useState } from "react";
import axios from "axios";
import Popup from "./component/Popup";

import userprofile from "./images/userprofile.svg";

function App() {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({ text: "", img: "" });
  const [searchRes, setSearchRes] = useState([]);
  const [search, setSearch] = useState("");
  const [timer, setTimer] = useState();

  const [isPopupActive, setIsPopupActive] = useState(false);

  const postCondition = post.text !== "" && post.img !== "";

  useEffect(() => {
    console.log("I am cleaning up  1");
    setPost({ text: "", img: "" });
  }, [posts.length]);

  useEffect(() => {
    console.log("I am cleaning up  2");
    setIsPopupActive(false);
  }, [post.img]);

  useEffect(() => {
    console.log("I am cleaning up  3");
    if (!isPopupActive) {
      setSearch("");
    }
  }, [isPopupActive]);

  useEffect(() => {
    console.log("I am cleaning up  4");
    if (!isPopupActive) {
      setSearchRes([]);
    }
  }, [isPopupActive]);

  function selectedImgHandler(url) {
    setPost({ ...post, img: url });
  }

  function searchSetter(event) {
    //console.log(event)
    setSearch(event.target.value);
  }

  function searchApiHandler(defaultSearchStr) {
    axios
      .get(
        "https://api.giphy.com/v1/gifs/search?api_key=KrndyPpwVwBB0T8DoPKCwa3U6uk1WjJ4&q=" +
          (search || defaultSearchStr) +
          "&limit=25&offset=0&rating=g&lang=en"
      )
      .then((result) => {
        console.log(result.data.data);
        setSearchRes(result.data.data);
      })
      .catch((err) => console.log(err));
  }

  function keyDownHandler() {
    if (timer) {
      clearTimeout(timer);
    }

    let timeout = setTimeout(() => {
      searchApiHandler();
    }, 2000);
    setTimer(timeout);
    console.log(timeout);
  }
  function submitHandler(event) {
    event.preventDefault();
    console.log("I am running" + post);
    postCondition && setPosts([...posts, { text: post.text, img: post.img }]);
  }

  function textHandler(event) {
    //console.log(event.target.value)
    setPost({ ...post, text: event.target.value });
  }

  function popupHandler() {
    setIsPopupActive(true);
  }

  return (
    <div className=" bg-gray-200 w-screen min-h-screen max-h-max">
     
     <div className="flex flex-col md:justify-items-center">
     <div className="flex flex-col">
        <form
          onSubmit={submitHandler.bind(this)}
          className="m-2 p-2 flex flex-col justify-evenly bg-white"
        >
          <div className="flex">
            <img src={userprofile} className="w-7 h-7 opacity-70" />
            <textarea
              type="text"
              value={post.text}
              onChange={textHandler.bind(this)}
              className="w-3/4 border-0 text-xl ml-2 focus:outline-none overflow-y-auto overflow-x-hidden resize-none"
              placeholder="Write something here..."
            />
          </div>
          {post.img !== "" && (
            <img
              src={post.img}
              className="mt-4 border-2 w-80 h-80"
              alt="Gif could not loaded"
            />
          )}
          <div className="relative mt-2">
            <div
              className="p-1 w-32 h-7 bg-gray-100 text-black rounded-xl text-left cursor-pointer hover:bg-gray-300"
              onClick={popupHandler.bind(this)}
            >
              Gifs
            </div>
            {isPopupActive && (
              <Popup
                keyDownHandler={keyDownHandler}
                searchSetter={searchSetter}
                search={search}
                searchRes={searchRes}
                selectedImgHandler={selectedImgHandler}
                searchApiHandler={searchApiHandler}
              ></Popup>
            )}
          </div>
          <button
            className={
              !postCondition
                ? "w-16 h-7 bg-blue-900 text-white rounded-md self-end disabled:opacity-50  cursor-not-allowed"
                : "w-16 h-7 bg-blue-800 text-white rounded-md self-end "
            }
            type="submit"
            disabled={!postCondition}
          >
            post
          </button>
        </form>
        <div className="flex flex-col border shadow-sm ">
          {posts.length > 0 &&
            posts.map((eachpost, i) => {
              return (
                <div
                  className="mx-2 my-1 p-2 text-md border bg-white"
                  key={eachpost.text + i + new Date().getUTCMilliseconds()}
                >
                  <p>{eachpost.text}</p>
                  <img
                    src={eachpost.img}
                    className="mt-2 w-full"
                    alt="Gifs could not loaded"
                  />
                </div>
              );
            })}
        </div>
      </div>
      {isPopupActive && (
        <div
          className="fixed top-0 w-screen h-screen bg-gray-800 z-10 opacity-30"
          onClick={() => setIsPopupActive(false)}
        ></div>
      )}
     </div>
    </div>
  );
}

export default App;
