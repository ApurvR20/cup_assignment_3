const ProductModel = require("../../../model/Product")
const { validationResult } = require("express-validator")

/* to do
- attach atlas
- create edit and delete controllers
- call them in product.js and create their routes
- write readme
- add a video
*/
module.exports.createProduct = async(req,res)=> {
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty())
        {
            return res.status(400).json({ errors: errors.array() })
        }
        const data = await ProductModel.create(req.body)
        res.status(200).json({msg: "Product created successfully", data: data})
    }
    catch(err){
        console.error('Error in creating product');
        res.status(500).json({ msg : "Internal Server Error "})
    }
}

module.exports.getProduct = async(req,res)=> {
    try{
        const data = await ProductModel.find({})
        res.status(200).json({msg: "Product ", data: data})
    }
    catch(err){
        console.error('Error in finding product');
        res.status(500).json({ msg : "Internal Server Error "})
    }
}

module.exports.deleteProduct = async(req,res) => {
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() })
        }
        const data = await ProductModel.findByIdAndDelete(req.params["id"])
        if(!data){
            res.status(400).json( { msg: "Not Found", data : "Incorrect ID entered"})
        }
        else{
            res.status(200).json({ msg: "Deleted Successfully", data: data})
        }
    }
    catch(err){
        console.error("Error in deleting product", error)
        res.status(500).json({ msg: "Interval Server Error "})
    }
}

module.exports.editProduct = async(req,res) => {
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array })
        }
        const data = await ProductModel.findByIdAndUpdate(
            req.params["id"],
            req.body,
            {new: true}
        )
        if(!data){
            res.status(400).json( { msg: "Not Found", data : "Incorrect ID entered"})
        }
        else{
            res.status(200).json({ msg: "Edited Successfully", data: data})
        }
    }
    catch(error){
        console.error("Error in updating product", error)
        res.status(500).json({ msg: "Internal Server Error" })
    }
}

