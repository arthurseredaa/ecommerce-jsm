import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';
import productSchema from './product';
import bannerSchema from './banner';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([bannerSchema, productSchema]),
});
