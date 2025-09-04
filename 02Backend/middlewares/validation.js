import {body} from 'express-validator'

const validation = [
      body('name').trim()
      .notEmpty().withMessage("Name is required")
      .isLength({min:3}).withMessage("Name length should be minimum 3")
      .isAlpha('en-US',{ignore:' '}).withMessage("Number is not allowed"),

      body('email')
      .notEmpty().withMessage("Email is required")
      .isEmail().withMessage("Enter valid email"),

      body('password')
      .notEmpty().withMessage("Password is required")
      .isLength({min:6})
      .matches(/[A-z]/).withMessage("One Uppercase is required")
      .matches(/[a-z]/).withMessage("One Lowercase is required")
      .matches(/[0-9]/).withMessage("One Number is required")
      .matches(/[^A-za-z0-9]/).withMessage("One special character is required")
]

export default validation