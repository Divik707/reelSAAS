import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.IMAGEKIT_END_URI || ""   
});

export async function uploadFile(file: string | Buffer, fileName: string) {
  try {
      const response = await imagekit.upload({
    file,
    fileName
  })
  return response;
  } catch (error) {
    console.log(error)
  }
}