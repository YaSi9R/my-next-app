
export async function uploadFromUrl(imageUrl: string): Promise<string | null> {
    try {
        const response = await fetch(imageUrl);
        if (!response.ok) {
            console.error(`Failed to fetch image from URL: ${imageUrl}, status: ${response.status}`);
            return null;
        }

        const blob = await response.blob();
        const fileName = imageUrl.split('/').pop() || 'upload.jpg';
        const file = new File([blob], fileName, { type: blob.type });

        const formData = new FormData();
        formData.append("file", file);
        formData.append("action", "upload");

        const apiKey = process.env.IMAGE_UPLOAD_API_KEY;
        const uploadServer = process.env.IMAGE_UPLOAD_SERVER;

        if (!apiKey || !uploadServer) {
            throw new Error("Missing image upload configuration");
        }

        const uploadResponse = await fetch(`${uploadServer}`, {
            method: "POST",
            headers: {
                "x-api-key": apiKey,
            },
            body: formData,
        });

        if (!uploadResponse.ok) {
            const errorText = await uploadResponse.text();
            console.error(`Upload failed upstream for ${imageUrl}:`, uploadResponse.status, errorText);
            return null;
        }

        const data = await uploadResponse.json();
        return data.url;
    } catch (error) {
        console.error(`Error processing image from URL ${imageUrl}:`, error);
        return null;
    }
}
