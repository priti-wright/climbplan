import peakbagger_id_lookup from '../static/peakbagger_id_lookup.json'


const fuzzy_match_deltas = [0, -0.001, 0.001];

function find_peak_id(place) {
    // hacky 3x3 grid search to avoid edge cases with the rounding, and peakbagger/google not having matching realities
    var latlon, peak_id, lat_delta_index, lon_delta_index;
    for (lat_delta_index in fuzzy_match_deltas) {
        for (lon_delta_index in fuzzy_match_deltas) {
            latlon = (
                (place.lat + fuzzy_match_deltas[lat_delta_index]).toFixed(3)
                + ', ' +
                (place.lon + fuzzy_match_deltas[lon_delta_index]).toFixed(3)
            )
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