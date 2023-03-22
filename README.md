# git.ryanccn.dev

A dead simple [Cloudflare Worker](https://workers.cloudflare.com/) for GitHub redirects.

Powered by [Hono](https://hono.dev/).

## Routes

- `/` - user page
- `/repos` - user repositories tab
- `/:repo` - repository under user
- `/followers` - user followers tab
- `/following` - user following tab
- `/stars/:list?` - user stars tab / specific stars list
- `/commits/:a/:b?` - user commits on repository (owner optional)
- `/issues/:a/:b?` - issues on repository (owner optional)
- `/prs/:a/:b?` - pull requests on repository (owner optional)
