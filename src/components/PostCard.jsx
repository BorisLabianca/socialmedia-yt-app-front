import { useState } from "react";
import { Link } from "react-router-dom";
import { noProfile } from "../assets";
import moment from "moment";
import { BiComment, BiLike, BiSolidLike } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import CommentForm from "./CommentForm";
import Loading from "./Loading";
import { postComments } from "../assets/data";
import ReplyCard from "./ReplyCard";

const PostCard = ({ post, user, deletePost, likePost }) => {
  const [showAll, setShowAll] = useState(0);
  const [showReply, setShowReply] = useState(0);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [replyComments, setReplyComments] = useState(0);
  const [showComments, setShowComments] = useState(0);

  const getComments = async () => {
    setLoading(true);
    setReplyComments(0);
    setComments(postComments);
    setLoading(false);
  };

  const handleLike = async () => {};

  console.log(replyComments);

  return (
    <div className="mb-2 bg-primary p-4 rounded-xl">
      <div className="flex gap-3 items-center mb-2">
        <Link to={`/profile/${post?.userId?._id}`}>
          <img
            src={post?.userId?.profileUrl || noProfile}
            alt={`${post?.userId?.firstname}' avatar`}
            className="w-14 h-14 object-cover rounded-full"
          />
        </Link>
        <div className="w-full flex justify-between">
          <div>
            <Link to={`/profile/${post?.userId?._id}`}>
              <p className="font-medium text-lg text-ascent-1">
                {post?.userId?.firstName} {post?.userId?.lastName}
              </p>
            </Link>
            <span className="text-ascent-2">{post?.userId?.location}</span>
          </div>
          <span className="text-ascent-2">
            {moment(post?.createdAt || "2023-05-25").fromNow()}
          </span>
        </div>
      </div>
      <div>
        <p className="text-ascent-2">
          {showAll === post?._id
            ? post?.description
            : post?.description.slice(0, 300)}
          {post?.description.length > 301 &&
            (showAll === post?._id ? (
              <span
                className="text-blue ml-2 font-medium cursor-pointer"
                onClick={() => setShowAll(0)}
              >
                Show Less
              </span>
            ) : (
              <span
                className="text-blue ml-2 font-medium cursor-pointer"
                onClick={() => setShowAll(post?._id)}
              >
                Show More
              </span>
            ))}
        </p>
        {post?.image && (
          <img
            src={post?.image}
            alt="post image"
            className="w-full mt-2 rounded-lg"
          />
        )}
      </div>
      <div className="mt-4 flex justify-between items-center px-3 py-2 text-ascent-2 text-base border-t border-[#66666645]">
        <p className="flex gap-2 items-center text-base cursor-pointer">
          {post?.likes?.includes(user?._id) ? (
            <BiSolidLike size={20} color="blue" />
          ) : (
            <BiLike size={20} />
          )}
          {post?.likes?.length} Like
          {(post?.likes?.length > 1 || post?.likes?.length === 0) && "s"}
        </p>
        <p
          className="flex gap-2 items-center text-base cursor-pointer"
          onClick={() => {
            setShowComments(showComments === post?._id ? null : post?._id);
            getComments(post?._id);
          }}
        >
          <BiComment size={20} />
          {post?.comments?.length} Comment
          {(post?.comments?.length === 0 || post?.comments?.length > 1) && "s"}
        </p>
        {user?._id === post?.userId?._id && (
          <div
            className="flex gap-4 items-center text-base text-ascent-1 cursor-pointer"
            onClick={() => deletePost(post?._id)}
          >
            <MdOutlineDeleteOutline size={20} />
            <span>Delete</span>
          </div>
        )}
      </div>
      {/* COMMENTS */}
      {showComments === post?._id && (
        <div className="w-full mt-4 border-t border-[#66666645] pt-4">
          <CommentForm
            user={user}
            id={post?._id}
            getComments={() => getComments(post?._id)}
          />
          {loading ? (
            <Loading />
          ) : comments?.length > 0 ? (
            comments?.map((comment) => {
              return (
                <div className="w-full py-2" key={comment?._id}>
                  <div className="flex gap-3 items-center mb-1">
                    <Link to={`/profile/${comment?.userId?._id}`}>
                      <img
                        src={comment?.userId?.profileUrl || noProfile}
                        alt={`${comment?.userId?.firstName}'s avatar`}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </Link>
                    <div>
                      <Link to={`/profile/${comment?.userId?._id}`}>
                        <p className="font-medium text-base text-ascent-1">
                          {comment?.userId?.firstName}{" "}
                          {comment?.userId?.lastName}
                        </p>
                      </Link>
                      <span className="text-ascent-2 text-sm">
                        {moment(comment?.createdAt || "2023-05-25").fromNow()}
                      </span>
                    </div>
                  </div>
                  <div className="ml-12">
                    <p className="text-ascent-2">{comment?.comment}</p>
                    <div className="mt-2 flex gap-6">
                      <p className="flex gap-2 items-center text-base text-ascent-2 cursor-pointer">
                        {comment?.likes?.includes(user?._id) ? (
                          <BiSolidLike size={20} color="blue" />
                        ) : (
                          <BiLike size={20} />
                        )}
                        {comment?.likes?.length} Like
                        {(comment?.likes?.length > 1 ||
                          comment?.likes?.length === 0) &&
                          "s"}
                      </p>
                      <span
                        className="text-blue cursor-pointer"
                        onClick={() =>
                          setReplyComments(
                            replyComments === 0
                              ? comment?._id
                              : replyComments !== comment?._id
                              ? comment?._id
                              : 0
                          )
                        }
                      >
                        Reply
                      </span>
                    </div>
                    {replyComments === comment?._id && (
                      <CommentForm
                        user={user}
                        id={comment?._id}
                        replyAt={comment?.from}
                        getComments={() => getComments(post?._id)}
                      />
                    )}
                  </div>
                  {/* REPLIES */}
                  <div className="py-2 px-8 mt-6">
                    {comment?.replies?.length > 0 && (
                      <p
                        className="text-base text-ascent-1 cursor-pointer"
                        onClick={() =>
                          setShowReply(
                            showReply === comment?.replies?._id
                              ? 0
                              : comment?.replies?._id
                          )
                        }
                      >
                        Show Replie{comment?.replies?.length > 1 && "s"} (
                        {comment?.replies?.length})
                      </p>
                    )}
                    {showReply === comment?.replies?._id &&
                      comment?.replies?.map((reply) => {
                        return (
                          <ReplyCard
                            user={user}
                            reply={reply}
                            key={reply?._id}
                            handleLike={() =>
                              handleLike(
                                `/post/like-comment/${comment?._id}/${reply?._id}`
                              )
                            }
                          />
                        );
                      })}
                  </div>
                </div>
              );
            })
          ) : (
            <span className="flex text-sm py-4 text-ascent-2 text-center">
              No comments, be the first to comment.
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;
