import Triangle from './Triangle';

export default function UserProfile({ src, username, turn }) {
  return (
    <div className=" flex flex-col justify-center items-center my-10">
      {turn ? <Triangle /> : <Triangle invisible />}
      <div className="bg-[#313131] rounded-md p-4 w-24 sm:w-40 lg:w-60">
        <img src={src} alt="profile" />
      </div>
      <span className="text-gray-300 font-semibold text-lg text-center w-full flex justify-center">
        {username}
      </span>
    </div>
  );
}
