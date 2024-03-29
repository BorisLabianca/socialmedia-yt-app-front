import { useSelector } from "react-redux";
import {
  CustomButton,
  EditProfile,
  FriendsCard,
  Loading,
  PostCard,
  ProfileCard,
  TextInput,
  TopBar,
} from "../components";
import { useState } from "react";
import { posts, requests, suggest } from "../assets/data";
import { Link } from "react-router-dom";
import { noProfile } from "../assets";
import { BsFiletypeGif, BsPersonFillAdd } from "react-icons/bs";
import { BiImages, BiSolidVideo } from "react-icons/bi";
import { useForm } from "react-hook-form";

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, edit } = useSelector((store) => store.user);
  const [friendRequest, setFriendRequest] = useState(requests);
  const [suggestedFriends, setSuggestedFriends] = useState(suggest);
  const [errorMessage, setErrorMessage] = useState("");
  const [file, setFile] = useState(null);
  const [posting, setPosting] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePostSubmit = async (data) => {};

  return (
    <>
      <div className="w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden">
        <TopBar />
        <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full">
          {/* LEFT */}
          <div className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto">
            <ProfileCard user={user} />
            <FriendsCard friends={user?.friends} />
          </div>
          {/* CENTER */}
          <div className="flex-1 h-full px-4 flex flex-col gap-6 overflow-y-auto rounded-lg">
            <form
              className="bg-primary px-4 rounded-lg"
              onSubmit={handleSubmit(handlePostSubmit)}
            >
              <div className="w-full flex items-center gap-2 py-4 border-b border-[#66666645]">
                <img
                  src={user?.profileUrl || noProfile}
                  alt={`${user?.firstName}' avatar`}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <TextInput
                  styles="w-full rounded-full py-5"
                  placeholder="What's on your mind..."
                  name="description"
                  register={register("description", {
                    required: "Write something in your post.",
                  })}
                  error={errors.description ? errors.description.message : ""}
                />
              </div>
              {errorMessage?.message && (
                <span
                  role="alert"
                  className={`text-sm ${
                    errorMessage?.status === "failed"
                      ? "text-[#f64949fe]"
                      : "text-[#2ba150fe]"
                  } mt-0.5`}
                ></span>
              )}
              <div className="flex items-center justify-between py-4">
                <label
                  htmlFor="imgUpload"
                  className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                >
                  <input
                    type="file"
                    className="hidden"
                    id="imgUpload"
                    data-max-size="5120"
                    accept=".jpg, .png, .jpeg"
                    onChange={(event) => setFile(event.target.files[0])}
                  />
                  <BiImages />
                  <span>Image</span>
                </label>
                <label
                  htmlFor="videoUpload"
                  className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                >
                  <input
                    type="file"
                    className="hidden"
                    id="videoUpload"
                    data-max-size="5120"
                    accept=".mp4, .wav"
                    onChange={(event) => setFile(event.target.files[0])}
                  />
                  <BiSolidVideo />
                  <span>Video</span>
                </label>
                <label
                  htmlFor="vgifUpload"
                  className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                >
                  <input
                    type="file"
                    className="hidden"
                    id="vgifUpload"
                    data-max-size="5120"
                    accept=".gif"
                    onChange={(event) => setFile(event.target.files[0])}
                  />
                  <BsFiletypeGif />
                  <span>GIF</span>
                </label>
                <div>
                  {posting ? (
                    <Loading />
                  ) : (
                    <CustomButton
                      type="submit"
                      title="post"
                      containerStyles="bg-[#0444a4] text-white py-1 px-6 rounded-full font-semibold text-sm"
                    />
                  )}
                </div>
              </div>
            </form>
            {loading ? (
              <Loading />
            ) : posts?.length > 0 ? (
              posts?.map((post) => {
                return (
                  <PostCard
                    key={post?._id}
                    post={post}
                    user={user}
                    deletePost={() => {}}
                    likePost={() => {}}
                  />
                );
              })
            ) : (
              <div className="flex w-full h-full items-center justify-center">
                <p className="text-lg text-ascent-2">No posts available</p>
              </div>
            )}
          </div>
          {/* RIGHT */}
          <div className="hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto">
            {/* FRIEND REQUEST */}
            <div className="w-full bg-primary shadow-sm rounded-lg px-6 py-5">
              <div className="flex items-center justify-between text-xl text-ascent-1 pb-2 border-b border-[#66666645]">
                <span>
                  Friend Request
                  {(friendRequest?.length > 1 || friendRequest?.length === 0) &&
                    "s"}
                </span>
                <span>{friendRequest?.length}</span>
              </div>
              <div className="w-full flex flex-col gap-4 pt-4">
                {friendRequest?.map(({ _id, requestFrom: from }) => {
                  return (
                    <div
                      key={_id}
                      className="flex items-center justify-between"
                    >
                      <Link
                        to={`/profile/${from._id}`}
                        className="w-full flex gap-4 items-center cursor-pointer"
                      >
                        <img
                          src={from?.profileUrl || noProfile || noProfile}
                          alt={from?.firstName}
                          className="w-10 h-10 object-cover rounded-full"
                        />
                        <div className="flex-1">
                          <p className="text-base font-medium text-ascent-1">
                            {from?.firstName} {from?.lastName}
                          </p>
                          <p className="text-sm text-ascent-2">
                            {from?.profession || "Profession not set"}
                          </p>
                        </div>
                      </Link>

                      <div className="flex gap-1">
                        <CustomButton
                          title="Accept"
                          containerStyles="bg-[#0444a4] text-xs text-white px-1.5 py-1 rounded-full"
                        />
                        <CustomButton
                          title="Deny"
                          containerStyles="border border-[#666] text-xs text-ascent-1 px-1.5 py-1 rounded-full"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* SUGGESTED FRIENDS */}
            <div className="w-full bg-primary shadow-sm rounded-lg px-5 py-5">
              <div className="flex items-center justify-between text-lg text-ascent-1 border-b border-[#66666645]">
                <span>Friends Suggestions</span>
              </div>
              <div className="w-full flex flex-col gap-4 pt-4">
                {suggestedFriends?.map((friend) => {
                  return (
                    <div
                      className="flex items-center justify-between"
                      key={friend?._id}
                    >
                      <Link
                        to={`/profile/${friend?._id}`}
                        className="w-full flex gap-4 items-center cursor-pointer"
                      >
                        <img
                          src={friend?.profileUrl || noProfile}
                          alt={`${friend?.firstName}'s avatar`}
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
                      <div className="flex gap-1">
                        <button
                          className="bg-[#0444a430] text-sm text-white p-1 rounded"
                          onClick={() => {}}
                        >
                          <BsPersonFillAdd
                            size={20}
                            className="text-[#0f52b6]"
                          />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      {edit && <EditProfile />}
    </>
  );
};

export default Home;
