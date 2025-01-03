import { SchemaTypes, Schema, model } from 'mongoose';
const { String } = SchemaTypes;

const Author = new Schema(
  {
    name: {
      type: String,
      required: [true, 'O nome do(a) autor(a) é obrigatório']
    },

    nationality: {
      type: String
    }
  },
  {
    versionKey: false
  }
);

export default model('author', Author);
