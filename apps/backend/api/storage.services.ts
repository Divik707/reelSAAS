import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.IMAGEKIT_END_URI || ""  
});

interface UploadInput {
  file: File | Buffer | string;
  fileName: string;
}

async function uploadFile(file: File | Buffer | string, fileName: string) {
  try {
    const res = await imagekit.upload({
        //@ts-ignore
      file,
      fileName,
    });
    return res;
  } catch (error) {
    console.error("ImageKit upload error:", error);
    throw error;          
}}