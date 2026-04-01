#!/bin/bash
set -e

APP_PORT=${APP_PORT:-3000}

echo "Starting World Cup 2026 Match Viewer..."

# Start FastAPI backend
echo "Starting API server on port 8000..."
cd "$(dirname "$0")/api"
uv run uvicorn main:app --host 0.0.0.0 --port 8000 --reload \
  --reload-exclude '.venv' --reload-exclude '__pycache__' &
API_PID=$!

cd "$(dirname "$0")"

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
