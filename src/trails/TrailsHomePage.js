import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Box, Button, Container, Typography } from '@mui/material';

import { getFeaturedTrail, trails } from './trails';
import logo from '../assets/img/logo.svg';

const TrailCard = ({ trail, isFeatured }) => {
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
        padding: isFeatured ? 24 : 16,
        textAlign: 'center',
        background: '#fff',
      }}
    >
      <Typography variant="h5" style={{ marginBottom: 8, fontWeight: 900 }}>
        {trail.displayName}
      </Typography>

      {staticImg && (
        <Box style={{ margin: '12px 0' }}>
          <img
            src={staticImg}
            alt={`${trail.displayName} route map`}
            style={{
              width: '100%',
              height: isFeatured ? 320 : 260,
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
  const otherTrails = trails.filter((t) => t.slug !== featured?.slug);

  const intro = featured?.home?.subtitle;
  const creditsLine = featured?.home?.creditsLines?.[0];

  return (
    <Container maxWidth="md" style={{ textAlign: 'center', padding: '40px' }}>
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

      <Box style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {featured && <TrailCard trail={featured} isFeatured />}

        {otherTrails.length > 0 && (
          <Box
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 16,
            }}
          >
            {otherTrails.map((t) => (
              <TrailCard key={t.slug} trail={t} />
            ))}
          </Box>
        )}
      </Box>

      {creditsLine && (
        <Typography
          variant="body1"
          style={{ marginTop: 44, textAlign: 'left' }}
        >
          • {creditsLine}
        </Typography>
      )}
    </Container>
  );
};

export default TrailsHomePage;

