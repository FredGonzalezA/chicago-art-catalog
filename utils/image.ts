export const getImageUrl = (imageId: string, size: '200' | '843' = '200') =>
  `https://www.artic.edu/iiif/2/${imageId}/full/${size},/0/default.jpg`;
