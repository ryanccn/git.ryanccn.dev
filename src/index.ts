import { Hono } from 'hono';

const app = new Hono();

const GITHUB_USERNAME = 'ryanccn';

app.get('/', (c) => c.redirect(`https://github.com/${GITHUB_USERNAME}`));

app.get('/repos', (c) =>
	c.redirect(`https://github.com/${GITHUB_USERNAME}?tab=repositories`)
);
app.get('/followers', (c) =>
	c.redirect(`https://github.com/${GITHUB_USERNAME}?tab=followers`)
);
app.get('/following', (c) =>
	c.redirect(`https://github.com/${GITHUB_USERNAME}?tab=following`)
);

app.get('/stars/:list?', (c) => {
	const list = c.req.param('list');

	if (typeof list === 'undefined') {
		return c.redirect(`https://github.com/${GITHUB_USERNAME}?tab=stars`);
	} else {
		return c.redirect(
			`https://github.com/stars/${GITHUB_USERNAME}/lists/${list}`
		);
	}
});

app.get('/:repo', (c) => {
	const repo = c.req.param('repo');
	return c.redirect(`https://github.com/${GITHUB_USERNAME}/${repo}`);
});

app.get('/commits/:a/:b?', (c) => {
	const a = c.req.param('a');
	const b = c.req.param('b');

	const repo =
		typeof b !== 'undefined' ? `${a}/${b}` : `${GITHUB_USERNAME}/${a}`;
	return c.redirect(
		`https://github.com/${repo}/commits?author=${GITHUB_USERNAME}`
	);
});

app.get('/issues/:a/:b?', (c) => {
	const a = c.req.param('a');
	const b = c.req.param('b');

	const repo =
		typeof b !== 'undefined' ? `${a}/${b}` : `${GITHUB_USERNAME}/${a}`;
	return c.redirect(
		`https://github.com/${repo}/issues?q=is%3Aissue+author%3A${GITHUB_USERNAME}`
	);
});

app.get('/prs/:a/:b?', (c) => {
	const a = c.req.param('a');
	const b = c.req.param('b');

	const repo =
		typeof b !== 'undefined' ? `${a}/${b}` : `${GITHUB_USERNAME}/${a}`;
	return c.redirect(
		`https://github.com/${repo}/pulls?q=is%3Apr+author%3A${GITHUB_USERNAME}`
	);
});

export default app;
