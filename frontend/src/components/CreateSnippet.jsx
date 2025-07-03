import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import CreateComment from "./CreateComment";

function CreateSnippet() {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [snippets, setSnippets] = useState({});

  const CreateSnippet = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/api/v1/snippet", {
        title,
        code,
      });
      alert(res.data.message);
      setTitle("");
      setCode("");
      console.log(res.data);
    } catch (error) {
      console.log("error occured", error);
    }
  };

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/v1/snippet");
        // console.log(res.data);
        setSnippets(res.data);
      } catch (error) {
        console.log("error while fetching snippet", error);
      }
    };
    fetchSnippets();
  }, [snippets]);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-20">
      <form
        onSubmit={CreateSnippet}
        className="bg-white shadow-md rounded-lg p-6 space-y-4 max-w-2xl mx-auto"
      >
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          Add New Snippet
        </h2>
        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter snippet title..."
        />
        <textarea
          className="w-full border border-gray-300 rounded-lg px-4 py-2 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Write your code snippet here..."
        />
        <button
          type="submit"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg transition-all"
        >
          Create Snippet
        </button>
      </form>

      {/* Snippet Cards */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(snippets).map((snippet) => (
          <div
            key={snippet.id}
            className="bg-white shadow-sm border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {snippet.title}
            </h3>
            <pre className="bg-gray-100 text-sm text-gray-700 font-mono p-3 rounded-md overflow-x-auto whitespace-pre-wrap">
              {snippet.code}
            </pre>
            <div className="mt-4">
              <div className="flex items-center gap-2 text-indigo-600 font-medium text-sm mb-2">
                Add a Comment
              </div>
              <CreateComment snippetId={snippet.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateSnippet;
