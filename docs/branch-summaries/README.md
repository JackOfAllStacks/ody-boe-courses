# Branch Summaries

Generate concise branch summaries at the end of a worktree/feature branch:

- Current branch: `npm run summary:branch`
- Specific branch: `npm run summary:branch -- feat/version-badge`
- Specific branch with custom base: `npm run summary:branch -- feat/version-badge integration/versioning-worktree-flow`

Outputs are written to `docs/branch-summaries/<branch>.md`.
