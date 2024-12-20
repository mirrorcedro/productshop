const uploadImage = async (image) => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`;

    const formData = new FormData();
    formData.append("file", image); // Appending the image to the form data
    formData.append("upload_preset", "mern_product"); // Upload preset from Cloudinary dashboard

    try {
        const dataResponse = await fetch(url, {
            method: "POST",
            body: formData,
        });

        if (!dataResponse.ok) {
            throw new Error(`Failed to upload image. HTTP Error: ${dataResponse.status}`);
        }

        const responseData = await dataResponse.json();

        // Check if Cloudinary returned an error
        if (responseData.error) {
            throw new Error(`Cloudinary Error: ${responseData.error.message}`);
        }

        console.log('Image uploaded successfully:', responseData);
        return responseData; // The response data will contain the image URL, public_id, etc.
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error; // Handle the error appropriately
    }
};

export default uploadImage;
