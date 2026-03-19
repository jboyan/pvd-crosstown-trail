import points from '../assets/data/points.json';
import route from '../assets/data/route.json';

import pxtWest from '../assets/img/pxt-west.png';

// Trail registry: everything the UI needs to render a trail lives here.
// For trails where route/POIs aren't provided yet, `map` is null (the UI will show a coming-soon panel).
export const trails = [
  {
    slug: 'pvd-crosstown-trail',
    displayName: 'Providence Crosstown Trail',
    featuredOnHome: true,
    // Used for the short alias routes like `/loop` and `/west`.
    shortAlias: 'pvd',
    home: {
      headline: 'Providence Crosstown Trail',
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
      mapIframeSrc: '/trails/pvd-crosstown-trail/map',
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
        'The Providence Preservation Society organized group walks of the trail in 2024 and 2025. Experience the Crosstown Trail with others on Saturday, September 27! We will actually be walking a variant of the route—{{westEdition}}—in order to make stops at two artist events happening that day.',
      groupWalksCta: {
        label: 'Join our second Public Hike on Saturday, September 27',
        href:
          'https://ppsri.org/events/walk-the-pvd-crosstown-trail-a-13-mile-urban-hike/',
        // Internal link to the West End landing page.
        westEditionHref: '/trails/pvd-crosstown-west',
      },
      creditsHeading: 'Credits',
      creditsLines: [
        'Trail design by Justin Boyan, with help from Sarah Zurier, Amy Greenwald, Geoff Meek, Magnus Thorsson, Traci Picard, Jonathan Bell, and others!',
        'Thanks to Marisa Brown and the Providence Preservation Society for hosting a brainstorming workshop about the trail at their April 2024 Hacking Heritage event, as well as organizing the inaugural group hike in September 2024.',
        'The trail was inspired by the San Francisco Crosstown Trail, created by Bob Siegel. We have also drawn inspiration from Boston’s Walking City Trail and Worcester’s East-West Trail.',
        'Interactive map code by Chris Whong, developed for NYC’s Great Saunter.',
      ],
      // Placeholder photos: there are no `photo1.jpg/photo2.jpg/photo3.jpg` assets in this repo,
      // so we fall back to existing images. You can replace/extend these later.
      photos: [pxtWest, pxtWest, pxtWest],
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
      photos: [pxtWest],
      cta: {
        label: 'Walk this route with the PPS on Saturday, September 27',
        href:
          'https://ppsri.org/events/walk-the-pvd-crosstown-trail-a-13-mile-urban-hike/',
      },
      body:
        'This "West End" variant of the Providence Crosstown Trail heads east from Olneyville through Providence’s West End, down to Roger Williams Park and the waterfront. This 12-mile route enables a stop at f/k/a Columbus Square on Elmwood Avenue, where a Providence Commemoration Labs performance event is happening on our walk day.',
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
      mapsDescription:
        "We don't have an interactive web map available for this route yet, but if you have Strava, you can follow along using this link:",
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
    map: null,
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
];

export function getTrailBySlug(slug) {
  return trails.find((t) => t.slug === slug) || null;
}

export function getFeaturedTrail() {
  return trails.find((t) => t.featuredOnHome) || null;
}

