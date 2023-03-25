import { Hono } from 'hono';

const app = new Hono();

const GITHUB = 'https://github.com';
const GITHUB_USERNAME = 'ryanccn';

const repo = (a?: string, b?: string) =>
	typeof b !== 'undefined' ? `${a}/${b}` : `${GITHUB_USERNAME}/${a}`;

app.get('/', (c) => c.redirect(`${GITHUB}/${GITHUB_USERNAME}`));

app.get('/repos', (c) =>
	c.redirect(`${GITHUB}/${GITHUB_USERNAME}?tab=repositories`)
);
app.get('/followers', (c) =>
	c.redirect(`${GITHUB}/${GITHUB_USERNAME}?tab=followers`)
);
app.get('/following', (c) =>
	c.redirect(`${GITHUB}/${GITHUB_USERNAME}?tab=following`)
);

app.get('/stars/:list?', (c) => {
	const list = c.req.param('list');

	if (typeof list === 'undefined') {
		return c.redirect(`${GITHUB}/${GITHUB_USERNAME}?tab=stars`);
	} else {
		return c.redirect(`${GITHUB}/stars/${GITHUB_USERNAME}/lists/${list}`);
	}
});

app.get('/:repo', (c) => {
	const repo = c.req.param('repo');
	return c.redirect(`${GITHUB}/${GITHUB_USERNAME}/${repo}`);
});

app.get('/commits/:a/:b?', (c) => {
	const a = c.req.param('a');
	const b = c.req.param('b');

	return c.redirect(
		`${GITHUB}/${repo(a, b)}/commits?author=${GITHUB_USERNAME}`
	);
});

app.get('/issues/:a/:b?', (c) => {
	const a = c.req.param('a');
	const b = c.req.param('b');

	return c.redirect(
		`${GITHUB}/${repo(a, b)}/issues?q=is%3Aissue+author%3A${GITHUB_USERNAME}`
	);
});

app.get('/prs/:a/:b?', (c) => {
	const a = c.req.param('a');
	const b = c.req.param('b');

	return c.redirect(
		`${GITHUB}/${repo(a, b)}/pulls?q=is%3Apr+author%3A${GITHUB_USERNAME}`
	);
});

export default app;
