import mongoose, { SchemaTypes } from 'mongoose';

const Schema = mongoose.Schema;

const autorSchema = new Schema(
  {
    id: { type: SchemaTypes.ObjectId },
    name: { type: SchemaTypes.String, required: true },
    nationality: { type: SchemaTypes.String }
  },
  { versionKey: false }
);

const autorModel = mongoose.model('autores', autorSchema);

export { autorModel, autorSchema };
