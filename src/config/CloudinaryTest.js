const cloudinary = require("cloudinary").v2;

(async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: 'dfdfabhxr', 
        api_key: '621678624871262', 
        api_secret: 'krUh06qzsS3JkwPuqRVwKRZ6c_0' // Click 'View API Keys' above to copy your API secret
    });
    
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);    
})();


// const cloudinary = require("cloudinary").v2;

// (async function () {
//   // Configuration
//   cloudinary.config({
//     cloud_name: "dbpcehigr",
//     api_key: "563186729236619",
//     api_secret: "JvqjgGAr3En7LD6heR_Dv_YGwcI", // Click 'View API Keys' above to copy your API secret
//   });

//   // Upload an image
//   const uploadResult = await cloudinary.uploader
//     .upload(
//       "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
//       {
//         public_id: "shoes",
//       }
//     )
//     .catch((error) => {
//       console.log(error);
//     });

//   console.log(uploadResult);

//   // Optimize delivery by resizing and applying auto-format and auto-quality
//   const optimizeUrl = cloudinary.url("shoes", {
//     fetch_format: "auto",
//     quality: "auto",
//   });

//   console.log(optimizeUrl);

//   // Transform the image: auto-crop to square aspect_ratio
//   const autoCropUrl = cloudinary.url("shoes", {
//     crop: "auto",
//     gravity: "auto",
//     width: 500,
//     height: 500,
//   });

//   console.log(autoCropUrl);
// })();
