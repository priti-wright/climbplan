import peakbagger_id_lookup from '../static/peakbagger_id_lookup.json'


const fuzzy_match_deltas = [0, -0.001, 0.001];

function find_peak_id(place) {
    // hacky 3x3 grid search to avoid edge cases with the rounding, and peakbagger/google not having matching realities
    var latlon, peak_id, lat_delta, lon_delta;
    for (lat_delta in fuzzy_match_deltas) {
        for (lon_delta in fuzzy_match_deltas) {
            latlon = (place.lat + Number(lat_delta)).toFixed(3) + ', ' + (place.lon + Number(lon_delta)).toFixed(3)
            peak_id = peakbagger_id_lookup[latlon]
            if (peak_id !== undefined) {
                return peak_id;
            }
        }
    }
    return undefined;
}


export default (place) => {
    const peak_id = find_peak_id(place);
    return (peak_id === undefined) ?
        `http://www.peakbagger.com/search.aspx?tid=R&ss=${place.nameUrlEncoded}&lat=${place.latShort}&lon=${place.lonShort}` :
        `http://www.peakbagger.com/peak.aspx?pid=${peak_id}`;
}