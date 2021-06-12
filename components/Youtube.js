import { useState } from "react";
import YoutubeModal from "../components/YoutubeModal";

export default function Youtube({ youtubeReviews }) {
  const [showYoutubeModal, setShowYoutubeModal] = useState(false);
  const [videoId, setVideoId] = useState(null);

  function openYoutubeModal() {
    setShowYoutubeModal(true);
  }

  const closeYoutubeModal = () => {
    setShowYoutubeModal(false);
  };

  return (
    <div className="mt-4 bg-white shadow overflow-hidden rounded-lg">
      <div className="p-4">
        <dl className="grid gap-4 grid-cols-1 sm:grid-cols-3 divide divide-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900 col-span-1 sm:col-span-3">Video Reviews</h3>
          {youtubeReviews.map((x) => {
            return (
              <div key={x.videoId} className="col-span-1">
                <img
                  className="rounded-lg border border-gray-300 w-full"
                  src={`https://img.youtube.com/vi/${x.videoId}/mqdefault.jpg`}
                  onClick={() => {
                    openYoutubeModal();
                    setVideoId(x.videoId);
                  }}
                />
              </div>
            );
          })}
          <YoutubeModal show={showYoutubeModal} videoId={videoId} onClose={closeYoutubeModal} />
        </dl>
      </div>
    </div>
  );
}
