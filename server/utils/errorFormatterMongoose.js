/*
export const errorFormatterMongoose = (mongooseError) =>{

    if (mongooseError.name === "ValidationError") {
        let errors = {};
        Object.keys(mongooseError.errors).forEach((key) => {
            errors[key] = mongooseError.errors[key].message;
        });
        return errors;
    }else if (mongooseError.code === 11000) {
        return Object.entries(mongooseError.keyValue).reduce((pre,[k,v])=>(pre[k] = `${k} is already exist`,pre),{});
    }else{
        return mongooseError.errors;
    }
}

*/