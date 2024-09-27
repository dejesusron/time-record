import mongoose from 'mongoose';

const recordSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    timeIn: {
      type: Date,
      required: true,
    },
    timeOut: {
      type: Date,
      required: false,
    },
    duration: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

recordSchema.pre('save', function (next) {
  if (this.timeOut && this.timeIn) {
    this.duration = this.timeOut - this.timeIn;
  }

  next();
});

const Record = mongoose.model('Record', recordSchema);

export default Record;
