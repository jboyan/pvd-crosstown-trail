import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Box, Button, Container, Typography, Link } from '@mui/material';

import { getFeaturedTrail, trails } from './trails';
import logo from '../assets/img/logo.svg';

const TrailCard = ({ trail }) => {
  const interactiveHref = `/trails/${trail.slug}/map`;

  const staticImg =
    trail.home?.staticRouteImage?.src ||
    trail.landing?.staticRouteImage?.src ||
    trail.landing?.photos?.[0] ||
    trail.home?.photos?.[0];

  return (
    <Box
      style={{
        border: '1px solid rgba(0,0,0,0.12)',
        borderRadius: 12,
        padding: 16,
        textAlign: 'center',
        background: '#fff',
      }}
    >
      <Typography variant="h5" style={{ marginBottom: trail.lengthMiles ? 4 : 8, fontWeight: 900 }}>
        {trail.displayName}
      </Typography>

      {trail.lengthMiles && (
        <Typography
          variant="subtitle2"
          color="text.secondary"
          style={{ letterSpacing: '0.08em', textTransform: 'uppercase' }}
        >
          {trail.lengthMiles} miles
        </Typography>
      )}

      {staticImg && (
        <Box style={{ margin: '12px 0' }}>
          <img
            src={staticImg}
            alt={`${trail.displayName} route map`}
            style={{
              width: '100%',
              height: 260,
              objectFit: 'contain',
              backgroundColor: '#f7f7f7',
              borderRadius: 10,
            }}
          />
        </Box>
      )}

      <div style={{ marginBottom: 10 }}>
        <Button
          variant="contained"
          component={RouterLink}
          to={`/trails/${trail.slug}`}
          style={{ marginRight: 8 }}
        >
          DETAILS
        </Button>
        <Button variant="outlined" component={RouterLink} to={interactiveHref}>
          LIVE MAP
        </Button>
      </div>
    </Box>
  );
};

const TrailsHomePage = () => {
  const featured = getFeaturedTrail();
  const homeVisibleSlugs = new Set([
    'pvd-crosstown-trail',
    'pvd-crosstown-west',
    'pvd-crosstown-south',
    'pvd-crosstown-west-nov-2026',
  ]);
  const homeTrails = trails.filter((t) => homeVisibleSlugs.has(t.slug));

  const intro = featured?.home?.subtitle;
  const homeCopy = featured?.home;

  return (
    <Container
      maxWidth="md"
      sx={{
        textAlign: 'center',
        px: { xs: 2, sm: 3, md: 5 },
        py: { xs: 3, md: 5 },
      }}
    >
      <Box
        component="span"
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        Providence Crosstown Trail
      </Box>

      <Box display="flex" style={{ marginBottom: '20px' }} justifyContent="center">
        <img src={logo} alt="Providence Crosstown Trail" style={{ width: '220px', height: '220px' }} />
      </Box>

      {intro && (
        <Typography variant="h5" fontStyle="italic" style={{ marginBottom: '24px' }}>
          {intro}
        </Typography>
      )}

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
          gap: 2,
        }}
      >
        {homeTrails.map((trail) => (
          <TrailCard key={trail.slug} trail={trail} />
        ))}
      </Box>

      {homeCopy?.groupWalksHeading && (
        <Typography variant="h4" style={{ textAlign: 'left', marginBottom: '20px', marginTop: 40 }}>
          {homeCopy.groupWalksHeading}
        </Typography>
      )}

      {(homeCopy?.groupWalksIntro || homeCopy?.groupWalksItems?.length) && (
        <Box style={{ textAlign: 'left', marginLeft: '20px', marginBottom: '20px' }}>
          {homeCopy.groupWalksIntro && (
            <Typography variant="body1" style={{ marginBottom: 8 }}>
              {homeCopy.groupWalksIntro}
            </Typography>
          )}
          {homeCopy.groupWalksItems?.length > 0 && (
            <Box
              component="ul"
              sx={{
                m: 0,
                pl: 3,
                '& li': { mb: 0.75 },
              }}
            >
              {homeCopy.groupWalksItems.map((item) => (
                <Typography component="li" variant="body1" key={`${item.date}-${item.routeLabel}`}>
                  {item.upcoming ? <b>Upcoming — {item.date}</b> : item.date}
                  {': '}
                  {item.href ? (
                    <Link component={RouterLink} to={item.href}>
                      {item.routeLabel}
                    </Link>
                  ) : (
                    item.routeLabel
                  )}
                </Typography>
              ))}
            </Box>
          )}
        </Box>
      )}

      {homeCopy?.groupWalksCta?.href && (
        <Box style={{ textAlign: 'left', marginLeft: '20px', marginBottom: '20px' }}>
          <Button
            variant="contained"
            component="a"
            href={homeCopy.groupWalksCta.href}
            target="_blank"
            rel="noreferrer"
          >
            {homeCopy.groupWalksCta.label || 'REGISTER'}
          </Button>
        </Box>
      )}

    </Container>
  );
};

export default TrailsHomePage;

