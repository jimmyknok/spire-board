#!/usr/bin/env bash
set -euo pipefail

REPO_NAME="${REPO_NAME:-slay-the-spire-guide}"
VISIBILITY="${VISIBILITY:-public}"
DESCRIPTION="${DESCRIPTION:-Chinese Slay the Spire decision guide site}"
API_ROOT="${GITHUB_API_URL:-https://api.github.com}"

if [[ -z "${GITHUB_TOKEN:-}" ]]; then
  echo "Missing GITHUB_TOKEN."
  echo "Create a fine-grained token with Repository access: All repositories."
  echo "Repository permissions: Administration, Contents, Pages, Workflows = Read and write."
  echo "Then run: GITHUB_TOKEN=... $0"
  exit 1
fi

if [[ "$VISIBILITY" != "public" && "$VISIBILITY" != "private" ]]; then
  echo "VISIBILITY must be public or private."
  exit 1
fi

api() {
  local method="$1"
  local path="$2"
  local body="${3:-}"
  local response_file
  response_file="$(mktemp)"
  local status

  if [[ -n "$body" ]]; then
    status="$(curl -sS -o "$response_file" -w "%{http_code}" -X "$method" \
      -H "Accept: application/vnd.github+json" \
      -H "Authorization: Bearer ${GITHUB_TOKEN}" \
      -H "X-GitHub-Api-Version: 2022-11-28" \
      -d "$body" \
      "${API_ROOT}${path}")"
  else
    status="$(curl -sS -o "$response_file" -w "%{http_code}" -X "$method" \
      -H "Accept: application/vnd.github+json" \
      -H "Authorization: Bearer ${GITHUB_TOKEN}" \
      -H "X-GitHub-Api-Version: 2022-11-28" \
      "${API_ROOT}${path}")"
  fi

  if [[ "$status" -lt 200 || "$status" -gt 299 ]]; then
    echo "GitHub API ${method} ${path} failed with HTTP ${status}." >&2
    python3 -m json.tool "$response_file" >&2 || sed -n '1,80p' "$response_file" >&2
    return 1
  fi

  sed -n '1,$p' "$response_file"
}

json_get() {
  python3 -c "import json,sys; print(json.load(sys.stdin).get('$1', ''))"
}

LOGIN="$(api GET /user | json_get login)"
OWNER="${GITHUB_OWNER:-$LOGIN}"
FULL_NAME="${OWNER}/${REPO_NAME}"

echo "Publishing ${FULL_NAME} (${VISIBILITY})..."

if api GET "/repos/${FULL_NAME}" >/tmp/sts_repo.json 2>/dev/null; then
  echo "Repository already exists, reusing it."
else
  PRIVATE_VALUE="false"
  if [[ "$VISIBILITY" == "private" ]]; then
    PRIVATE_VALUE="true"
  fi

  BODY="$(REPO_NAME="$REPO_NAME" DESCRIPTION="$DESCRIPTION" PRIVATE_VALUE="$PRIVATE_VALUE" python3 -c 'import json,os; print(json.dumps({"name": os.environ["REPO_NAME"], "description": os.environ["DESCRIPTION"], "private": os.environ["PRIVATE_VALUE"] == "true", "auto_init": False}))')"

  if [[ "$OWNER" == "$LOGIN" ]]; then
    api POST /user/repos "$BODY" >/tmp/sts_repo.json
  else
    api POST "/orgs/${OWNER}/repos" "$BODY" >/tmp/sts_repo.json
  fi
fi

HTML_URL="$(python3 -c 'import json; print(json.load(open("/tmp/sts_repo.json")).get("html_url", ""))')"
CLONE_URL="https://github.com/${FULL_NAME}.git"

if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$CLONE_URL"
else
  git remote add origin "$CLONE_URL"
fi

git -c "http.extraheader=AUTHORIZATION: Bearer ${GITHUB_TOKEN}" push -u origin main

api POST "/repos/${FULL_NAME}/pages" '{"build_type":"workflow"}' >/tmp/sts_pages.json 2>/dev/null || true

echo "Repository: ${HTML_URL:-https://github.com/${FULL_NAME}}"
echo "Pages workflow pushed. Check Actions for deployment status:"
echo "https://github.com/${FULL_NAME}/actions"
