import mongoose from "mongoose"
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId


export const TaskSchema = new Schema({
  name: { type: String, required: true },
  weight: { type: Number, required: true },
  projectId: { type: ObjectId, require: true, ref: 'Sprint' },
  sprintId: { type: ObjectId, require: true, ref: 'Sprint' },
  creatorId: { type: ObjectId, required: true, ref: 'Account' },
  isComplete: { type: Boolean, required: true, default: false }
},
  { timestamps: true, toJSON: { virtuals: true } }
)

TaskSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account',
})


