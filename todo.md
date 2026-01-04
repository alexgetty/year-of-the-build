# Launch Day Tasks

## GitHub Pages Setup

- [ ] Add GitHub Actions workflow (`.github/workflows/deploy.yml`)
  ```yaml
  name: Deploy to GitHub Pages

  on:
    push:
      branches: [main]
    workflow_dispatch:

  permissions:
    contents: read
    pages: write
    id-token: write

  concurrency:
    group: pages
    cancel-in-progress: false

  jobs:
    build:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: actions/setup-node@v4
          with:
            node-version: 20
            cache: npm
        - run: npm ci
        - run: npm run build
        - uses: actions/upload-pages-artifact@v3
          with:
            path: dist

    deploy:
      needs: build
      runs-on: ubuntu-latest
      environment:
        name: github-pages
        url: ${{ steps.deployment.outputs.page_url }}
      steps:
        - uses: actions/deploy-pages@v4
          id: deployment
  ```

- [ ] Enable GitHub Pages in repo settings
  - Repo → Settings → Pages
  - Source: **GitHub Actions** (not "Deploy from branch")

- [ ] Add custom domain
  - Repo → Settings → Pages → Custom domain: `yearofthebuild.xyz`
  - Check "Enforce HTTPS" after DNS propagates

## DNS Configuration

Add these records at your registrar:

| Type | Name | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | alexgetty.github.io |

## Verify

- [ ] Push workflow, wait for Actions to complete
- [ ] Check https://yearofthebuild.xyz loads
- [ ] Check https://www.yearofthebuild.xyz redirects

## Post-Launch

- [ ] Commit this todo.md deletion
- [ ] Write launch devlog
