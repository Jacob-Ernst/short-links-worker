// == External =============================================================
import { Router, IRequest, withParams } from 'itty-router';

// == Internal =============================================================
import handleOverrides from './overrides';

// == Static ===============================================================

// create a convenient duple
type CF = [env: Env, context: ExecutionContext];

// now let's create a router (note the lack of "new")
const router = Router();

// GET collection index
router.get('/api/todos', () => new Response('Todos Index!'));

// GET item
router.get('/api/todos/:id', ({ params }) => new Response(`Todo #${params.id}`));

// POST to the collection (we'll use async here)
router.post('/api/todos', async (request) => {
  const content = await request.json();

  return new Response(`Creating Todo: ${JSON.stringify(content)}`);
});

router.get<IRequest, CF>('/sl/:slug', withParams, async (request, env) => {
  const shortLink = await env.SHORT_LINKS.get<ShortLink>(request.params.slug, {
    type: 'json',
  });

  if (!shortLink) {
    return new Response('Not Found.', { status: 404 });
  }

  const override = handleOverrides(request, shortLink.overrides || []);
  if (override) {
    return override;
  }

  return Response.redirect(shortLink.location, 302);
});

// 404 for everything else
router.all('*', () => new Response('Not Found.', { status: 404 }));

export default router;
