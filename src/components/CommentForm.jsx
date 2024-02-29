import { useState } from "react";
import { useForm } from "react-hook-form";
import { noProfile } from "../assets";
import TextInput from "./TextInput";
import Loading from "./Loading";
import CustomButton from "./CustomButton";

const CommentForm = ({ user, id, getComments, replyAt }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full border-b border-[#66666645]"
    >
      <div className="w-full flex items-center gap-2 py-4">
        <img
          src={user?.profileUrl || noProfile}
          alt={`${user?.firstName}'s avatar`}
          className="w-10 h-10 rounded-full object-cover"
        />
        <TextInput
          name="comment"
          styles="w-full rounded-full py-3"
          placeholder={replyAt ? `Reply @${replyAt}` : "Comment this post"}
          register={register("comment", {
            required: "Comment cannot be empty.",
          })}
          error={errors?.comment ? errors?.comment?.message : ""}
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
        >
          {errorMessage?.message}
        </span>
      )}
      <div className="flex items-end justify-end pb-2">
        {loading ? (
          <Loading />
        ) : (
          <CustomButton
            title="Submit"
            type="submit"
            containerStyles="bg-[#0444a4] text-white py-1 px-3 rounded-full font-semibold text-sm"
          />
        )}
      </div>
    </form>
  );
};

export default CommentForm;
