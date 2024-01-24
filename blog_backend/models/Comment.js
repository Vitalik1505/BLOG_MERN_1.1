import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema(
	{
		text: {
			type: String,
			require: true,
			unique: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
        post: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Post',
			required: true,
		},
	},
	{
		timeStamps: true,
	}
)

export default mongoose.model('Comment', CommentSchema)