export interface GoogleReview {
  authorName: string;
  authorPhoto: string | null;
  rating: number | null;
  text: string;
  relativeTime: string;
}

export interface GoogleReviewsData {
  configured: boolean;
  error?: boolean;
  rating?: number | null;
  userRatingCount?: number | null;
  googleMapsUri?: string | null;
  reviews?: GoogleReview[];
}

interface IGoogleReviewApi {
  authorAttribution?: { displayName?: string; photoUri?: string };
  rating?: number;
  text?: { text?: string };
  relativePublishTimeDescription?: string;
}

// Server-only: reads GOOGLE_PLACES_API_KEY/GOOGLE_PLACE_ID (no NEXT_PUBLIC_
// prefix) so the key never reaches the browser bundle. Uses Place Details
// (New) - the legacy Places API is frozen and can no longer be enabled on
// new Google Cloud projects. Called from getStaticProps, not the client, to
// avoid a client-side fetch-in-effect waterfall.
export const fetchGoogleReviews = async (): Promise<GoogleReviewsData> => {
  const { GOOGLE_PLACES_API_KEY, GOOGLE_PLACE_ID } = process.env;

  if (!GOOGLE_PLACES_API_KEY || !GOOGLE_PLACE_ID) {
    return { configured: false };
  }

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${GOOGLE_PLACE_ID}`,
      {
        headers: {
          'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
          'X-Goog-FieldMask':
            'displayName,rating,userRatingCount,reviews,googleMapsUri',
        },
      },
    );

    if (!response.ok) {
      return { configured: true, error: true };
    }

    const data = await response.json();

    return {
      configured: true,
      rating: data.rating ?? null,
      userRatingCount: data.userRatingCount ?? null,
      googleMapsUri: data.googleMapsUri ?? null,
      reviews: (data.reviews || []).map((review: IGoogleReviewApi) => ({
        authorName: review.authorAttribution?.displayName || '',
        authorPhoto: review.authorAttribution?.photoUri || null,
        rating: review.rating ?? null,
        text: review.text?.text || '',
        relativeTime: review.relativePublishTimeDescription || '',
      })),
    };
  } catch {
    return { configured: true, error: true };
  }
};
