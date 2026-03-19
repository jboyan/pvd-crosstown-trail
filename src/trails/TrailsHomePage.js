import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Box, Button, Container, Link, List, ListItem, Typography } from '@mui/material';

import logo from '../assets/img/logo.svg';
import { getFeaturedTrail, trails } from './trails';
import PhotoCarousel from './PhotoCarousel';

const ParksList = ({ parks }) => {
  if (!parks?.length) return null;
  return (
    <List style={{ paddingLeft: 100 }}>
      {parks.map((park, index) => (
        <ListItem
          key={`${park}-${index}`}
          style={{
            padding: '0px',
            listStyleType: 'disc',
            display: 'list-item',
          }}
        >
          {park}
        </ListItem>
      ))}
    </List>
  );
};

const TrailCard = ({ trail }) => {
  const staticImg = trail.landing?.staticRouteImage?.src;
  const interactiveHref = `/trails/${trail.slug}/map`;

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
      <Typography variant="h5" style={{ marginBottom: 8, fontWeight: 800 }}>
        {trail.displayName}
      </Typography>

      {staticImg && (
        <Box style={{ margin: '12px 0' }}>
          <img
            src={staticImg}
            alt={`${trail.displayName} route map`}
            style={{ width: '100%', height: 'auto', maxHeight: 240, objectFit: 'cover', borderRadius: 10 }}
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
          View details
        </Button>
        <Button variant="outlined" component={RouterLink} to={interactiveHref}>
          Interactive map
        </Button>
      </div>

      {(trail.landing?.externalButtons || []).length > 0 && (
        <div style={{ textAlign: 'center' }}>
          {(trail.landing.externalButtons || []).slice(0, 2).map((btn) => (
            <div key={btn.href} style={{ marginBottom: 8 }}>
              <Button
                variant={btn.variant === 'contained' ? 'contained' : 'outlined'}
                component="a"
                href={btn.href}
                target="_blank"
                rel="noreferrer"
              >
                {btn.label}
              </Button>
            </div>
          ))}
        </div>
      )}
    </Box>
  );
};

const TrailsHomePage = () => {
  const featured = getFeaturedTrail();
  const otherTrails = trails.filter((t) => !t.featuredOnHome);

  // Defensive fallback: if featured trail is missing from registry.
  if (!featured?.home) return null;

  const copy = featured.home;

  return (
    <Container maxWidth="md" style={{ textAlign: 'center', padding: '40px' }}>
      <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
        {copy.headline}
      </Typography>

      <Box display="flex" style={{ marginBottom: '20px' }} justifyContent="center">
        <img src={logo} alt={featured.displayName} style={{ width: '250px', height: '250px' }} />
      </Box>

      {copy.subtitle && (
        <Typography variant="h5" fontStyle="italic" style={{ marginBottom: '20px' }}>
          {copy.subtitle}
        </Typography>
      )}

      <Typography variant="body1" style={{ textAlign: 'left', marginBottom: '20px' }}>
        {copy.intro}
        <ParksList parks={copy.parks} />
        {copy.introTail}
      </Typography>

      {copy.mapsHeading && (
        <Typography variant="h4" align="left" style={{ marginBottom: '20px' }}>
          {copy.mapsHeading}
        </Typography>
      )}

      {copy.mapsIntroPrefix && (
        <Typography variant="body1" style={{ textAlign: 'left', marginBottom: '20px' }}>
          {copy.mapsIntroPrefix}
        </Typography>
      )}

      {copy.mapIframeSrc && (
        <Box style={{ margin: '40px 0' }}>
          <iframe title="Interactive Trail Map" src={copy.mapIframeSrc} width="100%" height={500} />
        </Box>
      )}

      {(copy.externalButtons || []).map((btn) => (
        <div key={btn.href} style={{ marginBottom: 8 }}>
          <Button
            variant={btn.variant === 'contained' ? 'contained' : 'outlined'}
            style={{ marginBottom: '20px' }}
            component={btn.href.startsWith('/') ? RouterLink : 'a'}
            {...(btn.href.startsWith('/')
              ? { to: btn.href }
              : { href: btn.href, rel: 'noreferrer', target: '_blank' })}
          >
            {btn.label}
          </Button>
        </div>
      ))}

      <PhotoCarousel photos={copy.photos} />

      {copy.groupWalksHeading && (
        <Typography variant="h4" style={{ textAlign: 'left', marginBottom: '20px' }}>
          {copy.groupWalksHeading}
        </Typography>
      )}

      {copy.groupWalksBody && (
        <Typography variant="body1" style={{ textAlign: 'left', marginLeft: '20px', marginBottom: '20px' }}>
          {(() => {
            const token = '{{westEdition}}';
            const href = copy.groupWalksCta?.westEditionHref;
            if (!href) return copy.groupWalksBody;

            const parts = copy.groupWalksBody.split(token);
            if (parts.length !== 2) return copy.groupWalksBody;

            return (
              <>
                {parts[0]}
                <Link component={RouterLink} to={href}>
                  <b>PVD Crosstown Trail West End edition</b>
                </Link>
                {parts[1]}
              </>
            );
          })()}
        </Typography>
      )}

      {copy.groupWalksCta?.label && (
        <Button
          variant="contained"
          style={{ marginBottom: '10px', marginLeft: '20px' }}
          target="_blank"
          component="a"
          href={copy.groupWalksCta.href}
        >
          {copy.groupWalksCta.label}
        </Button>
      )}

      {copy.creditsHeading && (
        <Typography variant="h4" style={{ textAlign: 'left', marginBottom: '20px' }}>
          {copy.creditsHeading}
        </Typography>
      )}

      {copy.creditsLines?.length ? (
        <Typography variant="body1" style={{ textAlign: 'left', marginLeft: '20px', marginBottom: '20px' }}>
          {copy.creditsLines.map((line, idx) => (
            <React.Fragment key={`${idx}-${line}`}>
              • {line}
              {idx < copy.creditsLines.length - 1 ? <br /> : null}
            </React.Fragment>
          ))}
        </Typography>
      ) : null}

      <Box style={{ margin: '40px 0 10px' }}>
        <Typography variant="h4" align="left" style={{ marginBottom: '20px' }}>
          Explore more trails
        </Typography>

        <Box style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {otherTrails.map((t) => (
            <TrailCard key={t.slug} trail={t} />
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default TrailsHomePage;

