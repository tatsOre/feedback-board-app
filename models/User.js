import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    name: {
      type: String,
      required: [true, 'Please provide a name for the user.'],
      maxlength: [60, "User's name cannot be more than 60 characters."],
    },
    username: {
      type: String,
      required: [true, 'Please provide a username for the user.'],
      maxlength: [60, "User's username cannot be more than 60 characters."],
    },
    upvoted: [{ type: mongoose.Schema.ObjectId, ref: 'Feedback' }],
    requests: [{ type: mongoose.Schema.ObjectId, ref: 'Feedback' }],
  },
  { timestamps: true }
)

UserSchema.set('toJSON', {
  virtuals: true,
})

export default mongoose.models.User || mongoose.model('User', UserSchema)
