import { Link } from "react-router-dom";
import { noProfile } from "../assets";

const FriendsCard = ({ friends }) => {
  return (
    <div>
      <div className="w-full bg-primary shadow-sm rounded-lg px-6 py-5">
        <div className="flex items-center justify-between text-ascent-1 pb-2 border-b border-[#66666645]">
          <span>Friends</span>
          <span>{friends?.length}</span>
        </div>
        <div className="w-full flex flex-col gap-4 pt-4">
          {friends?.map((friend) => {
            return (
              <Link
                key={friend._id}
                to={`/profile/${friend?._id}`}
                className="w-full flex gap-4 items-center cursor-pointer"
              >
                <img
                  src={friend?.profileUrl || noProfile}
                  alt={`${friend?.firstName} ${friend?.lastName} avatar`}
                  className="w-10 h-10 object-cover rounded-full"
                />
                <div className="flex-1">
                  <p className="text-base font-medium text-ascent-1">
                    {friend?.firstName} {friend?.lastName}
                  </p>
                  <p className="text-sm text-ascent-2">
                    {friend?.profession || "Profession not set"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FriendsCard;
