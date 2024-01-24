import { body } from 'express-validator'

export const loginValidation = [
	body('email', 'Невірний формат пошти').isEmail(),
	body('password', 'Надто короткий пароль').isLength({ min: 5 }),
]

export const registerValidation = [
	body('email', 'Невірний формат пошти').isEmail(),
	body('password', 'Надто короткий пароль').isLength({ min: 5 }),
	body('fullName', 'Вкажіть імя').isLength({ min: 3 }),
	body('avatarUrl', 'Невірне посилання аватару').optional().isURL(),
]

export const postCreateValidation = [
	body('title', 'Введіть заголовок статті').isLength({ min: 3 }).isString(),
	body('text', 'Введіть текст статті').isLength({ min: 10 }).isString(),
	body('tags', 'Невірний формат тегів').optional().isString(),
	body('imageUrl', 'Невірне посилання аватар').optional().isString(),
]
