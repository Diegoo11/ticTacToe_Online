import error from './assets/error.svg';

export default function ErrorPageGame() {
  return (
    <div className="mb-8 w-40 md:w-60">
      <img
        className="bg-[#161e2b] rounded-md p-4"
        src={error}
        alt="error"
      />
      <span className="text-gray-300 font-semibold text-lg text-center flex items-center">
        Play code not found, please create a new gamee
      </span>
    </div>
  );
}
