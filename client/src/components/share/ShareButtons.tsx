import { useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faCopy, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  faSquareXTwitter,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

import { postActions } from "../../redux/slices/post";
import { postDetailActions } from "../../redux/slices/postDetail";
import { Post } from "../../type/types";

type Props = {
  post: Post;
};

function ShareButtons({ post }: Props) {
  const [isSuccessTooltipVisible, setSuccessTooltipVisible] = useState(false);
  const [isErrorTooltipVisible, setErrorTooltipVisible] = useState(false);

  const dispatch = useDispatch();

  const handleShareClick = () => {
    dispatch(postActions.setShowShareModal({ postId: post._id, show: false }));
    dispatch(
      postDetailActions.setShowShareModal({ postId: post._id, show: false })
    );
  };

  const shareToTwitter = (post: Post) => {
    const postId = post._id;
    const postLink = `${window.location.origin}/posts/${postId}`;
    const tweetText = encodeURIComponent(
      `Check out this project on CollabDev: ${post.title} ${postLink}`
    );
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${postLink}&text=${tweetText}`;
    window.open(twitterShareUrl, "_blank");
  };

  const shareToFacebook = () => {
    const postId = post._id;
    const postLink = `${window.location.origin}/posts/${postId}`;
    const facebookText = encodeURIComponent(
      `Check out this project on CollabDev: ${post.title}`
    );
    const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${postLink}&quote=${facebookText}`;
    window.open(facebookShareURL, "_blank");
  };

  const shareViaEmail = () => {
    const postId = post._id;
    const postLink = `${window.location.origin}/posts/${postId}`;
    const emailSubject = "Check out this project";
    const emailBody = `I found this interesting project on CollabDev: ${postLink}`;
    const emailLink = `mailto:?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = emailLink;
  };

  const copyPostLink = () => {
    const postId = post._id;
    const postLink = `${window.location.origin}/posts/${postId}`;
    navigator.clipboard
      .writeText(postLink)
      .then(() => {
        setSuccessTooltipVisible(true);
        setTimeout(() => {
          setSuccessTooltipVisible(false);
          dispatch(
            postActions.setShowShareModal({ postId: post._id, show: false })
          );
        }, 1000);
      })
      .catch((error) => {
        console.error("Failed to copy link: ", error);

        setErrorTooltipVisible(true);
        setTimeout(() => {
          setErrorTooltipVisible(false);
        }, 1000);
      });
  };

  return (
    <div className="relative inset-0 flex items-center justify-center bg-opacity-70 bg-gray-800">
      <div className="bg-white dark:bg-slate-700 w-60 p-4 rounded-lg shadow-lg absolute right-[22rem] bottom-12">
        <button
          className="absolute top-2 right-2 w-8 h-8 text-gray-600 rounded-full hover:text-gray-800 transition duration-300 ease-in-out"
          onClick={handleShareClick}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h3 className="text-lg text-black dark:text-white font-semibold mb-4">
          Share to...
        </h3>
        {isSuccessTooltipVisible && (
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-10 bg-gray-800 text-white py-1 px-2 rounded text-sm transition-opacity duration-300 ease-in-out">
            Link Copied!
          </div>
        )}
        {isErrorTooltipVisible && (
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-10 bg-gray-800 text-red-500 py-1 px-2 rounded text-sm transition-opacity duration-300 ease-in-out">
            Failed to copy link!
          </div>
        )}
        <div className="flex flex-col space-y-3">
          <button
            className="flex items-center space-x-2 text-black hover:text-gray-700 dark:hover:text-gray-900 transition-colors duration-300 ease-in-out"
            onClick={() => shareToTwitter(post)}
          >
            <FontAwesomeIcon icon={faSquareXTwitter} />
            <span>Twitter</span>
          </button>
          <button
            className="flex items-center space-x-2 text-[#1877F2] hover:text-[#0A5DAD] transition-colors duration-300 ease-in-out"
            onClick={() => shareToFacebook()}
          >
            <FontAwesomeIcon icon={faFacebook} />
            <span>Facebook</span>
          </button>
          <button
            className="flex items-center space-x-2 text-red-600 hover:text-red-800 transition-colors duration-300 ease-in-out"
            onClick={() => shareViaEmail()}
          >
            <FontAwesomeIcon icon={faEnvelope} />
            <span>Email</span>
          </button>
          <button
            className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-800 transition-colors duration-300 ease-in-out"
            onClick={() => copyPostLink()}
          >
            <FontAwesomeIcon icon={faCopy} />
            <span>Copy Link</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShareButtons;
