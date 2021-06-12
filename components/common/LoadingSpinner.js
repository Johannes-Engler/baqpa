function LoadingSpinner(props) {
  return (
    <div className={props.className}>
      <div className="flex justify-center items-center font-bold">
        Loading
        <div className="ml-2 animate-spin">
          <img className="h-8 w-auto" src="/baqpa-icon.png" alt="spinner" />
        </div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
