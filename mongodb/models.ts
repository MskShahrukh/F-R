import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  vintage: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  producerId: {
    type: String,
    required: true,
  },
});

const ProducerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model('Product', ProductSchema);
const Producer = mongoose.model('Producer', ProducerSchema);

export { Product, Producer };
