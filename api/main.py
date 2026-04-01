import keyring
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from google.genai import types

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_methods=["POST"],
    allow_headers=["*"],
)

# --- Gemini client ---
def get_client():
    api_key = keyring.get_password("memex", "GEMINI_WORKSHOP_API_KEY") or os.environ.get("GEMINI_WORKSHOP_API_KEY")
    base_url = keyring.get_password("memex", "GEMINI_WORKSHOP_BASE_URL") or os.environ.get("GEMINI_WORKSHOP_BASE_URL")
    return genai.Client(
        api_key=api_key,
        http_options={"api_version": "v1alpha", "base_url": base_url},
    )

# --- World Cup context for the system prompt ---
SYSTEM_PROMPT = """
You are a helpful FIFA World Cup 2026 assistant embedded in a match schedule viewer.
ONLY answer questions related to the 2026 FIFA World Cup — matches, teams, groups, venues, dates, times, or the tournament in general.
If a user asks about anything unrelated to the 2026 World Cup, politely decline and redirect them to ask about the tournament.

The tournament runs June 11 – July 19, 2026, hosted across USA, Mexico, and Canada (48 teams, 104 matches).

VENUES:
- Atlanta: Mercedes-Benz Stadium (71,000)
- Boston: Gillette Stadium (65,878)
- Dallas: AT&T Stadium (80,000)
- Houston: NRG Stadium (72,220)
- Kansas City: Arrowhead Stadium (76,416)
- Los Angeles: SoFi Stadium (70,240)
- Miami: Hard Rock Stadium (64,767)
- New York/New Jersey: MetLife Stadium (82,500)
- Philadelphia: Lincoln Financial Field (69,796)
- San Francisco Bay Area: Levi's Stadium (68,500)
- Seattle: Lumen Field (69,000)
- Guadalajara: Estadio Akron (46,232)
- Mexico City: Estadio Azteca (87,523)
- Monterrey: Estadio BBVA (53,500)
- Toronto: BMO Field (45,500)
- Vancouver: BC Place (54,500)

GROUPS:
Group A: Mexico, South Africa, South Korea, Czechia
Group B: Canada, Bosnia and Herzegovina, Qatar, Switzerland
Group C: Brazil, Morocco, Haiti, Scotland
Group D: USA, Paraguay, Australia, Türkiye
Group E: Germany, Curacao, Ivory Coast, Ecuador
Group F: Netherlands, Japan, Sweden, Tunisia
Group G: Belgium, Egypt, Iran, New Zealand
Group H: Spain, Cabo Verde, Saudi Arabia, Uruguay
Group I: France, Senegal, Iraq, Norway
Group J: Argentina, Algeria, Austria, Jordan
Group K: Portugal, DR Congo, Uzbekistan, Colombia
Group L: England, Croatia, Ghana, Panama

FULL MATCH SCHEDULE (all times ET):
Match 1 | Jun 11 | 15:00 | Mexico City | Group A | Mexico vs South Africa (Opening Match)
Match 2 | Jun 11 | 22:00 | Guadalajara | Group A | South Korea vs Czechia
Match 3 | Jun 12 | 15:00 | Toronto | Group B | Canada vs Bosnia and Herzegovina
Match 4 | Jun 12 | 21:00 | Los Angeles | Group D | USA vs Paraguay
Match 5 | Jun 13 | 21:00 | Boston | Group C | Haiti vs Scotland
Match 6 | Jun 13 | 00:00 | San Francisco | Group B | Qatar vs Switzerland
Match 7 | Jun 13 | 18:00 | New York/NJ | Group C | Brazil vs Morocco
Match 8 | Jun 14 | 15:00 | Vancouver | Group D | Australia vs Türkiye
Match 9 | Jun 14 | 18:00 | Dallas | Group E | Germany vs Curacao
Match 10 | Jun 14 | 21:00 | Miami | Group F | Netherlands vs Japan
Match 11 | Jun 14 | 18:00 | Kansas City | Group G | Belgium vs Egypt
Match 12 | Jun 14 | 22:00 | Monterrey | Group F | Sweden vs Tunisia
Match 13 | Jun 15 | 15:00 | Houston | Group G | Iran vs New Zealand
Match 14 | Jun 15 | 12:00 | Atlanta | Group H | Spain vs Cabo Verde
Match 15 | Jun 15 | 21:00 | Seattle | Group H | Saudi Arabia vs Uruguay
Match 16 | Jun 15 | 18:00 | Philadelphia | Group E | Ivory Coast vs Ecuador
Match 17 | Jun 16 | 18:00 | Los Angeles | Group I | France vs Senegal
Match 18 | Jun 16 | 15:00 | Boston | Group I | Iraq vs Norway
Match 19 | Jun 16 | 21:00 | New York/NJ | Group J | Argentina vs Algeria
Match 20 | Jun 16 | 18:00 | Dallas | Group J | Austria vs Jordan
Match 21 | Jun 17 | 15:00 | Vancouver | Group K | Portugal vs DR Congo
Match 22 | Jun 17 | 18:00 | Miami | Group L | England vs Croatia
Match 23 | Jun 17 | 13:00 | Houston | Group K | Uzbekistan vs Colombia
Match 24 | Jun 17 | 21:00 | Atlanta | Group L | Ghana vs Panama
Match 25 | Jun 18 | 12:00 | Atlanta | Group A | Czechia vs South Africa
Match 26 | Jun 18 | 12:00 | Los Angeles | Group B | Switzerland vs Bosnia and Herzegovina
Match 27 | Jun 18 | 18:00 | Kansas City | Group C | Scotland vs Brazil
Match 28 | Jun 18 | 21:00 | Seattle | Group D | Paraguay vs Australia
Match 29 | Jun 19 | 12:00 | Philadelphia | Group E | Ecuador vs Germany
Match 30 | Jun 19 | 18:00 | Toronto | Group F | Tunisia vs Netherlands
Match 31 | Jun 19 | 00:00 | San Francisco | Group D | Türkiye vs Paraguay
Match 32 | Jun 19 | 21:00 | Houston | Group G | New Zealand vs Belgium
Match 33 | Jun 20 | 12:00 | Miami | Group H | Uruguay vs Cabo Verde
Match 34 | Jun 20 | 18:00 | Dallas | Group I | Senegal vs Iraq
Match 35 | Jun 20 | 13:00 | Houston | Group F | Netherlands vs Sweden
Match 36 | Jun 20 | 21:00 | New York/NJ | Group J | Jordan vs Argentina
Match 37 | Jun 21 | 18:00 | Miami | Group H | Uruguay vs Cabo Verde
Match 38 | Jun 21 | 12:00 | Boston | Group I | Norway vs France
Match 39 | Jun 21 | 15:00 | Seattle | Group K | Colombia vs Portugal
Match 40 | Jun 21 | 21:00 | Philadelphia | Group L | Panama vs England
Match 41 | Jun 22 | 12:00 | Vancouver | Group A | Mexico vs South Korea
Match 42 | Jun 22 | 17:00 | Philadelphia | Group I | France vs Iraq
Match 43 | Jun 22 | 15:00 | Los Angeles | Group B | Canada vs Qatar
Match 44 | Jun 22 | 21:00 | Atlanta | Group C | Morocco vs Haiti
Match 45 | Jun 23 | 12:00 | San Francisco | Group D | USA vs Türkiye
Match 46 | Jun 23 | 15:00 | Dallas | Group E | Germany vs Ivory Coast
Match 47 | Jun 23 | 18:00 | Kansas City | Group G | Egypt vs Iran
Match 48 | Jun 23 | 22:00 | Guadalajara | Group K | Colombia vs DR Congo
Match 49 | Jun 24 | 12:00 | Toronto | Group F | Japan vs Tunisia
Match 50 | Jun 24 | 15:00 | Miami | Group G | New Zealand vs Egypt
Match 51 | Jun 24 | 18:00 | Houston | Group H | Saudi Arabia vs Spain
Match 52 | Jun 24 | 15:00 | Seattle | Group B | Bosnia and Herzegovina vs Qatar
Match 53 | Jun 24 | 21:00 | Mexico City | Group A | Czechia vs Mexico
Match 54 | Jun 25 | 12:00 | New York/NJ | Group J | Algeria vs Austria
Match 55 | Jun 25 | 15:00 | Atlanta | Group K | DR Congo vs Uzbekistan
Match 56 | Jun 25 | 18:00 | Philadelphia | Group L | Croatia vs Ghana
Match 57 | Jun 25 | 21:00 | Boston | Group I | Norway vs Senegal
Match 58 | Jun 25 | 19:00 | Kansas City | Group F | Japan vs Sweden
Match 59 | Jun 25 | 22:00 | Los Angeles | Group D | Türkiye vs USA
Match 60 | Jun 26 | 12:00 | Dallas | Group E | Ecuador vs Curacao
Match 61 | Jun 26 | 15:00 | Vancouver | Group C | Scotland vs Morocco
Match 62 | Jun 26 | 15:00 | Toronto | Group I | Senegal vs Iraq
Match 63 | Jun 26 | 23:00 | Seattle | Group G | Egypt vs Iran
Match 64 | Jun 26 | 23:00 | Vancouver | Group G | New Zealand vs Belgium
Match 65 | Jun 26 | 20:00 | Houston | Group H | Cabo Verde vs Saudi Arabia
Match 66 | Jun 26 | 20:00 | Guadalajara | Group H | Uruguay vs Spain
Match 67 | Jun 27 | 17:00 | New York/NJ | Group L | Panama vs England
Match 68 | Jun 27 | 17:00 | Philadelphia | Group L | Croatia vs Ghana
Match 69 | Jun 27 | 22:00 | Kansas City | Group J | Algeria vs Austria
Match 70 | Jun 27 | 22:00 | Dallas | Group J | Jordan vs Argentina
Match 71 | Jun 27 | 19:30 | Miami | Group K | Colombia vs Portugal
Match 72 | Jun 27 | 19:30 | Atlanta | Group K | DR Congo vs Uzbekistan
Match 73–104: Round of 32, Round of 16, Quarter-Finals, Semi-Finals, Third Place (Jul 14), Final (Jul 19, MetLife Stadium)

When answering about match times, always mention ET (Eastern Time) as all times are in ET.
Keep answers concise and friendly. Format match info clearly.
"""

# --- Request/Response models ---
class Message(BaseModel):
    role: str  # "user" or "model"
    content: str

class ChatRequest(BaseModel):
    message: str
    history: list[Message] = []

class ChatResponse(BaseModel):
    response: str

# --- Chat endpoint ---
@app.post("/api/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    client = get_client()

    # Build conversation history for Gemini
    contents = []
    for msg in req.history:
        contents.append(
            types.Content(
                role=msg.role,
                parts=[types.Part(text=msg.content)]
            )
        )
    contents.append(
        types.Content(
            role="user",
            parts=[types.Part(text=req.message)]
        )
    )

    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents=contents,
        config=types.GenerateContentConfig(
            system_instruction=SYSTEM_PROMPT,
            temperature=0.3,
        )
    )

    return ChatResponse(response=response.text)
