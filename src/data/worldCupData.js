// 2026 FIFA World Cup Schedule Data
// The tournament will be held in USA, Mexico, and Canada from June 11 to July 19, 2026
// Official schedule released by FIFA on February 4, 2024

export const venues = [
  { id: 'atl', name: 'Mercedes-Benz Stadium', city: 'Atlanta', country: 'USA', capacity: 71000 },
  { id: 'bos', name: 'Gillette Stadium', city: 'Boston', country: 'USA', capacity: 65878 },
  { id: 'dal', name: 'AT&T Stadium', city: 'Dallas', country: 'USA', capacity: 80000 },
  { id: 'hou', name: 'NRG Stadium', city: 'Houston', country: 'USA', capacity: 72220 },
  { id: 'kc', name: 'Arrowhead Stadium', city: 'Kansas City', country: 'USA', capacity: 76416 },
  { id: 'la', name: 'SoFi Stadium', city: 'Los Angeles', country: 'USA', capacity: 70240 },
  { id: 'mia', name: 'Hard Rock Stadium', city: 'Miami', country: 'USA', capacity: 64767 },
  { id: 'nyj', name: 'MetLife Stadium', city: 'New York/New Jersey', country: 'USA', capacity: 82500 },
  { id: 'phi', name: 'Lincoln Financial Field', city: 'Philadelphia', country: 'USA', capacity: 69796 },
  { id: 'sf', name: 'Levi\'s Stadium', city: 'San Francisco Bay Area', country: 'USA', capacity: 68500 },
  { id: 'sea', name: 'Lumen Field', city: 'Seattle', country: 'USA', capacity: 69000 },
  { id: 'gdl', name: 'Estadio Akron', city: 'Guadalajara', country: 'Mexico', capacity: 46232 },
  { id: 'mex', name: 'Estadio Azteca', city: 'Mexico City', country: 'Mexico', capacity: 87523 },
  { id: 'mty', name: 'Estadio BBVA', city: 'Monterrey', country: 'Mexico', capacity: 53500 },
  { id: 'tor', name: 'BMO Field', city: 'Toronto', country: 'Canada', capacity: 45500 },
  { id: 'van', name: 'BC Place', city: 'Vancouver', country: 'Canada', capacity: 54500 },
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

// Groups structure - teams will be assigned after the draw on Dec 5, 2025
export const groups = {
  A: {
    id: 'A',
    teams: [
      { name: 'Mexico', pot: 1, flag: '🇲🇽' },
      { name: 'TBD', pot: 2, flag: '⚽' },
      { name: 'TBD', pot: 3, flag: '⚽' },
      { name: 'TBD', pot: 4, flag: '⚽' }
    ]
  },
  B: {
    id: 'B',
    teams: [
      { name: 'Canada', pot: 1, flag: '🇨🇦' },
      { name: 'TBD', pot: 2, flag: '⚽' },
      { name: 'TBD', pot: 3, flag: '⚽' },
      { name: 'TBD', pot: 4, flag: '⚽' }
    ]
  },
  C: {
    id: 'C',
    teams: [
      { name: 'TBD', pot: 1, flag: '⚽' },
      { name: 'TBD', pot: 2, flag: '⚽' },
      { name: 'TBD', pot: 3, flag: '⚽' },
      { name: 'TBD', pot: 4, flag: '⚽' }
    ]
  },
  D: {
    id: 'D',
    teams: [
      { name: 'USA', pot: 1, flag: '🇺🇸' },
      { name: 'TBD', pot: 2, flag: '⚽' },
      { name: 'TBD', pot: 3, flag: '⚽' },
      { name: 'TBD', pot: 4, flag: '⚽' }
    ]
  },
  E: {
    id: 'E',
    teams: [
      { name: 'TBD', pot: 1, flag: '⚽' },
      { name: 'TBD', pot: 2, flag: '⚽' },
      { name: 'TBD', pot: 3, flag: '⚽' },
      { name: 'TBD', pot: 4, flag: '⚽' }
    ]
  },
  F: {
    id: 'F',
    teams: [
      { name: 'TBD', pot: 1, flag: '⚽' },
      { name: 'TBD', pot: 2, flag: '⚽' },
      { name: 'TBD', pot: 3, flag: '⚽' },
      { name: 'TBD', pot: 4, flag: '⚽' }
    ]
  },
  G: {
    id: 'G',
    teams: [
      { name: 'TBD', pot: 1, flag: '⚽' },
      { name: 'TBD', pot: 2, flag: '⚽' },
      { name: 'TBD', pot: 3, flag: '⚽' },
      { name: 'TBD', pot: 4, flag: '⚽' }
    ]
  },
  H: {
    id: 'H',
    teams: [
      { name: 'TBD', pot: 1, flag: '⚽' },
      { name: 'TBD', pot: 2, flag: '⚽' },
      { name: 'TBD', pot: 3, flag: '⚽' },
      { name: 'TBD', pot: 4, flag: '⚽' }
    ]
  },
  I: {
    id: 'I',
    teams: [
      { name: 'TBD', pot: 1, flag: '⚽' },
      { name: 'TBD', pot: 2, flag: '⚽' },
      { name: 'TBD', pot: 3, flag: '⚽' },
      { name: 'TBD', pot: 4, flag: '⚽' }
    ]
  },
  J: {
    id: 'J',
    teams: [
      { name: 'TBD', pot: 1, flag: '⚽' },
      { name: 'TBD', pot: 2, flag: '⚽' },
      { name: 'TBD', pot: 3, flag: '⚽' },
      { name: 'TBD', pot: 4, flag: '⚽' }
    ]
  },
  K: {
    id: 'K',
    teams: [
      { name: 'TBD', pot: 1, flag: '⚽' },
      { name: 'TBD', pot: 2, flag: '⚽' },
      { name: 'TBD', pot: 3, flag: '⚽' },
      { name: 'TBD', pot: 4, flag: '⚽' }
    ]
  },
  L: {
    id: 'L',
    teams: [
      { name: 'TBD', pot: 1, flag: '⚽' },
      { name: 'TBD', pot: 2, flag: '⚽' },
      { name: 'TBD', pot: 3, flag: '⚽' },
      { name: 'TBD', pot: 4, flag: '⚽' }
    ]
  }
};

// Complete match schedule (104 total matches)
export const matches = [
  { id: 1, matchNumber: 1, date: '2026-06-11', time: 'TBD', venue: 'mex', stage: stages.GROUP, group: 'A', description: 'Mexico vs TBD (Opening Match)' },
  { id: 2, matchNumber: 2, date: '2026-06-11', time: 'TBD', venue: 'gdl', stage: stages.GROUP, group: 'A' },
  { id: 3, matchNumber: 3, date: '2026-06-12', time: 'TBD', venue: 'tor', stage: stages.GROUP, group: 'B', description: 'Canada vs TBD' },
  { id: 4, matchNumber: 4, date: '2026-06-12', time: 'TBD', venue: 'la', stage: stages.GROUP, group: 'D', description: 'USA vs TBD' },
  { id: 5, matchNumber: 5, date: '2026-06-13', time: 'TBD', venue: 'bos', stage: stages.GROUP, group: 'C' },
  { id: 6, matchNumber: 6, date: '2026-06-13', time: 'TBD', venue: 'van', stage: stages.GROUP, group: 'D' },
  { id: 7, matchNumber: 7, date: '2026-06-13', time: 'TBD', venue: 'nyj', stage: stages.GROUP, group: 'C' },
  { id: 8, matchNumber: 8, date: '2026-06-13', time: 'TBD', venue: 'sf', stage: stages.GROUP, group: 'B' },
  { id: 9, matchNumber: 9, date: '2026-06-14', time: 'TBD', venue: 'phi', stage: stages.GROUP, group: 'E' },
  { id: 10, matchNumber: 10, date: '2026-06-14', time: 'TBD', venue: 'hou', stage: stages.GROUP, group: 'E' },
  { id: 11, matchNumber: 11, date: '2026-06-14', time: 'TBD', venue: 'dal', stage: stages.GROUP, group: 'F' },
  { id: 12, matchNumber: 12, date: '2026-06-14', time: 'TBD', venue: 'mty', stage: stages.GROUP, group: 'F' },
  { id: 13, matchNumber: 13, date: '2026-06-15', time: 'TBD', venue: 'mia', stage: stages.GROUP, group: 'H' },
  { id: 14, matchNumber: 14, date: '2026-06-15', time: 'TBD', venue: 'atl', stage: stages.GROUP, group: 'H' },
  { id: 15, matchNumber: 15, date: '2026-06-15', time: 'TBD', venue: 'la', stage: stages.GROUP, group: 'G' },
  { id: 16, matchNumber: 16, date: '2026-06-15', time: 'TBD', venue: 'sea', stage: stages.GROUP, group: 'G' },
  { id: 17, matchNumber: 17, date: '2026-06-16', time: 'TBD', venue: 'nyj', stage: stages.GROUP, group: 'I' },
  { id: 18, matchNumber: 18, date: '2026-06-16', time: 'TBD', venue: 'bos', stage: stages.GROUP, group: 'I' },
  { id: 19, matchNumber: 19, date: '2026-06-16', time: 'TBD', venue: 'kc', stage: stages.GROUP, group: 'J' },
  { id: 20, matchNumber: 20, date: '2026-06-16', time: 'TBD', venue: 'sf', stage: stages.GROUP, group: 'J' },
  { id: 21, matchNumber: 21, date: '2026-06-17', time: 'TBD', venue: 'tor', stage: stages.GROUP, group: 'L' },
  { id: 22, matchNumber: 22, date: '2026-06-17', time: 'TBD', venue: 'dal', stage: stages.GROUP, group: 'L' },
  { id: 23, matchNumber: 23, date: '2026-06-17', time: 'TBD', venue: 'hou', stage: stages.GROUP, group: 'K' },
  { id: 24, matchNumber: 24, date: '2026-06-17', time: 'TBD', venue: 'mex', stage: stages.GROUP, group: 'K' },
  { id: 25, matchNumber: 25, date: '2026-06-18', time: 'TBD', venue: 'atl', stage: stages.GROUP, group: 'A' },
  { id: 26, matchNumber: 26, date: '2026-06-18', time: 'TBD', venue: 'la', stage: stages.GROUP, group: 'B' },
  { id: 27, matchNumber: 27, date: '2026-06-18', time: 'TBD', venue: 'van', stage: stages.GROUP, group: 'B', description: 'Canada vs TBD' },
  { id: 28, matchNumber: 28, date: '2026-06-18', time: 'TBD', venue: 'gdl', stage: stages.GROUP, group: 'A', description: 'Mexico vs TBD' },
  { id: 29, matchNumber: 29, date: '2026-06-19', time: 'TBD', venue: 'phi', stage: stages.GROUP, group: 'C' },
  { id: 30, matchNumber: 30, date: '2026-06-19', time: 'TBD', venue: 'bos', stage: stages.GROUP, group: 'C' },
  { id: 31, matchNumber: 31, date: '2026-06-19', time: 'TBD', venue: 'sf', stage: stages.GROUP, group: 'D' },
  { id: 32, matchNumber: 32, date: '2026-06-19', time: 'TBD', venue: 'sea', stage: stages.GROUP, group: 'D', description: 'USA vs TBD' },
  { id: 33, matchNumber: 33, date: '2026-06-20', time: 'TBD', venue: 'tor', stage: stages.GROUP, group: 'E' },
  { id: 34, matchNumber: 34, date: '2026-06-20', time: 'TBD', venue: 'kc', stage: stages.GROUP, group: 'E' },
  { id: 35, matchNumber: 35, date: '2026-06-20', time: 'TBD', venue: 'hou', stage: stages.GROUP, group: 'F' },
  { id: 36, matchNumber: 36, date: '2026-06-20', time: 'TBD', venue: 'mty', stage: stages.GROUP, group: 'F' },
  { id: 37, matchNumber: 37, date: '2026-06-21', time: 'TBD', venue: 'mia', stage: stages.GROUP, group: 'H' },
  { id: 38, matchNumber: 38, date: '2026-06-21', time: 'TBD', venue: 'atl', stage: stages.GROUP, group: 'H' },
  { id: 39, matchNumber: 39, date: '2026-06-21', time: 'TBD', venue: 'la', stage: stages.GROUP, group: 'G' },
  { id: 40, matchNumber: 40, date: '2026-06-21', time: 'TBD', venue: 'van', stage: stages.GROUP, group: 'G' },
  { id: 41, matchNumber: 41, date: '2026-06-22', time: 'TBD', venue: 'nyj', stage: stages.GROUP, group: 'I' },
  { id: 42, matchNumber: 42, date: '2026-06-22', time: 'TBD', venue: 'phi', stage: stages.GROUP, group: 'I' },
  { id: 43, matchNumber: 43, date: '2026-06-22', time: 'TBD', venue: 'dal', stage: stages.GROUP, group: 'J' },
  { id: 44, matchNumber: 44, date: '2026-06-22', time: 'TBD', venue: 'sf', stage: stages.GROUP, group: 'J' },
  { id: 45, matchNumber: 45, date: '2026-06-23', time: 'TBD', venue: 'bos', stage: stages.GROUP, group: 'L' },
  { id: 46, matchNumber: 46, date: '2026-06-23', time: 'TBD', venue: 'tor', stage: stages.GROUP, group: 'L' },
  { id: 47, matchNumber: 47, date: '2026-06-23', time: 'TBD', venue: 'hou', stage: stages.GROUP, group: 'K' },
  { id: 48, matchNumber: 48, date: '2026-06-23', time: 'TBD', venue: 'gdl', stage: stages.GROUP, group: 'K' },
  { id: 49, matchNumber: 49, date: '2026-06-24', time: 'TBD', venue: 'mia', stage: stages.GROUP, group: 'C' },
  { id: 50, matchNumber: 50, date: '2026-06-24', time: 'TBD', venue: 'atl', stage: stages.GROUP, group: 'C' },
  { id: 51, matchNumber: 51, date: '2026-06-24', time: 'TBD', venue: 'van', stage: stages.GROUP, group: 'B', description: 'Canada vs TBD' },
  { id: 52, matchNumber: 52, date: '2026-06-24', time: 'TBD', venue: 'sea', stage: stages.GROUP, group: 'B' },
  { id: 53, matchNumber: 53, date: '2026-06-24', time: 'TBD', venue: 'mex', stage: stages.GROUP, group: 'A', description: 'Mexico vs TBD' },
  { id: 54, matchNumber: 54, date: '2026-06-24', time: 'TBD', venue: 'mty', stage: stages.GROUP, group: 'A' },
  { id: 55, matchNumber: 55, date: '2026-06-25', time: 'TBD', venue: 'phi', stage: stages.GROUP, group: 'E' },
  { id: 56, matchNumber: 56, date: '2026-06-25', time: 'TBD', venue: 'nyj', stage: stages.GROUP, group: 'E' },
  { id: 57, matchNumber: 57, date: '2026-06-25', time: 'TBD', venue: 'dal', stage: stages.GROUP, group: 'F' },
  { id: 58, matchNumber: 58, date: '2026-06-25', time: 'TBD', venue: 'kc', stage: stages.GROUP, group: 'F' },
  { id: 59, matchNumber: 59, date: '2026-06-25', time: 'TBD', venue: 'la', stage: stages.GROUP, group: 'D', description: 'USA vs TBD' },
  { id: 60, matchNumber: 60, date: '2026-06-25', time: 'TBD', venue: 'sf', stage: stages.GROUP, group: 'D' },
  { id: 61, matchNumber: 61, date: '2026-06-26', time: 'TBD', venue: 'bos', stage: stages.GROUP, group: 'I' },
  { id: 62, matchNumber: 62, date: '2026-06-26', time: 'TBD', venue: 'tor', stage: stages.GROUP, group: 'I' },
  { id: 63, matchNumber: 63, date: '2026-06-26', time: 'TBD', venue: 'sea', stage: stages.GROUP, group: 'G' },
  { id: 64, matchNumber: 64, date: '2026-06-26', time: 'TBD', venue: 'van', stage: stages.GROUP, group: 'G' },
  { id: 65, matchNumber: 65, date: '2026-06-26', time: 'TBD', venue: 'hou', stage: stages.GROUP, group: 'H' },
  { id: 66, matchNumber: 66, date: '2026-06-26', time: 'TBD', venue: 'gdl', stage: stages.GROUP, group: 'H' },
  { id: 67, matchNumber: 67, date: '2026-06-27', time: 'TBD', venue: 'nyj', stage: stages.GROUP, group: 'L' },
  { id: 68, matchNumber: 68, date: '2026-06-27', time: 'TBD', venue: 'phi', stage: stages.GROUP, group: 'L' },
  { id: 69, matchNumber: 69, date: '2026-06-27', time: 'TBD', venue: 'kc', stage: stages.GROUP, group: 'J' },
  { id: 70, matchNumber: 70, date: '2026-06-27', time: 'TBD', venue: 'dal', stage: stages.GROUP, group: 'J' },
  { id: 71, matchNumber: 71, date: '2026-06-27', time: 'TBD', venue: 'mia', stage: stages.GROUP, group: 'K' },
  { id: 72, matchNumber: 72, date: '2026-06-27', time: 'TBD', venue: 'atl', stage: stages.GROUP, group: 'K' },
  { id: 73, matchNumber: 73, date: '2026-06-28', time: 'TBD', venue: 'la', stage: stages.R32, description: 'Group A runners-up vs Group B runners-up' },
  { id: 74, matchNumber: 74, date: '2026-06-29', time: 'TBD', venue: 'bos', stage: stages.R32, description: 'Group E winners vs Group A/B/C/D/F third place' },
  { id: 75, matchNumber: 75, date: '2026-06-29', time: 'TBD', venue: 'mty', stage: stages.R32, description: 'Group F winners vs Group C runners-up' },
  { id: 76, matchNumber: 76, date: '2026-06-29', time: 'TBD', venue: 'hou', stage: stages.R32, description: 'Group C winners vs Group F runners-up' },
  { id: 77, matchNumber: 77, date: '2026-06-30', time: 'TBD', venue: 'nyj', stage: stages.R32, description: 'Group I winners vs Group C/D/F/G/H third place' },
  { id: 78, matchNumber: 78, date: '2026-06-30', time: 'TBD', venue: 'dal', stage: stages.R32, description: 'Group E runners-up vs Group I runners-up' },
  { id: 79, matchNumber: 79, date: '2026-06-30', time: 'TBD', venue: 'mex', stage: stages.R32, description: 'Group A winners vs Group C/E/F/H/I third place' },
  { id: 80, matchNumber: 80, date: '2026-07-01', time: 'TBD', venue: 'atl', stage: stages.R32, description: 'Group L winners vs Group E/H/I/J/K third place' },
  { id: 81, matchNumber: 81, date: '2026-07-01', time: 'TBD', venue: 'sf', stage: stages.R32, description: 'Group D winners vs Group B/E/F/I/J third place' },
  { id: 82, matchNumber: 82, date: '2026-07-01', time: 'TBD', venue: 'sea', stage: stages.R32, description: 'Group G winners vs Group A/E/H/I/J third place' },
  { id: 83, matchNumber: 83, date: '2026-07-02', time: 'TBD', venue: 'tor', stage: stages.R32, description: 'Group K runners-up vs Group L runners-up' },
  { id: 84, matchNumber: 84, date: '2026-07-02', time: 'TBD', venue: 'la', stage: stages.R32, description: 'Group H winners vs Group J runners-up' },
  { id: 85, matchNumber: 85, date: '2026-07-02', time: 'TBD', venue: 'van', stage: stages.R32, description: 'Group B winners vs Group E/F/G/I/J third place' },
  { id: 86, matchNumber: 86, date: '2026-07-03', time: 'TBD', venue: 'mia', stage: stages.R32, description: 'Group J winners vs Group H runners-up' },
  { id: 87, matchNumber: 87, date: '2026-07-03', time: 'TBD', venue: 'kc', stage: stages.R32, description: 'Group K winners vs Group D/E/I/J/L third place' },
  { id: 88, matchNumber: 88, date: '2026-07-03', time: 'TBD', venue: 'dal', stage: stages.R32, description: 'Group D runners-up vs Group G runners-up' },
  { id: 89, matchNumber: 89, date: '2026-07-04', time: 'TBD', venue: 'phi', stage: stages.R16, description: 'Winner M74 vs Winner M77' },
  { id: 90, matchNumber: 90, date: '2026-07-04', time: 'TBD', venue: 'hou', stage: stages.R16, description: 'Winner M73 vs Winner M75' },
  { id: 91, matchNumber: 91, date: '2026-07-05', time: 'TBD', venue: 'nyj', stage: stages.R16, description: 'Winner M76 vs Winner M78' },
  { id: 92, matchNumber: 92, date: '2026-07-05', time: 'TBD', venue: 'mex', stage: stages.R16, description: 'Winner M79 vs Winner M80' },
  { id: 93, matchNumber: 93, date: '2026-07-06', time: 'TBD', venue: 'dal', stage: stages.R16, description: 'Winner M83 vs Winner M84' },
  { id: 94, matchNumber: 94, date: '2026-07-06', time: 'TBD', venue: 'sea', stage: stages.R16, description: 'Winner M81 vs Winner M82' },
  { id: 95, matchNumber: 95, date: '2026-07-07', time: 'TBD', venue: 'atl', stage: stages.R16, description: 'Winner M86 vs Winner M88' },
  { id: 96, matchNumber: 96, date: '2026-07-07', time: 'TBD', venue: 'van', stage: stages.R16, description: 'Winner M85 vs Winner M87' },
  { id: 97, matchNumber: 97, date: '2026-07-09', time: 'TBD', venue: 'bos', stage: stages.QF, description: 'Winner M89 vs Winner M90' },
  { id: 98, matchNumber: 98, date: '2026-07-10', time: 'TBD', venue: 'la', stage: stages.QF, description: 'Winner M93 vs Winner M94' },
  { id: 99, matchNumber: 99, date: '2026-07-11', time: 'TBD', venue: 'mia', stage: stages.QF, description: 'Winner M91 vs Winner M92' },
  { id: 100, matchNumber: 100, date: '2026-07-11', time: 'TBD', venue: 'kc', stage: stages.QF, description: 'Winner M95 vs Winner M96' },
  { id: 101, matchNumber: 101, date: '2026-07-14', time: 'TBD', venue: 'dal', stage: stages.SF, description: 'Winner M97 vs Winner M98' },
  { id: 102, matchNumber: 102, date: '2026-07-15', time: 'TBD', venue: 'atl', stage: stages.SF, description: 'Winner M99 vs Winner M100' },
  { id: 103, matchNumber: 103, date: '2026-07-18', time: 'TBD', venue: 'mia', stage: stages.TPO, description: 'Loser M101 vs Loser M102' },
  { id: 104, matchNumber: 104, date: '2026-07-19', time: 'TBD', venue: 'nyj', stage: stages.FINAL, description: 'Winner M101 vs Winner M102' },
];

// Helper function to get venue details
export const getVenue = (venueId) => {
  return venues.find(v => v.id === venueId);
};

// Helper function to get matches by stage
export const getMatchesByStage = (stage) => {
  return matches.filter(m => m.stage === stage);
};

// Helper function to get match by match number
export const getMatchByNumber = (matchNumber) => {
  return matches.find(m => m.matchNumber === matchNumber);
};

// Parse match relationships from descriptions
// Returns array of match numbers that feed into the given match
export const getFeederMatches = (match) => {
  if (!match || !match.description) return [];
  
  // Extract match numbers from descriptions like "Winner M74 vs Winner M77"
  const matchNumberRegex = /M(\d+)/g;
  const feederNumbers = [];
  let matchFound;
  
  while ((matchFound = matchNumberRegex.exec(match.description)) !== null) {
    feederNumbers.push(parseInt(matchFound[1]));
  }
  
  return feederNumbers.map(num => getMatchByNumber(num)).filter(Boolean);
};

// Find which match this match feeds into (forward navigation)
export const getNextMatch = (match) => {
  if (!match) return null;
  
  // Only show next match for knockout stage matches
  if (match.stage === stages.GROUP) return null;
  
  // Search for any match whose description contains this match number
  const matchNumberPattern = `M${match.matchNumber}`;
  
  // Find all matches that reference this match
  const nextMatches = matches.filter(m => 
    m.description && m.description.includes(matchNumberPattern) && m.matchNumber > match.matchNumber
  );
  
  if (nextMatches.length === 0) return null;
  
  // If there are multiple matches (e.g., semi-finals can go to Final or Third Place),
  // prioritize the one with "Winner" over "Loser"
  const winnerMatch = nextMatches.find(m => m.description.includes(`Winner ${matchNumberPattern}`));
  if (winnerMatch) return winnerMatch;
  
  // Otherwise return the first match found
  return nextMatches[0];
};

// Helper function to get matches by date
export const getMatchesByDate = (date) => {
  return matches.filter(m => m.date === date);
};

// Helper function to get unique dates
export const getUniqueDates = () => {
  return [...new Set(matches.map(m => m.date))].sort();
};
