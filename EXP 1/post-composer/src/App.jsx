import { useState } from "react";
import "./App.css";

function App() {
  const [platform, setPlatform] = useState("Instagram");
  const [post, setPost] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [image, setImage] = useState(null);

  const limits = {
    Instagram: 2200,
    LinkedIn: 3000,
    Twitter: 280,
  };

  const characterLimit = limits[platform];

  const handleImage = (event) => {
    const file = event.target.files[0];

    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const validatePost = () => {
    if (post.trim() === "") {
      alert("Please write something in your post.");
      return;
    }

    if (post.length > characterLimit) {
      alert(
        `Your post is too long. ${platform} allows ${characterLimit} characters.`
      );
      return;
    }

    alert("Post is valid! ✅");
  };

  return (
    <div className="app">

      <div className="composer">

        <h1>Dynamic Post Composer</h1>

        <p className="subtitle">
          Create and validate posts for different platforms
        </p>

        {/* Platform Selection */}
        <h2>Select Platform</h2>

        <div className="platforms">

          <button
            className={platform === "Instagram" ? "active" : ""}
            onClick={() => setPlatform("Instagram")}
          >
            Instagram
          </button>

          <button
            className={platform === "LinkedIn" ? "active" : ""}
            onClick={() => setPlatform("LinkedIn")}
          >
            LinkedIn
          </button>

          <button
            className={platform === "Twitter" ? "active" : ""}
            onClick={() => setPlatform("Twitter")}
          >
            Twitter / X
          </button>

        </div>

        {/* Post Text */}
        <h2>Write Your Post</h2>

        <textarea
          placeholder="Write your post here..."
          value={post}
          onChange={(event) => setPost(event.target.value)}
        />

        <div className="counter">
          Characters: {post.length} / {characterLimit}
        </div>

        {/* Image Upload */}
        <h2>Upload Image</h2>

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
        />

        {/* Hashtags */}
        <h2>Hashtags</h2>

        <input
          type="text"
          placeholder="#AI #MachineLearning #Technology"
          value={hashtags}
          onChange={(event) => setHashtags(event.target.value)}
        />

        {/* Preview */}
        <h2>Post Preview</h2>

        <div className="preview">

          <strong>{platform}</strong>

          <p>
            {post || "Your post will appear here..."}
          </p>

          <p className="hashtags">
            {hashtags}
          </p>

          {image && (
            <img
              src={image}
              alt="Uploaded preview"
              className="preview-image"
            />
          )}

        </div>

        {/* Buttons */}
        <div className="actions">

          <button
            className="validate"
            onClick={validatePost}
          >
            Validate Post
          </button>

          <button
  className="publish"
  onClick={() => {
    if (post.trim() === "") {
      alert("Please write something in your post.");
      return;
    }

    if (post.length > characterLimit) {
      alert(
        `Cannot publish! Your post has ${post.length} characters, but ${platform} allows only ${characterLimit}.`
      );
      return;
    }

    alert("Post published successfully! 🎉");
  }}
>
  Publish Post
</button>

        </div>

      </div>

    </div>
  );
}

export default App;