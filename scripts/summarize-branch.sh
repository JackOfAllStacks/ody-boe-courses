#!/usr/bin/env bash
set -euo pipefail

branch="${1:-$(git branch --show-current)}"
base="${2:-main}"
out_dir="docs/branch-summaries"
out_file="$out_dir/${branch//\//-}.md"

merge_base="$(git merge-base "$base" "$branch")"
mapfile -t commits < <(git log --no-merges --pretty=format:'%h%x09%s' "$merge_base..$branch")

feature="No commits yet"
if [[ ${#commits[@]} -gt 0 ]]; then
  feature="${commits[0]#*$'\t'}"
fi

mkdir -p "$out_dir"
{
  echo "# Branch Summary: $branch"
  echo
  echo "- Feature: $feature"
  echo "- Base branch: $base"
  echo "- Commit count: ${#commits[@]}"
  echo
  echo "## Commits"

  if [[ ${#commits[@]} -eq 0 ]]; then
    echo "- No commits on this branch yet."
  else
    for line in "${commits[@]}"; do
      hash="${line%%$'\t'*}"
      subject="${line#*$'\t'}"
      echo "- $hash: $subject"
    done
  fi
} > "$out_file"

echo "Wrote $out_file"
