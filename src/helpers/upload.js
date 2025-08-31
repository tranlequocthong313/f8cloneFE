export const uploadMedia = async (file) => {
    if (!file) return file;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);

    const cloudinaryRes = await (
        await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/upload`,
            {
                method: 'POST',
                body: formData,
            }
        )
    ).json();

    return cloudinaryRes?.url;
};
