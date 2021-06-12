import { useState } from "react";
import ColorMatch from "./common/ColorMatch";

export default function Review(props) {
  const [expanded, setExpanded] = useState(false);

  const isTextLong = (text) => {
    return text.length > 500;
  };

  const getShortenedText = (comment, forceExpand) => {
    if (isTextLong(comment) && !expanded && !forceExpand) {
      return comment.substring(0, 500);
    } else {
      return comment;
    }
  };

  function getExpertOrConsumerText(userType) {
    let smileyStyle = { marginLeft: ".25em", fontSize: 16 };

    if (userType === "EXPERT") {
      return (
        <span className="inline-flex min-h-full items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100  text-gray-800">
          expert
          {/* <p style={smileyStyle}>&#129299;</p> */}
        </span>
      );
    } else {
      return (
        <span className="inline-flex min-h-full items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100  text-gray-800">
          consumer
          {/* <p style={smileyStyle}>&#128512;</p> */}
        </span>
      );
    }
  }

  // function getTopSentiment(review) {
  //   if (review.sentiment) {
  //     const top = review.sentiment.sort((a, b) => {
  //       return b.score - a.score;
  //     });

  //     if (top[0].sentiment === "positive") {
  //       return (
  //         <span className="inline-flex min-h-full items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
  //           Positive
  //         </span>
  //       );
  //     }
  //     if (top[0].sentiment === "negative") {
  //       return (
  //         <span className="inline-flex min-h-full items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
  //           Negative
  //         </span>
  //       );
  //     }
  //     if (top[0].sentiment === "neutral") {
  //       return (
  //         <span className="inline-flex min-h-full items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
  //           Neutral
  //         </span>
  //       );
  //     }
  //   }
  // }

  function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value.replace(/�/g, " ");
  }

  const filteredText = decodeHtml(
    props.review.classesInfo
      ? props.review.classesInfo.filter((x) => x.label.includes(props.keywordFilter)).map((x) => x.text)[0]
      : ""
  );
  const showAlwaysExpanded =
    props.review.classesInfo &&
    props.review.classesInfo.filter((x) => x.label.includes(props.keywordFilter)).length > 0;
  // force expand reviews with highlighted topics to prevent strange clipping and merging of texts
  const text = getShortenedText(" " + decodeHtml(props.review.comment), showAlwaysExpanded).split(filteredText);
  return (
    <div>
      <div>
        {props.review.title && <h3 className="font-bold">{decodeHtml(props.review.title)}</h3>}
        {filteredText !== "undefined" ? (
          <p className="text-gray-500">
            ...{text[0].slice(text[0].length - 200)}{" "}
            <span className="text-black font-medium bg-yellow-100">{filteredText}</span>
            {text[1].slice(0, 200)}...
          </p>
        ) : (
          <p>{text[0]}</p>
        )}
        {isTextLong(props.review.comment) && !expanded && !showAlwaysExpanded && (
          <button className="flex justify-center items-center mt-2" onClick={() => setExpanded(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
              />
            </svg>
            <span className="pl-1">Read more</span>
          </button>
        )}
      </div>
      <div className="-m-2 pt-4 flex flex-wrap">
        <div className="m-2 inline-flex items-center min-h-full px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {props.review.source.replace("www.", "")}
        </div>
        <div className=" m-2">{getExpertOrConsumerText(props.review.type)}</div>
        {props.review.helpfulness && (
          <div
            className={
              "m-2 inline-flex min-h-full items-center px-2.5 py-0.5 rounded-full text-xs font-medium " +
              ColorMatch(props.review.helpfulness.helpful)
            }
          >
            {(Math.round(props.review.helpfulness.helpful * 100) / 10).toFixed(1)} helpful
          </div>
        )}
        <div
          className={
            "m-2 inline-flex min-h-full items-center px-2.5 py-0.5 rounded-full text-xs font-medium " +
            ColorMatch(props.review.sentiment[0].score)
          }
        >
          {(Math.round(props.review.sentiment[0].score * 100) / 10).toFixed(1)} overall
        </div>
        {props.review.classesInfo &&
          props.review.classesInfo.length > 0 &&
          props.review.classesInfo
            .filter((v, i, a) => a.findIndex((t) => t.label === v.label && t.value === v.value) === i)
            .map((value, index) => {
              return (
                <div
                  key={index}
                  className={`cursor-pointer m-2 inline-flex min-h-full items-center px-2.5 py-0.5 rounded-full text-xs ${ColorMatch(
                    value.sentiment.positive
                  )} 
                      ${value.label === props.keywordFilter ? " font-extrabold" : " font-medium"}`}
                  onClick={() => {
                    props.filterByKeyword(value.label);
                    props.executeScroll();
                  }}
                >
                  {(Math.round(value.sentiment.positive * 100) / 10).toFixed(1)} {value.label}
                </div>
              );
            })}
        {/* <div className=" m-2">{getTopSentiment(props.review)}</div> */}
        {/* {props.review.rating && props.review.rating > 0 && (
          <div className="flex items-center m-2">
            <span>{props.review.rating}</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#FCD34D" height={25}>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        )} */}
      </div>
    </div>
  );
}
