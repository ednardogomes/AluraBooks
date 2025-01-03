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
      type: Number
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
