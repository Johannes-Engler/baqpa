export default function Logo() {
  return (
    <div className="flex flex-nowrap items-center">
      <img className="h-6 w-auto" src="/baqpa-logo.svg" alt="logo" />
      <p className="text-sm px-2">by</p>
      <a href="https://reviewr.ai" target="_blank">
        <img className="h-4 w-auto -mt-1" src="/reviewr-logo.svg" alt="logo" />
      </a>
    </div>
  );
}
