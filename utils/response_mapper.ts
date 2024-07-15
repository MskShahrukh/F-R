import { iProducer } from '../types/Producer';
import { iProduct, iProductCSV } from '../types/Product';

const makeProducerResponse = (product: iProductCSV) => {
  return {
    name: product['Producer'],
    country: product['Country'],
    region: product['Region'],
  };
};

const makeProductResponse = (product: iProductCSV, producerId?: string) => {
  return {
    vintage: product['Vintage'],
    name: product['Product Name'],
    producerId: producerId || product['Producer'],
  };
};

export { makeProducerResponse, makeProductResponse };
