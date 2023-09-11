import { useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  faSquareXTwitter,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { faCopy } from "@fortawesome/free-regular-svg-icons";

import { postActions } from "../../redux/slices/post";
import { Post } from "../../type/types";

type Props = {
  post: Post;
};

function ShareButtons({ post }: Props) {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const dispatch = useDispatch();

  const handleShareClick = () => {
    dispatch(postActions.setShowShareModal({ [post._id]: false }));
  };

  const shareToTwitter = (post: Post) => {
    const postURL = encodeURIComponent(window.location.href);
    const tweetText = encodeURIComponent(
      `Check out this project: ${post.postTitle}`
    );
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${postURL}&text=${tweetText}`;
    window.open(twitterShareUrl, "_blank");
  };

  const shareToFacebook = () => {
    const postURL = encodeURIComponent(window.location.href);
    const facebookText = encodeURIComponent(
      `Check out this project: ${post.postTitle}`
    );
    const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${postURL}&title=${facebookText}`;
    window.open(facebookShareURL, "_blank");
  };

  const shareViaEmail = () => {
    const postURL = window.location.href;
    const emailSubject = "Check out this project";
    const emailBody = `I found this interesting project: ${postURL}`;
    const emailLink = `mailto:?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = emailLink;
  };

  const copyPostLink = () => {
    const currentURL = window.location.href;
    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        setTooltipVisible(true);
        setTimeout(() => {
          setTooltipVisible(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Failed to copy link: ", error);
      });
  };

  return (
    <div className="relative inset-0 flex items-center justify-center">
      <div className="bg-white w-[368px] p-2 rounded shadow-lg absolute right-32 bottom-12">
        <button
          className="w-6 h-6 text-gray-600 absolute top-2 right-2 rounded-full"
          onClick={handleShareClick}
        >
          <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
        </button>
        <h3 className="text-lg font-semibold  mb-2">Share to...</h3>
        {isTooltipVisible && (
          <div className="absolute left-36 bottom-10 tooltip">Link Copied!</div>
        )}
        <div className="flex flex-row space-x-4">
          {/* twitter share button */}
          <div>
            <button className="text-black" onClick={() => shareToTwitter(post)}>
              <FontAwesomeIcon icon={faSquareXTwitter} /> Twitter
            </button>
          </div>
          {/* facebook share button */}
          <div>
            <button
              className="text-[#1877F2]"
              onClick={() => shareToFacebook()}
            >
              <FontAwesomeIcon icon={faFacebook} /> Facebook
            </button>
          </div>

          {/* email share button */}
          <div>
            <button className="text-[#D44638]" onClick={() => shareViaEmail()}>
              <FontAwesomeIcon icon={faEnvelope} /> Email
            </button>
          </div>
          <div>
            <button className="text-black" onClick={copyPostLink}>
              <FontAwesomeIcon icon={faCopy} /> Copy Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareButtons;
