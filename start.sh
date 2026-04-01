#!/bin/bash
set -e

APP_PORT=${APP_PORT:-3000}
REPO_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "Starting World Cup 2026 Match Viewer..."

# Start API server (Vercel-compatible handler, runs locally via dev_server.py)
echo "Starting API server on port 8000..."
cd "$REPO_DIR"
cd api && uv run python ../dev_server.py &
API_PID=$!

cd "$REPO_DIR"

# Start Vite frontend
echo "Starting frontend on port $APP_PORT..."
npm run dev -- --port $APP_PORT &
VITE_PID=$!

echo ""
echo "✅ App running at http://localhost:$APP_PORT"
echo "   API at http://localhost:8000"
echo "   Press Ctrl+C to stop both servers"

trap "kill $API_PID $VITE_PID 2>/dev/null; exit" INT TERM
wait
