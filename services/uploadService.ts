
export interface UploadResponse {
    success: boolean;
    file_name: string;
    url: string;
}

export interface DeleteResponse {
    success: boolean;
    message: string;
}

export const uploadImage = async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();

    formData.append("file", file);

    const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Upload failed");
    }

    return response.json();
};

export const deleteImage = async (fileName: string): Promise<DeleteResponse> => {
    const response = await fetch("/api/delete-image", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ file_name: fileName }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Delete failed");
    }

    return response.json();
};
