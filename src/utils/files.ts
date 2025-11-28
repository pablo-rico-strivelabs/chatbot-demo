import { FileUIPart, TextUIPart } from "ai";

export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result;
            if (typeof result === "string") {
                resolve(result.split(",")[1]); // Get base64 part
            } else {
                reject("Failed to convert file to base64");
            }
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
}

export const filesToFileUIPart = async (files: FileList): Promise<FileUIPart[]> => {
    const fileArray = Array.from(files);
    const fileParts: FileUIPart[] = await Promise.all(fileArray.filter(file => file.type !== "text/plain").map(async (file) => ({
        type: "file" as const,
        mediaType: file.type,
        url: await fileToBase64(file),
        filename: file.name,
    })));
    return fileParts;
}

export const filesToTextUIPart = async (files: FileList): Promise<TextUIPart[]> => {
    const fileArray = Array.from(files);
    const textParts: TextUIPart[] = await Promise.all(fileArray.filter(file => file.type === "text/plain").map(async (file) => ({
        type: "text" as const,
        text: await file.text(),
    })));
    return textParts;
}