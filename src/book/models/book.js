import { SchemaTypes, Schema, model } from 'mongoose';
const { String, Number, ObjectId } = SchemaTypes;

const Book = new Schema(
  {
    title: {
      type: String,
      required: [true, 'O título é origatório']
    },

    publisher: {
      type: String,
      required: [true, 'A editoria é obrigatória']
    },

    price: {
      type: Number
    },

    page: {
      type: Number,
      min: [10, 'O numero de páginas deve estar entre 10 e 5000'],
      max: [5000, 'O numero de páginas deve estar entre 10 e 5000']
    },

    author: {
      type: ObjectId,
      ref: 'author',
      required: [true, 'O(a) nome do autor(a) é origatório']
    }
  },
  {
    versionKey: false
  }
);

export default model('book', Book);
