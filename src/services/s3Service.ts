import { S3Client, PutObjectCommand, ObjectCannedACL } from "@aws-sdk/client-s3";
import * as AWS from "aws-sdk";

// const s3 = new S3Client({
//   region: process.env.REACT_APP_AWS_REGION!,
//   credentials: {
//     accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY!,
//   },
// });
const awsS3Bucket: string = process.env.REACT_APP_AWS_BUCKET_NAME || "";
const awsAccessKey = process.env.REACT_APP_AWS_ACCESS_KEY_ID!;
const awsSecretKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY!;

const s3 = new AWS.S3({
  accessKeyId: awsAccessKey,
  secretAccessKey: awsSecretKey,
  region: process.env.REACT_APP_AWS_REGION,
});

export const uploadFileToS3 = async (file: File): Promise<any> => {
  if (!process.env.REACT_APP_AWS_BUCKET_NAME) {
    throw new Error("AWS Bucket Name is not defined in .env");
  }

  const fileName = `${Date.now()}-${file.name}`;

  const uploadParams = {
        Bucket: awsS3Bucket,
        Key: `${Date.now()}-${file.name}`,
        Body: file,
        ContentType: file.type,
      };

  try {
   return await s3.upload(uploadParams).promise();
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw new Error("Failed to upload file to S3");
  }
};