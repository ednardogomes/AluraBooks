import mongoose, { SchemaTypes } from 'mongoose';
import { autorSchema } from './Autor.schema.js';

const Schema = mongoose.Schema;

const livroSchema = new Schema(
  {
    id: { type: SchemaTypes.ObjectId },
    title: { type: SchemaTypes.String, required: true },
    publisher: { type: SchemaTypes.String },
    price: { type: SchemaTypes.Number },
    page: { type: SchemaTypes.Number },
    author: { type: autorSchema, required: false }
  },
  { versionKey: false }
);

const livroModel = mongoose.model('livros', livroSchema);

export default livroModel;
