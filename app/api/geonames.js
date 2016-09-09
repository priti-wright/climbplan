import {get} from './request';


const GEONAMES_USERNAME = 'climbplan';

// These are limited to things that might have interesting climbing. Full list of possibilities at http://www.geonames.org/export/codes.html
const FEATURE_CODES = _.map([
    'BDLD    badlands    an area characterized by a maze of very closely spaced, deep, narrow, steep-sided ravines, and sharp crests and pinnacles',
    'BLDR    boulder field   a high altitude or high latitude bare, flat area covered with large angular rocks',
    'BNCH    bench   a long, narrow bedrock platform bounded by steeper slopes above and below, usually overlooking a waterbody',
    'BUTE    butte(s)    a small, isolated, usually flat-topped hill with steep sides',
    'CAPE    cape    a land area, more prominent than a point, projecting into the sea and marking a notable change in coastal direction',
    'CFT cleft(s)    a deep narrow slot, notch, or groove in a coastal cliff',
    'CLDA    caldera a depression measuring kilometers across formed by the collapse of a volcanic mountain',
    'CLF cliff(s)    a high, steep to perpendicular slope overlooking a waterbody or lower area',
    'CNYN    canyon  a deep, narrow valley with steep sides cutting into a plateau or mountainous area',
    'CONE    cone(s) a conical landform composed of mud or volcanic material',
    'CRDR    corridor    a strip or area of land having significance as an access way',
    'CRQ cirque  a bowl-like hollow partially surrounded by cliffs or steep slopes at the head of a glaciated valley',
    'CRQS    cirques bowl-like hollows partially surrounded by cliffs or steep slopes at the head of a glaciated valley',
    'CRTR    crater(s)   a generally circular saucer or bowl-shaped depression caused by volcanic or meteorite explosive action',
    'CUET    cuesta(s)   an asymmetric ridge formed on tilted strata',
    'DUNE    dune(s) a wave form, ridge or star shape feature composed of sand',
    'GAP gap a low place in a ridge, not used for transportation',
    'GRGE    gorge(s)    a short, narrow, steep-sided section of a stream valley',
    'HLL hill    a rounded elevation of limited extent rising above the surrounding land with local relief of less than 300m',
    'HLLS    hills   rounded elevations of limited extent rising above the surrounding land with local relief of less than 300m',
    'LEV levee   a natural low embankment bordering a distributary or meandering stream; often built up artificially to control floods',
    'MESA    mesa(s) a flat-topped, isolated elevation with steep slopes on all sides, less extensive than a plateau',
    'MND mound(s)    a low, isolated, rounded hill',
    'MRN moraine a mound, ridge, or other accumulation of glacial till',
    'MT  mountain    an elevation standing high above the surrounding area with small summit area, steep slopes and local relief of 300m or more',
    'MTS mountains   a mountain range or a group of mountains or high ridges',
    'NTK nunatak a rock or mountain peak protruding through glacial ice',
    'NTKS    nunataks    rocks or mountain peaks protruding through glacial ice',
    'PASS    pass    a break in a mountain range or other high obstruction, used for transportation from one side to the other [See also gap]',
    'PK  peak    a pointed elevation atop a mountain, ridge, or other hypsographic feature',
    'PKS peaks   pointed elevations atop a mountain, ridge, or other hypsographic features',
    'PLAT    plateau an elevated plain with steep slopes on one or more sides, and often with incised streams',
    'PLATX   section of plateau  ',
    'PROM    promontory(-ies)    a bluff or prominent hill overlooking or projecting into a lowland',
    'PT  point   a tapering piece of land projecting into a body of water, less prominent than a cape',
    'PTS points  tapering pieces of land projecting into a body of water, less prominent than a cape',
    'RDGE    ridge(s)    a long narrow elevation with steep sides, and a more or less continuous crest',
    'RK  rock    a conspicuous, isolated rocky mass',
    'RKS rocks   conspicuous, isolated rocky masses',
    'SCRP    escarpment  a long line of cliffs or steep slopes separating level surfaces above and below',
    'SDL saddle  a broad, open pass crossing a ridge or between hills or mountains',
    'SINK    sinkhole    a small crater-shape depression in a karst area',
    'SPUR    spur(s) a subordinate ridge projecting outward from a hill, mountain or other elevation',
    'VLC volcano a conical elevation composed of volcanic materials with a crater at the top',
], str => str.split(' ')[0]);
const FEATURE_CODES_PARAMS = _.map(FEATURE_CODES, code => `&featureCode=${code}`).join('');

function parseGeonamesResult(geonamesResult) {
    return {
        name: geonamesResult.name,
        lat: Number(geonamesResult.lat),
        lon: Number(geonamesResult.lng),
        id: geonamesResult.geonameId,
        areaName: geonamesResult.adminCode1
         ? `${geonamesResult.adminCode1}, ${geonamesResult.countryCode}`
         : geonamesResult.countryCode,
    };
}

export function searchGeonamesPlaces(query) {
  /* Search for mountain-y features matching the query */
    return get(
    'http://api.geonames.org/searchJSON?' +
    `username=${GEONAMES_USERNAME}` +
    `&name_startsWith=${encodeURIComponent(query)}` +
    '&maxRows=15&countryBias=USA&orderby=relevance' +
    FEATURE_CODES_PARAMS
  ).then(
    responseJSON => _(responseJSON.geonames)
    .map(parseGeonamesResult)
    .value()
  );
}

export function getGeonamesPlace(name, lat, lon) {
  /* Get the Geonames result at a particular spot */
    return get(
    'http://api.geonames.org/findNearbyJSON?' +
    `username=${GEONAMES_USERNAME}` +
    `&lat=${lat}&lng=${lon}` +
    '&maxRows=1&radius=0.1' +
    FEATURE_CODES_PARAMS
  ).then(
    responseJSON => parseGeonamesResult(responseJSON.geonames[0])
  );
}
