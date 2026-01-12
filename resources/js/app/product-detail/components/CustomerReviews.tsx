import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { CustomerReviewsProps } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'sonner';

interface AuthUser {
    id: number;
    name: string;
    email: string;
}

interface PageProps {
    auth: {
        user: AuthUser | null;
    };
    flash?: {
        success?: string;
        error?: string;
    };
    [key: string]: unknown;
}

export default function CustomerReviews({
    reviews,
    productId,
}: CustomerReviewsProps) {
    const { auth } = usePage<PageProps>().props;
    const [sortBy, setSortBy] = useState('recent');
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [helpfulCounts, setHelpfulCounts] = useState<Record<number, number>>({});

    const { data, setData, post, processing, errors, reset } = useForm({
        product_id: productId,
        rating: 5,
        title: '',
        comment: '',
    });

    const sortedReviews = [...reviews]?.sort((a, b) => {
        if (sortBy === 'recent') {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        if (sortBy === 'highest') return b?.rating - a?.rating;
        if (sortBy === 'lowest') return a?.rating - b?.rating;
        return 0;
    });

    const handleRatingChange = (rating: number) => {
        setData('rating', rating);
    };

    const handleSubmitReview = (e: React.FormEvent) => {
        e.preventDefault();

        if (!auth?.user) {
            toast.error('Please log in to submit a review', {
                description: 'You need to be logged in to write a review.',
            });
            return;
        }

        post('/reviews', {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Review submitted!', {
                    description: 'Thank you for your feedback.',
                });
                reset();
                setShowReviewForm(false);
            },
            onError: (errors) => {
                if (errors.review) {
                    toast.error('Review Error', {
                        description: errors.review,
                    });
                } else {
                    toast.error('Failed to submit review', {
                        description: 'Please check your input and try again.',
                    });
                }
            },
        });
    };

    const handleHelpfulClick = async (reviewId: number) => {
        if (!auth?.user) {
            toast.error('Please log in', {
                description: 'You need to be logged in to mark reviews as helpful.',
            });
            return;
        }

        try {
            const response = await fetch(`/reviews/${reviewId}/helpful`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setHelpfulCounts(prev => ({
                    ...prev,
                    [reviewId]: data.helpful_count,
                }));
                toast.success('Marked as helpful!');
            }
        } catch {
            toast.error('Failed to mark as helpful');
        }
    };

    const handleWriteReviewClick = () => {
        if (!auth?.user) {
            toast.error('Please log in', {
                description: 'You need to be logged in to write a review.',
            });
            return;
        }
        setShowReviewForm(!showReviewForm);
    };

    const averageRating =
        reviews?.length > 0
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            : 0;
    const ratingDistribution = [5, 4, 3, 2, 1]?.map((star) => ({
        star,
        count: reviews?.filter((r) => r?.rating === star)?.length,
        percentage:
            reviews?.length > 0
                ? (reviews?.filter((r) => r?.rating === star)?.length /
                    reviews?.length) *
                  100
                : 0,
    }));

    return (
        <div className="space-y-8">
            {/* Reviews Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <h2 className="font-heading text-foreground text-2xl font-bold md:text-3xl">
                    Customer Reviews
                </h2>
                <button
                    onClick={handleWriteReviewClick}
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
                            {averageRating?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
                                                star <= data?.rating
                                                    ? 'solid'
                                                    : 'outline'
                                            }
                                            className={
                                                star <= data?.rating
                                                    ? 'text-primary'
                                                    : 'text-muted'
                                            }
                                        />
                                    </button>
                                ))}
                            </div>
                            {errors.rating && (
                                <p className="text-destructive text-sm">{errors.rating}</p>
                            )}
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
                                value={data?.title}
                                onChange={(e) => setData('title', e.target.value)}
                                required
                                className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-ring transition-smooth h-12 w-full rounded-lg border px-4"
                                placeholder="Summarize your experience"
                            />
                            {errors.title && (
                                <p className="text-destructive text-sm">{errors.title}</p>
                            )}
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
                                value={data?.comment}
                                onChange={(e) => setData('comment', e.target.value)}
                                required
                                rows={5}
                                className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-ring transition-smooth w-full resize-none rounded-lg border px-4 py-3"
                                placeholder="Share your thoughts about this product..."
                            />
                            {errors.comment && (
                                <p className="text-destructive text-sm">{errors.comment}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-gold transition-smooth press-effect h-12 flex-1 rounded-lg px-6 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Submitting...' : 'Submit Review'}
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
                                {new Date(review.date).toLocaleString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                })}
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
                            <button
                                onClick={() => handleHelpfulClick(review?.id)}
                                className="text-muted-foreground hover:text-foreground transition-smooth flex items-center space-x-2 text-sm"
                            >
                                <Icon name="HandThumbUpIcon" size={16} />
                                <span>Helpful ({helpfulCounts[review?.id] ?? review?.helpfulCount})</span>
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
