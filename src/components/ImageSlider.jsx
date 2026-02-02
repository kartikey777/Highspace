import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ImageLightbox from './ImageLightbox';
import './ImageSlider.css';

export default function ImageSlider({ images, alt = 'Furniture' }) {
  const [lightboxSrc, setLightboxSrc] = useState(null);

  if (!images?.length) return null;

  return (
    <div className="image-slider">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={images.length > 1}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        className="image-slider__swiper"
      >
        {images.map((src, i) => (
          <SwiperSlide key={i}>
            <button
              type="button"
              className="image-slider__slide-btn"
              onClick={() => setLightboxSrc(src)}
              aria-label={`View ${alt} - image ${i + 1} full size`}
            >
              <span className="image-slider__img-wrap">
                <img src={src} alt={`${alt} - view ${i + 1}`} loading="lazy" />
              </span>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
      {lightboxSrc && (
        <ImageLightbox
          src={lightboxSrc}
          alt={alt}
          onClose={() => setLightboxSrc(null)}
        />
      )}
    </div>
  );
}
