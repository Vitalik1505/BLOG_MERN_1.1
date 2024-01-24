import express from 'express'
import multer from 'multer'
import mongoose from 'mongoose'
import cors from 'cors'
import { registerValidation, loginValidation } from './validations.js'
import { checkAuth, handleValidationErrors } from './utils/index.js'
import { UserController, PostController, CommentController } from './controllers/index.js'
import { postCreateValidation } from './validations.js'

mongoose
	.connect(
		'mongodb+srv://vitalikmicrosoftnote:<PASSWORD>@cluster0.j4ave9p.mongodb.net/blog?retryWrites=true&w=majority'
	)
	.then(() => console.log('DB ok'))
	.catch(() => console.log('DB error', err))

const app = express()

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, 'uploads')
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname)
	},
})

const upload = multer({ storage })

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
	res.json({
		url: `/uploads/${req.file.originalname}`,
	})
})

app.get('/tags', PostController.getLastTags)
app.get('/posts', PostController.getAll)
app.get('/posts/tags', PostController.getLastTags)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update)
app.get('/comments', CommentController.getAll)
app.post('/comments', checkAuth, CommentController.create)

app.listen(4444, err => {
	if (err) {
		return console.log(err)
	}
	console.log('Server OK')
})
