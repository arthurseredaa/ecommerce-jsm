import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: '9yg3zslr',
  dataset: 'production',
  apiVersion: '2022-04-23',
  useCdn: true,
  token: process.env.DEVELOPMENT_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const getSanityImageUrl = (source) => builder.image(source);
