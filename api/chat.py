import json
import os
from http.server import BaseHTTPRequestHandler


def get_secret(key):
    """Try env var first (Vercel), fall back to keyring (local dev)."""
    val = os.environ.get(key)
    if not val:
        try:
            import keyring as kr
            val = kr.get_password("memex", key)
        except Exception:
            pass
    return val


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
ROUND OF 32:
Match 73 | Jun 28 | 15:00 | Los Angeles | Group A 2nd vs Group B 2nd
Match 74 | Jun 29 | 16:30 | Boston | Group E 1st vs Best 3rd (Groups A/B/C/D/F)
Match 75 | Jun 29 | 16:30 | Monterrey | Group F 1st vs Group C 2nd
Match 76 | Jun 29 | 13:00 | Houston | Group C 1st vs Group F 2nd
Match 77 | Jun 30 | 13:00 | New York/NJ | Group I 1st vs Best 3rd (Groups C/D/F/G/H)
Match 78 | Jun 30 | 17:00 | Dallas | Group E 2nd vs Group I 2nd
Match 79 | Jun 30 | 21:00 | Mexico City | Group A 1st vs Best 3rd (Groups C/E/F/H/I)
Match 80 | Jul 01 | 12:00 | Atlanta | Group L 1st vs Best 3rd (Groups E/H/I/J/K)
Match 81 | Jul 01 | 20:00 | San Francisco | Group D 1st vs Best 3rd (Groups B/E/F/I/J)
Match 82 | Jul 01 | 16:00 | Seattle | Group G 1st vs Best 3rd (Groups A/E/H/I/J)
Match 83 | Jul 02 | 21:00 | Toronto | Group K 2nd vs Group L 2nd
Match 84 | Jul 02 | 15:00 | Los Angeles | Group H 1st vs Group J 2nd
Match 85 | Jul 02 | 23:00 | Vancouver | Group B 1st vs Best 3rd (Groups E/F/G/I/J)
Match 86 | Jul 03 | 18:00 | Miami | Group J 1st vs Group H 2nd
Match 87 | Jul 03 | 14:00 | Dallas | Group K 1st vs Best 3rd (Groups D/E/I/J/L)
Match 88 | Jul 03 | 21:30 | Kansas City | Group D 2nd vs Group G 2nd

ROUND OF 16:
Match 89 | Jul 04 | 17:00 | Philadelphia | Winner M74 vs Winner M77
Match 90 | Jul 04 | 13:00 | Houston | Winner M73 vs Winner M75
Match 91 | Jul 05 | 16:00 | New York/NJ | Winner M76 vs Winner M78
Match 92 | Jul 05 | 20:00 | Mexico City | Winner M79 vs Winner M80
Match 93 | Jul 06 | 15:00 | Dallas | Winner M83 vs Winner M84
Match 94 | Jul 06 | 20:00 | Seattle | Winner M81 vs Winner M82
Match 95 | Jul 07 | 12:00 | Atlanta | Winner M86 vs Winner M88
Match 96 | Jul 07 | 16:00 | Vancouver | Winner M85 vs Winner M87

QUARTER-FINALS:
Match 97 | Jul 09 | 16:00 | Boston | Winner M89 vs Winner M90
Match 98 | Jul 10 | 15:00 | Los Angeles | Winner M93 vs Winner M94
Match 99 | Jul 11 | 17:00 | Miami | Winner M91 vs Winner M92
Match 100 | Jul 11 | 21:00 | Kansas City | Winner M95 vs Winner M96

SEMI-FINALS:
Match 101 | Jul 14 | 15:00 | Dallas | Winner M97 vs Winner M98
Match 102 | Jul 15 | 15:00 | Atlanta | Winner M99 vs Winner M100

THIRD PLACE:
Match 103 | Jul 18 | 17:00 | Miami | Loser M101 vs Loser M102

FINAL:
Match 104 | Jul 19 | 15:00 | New York/NJ (MetLife Stadium) | Winner M101 vs Winner M102

When answering about match times, always mention ET (Eastern Time).
Keep answers concise and friendly.
Do NOT use markdown syntax — no asterisks, no bold, no bullet symbols. Use plain text only.
For lists, use a simple dash and space (- ) at the start of each line.
Use line breaks to separate items for readability.
"""


class handler(BaseHTTPRequestHandler):

    def log_message(self, format, *args):
        pass  # suppress default request logs

    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    def do_OPTIONS(self):
        self.send_response(200)
        self._cors()
        self.end_headers()

    def do_POST(self):
        from google import genai
        from google.genai import types

        try:
            length = int(self.headers.get("Content-Length", 0))
            body = json.loads(self.rfile.read(length))

            client = genai.Client(
                api_key=get_secret("GEMINI_WORKSHOP_API_KEY"),
                http_options={
                    "api_version": "v1alpha",
                    "base_url": get_secret("GEMINI_WORKSHOP_BASE_URL"),
                },
            )

            contents = []
            for msg in body.get("history", []):
                contents.append(types.Content(
                    role=msg["role"],
                    parts=[types.Part(text=msg["content"])]
                ))
            contents.append(types.Content(
                role="user",
                parts=[types.Part(text=body["message"])]
            ))

            resp = client.models.generate_content(
                model="gemini-3-flash-preview",
                contents=contents,
                config=types.GenerateContentConfig(
                    system_instruction=SYSTEM_PROMPT,
                    temperature=0.3,
                ),
            )

            result = json.dumps({"response": resp.text})
            self.send_response(200)
        except Exception as e:
            result = json.dumps({"error": str(e)})
            self.send_response(500)

        self._cors()
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(result.encode())
