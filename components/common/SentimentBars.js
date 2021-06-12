function SentimentBars(props) {
  function getRoundedPercentValue(value, factor = 1) {
    return Math.round(value * factor * 100) + "%";
  }

  function getBarStyle(value) {
    return {
      width: getRoundedPercentValue(value, 2),
      height: "100%",
    };
  }

  return (
    <div className={props.className}>
      <div className="grid grid-cols-2 gap-2 pr-4 text-sm">
        <div className="font-bold overflow-visible text-green-800">
          <div className="bg-green-100 pl-2" style={getBarStyle(props.sentiment.positive)}>
            Positive
          </div>
        </div>
        <div className="inline-flex items-center text-s font-medium mr-2 text-green-800">
          {getRoundedPercentValue(props.sentiment.positive)}
        </div>
        <div className="bg-blue-100 pl-2 text-purple-800" style={getBarStyle(props.sentiment.neutral)}>
          <div className="font-bold">Neutral</div>
        </div>
        <div className="inline-flex items-center text-s font-medium mr-2 text-purple-800">
          {getRoundedPercentValue(props.sentiment.neutral)}
        </div>
        <div className="bg-red-100 pl-2 text-red-800" style={getBarStyle(props.sentiment.negative)}>
          <div className="font-bold">Negative</div>
        </div>
        <div className="inline-flex items-center text-s font-medium mr-2 text-red-800">
          {getRoundedPercentValue(props.sentiment.negative)}
        </div>
      </div>
    </div>
  );
}

export default SentimentBars;
