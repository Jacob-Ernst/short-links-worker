// == External =============================================================
import { Router, IRequest, withParams } from 'itty-router';

// == Internal =============================================================
import handleOverrides from './overrides';

// == Static ===============================================================

// create a convenient duple
type CF = [env: Env, context: ExecutionContext];

// now let's create a router (note the lack of "new")
const router = Router();

async function withShortLink(request: IRequest, env: Env) {
  const shortLink = await env.SHORT_LINKS.get<ShortLink>(request.params.slug, {
    type: 'json',
  });

  if (!shortLink) {
    return new Response('Not Found.', { status: 404 });
  }
  request.shortLink = shortLink;
}

// GET short-link and redirect.
router.get<IRequest, CF>('/:slug', withParams, withShortLink, async (request) => {
  const shortLink = request.shortLink as ShortLink;

  const override = handleOverrides(request, shortLink.overrides || []);
  if (override) {
    return override;
  }

  return Response.redirect(shortLink.location, 302);
});

// 404 for everything else
router.all('*', () => new Response('Not Found.', { status: 404 }));

export default router;
