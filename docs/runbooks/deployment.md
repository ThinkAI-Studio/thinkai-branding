# Deployment and rollback runbook

## Initial Vercel setup

1. Import `bnhminh1010/portfolio` into the existing Vercel project.
2. Set `main` as the production branch and keep the current custom domain attached.
3. Confirm pull requests produce preview deployments and pushes to `main` produce production deployments.
4. Do not add `VERCEL_TOKEN`, `VERCEL_ORG_ID` or `VERCEL_PROJECT_ID` as GitHub Actions secrets; this repository uses Vercel Git Integration.

## GitHub merge policy

Configure a branch ruleset for `main` in the GitHub repository settings. Require a pull request before merging, dismiss stale approvals when new commits are pushed, and require these checks before merge:

- `Quality / Quality`
- `Quality / Workflow lint`
- `Security / Dependency audit`
- `Security / CodeQL`
- `Dependency Review / Dependency Review`

Keep direct pushes to `main` restricted to maintainers. This is an external GitHub setting, so it cannot be enforced by a file inside this repository.

## Release verification

1. Open the Vercel preview from the pull request.
2. Check `/`, `/cv` and `/lab` at desktop and mobile widths.
3. Confirm `https://thinkai.id.vn/og-image.png` returns the current 1200×630 PNG.
4. Merge only after Quality, Security, Dependency Review and Vercel Preview checks succeed.

## Domain Migration & DNS (Infrastructure Task)

> **TODO (Infrastructure):** The domain migration from `binhminh.thinkai.id.vn` to `thinkai.id.vn` for this ThinkAI Studio project is an external Vercel dashboard and DNS configuration step outside this repository.
> 1. Attach `thinkai.id.vn` as the primary canonical production domain for this repository on Vercel.
> 2. `binhminh.thinkai.id.vn` is strictly reserved for the future standalone personal portfolio repository when that repository is deployed.

## Rollback

Use the Vercel dashboard to promote the last known-good production deployment. Then open a follow-up pull request that restores the source change; a dashboard rollback is an operational mitigation, not the permanent source-of-truth fix.
