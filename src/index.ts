import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => c.redirect(`https://github.com/ryanccn`));
app.get('/:repo', (c) => {
	const repo = c.req.param('repo');
	return c.redirect(`https://github.com/ryanccn/${repo}`);
});

export default app;
