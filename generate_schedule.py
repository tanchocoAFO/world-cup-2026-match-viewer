#!/usr/bin/env python3
"""
Generate the correct FIFA World Cup 2026 schedule data file
Based on official FIFA schedule released February 4, 2024
"""

# Match data: (match_num, date, venue_id, group, description)
matches_data = [
    # GROUP STAGE MATCHDAY 1
    # Thursday, June 11, 2026
    (1, '2026-06-11', 'mex', 'A', 'Opening Match'),
    (2, '2026-06-11', 'gdl', 'A', None),
    
    # Friday, June 12, 2026
    (3, '2026-06-12', 'tor', 'B', None),
    (4, '2026-06-12', 'la', 'D', None),
    
    # Saturday, June 13, 2026
    (5, '2026-06-13', 'bos', 'C', None),
    (6, '2026-06-13', 'van', 'D', None),
    (7, '2026-06-13', 'nyj', 'C', None),
    (8, '2026-06-13', 'sf', 'B', None),
    
    # Sunday, June 14, 2026
    (9, '2026-06-14', 'phi', 'E', None),
    (10, '2026-06-14', 'hou', 'E', None),
    (11, '2026-06-14', 'dal', 'F', None),
    (12, '2026-06-14', 'mty', 'F', None),
    
    # Monday, June 15, 2026
    (13, '2026-06-15', 'mia', 'H', None),
    (14, '2026-06-15', 'atl', 'H', None),
    (15, '2026-06-15', 'la', 'G', None),
    (16, '2026-06-15', 'sea', 'G', None),
    
    # Tuesday, June 16, 2026
    (17, '2026-06-16', 'nyj', 'I', None),
    (18, '2026-06-16', 'bos', 'I', None),
    (19, '2026-06-16', 'kc', 'J', None),
    (20, '2026-06-16', 'sf', 'J', None),
    
    # Wednesday, June 17, 2026
    (21, '2026-06-17', 'tor', 'L', None),
    (22, '2026-06-17', 'dal', 'L', None),
    (23, '2026-06-17', 'hou', 'K', None),
    (24, '2026-06-17', 'mex', 'K', None),
    
    # GROUP STAGE MATCHDAY 2
    # Thursday, June 18, 2026
    (25, '2026-06-18', 'atl', 'A', None),
    (26, '2026-06-18', 'la', 'B', None),
    (27, '2026-06-18', 'van', 'B', None),
    (28, '2026-06-18', 'gdl', 'A', None),
    
    # Friday, June 19, 2026
    (29, '2026-06-19', 'phi', 'C', None),
    (30, '2026-06-19', 'bos', 'C', None),
    (31, '2026-06-19', 'sf', 'D', None),
    (32, '2026-06-19', 'sea', 'D', None),
    
    # Saturday, June 20, 2026
    (33, '2026-06-20', 'tor', 'E', None),
    (34, '2026-06-20', 'kc', 'E', None),
    (35, '2026-06-20', 'hou', 'F', None),
    (36, '2026-06-20', 'mty', 'F', None),
    
    # Sunday, June 21, 2026
    (37, '2026-06-21', 'mia', 'H', None),
    (38, '2026-06-21', 'atl', 'H', None),
    (39, '2026-06-21', 'la', 'G', None),
    (40, '2026-06-21', 'van', 'G', None),
    
    # Monday, June 22, 2026
    (41, '2026-06-22', 'nyj', 'I', None),
    (42, '2026-06-22', 'phi', 'I', None),
    (43, '2026-06-22', 'dal', 'J', None),
    (44, '2026-06-22', 'sf', 'J', None),
    
    # Tuesday, June 23, 2026
    (45, '2026-06-23', 'bos', 'L', None),
    (46, '2026-06-23', 'tor', 'L', None),
    (47, '2026-06-23', 'hou', 'K', None),
    (48, '2026-06-23', 'gdl', 'K', None),
    
    # GROUP STAGE MATCHDAY 3
    # Wednesday, June 24, 2026
    (49, '2026-06-24', 'mia', 'C', None),
    (50, '2026-06-24', 'atl', 'C', None),
    (51, '2026-06-24', 'van', 'B', None),
    (52, '2026-06-24', 'sea', 'B', None),
    (53, '2026-06-24', 'mex', 'A', None),
    (54, '2026-06-24', 'mty', 'A', None),
    
    # Thursday, June 25, 2026
    (55, '2026-06-25', 'phi', 'E', None),
    (56, '2026-06-25', 'nyj', 'E', None),
    (57, '2026-06-25', 'dal', 'F', None),
    (58, '2026-06-25', 'kc', 'F', None),
    (59, '2026-06-25', 'la', 'D', None),
    (60, '2026-06-25', 'sf', 'D', None),
    
    # Friday, June 26, 2026
    (61, '2026-06-26', 'bos', 'I', None),
    (62, '2026-06-26', 'tor', 'I', None),
    (63, '2026-06-26', 'sea', 'G', None),
    (64, '2026-06-26', 'van', 'G', None),
    (65, '2026-06-26', 'hou', 'H', None),
    (66, '2026-06-26', 'gdl', 'H', None),
    
    # Saturday, June 27, 2026
    (67, '2026-06-27', 'nyj', 'L', None),
    (68, '2026-06-27', 'phi', 'L', None),
    (69, '2026-06-27', 'kc', 'J', None),
    (70, '2026-06-27', 'dal', 'J', None),
    (71, '2026-06-27', 'mia', 'K', None),
    (72, '2026-06-27', 'atl', 'K', None),
]

# Knockout matches
knockout_matches = [
    # ROUND OF 32
    (73, '2026-06-28', 'la', 'R32', 'Group A runners-up vs Group B runners-up'),
    (74, '2026-06-29', 'bos', 'R32', 'Group E winners vs Group A/B/C/D/F third place'),
    (75, '2026-06-29', 'mty', 'R32', 'Group F winners vs Group C runners-up'),
    (76, '2026-06-29', 'hou', 'R32', 'Group C winners vs Group F runners-up'),
    (77, '2026-06-30', 'nyj', 'R32', 'Group I winners vs Group C/D/F/G/H third place'),
    (78, '2026-06-30', 'dal', 'R32', 'Group E runners-up vs Group I runners-up'),
    (79, '2026-06-30', 'mex', 'R32', 'Group A winners vs Group C/E/F/H/I third place'),
    (80, '2026-07-01', 'atl', 'R32', 'Group L winners vs Group E/H/I/J/K third place'),
    (81, '2026-07-01', 'sf', 'R32', 'Group D winners vs Group B/E/F/I/J third place'),
    (82, '2026-07-01', 'sea', 'R32', 'Group G winners vs Group A/E/H/I/J third place'),
    (83, '2026-07-02', 'tor', 'R32', 'Group K runners-up vs Group L runners-up'),
    (84, '2026-07-02', 'la', 'R32', 'Group H winners vs Group J runners-up'),
    (85, '2026-07-02', 'van', 'R32', 'Group B winners vs Group E/F/G/I/J third place'),
    (86, '2026-07-03', 'mia', 'R32', 'Group J winners vs Group H runners-up'),
    (87, '2026-07-03', 'kc', 'R32', 'Group K winners vs Group D/E/I/J/L third place'),
    (88, '2026-07-03', 'dal', 'R32', 'Group D runners-up vs Group G runners-up'),
    
    # ROUND OF 16
    (89, '2026-07-04', 'phi', 'R16', 'Winner Match 74 vs Winner Match 77'),
    (90, '2026-07-04', 'hou', 'R16', 'Winner Match 73 vs Winner Match 75'),
    (91, '2026-07-05', 'nyj', 'R16', 'Winner Match 76 vs Winner Match 78'),
    (92, '2026-07-05', 'mex', 'R16', 'Winner Match 79 vs Winner Match 80'),
    (93, '2026-07-06', 'dal', 'R16', 'Winner Match 83 vs Winner Match 84'),
    (94, '2026-07-06', 'sea', 'R16', 'Winner Match 81 vs Winner Match 82'),
    (95, '2026-07-07', 'atl', 'R16', 'Winner Match 86 vs Winner Match 88'),
    (96, '2026-07-07', 'van', 'R16', 'Winner Match 85 vs Winner Match 87'),
    
    # QUARTER-FINALS
    (97, '2026-07-09', 'bos', 'QF', 'Winner Match 89 vs Winner Match 90'),
    (98, '2026-07-10', 'la', 'QF', 'Winner Match 93 vs Winner Match 94'),
    (99, '2026-07-11', 'mia', 'QF', 'Winner Match 91 vs Winner Match 92'),
    (100, '2026-07-11', 'kc', 'QF', 'Winner Match 95 vs Winner Match 96'),
    
    # SEMI-FINALS
    (101, '2026-07-14', 'dal', 'SF', 'Winner Match 97 vs Winner Match 98'),
    (102, '2026-07-15', 'atl', 'SF', 'Winner Match 99 vs Winner Match 100'),
    
    # THIRD PLACE
    (103, '2026-07-18', 'mia', 'TPO', 'Loser Match 101 vs Loser Match 102'),
    
    # FINAL
    (104, '2026-07-19', 'nyj', 'FINAL', 'Winner Match 101 vs Winner Match 102'),
]

stage_map = {
    'A': 'GROUP', 'B': 'GROUP', 'C': 'GROUP', 'D': 'GROUP',
    'E': 'GROUP', 'F': 'GROUP', 'G': 'GROUP', 'H': 'GROUP',
    'I': 'GROUP', 'J': 'GROUP', 'K': 'GROUP', 'L': 'GROUP',
    'R32': 'R32', 'R16': 'R16', 'QF': 'QF', 'SF': 'SF', 'TPO': 'TPO', 'FINAL': 'FINAL'
}

# Generate JavaScript file
js_content = '''// 2026 FIFA World Cup Schedule Data
// The tournament will be held in USA, Mexico, and Canada from June 11 to July 19, 2026
// Official schedule released by FIFA on February 4, 2024

export const venues = [
  { id: 'atl', name: 'Mercedes-Benz Stadium', city: 'Atlanta', country: 'USA' },
  { id: 'bos', name: 'Gillette Stadium', city: 'Boston', country: 'USA' },
  { id: 'dal', name: 'AT&T Stadium', city: 'Dallas', country: 'USA' },
  { id: 'hou', name: 'NRG Stadium', city: 'Houston', country: 'USA' },
  { id: 'kc', name: 'Arrowhead Stadium', city: 'Kansas City', country: 'USA' },
  { id: 'la', name: 'SoFi Stadium', city: 'Los Angeles', country: 'USA' },
  { id: 'mia', name: 'Hard Rock Stadium', city: 'Miami', country: 'USA' },
  { id: 'nyj', name: 'MetLife Stadium', city: 'New York/New Jersey', country: 'USA' },
  { id: 'phi', name: 'Lincoln Financial Field', city: 'Philadelphia', country: 'USA' },
  { id: 'sf', name: 'Levi\\'s Stadium', city: 'San Francisco Bay Area', country: 'USA' },
  { id: 'sea', name: 'Lumen Field', city: 'Seattle', country: 'USA' },
  { id: 'gdl', name: 'Estadio Akron', city: 'Guadalajara', country: 'Mexico' },
  { id: 'mex', name: 'Estadio Azteca', city: 'Mexico City', country: 'Mexico' },
  { id: 'mty', name: 'Estadio BBVA', city: 'Monterrey', country: 'Mexico' },
  { id: 'tor', name: 'BMO Field', city: 'Toronto', country: 'Canada' },
  { id: 'van', name: 'BC Place', city: 'Vancouver', country: 'Canada' },
];

export const stages = {
  GROUP: 'Group Stage',
  R32: 'Round of 32',
  R16: 'Round of 16',
  QF: 'Quarter-Finals',
  SF: 'Semi-Finals',
  TPO: 'Third Place',
  FINAL: 'Final'
};

// Complete match schedule (104 total matches)
export const matches = [
'''

# Add group stage matches
for match_num, date, venue, group, desc in matches_data:
    stage = 'stages.GROUP'
    group_str = f", group: '{group}'"
    desc_str = f", description: '{desc}'" if desc else ''
    js_content += f"  {{ id: {match_num}, matchNumber: {match_num}, date: '{date}', time: 'TBD', venue: '{venue}', stage: {stage}{group_str}{desc_str} }},\n"

# Add knockout matches
for match_num, date, venue, stage_code, desc in knockout_matches:
    stage = f'stages.{stage_code}'
    desc_str = f", description: '{desc}'" if desc else ''
    js_content += f"  {{ id: {match_num}, matchNumber: {match_num}, date: '{date}', time: 'TBD', venue: '{venue}', stage: {stage}{desc_str} }},\n"

# Add helper functions
js_content += '''];

// Helper function to get venue details
export const getVenue = (venueId) => {
  return venues.find(v => v.id === venueId);
};

// Helper function to get matches by stage
export const getMatchesByStage = (stage) => {
  return matches.filter(m => m.stage === stage);
};

// Helper function to get matches by date
export const getMatchesByDate = (date) => {
  return matches.filter(m => m.date === date);
};

// Helper function to get unique dates
export const getUniqueDates = () => {
  return [...new Set(matches.map(m => m.date))].sort();
};
'''

# Write to file
with open('src/data/worldCupData.js', 'w') as f:
    f.write(js_content)

print("✅ Generated worldCupData.js with correct official FIFA schedule!")
print(f"   Total matches: {len(matches_data) + len(knockout_matches)}")
