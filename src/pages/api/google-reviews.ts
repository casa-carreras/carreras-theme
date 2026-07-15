import type { NextApiRequest, NextApiResponse } from 'next';

// Server-only env vars (no NEXT_PUBLIC_ prefix) so the API key never reaches
// the browser bundle. Uses Place Details (New) - the legacy Places API is
// frozen and can no longer be enabled on new Google Cloud projects.
const { GOOGLE_PLACES_API_KEY, GOOGLE_PLACE_ID } = process.env;

interface IGoogleReview {
  authorAttribution?: { displayName?: string; photoUri?: string };
  rating?: number;
  text?: { text?: string };
  relativePublishTimeDescription?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!GOOGLE_PLACES_API_KEY || !GOOGLE_PLACE_ID) {
    // Not configured yet - let the frontend hide the section instead of
    // showing an error.
    res.status(200).json({ configured: false });
    return;
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
      res.status(200).json({ configured: true, error: true });
      return;
    }

    const data = await response.json();

    res.status(200).json({
      configured: true,
      rating: data.rating ?? null,
      userRatingCount: data.userRatingCount ?? null,
      googleMapsUri: data.googleMapsUri ?? null,
      reviews: (data.reviews || []).map((review: IGoogleReview) => ({
        authorName: review.authorAttribution?.displayName || '',
        authorPhoto: review.authorAttribution?.photoUri || null,
        rating: review.rating ?? null,
        text: review.text?.text || '',
        relativeTime: review.relativePublishTimeDescription || '',
      })),
    });
  } catch {
    res.status(200).json({ configured: true, error: true });
  }
}
