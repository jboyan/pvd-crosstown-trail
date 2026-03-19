import React, { useState } from 'react';
import { Link as RouterLink, useParams, useSearchParams } from 'react-router-dom';

import Modal from '../Modal';
import SplashModal from '../SplashModal';
import Map from '../Map';
import useLocalStorage from '../util/use-localstorage';
import logo from '../assets/img/logo.svg';

import { getTrailBySlug } from './trails';
import { Box, Button, Container, Typography } from '@mui/material';

const TrailMapPage = () => {
  const { slug } = useParams();
  const trail = getTrailBySlug(slug);

  const [showModal, setShowModal] = useState(false);
  const [searchParams] = useSearchParams();
  const isMobile = searchParams.get('mobile') === 'true';
  const isStaticCapture = searchParams.get('static') === 'true';
  const isEmbedded = searchParams.get('embedded') === 'true';

  const [splashModalDismissed, setSplashModalDismissed] = useLocalStorage(
    'splashModalDismissed',
    false
  );
  const [showSplashModal, setShowSplashModal] = useState(
    isMobile && !splashModalDismissed
  );

  if (!trail) {
    return (
      <Container maxWidth="md" style={{ padding: 24 }}>
        <Typography variant="h5">Unknown trail</Typography>
      </Container>
    );
  }

  if (!trail.map) {
    return (
      <Container maxWidth="md" style={{ padding: 24, textAlign: 'center' }}>
        <Box display="flex" justifyContent="flex-start" mb={2}>
          <Button component={RouterLink} to="/" variant="outlined">
            ← Back to Trails
          </Button>
        </Box>
        <Box display="flex" justifyContent="center" mb={2}>
          <img src={logo} alt="logo" style={{ width: 120, height: 120 }} />
        </Box>
        <Typography variant="h4" gutterBottom>
          {trail.displayName}
        </Typography>
        <Typography variant="body1" style={{ marginBottom: 16 }}>
          Interactive web map coming soon.
        </Typography>
        {(trail.landing?.externalButtons || []).map((btn) => (
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
      </Container>
    );
  }

  return (
    <>
      {!isStaticCapture && (
        <>
          {!isEmbedded && (
            <div className="absolute z-20 top-2 right-2">
              <Button component={RouterLink} to="/" variant="outlined" size="small">
                ← Back
              </Button>
            </div>
          )}
          {!isEmbedded && (
            <div className="absolute z-20 h-14 w-14 top-2 left-2">
              <img src={logo} alt="logo" />
            </div>
          )}
        </>
      )}
      <Map
        setShowModal={setShowModal}
        isMobile={isMobile}
        routeGeoJson={trail.map.routeGeoJson}
        pointsGeoJson={trail.map.pointsGeoJson}
        bounds={trail.map.bounds}
        showUiControls={!isStaticCapture}
      />
      {!isStaticCapture && (
        <>
          <Modal showModal={showModal} setShowModal={setShowModal} />
          <SplashModal
            showModal={showSplashModal}
            setShowModal={setShowSplashModal}
            setDontShowAgain={(checked) => {
              if (checked) setSplashModalDismissed(true);
            }}
          />
        </>
      )}
    </>
  );
};

export default TrailMapPage;

