import React, { useRef } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Box } from '@mui/material';

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: false,
};

const PhotoCarousel = ({ photos, fixedHeightPx }) => {
  const sliderRef = useRef(null);
  if (!photos?.length) return null;

  const slideFrameStyle = fixedHeightPx
    ? {
        height: `${fixedHeightPx}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: '#f7f7f7',
        overflow: 'hidden',
      }
    : undefined;

  const imageStyle = fixedHeightPx
    ? {
        maxWidth: '100%',
        maxHeight: '100%',
        width: 'auto',
        height: 'auto',
        display: 'block',
        cursor: 'pointer',
      }
    : { width: '100%', height: 'auto', borderRadius: 8, cursor: 'pointer' };

  return (
    <Box style={{ margin: '40px 0' }}>
      <Slider ref={sliderRef} {...sliderSettings}>
        {photos.map((src, idx) => (
          <div key={`${src}-${idx}`}>
            <div style={slideFrameStyle}>
              <img
                src={src}
                alt={`Trail ${idx + 1}`}
                style={imageStyle}
                onClick={(e) => {
                  const bounds = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - bounds.left;
                  const midpoint = bounds.width / 2;
                  if (clickX < midpoint) {
                    sliderRef.current?.slickPrev();
                  } else {
                    sliderRef.current?.slickNext();
                  }
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    sliderRef.current?.slickNext();
                  }
                }}
              />
            </div>
          </div>
        ))}
      </Slider>
    </Box>
  );
};

export default PhotoCarousel;

