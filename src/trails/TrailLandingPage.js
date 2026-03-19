import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';

import { Box, Button, Container, List, ListItem, Typography, Link } from '@mui/material';

import logo from '../assets/img/logo.svg';
import pxtWest from '../assets/img/pxt-west.png';

import { getTrailBySlug } from './trails';
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

const TrailLandingPage = () => {
  const { slug } = useParams();
  const trail = getTrailBySlug(slug);

  if (!trail) {
    return (
      <Container maxWidth="md" style={{ padding: 24 }}>
        <Typography variant="h5">Unknown trail</Typography>
      </Container>
    );
  }

  const copy = trail.featuredOnHome ? trail.home : trail.landing;

  return (
    <Container maxWidth="md" style={{ textAlign: 'center', padding: '40px' }}>
      <Box display="flex" justifyContent="flex-start" style={{ marginBottom: 12 }}>
        <Button component={RouterLink} to="/" variant="outlined">
          ← Back to Trails
        </Button>
      </Box>

      <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
        {copy?.headline || trail.displayName}
      </Typography>

      <Box display="flex" style={{ marginBottom: '20px' }} justifyContent="center">
        <img src={logo} alt={trail.displayName} style={{ width: '250px', height: '250px' }} />
      </Box>

      {copy?.subtitle && (
        <Typography variant="h5" fontStyle="italic" style={{ marginBottom: '20px' }}>
          {copy.subtitle}
        </Typography>
      )}

      {copy?.intro && (
        <Typography variant="body1" style={{ textAlign: 'left', marginBottom: '20px' }}>
          {copy.intro}
          <ParksList parks={copy.parks} />
          {copy.introTail && <span>{copy.introTail}</span>}
        </Typography>
      )}

      {copy?.body && (
        <Typography variant="body1" style={{ textAlign: 'left', marginBottom: '20px' }}>
          {copy.body}
        </Typography>
      )}

      <PhotoCarousel photos={copy?.photos} fixedHeightPx={360} />

      {copy?.mapsHeading && <Typography variant="h4" align="left" style={{ marginBottom: '20px' }}>{copy.mapsHeading}</Typography>}

      {copy?.mapsIntroPrefix && (
        <Typography variant="body1" style={{ textAlign: 'left', marginBottom: '20px' }}>
          {copy.mapsIntroPrefix}
        </Typography>
      )}

      {copy?.mapIframeSrc && (
        <Box style={{ margin: '40px 0' }}>
          <iframe title="Interactive Trail Map" src={copy.mapIframeSrc} width="100%" height={500} />
        </Box>
      )}

      {copy?.cta && (
        <Button
          variant="contained"
          style={{ marginBottom: '20px' }}
          target="_blank"
          component="a"
          href={copy.cta.href}
        >
          {copy.cta.label}
        </Button>
      )}

      {(copy?.externalButtons || []).map((btn) => (
        <div key={btn.href} style={{ marginBottom: 8 }}>
          <Button
            variant={btn.variant === 'contained' ? 'contained' : 'outlined'}
            style={{ marginBottom: '20px' }}
            target="_blank"
            component="a"
            href={btn.href}
          >
            {btn.label}
          </Button>
        </div>
      ))}

      {copy?.staticRouteImage?.src && (
        <Box style={{ margin: '40px 0' }}>
          <img
            src={copy.staticRouteImage.src || pxtWest}
            alt={copy.staticRouteImage.alt || 'Trail route map'}
            style={{ width: '100%', height: 'auto', maxWidth: '100%' }}
          />
        </Box>
      )}

      {copy?.groupWalksHeading && (
        <Typography variant="h4" style={{ textAlign: 'left', marginBottom: '20px' }}>
          {copy.groupWalksHeading}
        </Typography>
      )}

      {copy?.groupWalksBody && (
        <Typography variant="body1" style={{ textAlign: 'left', marginLeft: '20px', marginBottom: '20px' }}>
          {(() => {
            const token = '{{westEdition}}';
            const href = copy?.groupWalksCta?.westEditionHref;
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

      {copy?.groupWalksCta?.label && (
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

      {copy?.creditsHeading && (
        <Typography variant="h4" style={{ textAlign: 'left', marginBottom: '20px', marginTop: 12 }}>
          {copy.creditsHeading}
        </Typography>
      )}

      {copy?.creditsLines?.length ? (
        <Typography variant="body1" style={{ textAlign: 'left', marginLeft: '20px', marginBottom: '20px' }}>
          {copy.creditsLines.map((line, idx) => (
            <React.Fragment key={`${idx}-${line}`}>
              • {line}
              {idx < copy.creditsLines.length - 1 ? <br /> : null}
            </React.Fragment>
          ))}
        </Typography>
      ) : null}
    </Container>
  );
};

export default TrailLandingPage;

