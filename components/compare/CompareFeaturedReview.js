import { useState } from "react";
import ColorMatch from "../common/ColorMatch";

export default function CompareFeatureReview(props) {
  const [highlightedReview, setHighlightedReview] = useState(props.review);
  function setOtherReview() {
    if (highlightedReview === props.review) {
      setHighlightedReview(props.reviewAlternative);
    } else {
      setHighlightedReview(props.review);
    }
  }

  function hasAlternativeOpinions() {
    return !(props.review.cite === props.reviewAlternative.cite);
  }

  return (
    <div className="flex flex-col justify-center w-full my-5">
      <dt className="text-xs font-medium text-gray-500">{props.productName}</dt>
      <span className="flex  justify-center flex-grow mt-1 text-sm text-gray-900 italic">
        "{highlightedReview.cite}"
      </span>
      <div className="flex justify-around font-medium text-xs text-gray-900 mt-1">
        {highlightedReview.review.author ? highlightedReview.review.author : "Expert"} -{" "}
        {highlightedReview.review.source}
      </div>
      <div className="flex justify-around font-medium text-gray-900 mt-2">
        <div
          className={
            "px-2.5 text-xs flex justify-around py-1 rounded-full " +
            ColorMatch(highlightedReview.sentiment["positive"])
          }
        >
          {Math.round(highlightedReview.sentiment["positive"] * 100) / 10}
        </div>
      </div>
      {hasAlternativeOpinions() ? (
        <div
          className="flex justify-around hover:underline text-xs text-gray-900 mt-2 mb-1 cursor-pointer"
          onClick={() => setOtherReview()}
        >
          another opinion
        </div>
      ) : (
        <div className="flex justify-around text-xs text-gray-900 mt-2 mb-1">no other opinions</div>
      )}
    </div>
  );
}
