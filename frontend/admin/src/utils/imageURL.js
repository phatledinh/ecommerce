const baseURL = import.meta.env.VITE_IMAGE_URL;

export function getImageUrl(path) {
    return baseURL + path;
}
