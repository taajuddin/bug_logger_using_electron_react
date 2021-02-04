const mongoose=require('mongoose')

const connectDB= async () =>{
    try {
        const conn=await mongoose.connect('mongodb+srv://taaj12:taaj12@cluster0.ir5kv.mongodb.net/Bug_logger?retryWrites=true&w=majority',{
            useNewUrlParser:true,
            useCreateIndex:true,
            useUnifiedTopology:true
        })
        console.log('mongodb connected')
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports=connectDB