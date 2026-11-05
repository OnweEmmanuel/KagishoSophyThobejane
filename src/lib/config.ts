/** Site settings, read from .env (see README → "Going live"). */

/** Draft preview mode: placeholder notice on, contact form locked. */
export const DRAFT = import.meta.env.VITE_DRAFT !== 'false';

/**
 * Where contact-form submissions are POSTed (e.g. a Formspree endpoint like
 * https://formspree.io/f/xxxxxxx). The form stays locked until this is set.
 */
export const FORM_ENDPOINT: string = import.meta.env.VITE_FORM_ENDPOINT ?? '';

export const FORM_LIVE = !DRAFT && FORM_ENDPOINT !== '';
