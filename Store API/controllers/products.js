const Product = require('../models/product')


const getAllProductsStatic = async (req,res)=>{
    // throw new Error('testing async errors')
    const products = await Product.find({}).select('name price')
    res.status(200).json({products,nbHits:products.length})
}

const getAllProducts = async (req,res)=>{
    // console.log(req.query)
    const {featured,company,name,sort,fields} = req.query
    const queryObject = {}
    if(featured){
        queryObject.featured = featured==='true'?true:false
    }
    if(company){
        queryObject.company = comapny
    }
    if(name){
        queryObject.name = { $regex: name, $options:'i'} //regex -> query-operators(returns all the matches which contains related name) 
    }
    let result = Product.find(queryObject)
    if(sort){
        // products = products.sort()
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    }
    else{
        result = result.sort('createAt')
    }
    if(fields){
        const fieldList = fields.split(',').join(' ');
        result = result.select(fieldList);
    }
    const page = Number(req.query.page)||1;
    const limit = Number(req.query.limit)||10;
    const skip = (page-1)*limit;
    result = result.limit(limit).skip(skip);

    const products = await result;
    res.status(200).json({products,nbHits:products.length})
}

module.exports = {
    getAllProductsStatic,
    getAllProducts,
}