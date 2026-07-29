import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { fetchPosts, selectAllPosts, postAdded } from './features/posts/postsSlice';
import { selectAllPlatforms } from './features/platforms/platformsSlice';
import { updateDraft, clearDraft, selectDraft } from './features/drafts/draftsSlice';
import './App.css';

function App() {
  const dispatch = useDispatch();
  
  // Selectors
  const posts = useSelector(selectAllPosts);
  const platforms = useSelector(selectAllPlatforms);
  const postStatus = useSelector((state) => state.posts.status);
  const draft = useSelector(selectDraft);

  // Fetch initial posts
  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  // Handle form input changes
  const onDraftChange = (e) => {
    dispatch(updateDraft({ [e.target.name]: e.target.value }));
  };

  // Handle saving the post
  const onSavePostClicked = (e) => {
    e.preventDefault();
    if (draft.title && draft.content && draft.platformId) {
      dispatch(
        postAdded({
          id: nanoid(), // Generate a unique ID
          title: draft.title,
          content: draft.content,
          platformId: draft.platformId,
        })
      );
      dispatch(clearDraft()); // Reset the form after submitting
    }
  };

  const getBadgeClass = (platformName) => {
    if (platformName === 'LinkedIn') return 'platform-linkedin';
    if (platformName === 'Twitter') return 'platform-twitter';
    if (platformName === 'Facebook') return 'platform-facebook';
    if (platformName === 'Instagram') return 'platform-instagram';
    return 'platform-default';
  };

  const canSave = Boolean(draft.title) && Boolean(draft.content) && Boolean(draft.platformId);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2 className="dashboard-title">Social Media Dashboard</h2>
        <p className="dashboard-subtitle">Manage your content across platforms (Powered by Redux Toolkit)</p>
      </header>
      
      <main>
        {/* CREATE POST FORM */}
        <form className="post-form" onSubmit={onSavePostClicked}>
          <h3>Create a New Post</h3>
          
          <div className="form-group">
            <label htmlFor="postTitle">Post Title</label>
            <input
              type="text"
              id="postTitle"
              name="title"
              className="form-control"
              value={draft.title || ''}
              onChange={onDraftChange}
              placeholder="What's your post about?"
            />
          </div>

          <div className="form-group">
            <label htmlFor="postPlatform">Platform</label>
            <select
              id="postPlatform"
              name="platformId"
              className="form-control"
              value={draft.platformId || ''}
              onChange={onDraftChange}
            >
              <option value="">Select a platform...</option>
              {platforms.map((platform) => (
                <option key={platform.id} value={platform.id}>
                  {platform.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="postContent">Content</label>
            <textarea
              id="postContent"
              name="content"
              className="form-control"
              value={draft.content || ''}
              onChange={onDraftChange}
              rows="3"
              placeholder="Write your content here..."
            />
          </div>

          <button type="submit" className="btn-submit" disabled={!canSave}>
            Publish Post
          </button>
        </form>

        {/* POSTS FEED */}
        {postStatus === 'loading' && (
          <div className="loading-state">
            <p>Loading your posts...</p>
          </div>
        )}
        
        {postStatus === 'succeeded' && (
          <div className="posts-grid">
            {posts.map((post) => {
              const platform = platforms.find((p) => p.id === post.platformId);
              const platformName = platform ? platform.name : 'Unknown';
              
              return (
                <article key={post.id} className="post-card">
                  <h4 className="post-title">{post.title}</h4>
                  <p className="post-content">{post.content}</p>
                  
                  <div className="post-footer">
                    <span className={`platform-badge ${getBadgeClass(platformName)}`}>
                      {platformName}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {postStatus === 'failed' && (
          <div className="loading-state" style={{ color: '#dc2626' }}>
            <p>Failed to load posts. Please refresh.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;