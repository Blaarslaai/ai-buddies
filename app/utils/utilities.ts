/* eslint-disable @typescript-eslint/no-unused-vars */
export async function convertToPng(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image(); // ✅ No arguments needed
      img.src = reader.result as string;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Canvas context is not supported"));
          return;
        }

        // Set canvas size to match the image
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw image on canvas
        ctx.drawImage(img, 0, 0);

        // Convert canvas to PNG Blob
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error("Failed to convert image to PNG"));
            return;
          }

          // Create a new file with PNG format
          const pngFile = new File(
            [blob],
            file.name.replace(/\.[^/.]+$/, "") + ".png",
            {
              type: "image/png",
            }
          );

          resolve(pngFile);
        }, "image/png");
      };

      img.onerror = (error) => reject(new Error("Failed to load image"));
    };

    reader.onerror = (error) => reject(new Error("Error reading file"));

    reader.readAsDataURL(file); // Start reading the file
  });
}
