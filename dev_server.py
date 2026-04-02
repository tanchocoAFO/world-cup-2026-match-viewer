#!/usr/bin/env python3
"""Local dev server for the /api/chat endpoint."""
from http.server import HTTPServer
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
from api.chat import handler

if __name__ == "__main__":
    port = int(os.environ.get("API_PORT", 8000))
    print(f"API server running on http://localhost:{port}")
    HTTPServer(("0.0.0.0", port), handler).serve_forever()
