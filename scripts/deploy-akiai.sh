#!/usr/bin/env bash
# Build the atlas for https://akiai.cn/atlas/ and sync it to the Tencent Cloud server.
# The site is served by Caddy from /var/www/akiai, so the subpath needs no extra server config.
set -euo pipefail

SSH_HOST=${ATLAS_SSH_HOST:-122.51.11.40}
SSH_USER=${ATLAS_SSH_USER:-root}
SSH_KEY=${ATLAS_SSH_KEY:-$HOME/.ssh/tencent-akiai_ed25519}
REMOTE_DIR=${ATLAS_REMOTE_DIR:-/var/www/akiai/atlas}

cd "$(dirname "$0")/.."

npm run build:atlas

ssh -i "$SSH_KEY" -o BatchMode=yes "$SSH_USER@$SSH_HOST" \
	"install -d -o ubuntu -g ubuntu -m 0755 $REMOTE_DIR"

rsync -az --delete -e "ssh -i $SSH_KEY -o BatchMode=yes" \
	dist/ "$SSH_USER@$SSH_HOST:$REMOTE_DIR/"

ssh -i "$SSH_KEY" -o BatchMode=yes "$SSH_USER@$SSH_HOST" \
	"chown -R ubuntu:ubuntu $REMOTE_DIR"

index=$(curl -fsS https://akiai.cn/atlas/)
bundle=$(printf '%s' "$index" | grep -oE '/atlas/assets/index-[A-Za-z0-9_-]+\.js' | head -1)
test -n "$bundle" || { echo "no hashed bundle referenced by /atlas/" >&2; exit 1; }
curl -fsS -o /dev/null "https://akiai.cn$bundle"
curl -fsS -o /dev/null https://akiai.cn/atlas/models/atlas.json
curl -fsS -o /dev/null https://akiai.cn/atlas/models/body-0.bin.gz
echo "deployed https://akiai.cn/atlas/ ($bundle)"
