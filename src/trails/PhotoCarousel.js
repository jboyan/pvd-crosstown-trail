import React from 'react';
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
  adaptiveHeight: true,
};

const PhotoCarousel = ({ photos }) => {
  if (!photos?.length) return null;

  return (
    <Box style={{ margin: '40px 0' }}>
      <Slider {...sliderSettings}>
        {photos.map((src, idx) => (
          <img
            key={`${src}-${idx}`}
            src={src}
            alt={`Trail ${idx + 1}`}
            style={{ width: '100%', height: 'auto', borderRadius: 8 }}
          />
        ))}
      </Slider>
    </Box>
  );
};

export default PhotoCarousel;

