import points from '../assets/data/points.json';
import route from '../assets/data/route.json';
import westEndRoute from '../assets/data/pvd-crosstown-west-route.json';
import westEndPoints from '../assets/data/pvd-crosstown-west-points.json';
import southEditionRoute from '../assets/data/pvd-crosstown-south-route.json';
import southEditionPoints from '../assets/data/pvd-crosstown-south-points.json';
import lovecraftCollegeHill from '../assets/data/lovecrafts-college-hill.json';

import pxtWest from '../assets/img/pxt-west.png';
import pvdCrosstownStaticMap from '../assets/img/pvd-crosstown-static-map.png';
import pvdCrosstownSouthStaticMap from '../assets/img/pvd-crosstown-south-static-map.jpg';
import { pvdCrosstownTrailPhotos } from '../assets/img/trails/pvd-crosstown-trail/photos';
import { pvdCrosstownWestPhotos } from '../assets/img/trails/pvd-crosstown-west/photos';

const buildRouteGeoJson = (featureCollection) => ({
  type: 'FeatureCollection',
  features: (featureCollection?.features || []).filter((feature) =>
    ['LineString', 'MultiLineString'].includes(feature?.geometry?.type)
  ),
});

const buildPointsGeoJson = (featureCollection) => ({
  type: 'FeatureCollection',
  features: (featureCollection?.features || [])
    .filter((feature) => feature?.geometry?.type === 'Point')
    .map((feature) => {
      const stop = feature?.properties?.stop;
      const name = feature?.properties?.name || 'Stop';
      const description = feature?.properties?.description || '';
      const title = stop ? `Stop ${stop}: ${name}` : name;

      return {
        ...feature,
        properties: {
          ...feature.properties,
          type: 'route-info',
          description: description ? `<B>${title}</B><BR/>${description}` : `<B>${title}</B>`,
        },
      };
    }),
});

const computeBoundsFromGeoJson = (featureCollection, paddingFactor = 0.08) => {
  const coords = [];
  for (const feature of featureCollection?.features || []) {
    const geometry = feature?.geometry;
    if (!geometry) continue;
    if (geometry.type === 'Point') {
      coords.push(geometry.coordinates);
    } else if (geometry.type === 'LineString') {
      coords.push(...geometry.coordinates);
    } else if (geometry.type === 'MultiLineString') {
      for (const segment of geometry.coordinates) coords.push(...segment);
    }
  }

  if (!coords.length) return [[-71.42, 41.82], [-71.39, 41.84]];

  const lons = coords.map((c) => c[0]);
  const lats = coords.map((c) => c[1]);
  const minLon = Math.min(...lons);
  const maxLon = Math.max(...lons);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const lonPad = Math.max((maxLon - minLon) * paddingFactor, 0.002);
  const latPad = Math.max((maxLat - minLat) * paddingFactor, 0.002);

  return [
    [Number((minLon - lonPad).toFixed(6)), Number((minLat - latPad).toFixed(6))],
    [Number((maxLon + lonPad).toFixed(6)), Number((maxLat + latPad).toFixed(6))],
  ];
};

const lovecraftRouteGeoJson = buildRouteGeoJson(lovecraftCollegeHill);
const lovecraftPointsGeoJson = buildPointsGeoJson(lovecraftCollegeHill);
const lovecraftBounds = computeBoundsFromGeoJson(lovecraftCollegeHill);

// Trail registry: everything the UI needs to render a trail lives here.
// For trails where route/POIs aren't provided yet, `map` is null (the UI will show a coming-soon panel).
export const trails = [
  {
    slug: 'pvd-crosstown-trail',
    displayName: 'The Providence Crosstown Trail',
    featuredOnHome: true,
    // Used for the short alias routes like `/loop` and `/west`.
    shortAlias: 'pvd',
    home: {
      headline: 'The Providence Crosstown Trail',
      staticRouteImage: {
        src: pvdCrosstownStaticMap,
        alt: 'Providence Crosstown Trail route map',
      },
      subtitle:
        'Big walks across a small city, from summit to shore, with neighborhood and park gems along the way!',
      intro:
        'Inspired by the San Francisco Crosstown Trail, this 13-mile walking route traverses the city of Providence, visiting both well-known landmarks and quiet neighborhoods. Follow the sidewalks of Silver Lake, Hartford, Olneyville, Manton, Mt. Pleasant, Smith Hill, downtown, the Jewelry District, South Providence, Elmwood, and Washington Park, as well as off-road paths through these parks:',
      parks: [
        'Neutaconkanut Hill',
        'Merino Park',
        'Woonasquatucket River Greenway',
        'Pleasant Valley Parkway',
        'Gantry Gardens',
        'Waterplace Park',
        'Van Leesten Memorial Bridge',
        'Roger Williams Park',
        'Columbia Park',
        'JWU Harborside Campus',
        'Fields Point Wind Farm',
        'Save the Bay Center',
      ],
      introTail:
        'This route was newly established in 2024 and is a work in progress. We welcome your feedback!',
      mapsHeading: 'Maps',
      mapsIntroPrefix:
        'Follow the path using the map below. The full 13.4-mile route starts at the Igliozzi Rec Center (675 Plainfield Street) and ends at Fields Point (100 Save the Bay Drive). To shorten the walk, you can start or end downtown at Van Leesten Memorial Bridge (334 South Water Street).',
      mapIframeSrc: '/trails/pvd-crosstown-trail/map?embedded=true',
      externalButtons: [
        {
          label: 'Interactive full-screen map',
          href: '/trails/pvd-crosstown-trail/map',
          variant: 'contained',
        },
        {
          label: 'View on Strava',
          href: 'https://www.strava.com/routes/3201273282685028096',
          variant: 'outlined',
        },
        {
          label: 'View on AllTrails',
          href: 'https://www.alltrails.com/explore/map/providence-crosstown-trail-4a11654',
          variant: 'outlined',
        },
        {
          label: 'View on Garmin Connect',
          href: 'https://connect.garmin.com/modern/course/310808963',
          variant: 'outlined',
        },
      ],
      groupWalksHeading: 'Group Walks',
      groupWalksBody:
        'The Providence Preservation Society organized group walks of the {{crosstownTrail}} in 2024 and the {{westEndEdition}} in 2025. Our 2026 edition of the walk will follow the South Edition of the trail and be held on Saturday, May 23.',
      groupWalksCta: {
        label: 'REGISTER FOR MAY 23',
        href:
          'https://ppsri.org/events/walk-the-pvd-crosstown-trail-a-13-mile-urban-hike-2/',
        // Internal link to the West End landing page.
        westEditionHref: '/trails/pvd-crosstown-west',
        crosstownHref: '/trails/pvd-crosstown-trail',
      },
      creditsHeading: 'Credits',
      creditsLines: [
        'Trail design by Justin Boyan, with help from Sarah Zurier, Amy Greenwald, Geoff Meek, Magnus Thorsson, Traci Picard, Jonathan Bell, and others!',
        'Thanks to Marisa Brown and the Providence Preservation Society for hosting a brainstorming workshop about the trail at their April 2024 Hacking Heritage event, as well as organizing the inaugural group hike in September 2024.',
        'The trail was inspired by the San Francisco Crosstown Trail, created by Bob Siegel. We have also drawn inspiration from Boston’s Walking City Trail and Worcester’s East-West Trail.',
        'Interactive map code by Chris Whong, developed for NYC’s Great Saunter.',
      ],
      photos: pvdCrosstownTrailPhotos,
    },
    map: {
      routeGeoJson: route,
      pointsGeoJson: points,
      bounds: [
        [-71.495732, 41.782303],
        [-71.374274, 41.846864],
      ],
    },
  },
  {
    slug: 'pvd-crosstown-west',
    displayName: 'Providence Crosstown Trail—West End Edition',
    featuredOnHome: false,
    shortAlias: 'west',
    landing: {
      headline: 'Providence Crosstown Trail—West End Edition',
      photos: pvdCrosstownWestPhotos,
      body:
        'This 12-mile "West End" variant of the Providence Crosstown Trail heads east from Olneyville through Providence’s West End, down to Roger Williams Park and the waterfront.',
      parks: [
        'Neutaconkanut Hill',
        'Merino Park',
        'Woonasquatucket River Greenway',
        'Donigian Park',
        'Dexter Training Grounds',
        'Bucklin Park',
        'Locust Grove Cemetery',
        'Roger Williams Park',
        'Columbia Park',
        'JWU Harborside Campus',
        'Fields Point Wind Farm',
        'Save the Bay Center',
      ],
      mapsHeading: 'Maps',
      mapsIntroPrefix:
        'Explore this route with the interactive map below.',
      mapIframeSrc: '/trails/pvd-crosstown-west/map?embedded=true',
      staticRouteImage: {
        src: pxtWest,
        alt: 'Crosstown West Route Map',
      },
      externalButtons: [
        { label: 'West End Route on Strava', href: 'https://www.strava.com/routes/3405916210436730386', variant: 'contained' },
      ],
      routeStartText:
        'Like the original Crosstown Trail, the route starts at the Igliozzi Rec Center (675 Plainfield Street) and ends at Fields Point (100 Save the Bay Drive).',
      routeShortenText:
        'The full walk is 12 miles long. For a shorter walk, you can start or end at our lunch spot, which will be approximately at noon at Urban Greens Co-op Market (93 Cranston Street).',
    },
    map: {
      routeGeoJson: westEndRoute,
      pointsGeoJson: westEndPoints,
      bounds: [
        [-71.469568, 41.78265],
        [-71.378472, 41.82476],
      ],
    },
  },
  {
    slug: 'pvd-crosstown-south',
    displayName: 'Providence Crosstown Trail—South Edition',
    featuredOnHome: false,
    shortAlias: 'south',
    landing: {
      headline: 'Providence Crosstown Trail—South Edition',
      photos: [],
      staticRouteImage: {
        src: pvdCrosstownSouthStaticMap,
        alt: 'Providence Crosstown Trail—South Edition route map',
      },
      intro:
        'A more direct, southern variant of the PXT. This route includes deeper explorations of Neutaconkanut Park, Roger Williams Parks, and Fields Point. Highlights of the 9-mile route include:',
      parks: [
        'Neutaconkanut Hill - summit and trail system',
        'Scalabrini Piazza, Cerbo Square, and Silver Lake Memorial Park',
        'The trailhead of the 24-mile Washington Secondary Bike Path',
        'Mashapaug Pond Park',
        'Murphy Trainor Park',
        'Garvin House',
        'Joseph Williams Field',
        'Roger Williams Park: Temple to Music and Cunliff, Elm, and Edgewood Lakes',
        'Oakland Cemetery',
        'Fields Point windmills',
        'Save the Bay Center',
      ],
      mapsHeading: 'Maps',
      mapsIntroPrefix: 'Explore this route with the interactive map below.',
      mapIframeSrc: '/trails/pvd-crosstown-south/map?embedded=true',
      externalButtons: [
        {
          label: 'View on Strava',
          href: 'https://www.strava.com/routes/3471296535661608320',
          variant: 'outlined',
        },
      ],
    },
    map: {
      routeGeoJson: southEditionRoute,
      pointsGeoJson: southEditionPoints,
      bounds: [
        [-71.475204, 41.770327],
        [-71.375966, 41.816043],
      ],
    },
  },
  {
    slug: 'pvd-crosstown-loop',
    displayName: 'PVD Crosstown Loop',
    featuredOnHome: false,
    shortAlias: 'loop',
    landing: {
      headline: 'PVD Crosstown Loop',
      photos: [pxtWest],
      body:
        'Coming soon: the PVD Crosstown Loop landing page will include explanatory text, an interactive web map (once the route + POIs are provided), and external navigation links.',
      mapsHeading: 'Maps',
      mapsDescription:
        'Interactive map coming soon. If you want to share links (Strava/AllTrails/Garmin) ahead of time, we can plug them in now.',
      externalButtons: [],
    },
    map: null,
  },
  {
    slug: 'lovecrafts-college-hill',
    displayName: "Lovecraft's College Hill",
    featuredOnHome: false,
    shortAlias: 'lovecraft',
    landing: {
      headline: "Lovecraft's College Hill",
      body:
        "Approximate 3-mile path connecting the 38 stops of the H.P. Lovecraft walking tour on Providence's College Hill.",
      mapsHeading: 'Maps',
      mapsIntroPrefix: 'Explore the full route and all numbered stops on the interactive map below.',
      mapIframeSrc: '/trails/lovecrafts-college-hill/map?embedded=true',
      externalButtons: [],
      photos: [],
    },
    map: {
      routeGeoJson: lovecraftRouteGeoJson,
      pointsGeoJson: lovecraftPointsGeoJson,
      bounds: lovecraftBounds,
    },
  },
];

export function getTrailBySlug(slug) {
  return trails.find((t) => t.slug === slug) || null;
}

export function getFeaturedTrail() {
  return trails.find((t) => t.featuredOnHome) || null;
}

