# test-repo

test-repo — managed by the DevAI platform.

> Onboarded to the **DevAI** platform. The presence of `.platform/devai.yaml`
> on the default branch enrols this repo; CI quality gates and PR/release
> automation live under `.github/`.

## Getting started

```bash
git clone https://github.com/tesserix/test-repo.git
cd test-repo
```

## Development

This repo ships with default quality gates:

- **CI** (`.github/workflows/ci.yml`) — lint, test and build run automatically
  for the detected stack on every push and pull request.
- **PR validation** (`.github/workflows/pr.yml`) — pull request titles must
  follow [Conventional Commits](https://www.conventionalcommits.org/).
- **Releases** (`.github/workflows/release.yml`) — pushing a `v*` tag cuts a
  GitHub Release with auto-generated notes.
- **Dependabot** keeps GitHub Actions and dependencies up to date.

## Contributing

1. Branch from the default branch.
2. Open a pull request with a Conventional-Commit title (e.g. `feat: ...`).
3. Ensure CI is green and obtain a review before merging.
