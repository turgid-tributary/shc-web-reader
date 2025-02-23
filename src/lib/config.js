
const DEFAULT_CONFIG = {
  "initialTab": "about",
  "mayDemo": false,
  "cameraPauseTimeoutMillis": 120000
};

let _cfg = undefined;

export function getConfig() {

  if (_cfg) return(_cfg);
  
  const cfg = DEFAULT_CONFIG;

  // TODO - NYI override config for SMART on FHIR launch
  const overrideSource = document.location.search;

  // arguably this is weird --- because we're going to pick up variables
  // that aren't part of "config" per se. But I like it anyways because
  // it means we don't have to call out specific property names here
  // yet again --- we can just add defaults to DEFAULT_CONFIG and use
  // them in app code and we're golden.
  const overrides = new URLSearchParams(overrideSource);
  overrides.forEach( (value, key) => { cfg[key] = value; });

  // lastly if we have a hash value, add it as "shx" ... this is
  // incoming from shlink.htm which is acting as the viewer url for a SHL
  const hash = document.location.hash;
  if (hash && hash.startsWith("#")) cfg["shx"] = hash.substring(1);

  _cfg = cfg;
  return(_cfg);
}

export default function config(key) {
  return(getConfig()[key]);
}
