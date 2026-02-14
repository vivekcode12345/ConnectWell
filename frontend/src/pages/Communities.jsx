import { useEffect, useState } from "react";
import api from "../api/axiosClient.js";
import useAuth from "../hooks/useAuth.js";

const groups = ["Mindful Habits", "Career Calm", "Family Care", "New Friends"];

const Communities = () => {
  const { user } = useAuth();
  const [selectedGroup, setSelectedGroup] = useState(groups[0]);
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [commentText, setCommentText] = useState({});
  const [commentsByPost, setCommentsByPost] = useState({});
  const [loadingComments, setLoadingComments] = useState({});
  const [reportReason, setReportReason] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadPosts = async () => {
    const res = await api.get("/api/posts", {
      params: { group: selectedGroup },
    });
    setPosts(res.data);
  };

  useEffect(() => {
    loadPosts().catch(() => {});
  }, [selectedGroup]);

  const handlePost = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post("/api/posts", {
        group: selectedGroup,
        content,
        anonymous,
      });
      setContent("");
      setAnonymous(false);
      await loadPosts();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to post");
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async (postId) => {
    setLoadingComments((prev) => ({ ...prev, [postId]: true }));
    const res = await api.get(`/api/comments/post/${postId}`);
    setCommentsByPost((prev) => ({ ...prev, [postId]: res.data }));
    setLoadingComments((prev) => ({ ...prev, [postId]: false }));
  };

  const handleComment = async (postId) => {
    const text = commentText[postId];
    if (!text) return;
    await api.post("/api/comments", { postId, content: text });
    setCommentText((prev) => ({ ...prev, [postId]: "" }));
    await loadComments(postId);
  };

  const handleReport = async ({ postId, userId }) => {
    const reason = reportReason[postId] || "Concerning content";
    await api.post("/api/reports", {
      targetPost: postId,
      targetUser: userId,
      reason,
    });
    setReportReason((prev) => ({ ...prev, [postId]: "" }));
    await loadPosts();
  };

  const handleBlock = async (userId) => {
    await api.post(`/api/users/block/${userId}`);
    await loadPosts();
  };

  const handleDeleteComment = async (commentId, postId) => {
    if (!confirm("Delete this comment?")) return;
    try {
      await api.delete(`/api/comments/${commentId}`);
      await loadComments(postId);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete comment");
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <section className="group rounded-[32px] border-2 border-ink/10 bg-white p-8 shadow-lg transition-all duration-300 hover:border-mint/50 hover:shadow-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-mint to-purple text-2xl shadow-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
            👥
          </div>
          <div>
            <h2 className="font-display text-3xl">Communities</h2>
            <p className="mt-1 text-sm text-ink/70">
              Pick a circle and share what you are working through.
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {groups.map((group) => (
            <button
              key={group}
              onClick={() => setSelectedGroup(group)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                selectedGroup === group
                  ? "scale-105 bg-ink text-sand shadow-lg"
                  : "border-2 border-ink/10 text-ink/70 hover:scale-105 hover:border-mint hover:bg-mint/10 hover:text-ink"
              }`}
            >
              {group}
            </button>
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <section className="group rounded-[32px] border-2 border-ink/10 bg-white p-8 shadow-lg transition-all duration-300 hover:border-mint/50 hover:shadow-xl">
          <div className="flex items-center gap-2">
            <span className="text-2xl transition-transform duration-300 group-hover:scale-125">✍️</span>
            <h3 className="font-display text-xl">Share in {selectedGroup}</h3>
          </div>
          <form className="mt-4 space-y-4" onSubmit={handlePost}>
            <textarea
              rows="5"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              className="w-full rounded-2xl border-2 border-ink/10 px-4 py-3 transition-all duration-300 focus:border-mint focus:shadow-md focus:outline-none"
              placeholder="Write your update..."
              required
            ></textarea>
            <label className="flex cursor-pointer items-center gap-2 text-sm transition-colors duration-300 hover:text-mint">
              <input
                type="checkbox"
                checked={anonymous}
                onChange={(event) => setAnonymous(event.target.checked)}
                className="cursor-pointer"
              />
              Post anonymously
            </label>
            {error && <p className="text-sm text-coral">{error}</p>}
            <button disabled={loading} className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-sand shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100">
              {loading ? "Posting..." : "Post update"}
            </button>
          </form>
        </section>

        <section className="space-y-4">
          {posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-ink/10 bg-white p-12 text-sm text-ink/60 shadow-lg">
              <span className="mb-4 text-5xl opacity-30">💬</span>
              <p>No posts yet. Start the conversation.</p>
            </div>
          ) : (
            posts.map((post) => (
              <article
                key={post._id}
                className="group rounded-3xl border-2 border-ink/10 bg-white p-6 shadow-lg transition-all duration-300 hover:border-mint/50 hover:shadow-xl"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-ink/50">
                  {post.anonymous ? "Anonymous" : post.user?.name || "Member"}
                </p>
                <p className="mt-3 text-sm text-ink/80">{post.content}</p>
                <div className="mt-4 flex flex-col gap-3">
                  <input
                    value={commentText[post._id] || ""}
                    onChange={(event) =>
                      setCommentText((prev) => ({
                        ...prev,
                        [post._id]: event.target.value,
                      }))
                    }
                    placeholder="Add a supportive comment..."
                    className="w-full rounded-2xl border-2 border-ink/10 px-4 py-2 text-sm transition-all duration-300 focus:border-mint focus:shadow-md focus:outline-none"
                  />
                  <button
                    onClick={() => handleComment(post._id)}
                    className="self-start rounded-full border-2 border-ink/20 px-4 py-2 text-xs font-semibold transition-all duration-300 hover:scale-105 hover:border-mint hover:bg-mint/10"
                  >
                    Send comment
                  </button>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => loadComments(post._id)}
                      className="rounded-full bg-sand px-3 py-1 text-xs font-semibold transition-all duration-300 hover:scale-105 hover:bg-mint/20 hover:shadow-md"
                    >
                      {loadingComments[post._id]
                        ? "Loading..."
                        : "View comments"}
                    </button>
                    {!post.anonymous && post.user && post.user._id !== user?._id && (
                      <button
                        onClick={() => handleBlock(post.user._id)}
                        className="rounded-full border-2 border-coral px-3 py-1 text-xs font-semibold text-coral transition-all duration-300 hover:scale-105 hover:bg-coral/10 hover:shadow-md"
                      >
                        Block user
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      value={reportReason[post._id] || ""}
                      onChange={(event) =>
                        setReportReason((prev) => ({
                          ...prev,
                          [post._id]: event.target.value,
                        }))
                      }
                      className="rounded-full border-2 border-ink/10 px-3 py-1 text-xs transition-all duration-300 focus:border-mint focus:outline-none"
                    >
                      <option value="">Select a report reason</option>
                      <option value="Harassment or bullying">
                        Harassment or bullying
                      </option>
                      <option value="Hate or discrimination">
                        Hate or discrimination
                      </option>
                      <option value="Self-harm risk">
                        Self-harm risk
                      </option>
                      <option value="Spam or scams">Spam or scams</option>
                    </select>
                    <button
                      onClick={() =>
                        handleReport({
                          postId: post._id,
                          userId: post.anonymous ? null : post.user?._id,
                        })
                      }
                      className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-sand transition-all duration-300 hover:scale-105 hover:shadow-md"
                    >
                      Report
                    </button>
                  </div>
                </div>
                {commentsByPost[post._id] && (
                  <div className="mt-4 space-y-2 rounded-2xl bg-sand/60 p-4">
                    {commentsByPost[post._id].length === 0 ? (
                      <p className="text-xs text-ink/60">No comments yet.</p>
                    ) : (
                      commentsByPost[post._id].map((comment) => (
                        <div key={comment._id} className="flex items-start justify-between gap-2 rounded-xl bg-white/80 p-2 transition-all duration-300 hover:bg-white hover:shadow-sm">
                          <div className="flex-1 text-xs text-ink/80">
                            <span className="font-semibold">
                              {comment.user?.name || "Member"}:
                            </span>{" "}
                            {comment.content}
                          </div>
                          {comment.user && comment.user._id === user?._id && (
                            <button
                              onClick={() => handleDeleteComment(comment._id, post._id)}
                              className="rounded-full border border-coral/20 bg-coral/10 px-2 py-1 text-xs font-semibold text-coral transition-all duration-300 hover:scale-105 hover:bg-coral/20 hover:shadow-sm"
                              title="Delete comment"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </article>
            ))
          )}
        </section>
      </div>
    </div>
  );
};

export default Communities;
