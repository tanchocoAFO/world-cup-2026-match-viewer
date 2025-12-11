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

// Groups structure - Updated after draw on Dec 5, 2025
// Position order follows FIFA's draw allocation (not pot order)
export const groups = {
  A: {
    id: 'A',
    teams: [
      { name: 'Mexico', pot: 1, flag: '🇲🇽', position: 1 },
      { name: 'South Africa', pot: 3, flag: '🇿🇦', position: 2 },
      { name: 'South Korea', pot: 2, flag: '🇰🇷', position: 3 },
      { name: 'Euro. Playoff D (CZE/DEN/MKD/IRL)', pot: 4, flag: '⚽', position: 4 }
    ]
  },
  B: {
    id: 'B',
    teams: [
      { name: 'Canada', pot: 1, flag: '🇨🇦', position: 1 },
      { name: 'Euro. Playoff A (BIH/ITA/NIR/WAL)', pot: 4, flag: '⚽', position: 2 },
      { name: 'Qatar', pot: 3, flag: '🇶🇦', position: 3 },
      { name: 'Switzerland', pot: 2, flag: '🇨🇭', position: 4 }
    ]
  },
  C: {
    id: 'C',
    teams: [
      { name: 'Brazil', pot: 1, flag: '🇧🇷', position: 1 },
      { name: 'Morocco', pot: 2, flag: '🇲🇦', position: 2 },
      { name: 'Haiti', pot: 4, flag: '🇭🇹', position: 3 },
      { name: 'Scotland', pot: 3, flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', position: 4 }
    ]
  },
  D: {
    id: 'D',
    teams: [
      { name: 'USA', pot: 1, flag: '🇺🇸', position: 1 },
      { name: 'Paraguay', pot: 3, flag: '🇵🇾', position: 2 },
      { name: 'Australia', pot: 2, flag: '🇦🇺', position: 3 },
      { name: 'Euro. Playoff C (KOS/ROU/SVK/TUR)', pot: 4, flag: '⚽', position: 4 }
    ]
  },
  E: {
    id: 'E',
    teams: [
      { name: 'Germany', pot: 1, flag: '🇩🇪', position: 1 },
      { name: 'Curacao', pot: 4, flag: '🇨🇼', position: 2 },
      { name: 'Ivory Coast', pot: 3, flag: '🇨🇮', position: 3 },
      { name: 'Ecuador', pot: 2, flag: '🇪🇨', position: 4 }
    ]
  },
  F: {
    id: 'F',
    teams: [
      { name: 'Netherlands', pot: 1, flag: '🇳🇱', position: 1 },
      { name: 'Japan', pot: 2, flag: '🇯🇵', position: 2 },
      { name: 'Euro. Playoff B (ALB/POL/SWE/UKR)', pot: 4, flag: '⚽', position: 3 },
      { name: 'Tunisia', pot: 3, flag: '🇹🇳', position: 4 }
    ]
  },
  G: {
    id: 'G',
    teams: [
      { name: 'Belgium', pot: 1, flag: '🇧🇪', position: 1 },
      { name: 'Egypt', pot: 3, flag: '🇪🇬', position: 2 },
      { name: 'Iran', pot: 2, flag: '🇮🇷', position: 3 },
      { name: 'New Zealand', pot: 4, flag: '🇳🇿', position: 4 }
    ]
  },
  H: {
    id: 'H',
    teams: [
      { name: 'Spain', pot: 1, flag: '🇪🇸', position: 1 },
      { name: 'Cape Verde', pot: 4, flag: '🇨🇻', position: 2 },
      { name: 'Saudi Arabia', pot: 3, flag: '🇸🇦', position: 3 },
      { name: 'Uruguay', pot: 2, flag: '🇺🇾', position: 4 }
    ]
  },
  I: {
    id: 'I',
    teams: [
      { name: 'France', pot: 1, flag: '🇫🇷', position: 1 },
      { name: 'Senegal', pot: 2, flag: '🇸🇳', position: 2 },
      { name: 'FIFA Playoff 2 (BOL/IRQ/SUR)', pot: 4, flag: '⚽', position: 3 },
      { name: 'Norway', pot: 3, flag: '🇳🇴', position: 4 }
    ]
  },
  J: {
    id: 'J',
    teams: [
      { name: 'Argentina', pot: 1, flag: '🇦🇷', position: 1 },
      { name: 'Algeria', pot: 3, flag: '🇩🇿', position: 2 },
      { name: 'Austria', pot: 2, flag: '🇦🇹', position: 3 },
      { name: 'Jordan', pot: 4, flag: '🇯🇴', position: 4 }
    ]
  },
  K: {
    id: 'K',
    teams: [
      { name: 'Portugal', pot: 1, flag: '🇵🇹', position: 1 },
      { name: 'FIFA Playoff 1 (COD/JAM/NCL)', pot: 4, flag: '⚽', position: 2 },
      { name: 'Uzbekistan', pot: 3, flag: '🇺🇿', position: 3 },
      { name: 'Colombia', pot: 2, flag: '🇨🇴', position: 4 }
    ]
  },
  L: {
    id: 'L',
    teams: [
      { name: 'England', pot: 1, flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', position: 1 },
      { name: 'Croatia', pot: 2, flag: '🇭🇷', position: 2 },
      { name: 'Ghana', pot: 4, flag: '🇬🇭', position: 3 },
      { name: 'Panama', pot: 3, flag: '🇵🇦', position: 4 }
    ]
  }
};

// Complete match schedule (104 total matches)
export const matches = [
  { id: 1, matchNumber: 1, date: '2026-06-11', time: '15:00', venue: 'mex', stage: stages.GROUP, group: 'A', description: 'Mexico vs South Africa (Opening Match)' },
  { id: 2, matchNumber: 2, date: '2026-06-11', time: '22:00', venue: 'gdl', stage: stages.GROUP, group: 'A', description: 'South Korea vs Euro. Playoff D (CZE/DEN/MKD/IRL)' },
  { id: 3, matchNumber: 3, date: '2026-06-12', time: '15:00', venue: 'tor', stage: stages.GROUP, group: 'B', description: 'Canada vs Euro. Playoff A (BIH/ITA/NIR/WAL)' },
  { id: 4, matchNumber: 4, date: '2026-06-12', time: '21:00', venue: 'la', stage: stages.GROUP, group: 'D', description: 'USA vs Paraguay' },
  { id: 5, matchNumber: 5, date: '2026-06-13', time: '21:00', venue: 'bos', stage: stages.GROUP, group: 'C', description: 'Haiti vs Scotland' },
  { id: 6, matchNumber: 6, date: '2026-06-13', time: '00:00', venue: 'sf', stage: stages.GROUP, group: 'B', description: 'Qatar vs Switzerland' },
  { id: 7, matchNumber: 7, date: '2026-06-13', time: '18:00', venue: 'nyj', stage: stages.GROUP, group: 'C', description: 'Brazil vs Morocco' },
  { id: 8, matchNumber: 8, date: '2026-06-14', time: '15:00', venue: 'van', stage: stages.GROUP, group: 'D', description: 'Australia vs Euro. Playoff C (KOS/ROU/SVK/TUR)' },
  { id: 9, matchNumber: 9, date: '2026-06-14', time: '19:00', venue: 'phi', stage: stages.GROUP, group: 'E', description: 'Ivory Coast vs Ecuador' },
  { id: 10, matchNumber: 10, date: '2026-06-14', time: '13:00', venue: 'hou', stage: stages.GROUP, group: 'E', description: 'Germany vs Curacao' },
  { id: 11, matchNumber: 11, date: '2026-06-14', time: '16:00', venue: 'dal', stage: stages.GROUP, group: 'F', description: 'Netherlands vs Japan' },
  { id: 12, matchNumber: 12, date: '2026-06-14', time: '22:00', venue: 'mty', stage: stages.GROUP, group: 'F', description: 'Euro. Playoff B (ALB/POL/SWE/UKR) vs Tunisia' },
  { id: 13, matchNumber: 13, date: '2026-06-15', time: '18:00', venue: 'mia', stage: stages.GROUP, group: 'H', description: 'Saudi Arabia vs Uruguay' },
  { id: 14, matchNumber: 14, date: '2026-06-15', time: '12:00', venue: 'atl', stage: stages.GROUP, group: 'H', description: 'Spain vs Cabo Verde' },
  { id: 15, matchNumber: 15, date: '2026-06-15', time: '21:00', venue: 'la', stage: stages.GROUP, group: 'G', description: 'Iran vs New Zealand' },
  { id: 16, matchNumber: 16, date: '2026-06-15', time: '15:00', venue: 'sea', stage: stages.GROUP, group: 'G', description: 'Belgium vs Egypt' },
  { id: 17, matchNumber: 17, date: '2026-06-16', time: '15:00', venue: 'nyj', stage: stages.GROUP, group: 'I', description: 'France vs Senegal' },
  { id: 18, matchNumber: 18, date: '2026-06-16', time: '15:00', venue: 'bos', stage: stages.GROUP, group: 'I', description: 'FIFA Playoff 2 (BOL/IRQ/SUR) vs Norway' },
  { id: 19, matchNumber: 19, date: '2026-06-16', time: '21:00', venue: 'kc', stage: stages.GROUP, group: 'J', description: 'Argentina vs Algeria' },
  { id: 20, matchNumber: 20, date: '2026-06-17', time: '00:00', venue: 'sf', stage: stages.GROUP, group: 'J', description: 'Austria vs Jordan' },
  { id: 21, matchNumber: 21, date: '2026-06-17', time: '19:00', venue: 'tor', stage: stages.GROUP, group: 'L', description: 'Ghana vs Panama' },
  { id: 22, matchNumber: 22, date: '2026-06-17', time: '16:00', venue: 'dal', stage: stages.GROUP, group: 'L', description: 'England vs Croatia' },
  { id: 23, matchNumber: 23, date: '2026-06-17', time: '13:00', venue: 'hou', stage: stages.GROUP, group: 'K', description: 'Portugal vs FIFA Playoff 1 (COD/JAM/NCL)' },
  { id: 24, matchNumber: 24, date: '2026-06-17', time: '22:00', venue: 'mex', stage: stages.GROUP, group: 'K', description: 'Uzbekistan vs Colombia' },
  { id: 25, matchNumber: 25, date: '2026-06-18', time: '12:00', venue: 'atl', stage: stages.GROUP, group: 'A', description: 'Euro. Playoff D (CZE/DEN/MKD/IRL) vs South Africa' },
  { id: 26, matchNumber: 26, date: '2026-06-18', time: '12:00', venue: 'la', stage: stages.GROUP, group: 'B', description: 'Switzerland vs Euro. Playoff A (BIH/ITA/NIR/WAL)' },
  { id: 27, matchNumber: 27, date: '2026-06-18', time: '18:00', venue: 'van', stage: stages.GROUP, group: 'B', description: 'Canada vs Qatar' },
  { id: 28, matchNumber: 28, date: '2026-06-18', time: '21:00', venue: 'gdl', stage: stages.GROUP, group: 'A', description: 'Mexico vs South Korea' },
  { id: 29, matchNumber: 29, date: '2026-06-19', time: '21:00', venue: 'phi', stage: stages.GROUP, group: 'C', description: 'Brazil vs Haiti' },
  { id: 30, matchNumber: 30, date: '2026-06-19', time: '18:00', venue: 'bos', stage: stages.GROUP, group: 'C', description: 'Scotland vs Morocco' },
  { id: 31, matchNumber: 31, date: '2026-06-19', time: '00:00', venue: 'sf', stage: stages.GROUP, group: 'D', description: 'Euro. Playoff C (KOS/ROU/SVK/TUR) vs Paraguay' },
  { id: 32, matchNumber: 32, date: '2026-06-19', time: '15:00', venue: 'sea', stage: stages.GROUP, group: 'D', description: 'USA vs Australia' },
  { id: 33, matchNumber: 33, date: '2026-06-20', time: '16:00', venue: 'tor', stage: stages.GROUP, group: 'E', description: 'Germany vs Ivory Coast' },
  { id: 34, matchNumber: 34, date: '2026-06-20', time: '20:00', venue: 'kc', stage: stages.GROUP, group: 'E', description: 'Ecuador vs Curacao' },
  { id: 35, matchNumber: 35, date: '2026-06-20', time: '13:00', venue: 'hou', stage: stages.GROUP, group: 'F', description: 'Netherlands vs Euro. Playoff B (ALB/POL/SWE/UKR)' },
  { id: 36, matchNumber: 36, date: '2026-06-20', time: '00:00', venue: 'mty', stage: stages.GROUP, group: 'F', description: 'Tunisia vs Japan' },
  { id: 37, matchNumber: 37, date: '2026-06-21', time: '18:00', venue: 'mia', stage: stages.GROUP, group: 'H', description: 'Uruguay vs Cabo Verde' },
  { id: 38, matchNumber: 38, date: '2026-06-21', time: '12:00', venue: 'atl', stage: stages.GROUP, group: 'H', description: 'Spain vs Saudi Arabia' },
  { id: 39, matchNumber: 39, date: '2026-06-21', time: '15:00', venue: 'la', stage: stages.GROUP, group: 'G', description: 'Belgium vs Iran' },
  { id: 40, matchNumber: 40, date: '2026-06-21', time: '21:00', venue: 'van', stage: stages.GROUP, group: 'G', description: 'New Zealand vs Egypt' },
  { id: 41, matchNumber: 41, date: '2026-06-22', time: '20:00', venue: 'nyj', stage: stages.GROUP, group: 'I', description: 'Norway vs Senegal' },
  { id: 42, matchNumber: 42, date: '2026-06-22', time: '17:00', venue: 'phi', stage: stages.GROUP, group: 'I', description: 'France vs FIFA Playoff 2 (BOL/IRQ/SUR)' },
  { id: 43, matchNumber: 43, date: '2026-06-22', time: '13:00', venue: 'dal', stage: stages.GROUP, group: 'J', description: 'Argentina vs Austria' },
  { id: 44, matchNumber: 44, date: '2026-06-22', time: '23:00', venue: 'sf', stage: stages.GROUP, group: 'J', description: 'Jordan vs Algeria' },
  { id: 45, matchNumber: 45, date: '2026-06-23', time: '16:00', venue: 'bos', stage: stages.GROUP, group: 'L', description: 'England vs Ghana' },
  { id: 46, matchNumber: 46, date: '2026-06-23', time: '19:00', venue: 'tor', stage: stages.GROUP, group: 'L', description: 'Panama vs Croatia' },
  { id: 47, matchNumber: 47, date: '2026-06-23', time: '13:00', venue: 'hou', stage: stages.GROUP, group: 'K', description: 'Portugal vs Uzbekistan' },
  { id: 48, matchNumber: 48, date: '2026-06-23', time: '22:00', venue: 'gdl', stage: stages.GROUP, group: 'K', description: 'Colombia vs FIFA Playoff 1 (COD/JAM/NCL)' },
  { id: 49, matchNumber: 49, date: '2026-06-24', time: '18:00', venue: 'mia', stage: stages.GROUP, group: 'C', description: 'Scotland vs Brazil' },
  { id: 50, matchNumber: 50, date: '2026-06-24', time: '15:00', venue: 'atl', stage: stages.GROUP, group: 'C', description: 'Morocco vs Haiti' },
  { id: 51, matchNumber: 51, date: '2026-06-24', time: '15:00', venue: 'van', stage: stages.GROUP, group: 'B', description: 'Switzerland vs Canada' },
  { id: 52, matchNumber: 52, date: '2026-06-24', time: '15:00', venue: 'sea', stage: stages.GROUP, group: 'B', description: 'Euro. Playoff A (BIH/ITA/NIR/WAL) vs Qatar' },
  { id: 53, matchNumber: 53, date: '2026-06-24', time: '21:00', venue: 'mex', stage: stages.GROUP, group: 'A', description: 'Euro. Playoff D (CZE/DEN/MKD/IRL) vs Mexico' },
  { id: 54, matchNumber: 54, date: '2026-06-24', time: '21:00', venue: 'mty', stage: stages.GROUP, group: 'A', description: 'South Africa vs South Korea' },
  { id: 55, matchNumber: 55, date: '2026-06-25', time: '16:00', venue: 'phi', stage: stages.GROUP, group: 'E', description: 'Curacao vs Ivory Coast' },
  { id: 56, matchNumber: 56, date: '2026-06-25', time: '16:00', venue: 'nyj', stage: stages.GROUP, group: 'E', description: 'Ecuador vs Germany' },
  { id: 57, matchNumber: 57, date: '2026-06-25', time: '19:00', venue: 'dal', stage: stages.GROUP, group: 'F', description: 'Tunisia vs Netherlands' },
  { id: 58, matchNumber: 58, date: '2026-06-25', time: '19:00', venue: 'kc', stage: stages.GROUP, group: 'F', description: 'Japan vs Euro. Playoff B (ALB/POL/SWE/UKR)' },
  { id: 59, matchNumber: 59, date: '2026-06-25', time: '22:00', venue: 'la', stage: stages.GROUP, group: 'D', description: 'Euro. Playoff C (KOS/ROU/SVK/TUR) vs USA' },
  { id: 60, matchNumber: 60, date: '2026-06-25', time: '22:00', venue: 'sf', stage: stages.GROUP, group: 'D', description: 'Paraguay vs Australia' },
  { id: 61, matchNumber: 61, date: '2026-06-26', time: '15:00', venue: 'bos', stage: stages.GROUP, group: 'I', description: 'Norway vs France' },
  { id: 62, matchNumber: 62, date: '2026-06-26', time: '15:00', venue: 'tor', stage: stages.GROUP, group: 'I', description: 'Senegal vs FIFA Playoff 2 (BOL/IRQ/SUR)' },
  { id: 63, matchNumber: 63, date: '2026-06-26', time: '23:00', venue: 'sea', stage: stages.GROUP, group: 'G', description: 'Egypt vs Iran' },
  { id: 64, matchNumber: 64, date: '2026-06-26', time: '23:00', venue: 'van', stage: stages.GROUP, group: 'G', description: 'New Zealand vs Belgium' },
  { id: 65, matchNumber: 65, date: '2026-06-26', time: '20:00', venue: 'hou', stage: stages.GROUP, group: 'H', description: 'Cabo Verde vs Saudi Arabia' },
  { id: 66, matchNumber: 66, date: '2026-06-26', time: '20:00', venue: 'gdl', stage: stages.GROUP, group: 'H', description: 'Uruguay vs Spain' },
  { id: 67, matchNumber: 67, date: '2026-06-27', time: '17:00', venue: 'nyj', stage: stages.GROUP, group: 'L', description: 'Panama vs England' },
  { id: 68, matchNumber: 68, date: '2026-06-27', time: '17:00', venue: 'phi', stage: stages.GROUP, group: 'L', description: 'Croatia vs Ghana' },
  { id: 69, matchNumber: 69, date: '2026-06-27', time: '22:00', venue: 'kc', stage: stages.GROUP, group: 'J', description: 'Algeria vs Austria' },
  { id: 70, matchNumber: 70, date: '2026-06-27', time: '22:00', venue: 'dal', stage: stages.GROUP, group: 'J', description: 'Jordan vs Argentina' },
  { id: 71, matchNumber: 71, date: '2026-06-27', time: '19:30', venue: 'mia', stage: stages.GROUP, group: 'K', description: 'Colombia vs Portugal' },
  { id: 72, matchNumber: 72, date: '2026-06-27', time: '19:30', venue: 'atl', stage: stages.GROUP, group: 'K', description: 'FIFA Playoff 1 (COD/JAM/NCL) vs Uzbekistan' },
  { id: 73, matchNumber: 73, date: '2026-06-28', time: '15:00', venue: 'la', stage: stages.R32, description: 'Group A 2nd place vs Group B 2nd place' },
  { id: 74, matchNumber: 74, date: '2026-06-29', time: '16:30', venue: 'bos', stage: stages.R32, description: 'Group E 1st place vs Best 3rd of Groups A/B/C/D/F' },
  { id: 75, matchNumber: 75, date: '2026-06-29', time: '16:30', venue: 'mty', stage: stages.R32, description: 'Group F 1st place vs Group C 2nd place' },
  { id: 76, matchNumber: 76, date: '2026-06-29', time: '13:00', venue: 'hou', stage: stages.R32, description: 'Group C 1st place vs Group F 2nd place' },
  { id: 77, matchNumber: 77, date: '2026-06-30', time: '13:00', venue: 'nyj', stage: stages.R32, description: 'Group I 1st place vs Best 3rd of Groups C/D/F/G/H' },
  { id: 78, matchNumber: 78, date: '2026-06-30', time: '17:00', venue: 'dal', stage: stages.R32, description: 'Group E 2nd place vs Group I 2nd place' },
  { id: 79, matchNumber: 79, date: '2026-06-30', time: '21:00', venue: 'mex', stage: stages.R32, description: 'Group A 1st place vs Best 3rd of Groups C/E/F/H/I' },
  { id: 80, matchNumber: 80, date: '2026-07-01', time: '12:00', venue: 'atl', stage: stages.R32, description: 'Group L 1st place vs Best 3rd of Groups E/H/I/J/K' },
  { id: 81, matchNumber: 81, date: '2026-07-01', time: '20:00', venue: 'sf', stage: stages.R32, description: 'Group D 1st place vs Best 3rd of Groups B/E/F/I/J' },
  { id: 82, matchNumber: 82, date: '2026-07-01', time: '16:00', venue: 'sea', stage: stages.R32, description: 'Group G 1st place vs Best 3rd of Groups A/E/H/I/J' },
  { id: 83, matchNumber: 83, date: '2026-07-02', time: '21:00', venue: 'tor', stage: stages.R32, description: 'Group K 2nd place vs Group L 2nd place' },
  { id: 84, matchNumber: 84, date: '2026-07-02', time: '15:00', venue: 'la', stage: stages.R32, description: 'Group H 1st place vs Group J 2nd place' },
  { id: 85, matchNumber: 85, date: '2026-07-02', time: '23:00', venue: 'van', stage: stages.R32, description: 'Group B 1st place vs Best 3rd of Groups E/F/G/I/J' },
  { id: 86, matchNumber: 86, date: '2026-07-03', time: '18:00', venue: 'mia', stage: stages.R32, description: 'Group J 1st place vs Group H 2nd place' },
  { id: 87, matchNumber: 87, date: '2026-07-03', time: '14:00', venue: 'dal', stage: stages.R32, description: 'Group K 1st place vs Best 3rd of Groups D/E/I/J/L' },
  { id: 88, matchNumber: 88, date: '2026-07-03', time: '21:30', venue: 'kc', stage: stages.R32, description: 'Group D 2nd place vs Group G 2nd place' },
  { id: 89, matchNumber: 89, date: '2026-07-04', time: '17:00', venue: 'phi', stage: stages.R16, description: 'Winner M74 vs Winner M77' },
  { id: 90, matchNumber: 90, date: '2026-07-04', time: '13:00', venue: 'hou', stage: stages.R16, description: 'Winner M73 vs Winner M75' },
  { id: 91, matchNumber: 91, date: '2026-07-05', time: '16:00', venue: 'nyj', stage: stages.R16, description: 'Winner M76 vs Winner M78' },
  { id: 92, matchNumber: 92, date: '2026-07-05', time: '20:00', venue: 'mex', stage: stages.R16, description: 'Winner M79 vs Winner M80' },
  { id: 93, matchNumber: 93, date: '2026-07-06', time: '15:00', venue: 'dal', stage: stages.R16, description: 'Winner M83 vs Winner M84' },
  { id: 94, matchNumber: 94, date: '2026-07-06', time: '20:00', venue: 'sea', stage: stages.R16, description: 'Winner M81 vs Winner M82' },
  { id: 95, matchNumber: 95, date: '2026-07-07', time: '12:00', venue: 'atl', stage: stages.R16, description: 'Winner M86 vs Winner M88' },
  { id: 96, matchNumber: 96, date: '2026-07-07', time: '16:00', venue: 'van', stage: stages.R16, description: 'Winner M85 vs Winner M87' },
  { id: 97, matchNumber: 97, date: '2026-07-09', time: '16:00', venue: 'bos', stage: stages.QF, description: 'Winner M89 vs Winner M90' },
  { id: 98, matchNumber: 98, date: '2026-07-10', time: '15:00', venue: 'la', stage: stages.QF, description: 'Winner M93 vs Winner M94' },
  { id: 99, matchNumber: 99, date: '2026-07-11', time: '17:00', venue: 'mia', stage: stages.QF, description: 'Winner M91 vs Winner M92' },
  { id: 100, matchNumber: 100, date: '2026-07-11', time: '21:00', venue: 'kc', stage: stages.QF, description: 'Winner M95 vs Winner M96' },
  { id: 101, matchNumber: 101, date: '2026-07-14', time: '15:00', venue: 'dal', stage: stages.SF, description: 'Winner M97 vs Winner M98' },
  { id: 102, matchNumber: 102, date: '2026-07-15', time: '15:00', venue: 'atl', stage: stages.SF, description: 'Winner M99 vs Winner M100' },
  { id: 103, matchNumber: 103, date: '2026-07-18', time: '17:00', venue: 'mia', stage: stages.TPO, description: 'Loser M101 vs Loser M102' },
  { id: 104, matchNumber: 104, date: '2026-07-19', time: '15:00', venue: 'nyj', stage: stages.FINAL, description: 'Winner M101 vs Winner M102' },
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
