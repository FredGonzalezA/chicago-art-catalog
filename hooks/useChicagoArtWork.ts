import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {ArtWorkDetails} from '../types/global';
import {camelize} from '../utils/objects';
import sanitizeHtml from 'sanitize-html';

export const useChicagoArtWork = (id: string) => {
  const url = React.useMemo(
    () =>
      `https://api.artic.edu/api/v1/artworks/${id}?fields=artist_display,place_of_origin,exhibition_history,is_public_domain,copyright_notice,has_advanced_imaging,has_educational_resources,has_multimedia_resources,color,medium_display`,
    [id],
  );

  return useQuery<{
    data: ArtWorkDetails;
  }>({
    queryKey: ['chicagoArtWork', url],
    queryFn: () =>
      fetch(url)
        .then(res => res.json())
        .then(data => camelize(data))
        .then(data => {
          data.data.exhibitionHistory = sanitizeHtml(
            data.data.exhibitionHistory,
            {
              allowedTags: [],
            },
          );
          return data;
        }),
    keepPreviousData: true,
  });
};
