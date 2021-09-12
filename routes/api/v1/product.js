const express = require('express')
const router = express.Router()
const { body,param,checkSchema } = require("express-validator")
const productController = require('../../../controllers/api/v1/product-controller')

router.post('/create', [
    body("name").not().isEmpty().withMessage("Name is Empty"),
    body("quantity").isFloat({ gt: 0 }).withMessage("Quantity is less than zero"),
    body("price").isFloat({ gt: 0 }).withMessage("Price should be greater than 0.")
], productController.createProduct)
//validate with price too

router.get('/all', productController.getProduct)

router.delete('/delete/:id',[param("id").isMongoId().withMessage("Id is invalid.")],productController.deleteProduct)

router.patch('/edit/:id',checkSchema({
    id: {
        in:['params'],
        errorMessage: 'ID is wrong',
        isMongoId: true,
    },
    name: {
        in: ["body"],
        errorMessage: "Name shouldn't be empty",
        isEmpty: false,
        optional:true,
    },
    price:{
        in:  ["body"],
        errorMessage: "Price should be greater than zero",
        isFloat : {
            options : {gt : 0},
        },
        optional: true,
    },
    quantity:{
        in:['body'],
        errorMessage: "Quantity should be greater than zero",
        isInt : {
            options: { gt : 0},
        },
        optional: true
    }

}),productController.editProduct)

module.exports = router