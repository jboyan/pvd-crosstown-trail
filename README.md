# PVD Crosstown Trail Map

Wayfinding map for the Providence, RI Crosstown Trail. This map app is based on Chris Whong's map of [the great saunter](https://shorewalkers.org/great-saunter/). It includes the route itself along with markers for restrooms, landmarks, and other waypoints. It is optimized for view on mobile devices and includes a "follow the user" mode that will keep the map centered on the user's location.

## Development

In the project directory, you can run:

### `npm install`

Sets things up.

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm deploy`

Builds and eploys the site to github pages using the `gh-pages` npm package

## Trail Data Format (GeoJSON)

This app renders each trail from two GeoJSON inputs:

1. `routeGeoJson` (the line to follow)
2. `pointsGeoJson` (POIs/waypoints shown as tappable markers + popups)

The interactive map is configured per-trail via `src/trails/trails.js`, and the generic map renderer is `src/Map.js`.

### `routeGeoJson` schema

Expected shape:

- `FeatureCollection`
- At least one feature with geometry:
  - `type`: `MultiLineString`
  - `coordinates`: one or more line strings
    - The app is tolerant of `coordinates` with 2D or 3D points; it uses `[longitude, latitude]` for rendering.

Example (shape only):

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "MultiLineString",
        "coordinates": [
          [
            [-71.46, 41.81],
            [-71.47, 41.82]
          ]
        ]
      },
      "properties": {}
    }
  ]
}
```

### `pointsGeoJson` schema

Expected shape:

- `FeatureCollection`
- Each feature is a `Point`:
  - `geometry.type`: `Point`
  - `geometry.coordinates`: `[longitude, latitude]` (elevation is optional)
  - `properties`:
    - `type` (string): must match one of the marker types in `src/Marker.js`
      - current types:
        - `restrooms`
        - `route-info`
        - `refreshments`
        - `mile-marker`
        - `start and finish`
    - `description` (string): HTML-ish snippet shown in the Mapbox popup via `setHTML`
    - `name` (string, optional): not required by the map renderer, but useful for debugging/legends

Example:

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [-71.46, 41.81] },
      "properties": {
        "type": "route-info",
        "name": "Waypoint title (optional)",
        "description": "<B>Heading</B><BR/>Popup body"
      }
    }
  ]
}
```

### Map bounds

Each trail config provides `bounds` as:

```js
[[west, south], [east, north]]
```

This is passed to Mapbox as the initial viewport bounds.

If `map` is `null` for a trail in `src/trails/trails.js`, the app will show an “Interactive web map coming soon” panel for `/trails/<slug>/map`.
