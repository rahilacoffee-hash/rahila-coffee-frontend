// components/Reviews/ProductReviews.jsx
import React, { useEffect, useState, useContext } from "react"
import Rating from "@mui/material/Rating"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { MdVerified, MdDelete } from "react-icons/md"
import api from "../../api/axios"
import { MyContext } from "../../App"

const PLACEHOLDER = "https://i.pravatar.cc/150"

// ── Star breakdown bar ────────────────────────────────────────
function RatingBar({ star, count, total }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0
  return (
    <div className="flex items-center gap-2">
      <span className="text-[12px] text-gray-500 w-3 shrink-0">{star}</span>
      <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
        <div
          className="h-2 rounded-full bg-amber-500 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[11px] text-gray-400 w-6 text-right">{count}</span>
    </div>
  )
}

// ── Single review card ────────────────────────────────────────
function ReviewCard({ review, currentUserId, onDelete }) {
  const initials = review.user?.name
    ? review.user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : "U"

  return (
    <div className="flex gap-3 py-4 border-b border-gray-100 last:border-0">
      {/* Avatar */}
      <div className="shrink-0">
        {review.user?.avatar ? (
          <img
            src={review.user.avatar}
            alt={review.user?.name}
            className="w-9 h-9 rounded-full object-cover"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-bold text-[13px]">
            {initials}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[13px] font-bold text-gray-800 capitalize">
                {review.user?.name || "Anonymous"}
              </span>
              {review.verified && (
                <span className="flex items-center gap-0.5 text-[10px] text-green-600 font-semibold bg-green-50 px-1.5 py-0.5 rounded-full">
                  <MdVerified className="text-[11px]" /> Verified Purchase
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <Rating value={review.rating} readOnly size="small" />
              <span className="text-[11px] text-gray-400">
                {new Date(review.createdAt).toLocaleDateString("en-NG", {
                  day: "numeric", month: "short", year: "numeric"
                })}
              </span>
            </div>
          </div>

          {/* Delete button — only for own review */}
          {currentUserId && review.user?._id === currentUserId && (
            <button
              onClick={() => onDelete(review._id)}
              className="text-gray-300 hover:text-red-400 transition-colors shrink-0"
              title="Delete review"
            >
              <MdDelete className="text-[18px]" />
            </button>
          )}
        </div>

        <p className="text-[13px] text-gray-600 mt-2 leading-relaxed">{review.comment}</p>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────
function ProductReviews({ productId }) {
  const context = useContext(MyContext)

  const [reviews,    setReviews]    = useState([])
  const [avgRating,  setAvgRating]  = useState(0)
  const [total,      setTotal]      = useState(0)
  const [loading,    setLoading]    = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [deleting,   setDeleting]   = useState(null)

  // Form state
  const [rating,  setRating]  = useState(5)
  const [comment, setComment] = useState("")
  const [formErr, setFormErr] = useState("")

  useEffect(() => {
    if (productId) fetchReviews()
  }, [productId])

  const fetchReviews = async () => {
    setLoading(true)
    try {
      const res = await api.get(`/reviews/${productId}`)
      setReviews(res.data.data     || [])
      setAvgRating(res.data.avgRating || 0)
      setTotal(res.data.total       || 0)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormErr("")

    if (!context.isLogin) {
      context.openAlertBox("error", "Please login to leave a review")
      return
    }
    if (!rating) { setFormErr("Please select a star rating"); return }
    if (!comment.trim()) { setFormErr("Please write your review"); return }
    if (comment.trim().length < 10) { setFormErr("Review must be at least 10 characters"); return }

    setSubmitting(true)
    try {
      const res = await api.post(`/reviews/${productId}`, { rating, comment: comment.trim() })
      if (res.data.success) {
        context.openAlertBox("success", "Review submitted!")
        setComment("")
        setRating(5)
        fetchReviews()
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to submit review"
      setFormErr(msg)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (reviewId) => {
    if (!window.confirm("Delete your review?")) return
    setDeleting(reviewId)
    try {
      await api.delete(`/reviews/${reviewId}`)
      context.openAlertBox("success", "Review deleted")
      fetchReviews()
    } catch (err) {
      context.openAlertBox("error", "Failed to delete")
    } finally {
      setDeleting(null)
    }
  }

  // Build star breakdown [5,4,3,2,1]
  const breakdown = [5,4,3,2,1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
  }))

  // Check if current user already reviewed
  const alreadyReviewed = context.isLogin && reviews.some(
    r => r.user?._id === context.user?._id
  )

  return (
    <div className="w-full mt-2">

      {/* ── Summary ── */}
      <div className="flex flex-col sm:flex-row gap-6 p-4 sm:p-6 bg-amber-50 rounded-2xl mb-6">
        {/* Big average */}
        <div className="flex flex-col items-center justify-center shrink-0 text-center sm:pr-6 sm:border-r sm:border-amber-200">
          <span className="text-[3.5rem] font-black text-amber-900 leading-none">{avgRating}</span>
          <Rating value={avgRating} readOnly precision={0.1} size="small" className="mt-1" />
          <span className="text-[12px] text-gray-500 mt-1">{total} review{total !== 1 ? "s" : ""}</span>
        </div>

        {/* Star bars */}
        <div className="flex-1 space-y-1.5 justify-center flex flex-col">
          {breakdown.map(b => (
            <RatingBar key={b.star} star={b.star} count={b.count} total={total} />
          ))}
        </div>
      </div>

      {/* ── Reviews list ── */}
      {loading ? (
        <div className="space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="flex gap-3 py-4 border-b border-gray-100">
              <div className="w-9 h-9 rounded-full bg-gray-100 animate-pulse shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-100 rounded animate-pulse w-1/4" />
                <div className="h-3 bg-gray-100 rounded animate-pulse w-3/4" />
              </div>
            </div>
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-[40px] mb-2">☕</p>
          <p className="text-gray-500 font-medium">No reviews yet</p>
          <p className="text-gray-400 text-[13px]">Be the first to share your experience!</p>
        </div>
      ) : (
        <div className="mb-6">
          {reviews.map(review => (
            <ReviewCard
              key={review._id}
              review={review}
              currentUserId={context.user?._id}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* ── Write a Review ── */}
      <div className="bg-gray-50 rounded-2xl p-4 sm:p-6">
        <h3 className="text-[16px] font-bold text-gray-800 mb-1">
          {alreadyReviewed ? "You've already reviewed this product" : "Write a Review"}
        </h3>

        {!context.isLogin ? (
          <p className="text-[13px] text-gray-500 mt-2">
            <a href="/login" className="text-amber-800 font-semibold underline">Login</a>{" "}
            to leave a review
          </p>
        ) : alreadyReviewed ? (
          <p className="text-[13px] text-gray-400 mt-1">
            You can delete your existing review above if you'd like to update it.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <p className="text-[12px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
                Your Rating *
              </p>
              <Rating
                value={rating}
                onChange={(e, val) => setRating(val)}
                size="large"
                sx={{ "& .MuiRating-iconFilled": { color: "#b45309" } }}
              />
            </div>

            <div>
              <p className="text-[12px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
                Your Review *
              </p>
              <TextField
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                placeholder="Share your experience with this coffee... (min. 10 characters)"
                value={comment}
                onChange={e => setComment(e.target.value)}
                inputProps={{ maxLength: 500 }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px", fontSize: "13px" } }}
              />
              <p className="text-[11px] text-gray-400 text-right mt-0.5">
                {comment.length}/500
              </p>
            </div>

            {formErr && (
              <p className="text-red-500 text-[12px] bg-red-50 px-3 py-2 rounded-lg">{formErr}</p>
            )}

            <Button
              type="submit"
              disabled={submitting}
              variant="contained"
              className="!bg-amber-800 !text-white !capitalize !rounded-xl !px-6 !font-semibold"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}

export default ProductReviews