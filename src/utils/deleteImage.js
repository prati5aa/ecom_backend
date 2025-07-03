const fs= require ("fs")
const path = require("path");

const deleteImage= (filename)=>
{
    
    const filePath= path.join(__dirname,"../../uploads",filename)
    console.log("fil path",filePath)



    fs.unlink(filePath,(err)=>{
        if(err)
        {
            console.error("Error deleting file:", err);
        }else {
            console.log("File deleted successfully",filename);
        }
    })
};
module.exports={ deleteImage}

