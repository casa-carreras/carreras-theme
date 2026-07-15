import Image from 'next/image';

import type { GoogleReviewsData } from '@/utils/functions/googleReviews';

interface IGoogleReviewsProps {
  data: GoogleReviewsData;
}

const Stars = ({ rating }: { rating: number | null }) => (
  <span aria-hidden className="text-warning">
    {'★★★★★'.slice(0, Math.round(rating ?? 0))}
    <span className="text-border">
      {'★★★★★'.slice(Math.round(rating ?? 0))}
    </span>
  </span>
);

/**
 * Shows Google reviews for the business. Data is fetched server-side in
 * getStaticProps (see pages/index.tsx) so the Places API key never reaches
 * the client and there's no client-side fetch waterfall. Renders nothing
 * until GOOGLE_PLACES_API_KEY/GOOGLE_PLACE_ID are configured, or on error.
 */
const GoogleReviews = ({ data }: IGoogleReviewsProps) => {
  if (!data.configured || data.error || !data.reviews?.length) {
    return null;
  }

  return (
    <section className="container mx-auto px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-light text-text">
          Opiniones de nuestros clientes
        </h2>
        {data.rating && (
          <div className="flex items-center gap-2 text-text-muted">
            <Stars rating={data.rating} />
            <span>
              {data.rating.toFixed(1)} ({data.userRatingCount} reseñas en
              Google)
            </span>
          </div>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.reviews.slice(0, 6).map((review, index) => (
          <article
            key={`${review.authorName}-${index}`}
            className="rounded-md border border-border bg-surface p-4"
          >
            <div className="flex items-center gap-3">
              {review.authorPhoto && (
                <Image
                  src={review.authorPhoto}
                  alt={review.authorName}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
              <div>
                <p className="font-bold text-text">{review.authorName}</p>
                <Stars rating={review.rating} />
              </div>
            </div>
            <p className="mt-3 text-sm text-text-muted">{review.text}</p>
            <p className="mt-2 text-xs text-text-light">
              {review.relativeTime}
            </p>
          </article>
        ))}
      </div>

      {data.googleMapsUri && (
        <a
          href={data.googleMapsUri}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-block text-sm text-primary hover:underline"
        >
          Ver todas las reseñas en Google
        </a>
      )}
    </section>
  );
};

export default GoogleReviews;
