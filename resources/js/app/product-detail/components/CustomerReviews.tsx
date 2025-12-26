import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { CustomerReviewsProps } from '@/types';
import PropTypes from 'prop-types';
import { ChangeEvent, FormEvent, useState } from 'react';

export default function CustomerReviews({
    reviews,
    productId,
}: CustomerReviewsProps) {
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

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setReviewForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleRatingChange = (rating: number) => {
        setReviewForm((prev) => ({ ...prev, rating }));
    };

    const handleSubmitReview = (e: FormEvent) => {
        e.preventDefault();
        console.log('Review submitted:', { ...reviewForm, productId });
        alert(
            'Thank you for your review! It will be published after moderation.',
        );
        setReviewForm({ rating: 5, title: '', comment: '', name: '' });
        setShowReviewForm(false);
    };

    const averageRating =
        reviews?.length > 0
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            : 0;
    const ratingDistribution = [5, 4, 3, 2, 1]?.map((star) => ({
        star,
        count: reviews?.filter((r) => r?.rating === star)?.length,
        percentage:
            (reviews?.filter((r) => r?.rating === star)?.length /
                reviews?.length) *
            100,
    }));

    return (
        <div className="space-y-8">
            {/* Reviews Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <h2 className="font-heading text-foreground text-2xl font-bold md:text-3xl">
                    Customer Reviews
                </h2>
                <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-gold transition-smooth press-effect h-12 rounded-lg px-6 font-medium"
                >
                    Write a Review
                </button>
            </div>
            {/* Rating Summary */}
            <div className="bg-surface grid grid-cols-1 gap-6 rounded-2xl p-6 md:grid-cols-2 md:gap-8 md:p-8">
                <div className="space-y-4">
                    <div className="flex items-end space-x-3">
                        <span className="font-heading text-foreground text-5xl font-bold md:text-6xl">
                            {averageRating?.toFixed(1)}
                        </span>
                        <span className="text-muted-foreground pb-2 text-lg">
                            out of 5
                        </span>
                    </div>
                    <div className="flex items-center space-x-1">
                        {[...Array(5)]?.map((_, i) => (
                            <Icon
                                key={i}
                                name="StarIcon"
                                size={24}
                                variant={
                                    i < Math.floor(averageRating)
                                        ? 'solid'
                                        : 'outline'
                                }
                                className={
                                    i < Math.floor(averageRating)
                                        ? 'text-primary'
                                        : 'text-muted'
                                }
                            />
                        ))}
                    </div>
                    <p className="text-muted-foreground text-sm">
                        Based on {reviews?.length} reviews
                    </p>
                </div>

                <div className="space-y-3">
                    {ratingDistribution?.map(({ star, count, percentage }) => (
                        <div key={star} className="flex items-center space-x-3">
                            <span className="text-foreground w-8 text-sm font-medium">
                                {star}★
                            </span>
                            <div className="bg-muted h-2 flex-1 overflow-hidden rounded-full">
                                <div
                                    className="bg-primary h-full transition-all duration-500"
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                            <span className="text-muted-foreground w-12 text-right text-sm">
                                {count}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            {/* Review Form */}
            {showReviewForm && (
                <div className="bg-surface space-y-6 rounded-2xl p-6 md:p-8">
                    <h3 className="font-heading text-foreground text-xl font-semibold">
                        Write Your Review
                    </h3>
                    <form onSubmit={handleSubmitReview} className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-foreground block text-sm font-medium">
                                Your Rating
                            </label>
                            <div className="flex items-center space-x-2">
                                {[1, 2, 3, 4, 5]?.map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => handleRatingChange(star)}
                                        className="touch-target transition-smooth press-effect"
                                        title={`Rate ${star} star${star > 1 ? 's' : ''}`}
                                        aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                                    >
                                        <Icon
                                            name="StarIcon"
                                            size={32}
                                            variant={
                                                star <= reviewForm?.rating
                                                    ? 'solid'
                                                    : 'outline'
                                            }
                                            className={
                                                star <= reviewForm?.rating
                                                    ? 'text-primary'
                                                    : 'text-muted'
                                            }
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label
                                htmlFor="name"
                                className="text-foreground block text-sm font-medium"
                            >
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={reviewForm?.name}
                                onChange={handleInputChange}
                                required
                                className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-ring transition-smooth h-12 w-full rounded-lg border px-4"
                                placeholder="John Doe"
                            />
                        </div>

                        <div className="space-y-3">
                            <label
                                htmlFor="title"
                                className="text-foreground block text-sm font-medium"
                            >
                                Review Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={reviewForm?.title}
                                onChange={handleInputChange}
                                required
                                className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-ring transition-smooth h-12 w-full rounded-lg border px-4"
                                placeholder="Summarize your experience"
                            />
                        </div>

                        <div className="space-y-3">
                            <label
                                htmlFor="comment"
                                className="text-foreground block text-sm font-medium"
                            >
                                Your Review
                            </label>
                            <textarea
                                id="comment"
                                name="comment"
                                value={reviewForm?.comment}
                                onChange={handleInputChange}
                                required
                                rows={5}
                                className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-ring transition-smooth w-full resize-none rounded-lg border px-4 py-3"
                                placeholder="Share your thoughts about this product..."
                            />
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <button
                                type="submit"
                                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-gold transition-smooth press-effect h-12 flex-1 rounded-lg px-6 font-medium"
                            >
                                Submit Review
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowReviewForm(false)}
                                className="bg-surface hover:bg-accent text-foreground border-border transition-smooth press-effect h-12 flex-1 rounded-lg border px-6 font-medium"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
            {/* Sort Options */}
            <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                    Showing {sortedReviews?.length} reviews
                </span>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e?.target?.value)}
                    className="bg-surface border-border text-foreground focus-ring transition-smooth h-10 rounded-lg border px-4 text-sm"
                    title="Sort Reviews"
                >
                    <option value="recent">Most Recent</option>
                    <option value="highest">Highest Rating</option>
                    <option value="lowest">Lowest Rating</option>
                </select>
            </div>
            {/* Reviews List */}
            <div className="space-y-6">
                {sortedReviews?.map((review) => (
                    <div
                        key={review?.id}
                        className="bg-surface space-y-4 rounded-2xl p-6 md:p-8"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start space-x-4">
                                <div className="bg-muted h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
                                    <AppImage
                                        src={review?.userImage}
                                        alt={review?.userImageAlt}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-foreground font-medium">
                                        {review?.userName}
                                    </h4>
                                    <div className="flex items-center space-x-1">
                                        {[...Array(5)]?.map((_, i) => (
                                            <Icon
                                                key={i}
                                                name="StarIcon"
                                                size={16}
                                                variant={
                                                    i < review?.rating
                                                        ? 'solid'
                                                        : 'outline'
                                                }
                                                className={
                                                    i < review?.rating
                                                        ? 'text-primary'
                                                        : 'text-muted'
                                                }
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <span className="text-muted-foreground whitespace-nowrap text-sm">
                                {new Date(review.date)?.toLocaleDateString(
                                    'en-US',
                                    {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                    },
                                )}
                            </span>
                        </div>

                        <div className="space-y-2">
                            <h5 className="text-foreground font-medium">
                                {review?.title}
                            </h5>
                            <p className="text-foreground text-sm leading-relaxed md:text-base">
                                {review?.comment}
                            </p>
                        </div>

                        {review?.verified && (
                            <div className="text-success flex items-center space-x-2 text-sm">
                                <Icon
                                    name="CheckBadgeIcon"
                                    size={16}
                                    variant="solid"
                                />
                                <span>Verified Purchase</span>
                            </div>
                        )}

                        <div className="flex items-center space-x-4 pt-2">
                            <button className="text-muted-foreground hover:text-foreground transition-smooth flex items-center space-x-2 text-sm">
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
        }),
    )?.isRequired,
    productId: PropTypes?.number?.isRequired,
};
