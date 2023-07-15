

import React from 'react';

const defaultImageUrl = 'https://www.pexels.com/photo/japanese-japan-kimono-3532547/';

export default function ImageHelper({ product }) {
  const imageUrl = product ? product.image : defaultImageUrl;

  return (
    <div className='rounded border border-success p-1'>
      <img
        src={imageUrl}
        style={{ maxHeight: '100%', maxWidth: '100%' }}
        className='mb-3 rounded'
        alt='product'
      />
    </div>
  );
}