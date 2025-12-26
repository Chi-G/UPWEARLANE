import { useState, ChangeEvent, FormEvent } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { CustomerReviewsProps, Review } from '@/types';

export default function CustomerReviews({ reviews, productId }: CustomerReviewsProps) {
  const [sortBy, setSortBy] = useState('recent');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    title: '',
    comment: '',
    name: '',
  });

  const sortedReviews = [...reviews]?.sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (sortBy === 'highest') return b?.rating - a?.rating;
    if (sortBy === 'lowest') return a?.rating - b?.rating;
    return 0;
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReviewForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating: number) => {
    setReviewForm((prev) => ({ ...prev, rating }));
  };

  const handleSubmitReview = (e: FormEvent) => {
    e.preventDefault();
    console.log('Review submitted:', { ...reviewForm, productId });
    alert('Thank you for your review! It will be published after moderation.');
    setReviewForm({ rating: 5, title: '', comment: '', name: '' });
    setShowReviewForm(false);
  };

  const averageRating = reviews?.length > 0 
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length 
    : 0;
  const ratingDistribution = [5, 4, 3, 2, 1]?.map((star) => ({
    star,
    count: reviews?.filter((r) => r?.rating === star)?.length,
    percentage: (reviews?.filter((r) => r?.rating === star)?.length / reviews?.length) * 100,
  }));

  return (
    <div className="space-y-8">
      {/* Reviews Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
          Customer Reviews
        </h2>
        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg shadow-gold transition-smooth press-effect"
        >
          Write a Review
        </button>
      </div>
      {/* Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 p-6 md:p-8 bg-surface rounded-2xl">
        <div className="space-y-4">
          <div className="flex items-end space-x-3">
            <span className="font-heading text-5xl md:text-6xl font-bold text-foreground">
              {averageRating?.toFixed(1)}
            </span>
            <span className="text-lg text-muted-foreground pb-2">out of 5</span>
          </div>
          <div className="flex items-center space-x-1">
            {[...Array(5)]?.map((_, i) => (
              <Icon
                key={i}
                name="StarIcon"
                size={24}
                variant={i < Math.floor(averageRating) ? 'solid' : 'outline'}
                className={i < Math.floor(averageRating) ? 'text-primary' : 'text-muted'}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">Based on {reviews?.length} reviews</p>
        </div>

        <div className="space-y-3">
          {ratingDistribution?.map(({ star, count, percentage }) => (
            <div key={star} className="flex items-center space-x-3">
              <span className="text-sm font-medium text-foreground w-8">{star}★</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground w-12 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Review Form */}
      {showReviewForm && (
        <div className="p-6 md:p-8 bg-surface rounded-2xl space-y-6">
          <h3 className="font-heading text-xl font-semibold text-foreground">Write Your Review</h3>
          <form onSubmit={handleSubmitReview} className="space-y-6">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-foreground">Your Rating</label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5]?.map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(star)}
                    className="touch-target transition-smooth press-effect"
                  >
                    <Icon
                      name="StarIcon"
                      size={32}
                      variant={star <= reviewForm?.rating ? 'solid' : 'outline'}
                      className={star <= reviewForm?.rating ? 'text-primary' : 'text-muted'}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label htmlFor="name" className="block text-sm font-medium text-foreground">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={reviewForm?.name}
                onChange={handleInputChange}
                required
                className="w-full h-12 px-4 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus-ring transition-smooth"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-3">
              <label htmlFor="title" className="block text-sm font-medium text-foreground">
                Review Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={reviewForm?.title}
                onChange={handleInputChange}
                required
                className="w-full h-12 px-4 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus-ring transition-smooth"
                placeholder="Summarize your experience"
              />
            </div>

            <div className="space-y-3">
              <label htmlFor="comment" className="block text-sm font-medium text-foreground">
                Your Review
              </label>
              <textarea
                id="comment"
                name="comment"
                value={reviewForm?.comment}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus-ring transition-smooth resize-none"
                placeholder="Share your thoughts about this product..."
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg shadow-gold transition-smooth press-effect"
              >
                Submit Review
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="flex-1 h-12 px-6 bg-surface hover:bg-accent text-foreground font-medium rounded-lg border border-border transition-smooth press-effect"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      {/* Sort Options */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          Showing {sortedReviews?.length} reviews
        </span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e?.target?.value)}
          className="h-10 px-4 bg-surface border border-border rounded-lg text-sm text-foreground focus-ring transition-smooth"
        >
          <option value="recent">Most Recent</option>
          <option value="highest">Highest Rating</option>
          <option value="lowest">Lowest Rating</option>
        </select>
      </div>
      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews?.map((review) => (
          <div key={review?.id} className="p-6 md:p-8 bg-surface rounded-2xl space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
                  <AppImage
                    src={review?.userImage}
                    alt={review?.userImageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="font-medium text-foreground">{review?.userName}</h4>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="StarIcon"
                        size={16}
                        variant={i < review?.rating ? 'solid' : 'outline'}
                        className={i < review?.rating ? 'text-primary' : 'text-muted'}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                {new Date(review.date)?.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>

            <div className="space-y-2">
              <h5 className="font-medium text-foreground">{review?.title}</h5>
              <p className="text-sm md:text-base text-foreground leading-relaxed">
                {review?.comment}
              </p>
            </div>

            {review?.verified && (
              <div className="flex items-center space-x-2 text-sm text-success">
                <Icon name="CheckBadgeIcon" size={16} variant="solid" />
                <span>Verified Purchase</span>
              </div>
            )}

            <div className="flex items-center space-x-4 pt-2">
              <button className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-smooth">
                <Icon name="HandThumbUpIcon" size={16} />
                <span>Helpful ({review?.helpfulCount})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

CustomerReviews.propTypes = {
  reviews: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      userName: PropTypes?.string?.isRequired,
      userImage: PropTypes?.string?.isRequired,
      userImageAlt: PropTypes?.string?.isRequired,
      rating: PropTypes?.number?.isRequired,
      title: PropTypes?.string?.isRequired,
      comment: PropTypes?.string?.isRequired,
      date: PropTypes?.string?.isRequired,
      verified: PropTypes?.bool?.isRequired,
      helpfulCount: PropTypes?.number?.isRequired,
    })
  )?.isRequired,
  productId: PropTypes?.number?.isRequired,
};