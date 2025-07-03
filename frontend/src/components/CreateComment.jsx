import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function CreateComment({ snippetId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:5002/api/v1/snippet/${snippetId}/comment`,
        { text }
      );
      console.log(res.data);
      setComments((prevComments) => [...prevComments, res.data.comment]);
      setText("");
    } catch (error) {
      console.log("error in adding comment", error);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5002/api/v1/snippet/${snippetId}/comment`
        );
        console.log("Fetched comments:", res.data);
        setComments(res.data);
      } catch (error) {
        console.log("error occured while fetching the comments", error);
      }
    };
    fetchComments();
  }, []);
  return (
    <>
      <div className=" mt-3 mb-3">
        {comments.map((comment, index) => {
          return (
            <div key={index}>
              <li className="px-3">{comment.text}</li>
            </div>
          );
        })}
        <form onSubmit={addComment} className="">
          <input
            className="m-2 px-2 py-1 border-2 rounded border-gray-300"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add comment.."
          />
          <button className="bg-gray-200 border-2 border-gray-300 px-2 py-1 rounded text-black cursor-pointer">
            Add
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateComment;
