import mongoose from "mongoose"
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId


export const NoteSchema = new Schema({
  body: { type: String, required: true },
  taskId: { type: ObjectId, require: true, ref: 'Sprint' },
  projectId: { type: ObjectId, require: true, ref: 'Sprint' },
  creatorId: { type: ObjectId, required: true, ref: 'Account' },
},
  { timestamps: true, toJSON: { virtuals: true } }
)

NoteSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account',
})


