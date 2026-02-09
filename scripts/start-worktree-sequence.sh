#!/usr/bin/env bash
set -euo pipefail

integration_branch="${1:-integration/versioning-worktree-flow}"
base_dir="${2:-/tmp/ody-worktrees}"

tracks=(
  "feat/reliability-hardening:wt-reliability"
  "feat/prompt-course-chooser:wt-chooser"
  "feat/player-active-outline:wt-active-outline"
  "feat/content-validation-guardrails:wt-guardrails"
)

mkdir -p "$base_dir"

for track in "${tracks[@]}"; do
  branch="${track%%:*}"
  folder="${track##*:}"
  target="$base_dir/$folder"

  if git show-ref --quiet "refs/heads/$branch"; then
    echo "Branch exists, skipping create: $branch"
  else
    git branch "$branch" "$integration_branch"
  fi

  if [[ -d "$target" ]]; then
    echo "Worktree exists, skipping add: $target"
  else
    git worktree add "$target" "$branch"
  fi

done

echo "Worktree sequence ready under $base_dir"
