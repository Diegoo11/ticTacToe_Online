export default function EndGame({ winner }) {
  return (
    <div className="
    animate-jump animate-twice animate-duration-[400ms] animate-delay-0 animate-ease-in-out animate-normal
    animate-fill-forwards w-[310px] text-4xl md:text-8xl md:w-[690px] right-0 left-0 absolute top-96 bottom-96 m-auto
    bg-[#161e2b] rounded-lg p-4 text-gray-300
      flex justify-center items-center min-h-fit"
    >
      <div className="p-4 flex justify-center items-center border-gray-300 border-solid border-4 rounded-lg">
        <span className="">
          Gano Player
          {' '}
          {winner}
          !
        </span>
      </div>
    </div>
  );
}
