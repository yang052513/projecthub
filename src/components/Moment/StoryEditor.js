import React from 'react'

export default function StoryEditor() {
  return (
    <div className="moment-editor-container">
      <div className="moment-editor-textarea">
        <img src="images/user.jpg" width="50px" height="50px" />
        <textarea placeholder="What's happening?"></textarea>
      </div>

      <div className="moment-editor-social">
        <button>Post</button>
        <input type="file" id="image-input" />
        <label id="upload-image-tweet" for="image-input">
          <i className="far fa-image"></i>
        </label>

        <i className="far fa-laugh"></i>
      </div>
    </div>
  )
}
