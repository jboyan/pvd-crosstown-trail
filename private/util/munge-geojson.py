#!/usr/bin/env python3

# The PVD Crosstown Trail master route lives at:
# https://www.strava.com/routes/3201273282685028096
#
# The process for importing that route to the pvdtrails.org interactive map is:
# 1. Export Strava to GPX
# 2. Run https://www.alltrails.com/converter to generate a GeoJSON Track file
# 3. Run this script to munge that geojson into points.json and route.json as
#    expected by the pvdtrails.org map app.


import json

# POI types known to the map app are:
#   'restrooms', 'route-info', 'refreshments', 'mile-marker', 'start and finish'
POI_TYPE_MAP = {'Transition Zone': 'route-info',
                'Peak': 'route-info',
                'Alert': 'route-info',
                'Restaurant': 'refreshments',
                'Pharmacy': 'refreshments',
                'Park': 'route-info',
                'Restroom': 'restrooms',
                }
input = '/Users/jab/Downloads/Providence-Crosstown-Trail-3-.js'
output_dir = '../../src/assets/data'

# read json from input file
with open(input) as f:
    input_data = json.load(f)

# pretty-print the json
# print(json.dumps(input_data, indent=2))
assert input_data['type'] == 'FeatureCollection'

# partition features into POIs and routes
pois = []
routes = []
for feature in input_data['features']:
    # rename the 'desc' attribute to 'description' as the map app expects
    feature['properties']['description'] = "<B>" + feature['properties'][
        'name'] + "</B>"
    if 'desc' in feature['properties']:
        feature['properties']['description'] += "<BR/>" + feature['properties']['desc']
        del feature['properties']['desc']

    if feature['geometry']['type'] == 'Point':
        # map the 'type' attribute to a POI type
        if 'type' in feature['properties']:
            feature['properties']['type'] = POI_TYPE_MAP[feature['properties']['type']]
        pois.append(feature)
    elif feature['geometry']['type'] == 'MultiLineString':
        routes.append(feature)
    else:
        raise ValueError(f"Unexpected geometry type: {feature['geometry']['type']}")

print(f"Found {len(pois)} POIs and {len(routes)} routes")
assert len(routes) == 1

# write POIs to points.json
with open(f'{output_dir}/points.json', 'w') as f:
    json.dump({'type': 'FeatureCollection', 'features': pois}, f, indent=2)

# write routes to route.json
with open(f'{output_dir}/route.json', 'w') as f:
    json.dump({'type': 'FeatureCollection', 'features': routes}, f, indent=2)

print(f"Wrote points.json and route.json to {output_dir}")
