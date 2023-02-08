export async function uploadImg(file: File): Promise<Response> {
    const baseURL = 'https://api.cloudinary.com/v1_1/';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_CLOUD_UPLOAD_PRESET!);

    return fetch(`${baseURL}${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
    }).then((res) => res.json());
}
