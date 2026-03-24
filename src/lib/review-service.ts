import { reviews } from '@/data/review-data';
import type { Review } from './types';

export function getReviews(): Review[] {
  return reviews;
}
