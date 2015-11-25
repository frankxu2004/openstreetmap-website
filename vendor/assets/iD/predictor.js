Math.sinh = Math.sinh || function(x) {
        return (Math.exp(x) - Math.exp(-x)) / 2;
    };

function rad2deg(rad)
{
    return rad*(180/Math.PI);
}

function deg2rad(deg)
{
    return deg * (Math.PI/180);
}

function getTileNumber(lat, lon, zoom) {
    var xtile = Math.floor((lon+180)/360 * Math.pow(2, zoom));
    var ytile = Math.floor((1 - Math.log(Math.tan(deg2rad(lat)) + 1/Math.cos(deg2rad(lat)))/Math.PI)/2 * Math.pow(2, zoom));
    return [xtile, ytile];
}

function getLonLat(xtile, ytile, zoom) {
    var n = Math.pow(2, zoom);
    var lon_deg = xtile / n * 360.0 - 180.0;
    var lat_deg = rad2deg(Math.atan(Math.sinh(Math.PI * (1 - 2 * ytile / n))));
    return [lon_deg, lat_deg];
}

function LonLat_to_bbox(width, height, lat, lon, zoom) {
    var tile_size = 256;
    var xytile = getTileNumber(lat, lon, zoom);
    var xtile = xytile[0];
    var ytile = xytile[1];

    var xtile_s = (xtile * tile_size - width/2) / tile_size;
    var ytile_s = (ytile * tile_size - height/2) / tile_size;
    var xtile_e = (xtile * tile_size + width/2) / tile_size;
    var ytile_e = (ytile * tile_size + height/2) / tile_size;

    var lonlat_s = getLonLat(xtile_s, ytile_s, zoom);
    var lonlat_e = getLonLat(xtile_e, ytile_e, zoom);
    var lon_s = lonlat_s[0];
    var lat_s = lonlat_s[1];
    var lon_e = lonlat_e[0];
    var lat_e = lonlat_e[1];
    return [lon_s, lat_s, lon_e, lat_e];
}
