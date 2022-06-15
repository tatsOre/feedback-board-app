import mongoose from 'mongoose'

const FeedbackSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide an author for the request.'],
    },
    title: {
      type: String,
      unique: true,
      required: [true, 'Please provide a title for this request.'],
      maxlength: [60, 'Title cannot be more than 60 characters'],
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description for the request.'],
      maxlength: [200, 'Description cannot be more than 200 characters'],
    },
    category: {
      type: String,
      default: 'feature',
      required: [true, 'Please provide a category for the request.'],
    },
    status: {
      type: String,
      default: 'suggestion',
    },
    comments: [
      {
        id: Number,
        content: String,
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        replies: [
          {
            content: String,
            replyingTo: String,
            user: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User',
            },
          },
        ],
      },
    ],
    upvotes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

// we don't want to create a new model every single time we hit an API route in Next.js:
export default mongoose.models.Feedback ||
  mongoose.model('Feedback', FeedbackSchema)
