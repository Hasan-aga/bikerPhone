export interface Root {
  features: Feature[];
  properties: Properties2;
  type: string;
}

export interface Feature {
  type: string;
  properties: Properties;
  geometry: Geometry;
}

export interface Properties {
  mode: string;
  waypoints: Waypoint[];
  units: string;
  details: string[];
  distance: number;
  distance_units: string;
  time: number;
  legs: Leg[];
}

export interface Waypoint {
  location: number[];
  original_index: number;
}

export interface Leg {
  distance: number;
  time: number;
  steps: Step[];
  elevation_range: number[][];
  elevation: number[];
}

export interface Step {
  from_index: number;
  to_index: number;
  distance: number;
  time: number;
  instruction: Instruction;
  max_elevation: number;
  min_elevation: number;
  elevation_gain: number;
  elevation: number;
}

export interface Instruction {
  text: string;
}

export interface Geometry {
  type: string;
  coordinates: number[][][];
}

export interface Properties2 {
  mode: string;
  waypoints: Waypoint2[];
  units: string;
  details: string[];
}

export interface Waypoint2 {
  lat: number;
  lon: number;
}

// i added this
export interface Route {
  features: Feature[];
  properties: Properties;
  type: string;
}

export interface Datasource {
  sourcename: string;
  attribution: string;
  license: string;
  url: string;
}

export interface Timezone {
  name: string;
  offset_STD: string;
  offset_STD_seconds: number;
  offset_DST: string;
  offset_DST_seconds: number;
  name_alt: string;
  abbreviation_STD: string;
  abbreviation_DST: string;
}

export interface Rank {
  importance: number;
  popularity: number;
  confidence: number;
  confidence_city_level: number;
  match_type: string;
}

export interface Bbox {
  lon1: number;
  lat1: number;
  lon2: number;
  lat2: number;
}

export interface Result {
  datasource: Datasource;
  name: string;
  city: string;
  district: string;
  state: string;
  postcode: string;
  country: string;
  country_code: string;
  lon: number;
  lat: number;
  formatted: string;
  address_line1: string;
  address_line2: string;
  category: string;
  timezone: Timezone;
  result_type: string;
  rank: Rank;
  place_id: string;
  bbox: Bbox;
  suburb: string;
  county: string;
  village: string;
}

export interface Parsed {
  city: string;
  expected_type: string;
}

export interface Query {
  text: string;
  parsed: Parsed;
}

export interface RootObject {
  results: Result[];
  query: Query;
}
