import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PUBLIC_GOOGLE_MAPS_API_KEY } from '$env/static/public';

export const GET: RequestHandler = async () => {
  const apiKey = PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return json({ error: 'API key not found' }, { status: 500 });
  }
  return json({ apiKey });
};