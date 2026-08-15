import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({ region: process.env.S3_REGION || 'auto', endpoint: process.env.S3_ENDPOINT, credentials: { accessKeyId: process.env.S3_ACCESS_KEY!, secretAccessKey: process.env.S3_SECRET_KEY! } });
const BUCKET = process.env.S3_BUCKET!;

export async function generateUploadUrl(fileName: string, contentType: string, userId: string) {
  const key = `uploads/${userId}/${Date.now()}-${fileName}`;
  const command = new PutObjectCommand({ Bucket: BUCKET, Key: key, ContentType: contentType });
  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  const fileUrl = `${process.env.S3_ENDPOINT}/${BUCKET}/${key}`;
  return { uploadUrl, fileUrl, key };
}

export async function getFileUrl(key: string) {
  const command = new GetObjectCommand({ Bucket: BUCKET, Key: key });
  return getSignedUrl(s3Client, command, { expiresIn: 3600 });
}

export async function deleteFile(key: string) {
  const command = new DeleteObjectCommand({ Bucket: BUCKET, Key: key });
  await s3Client.send(command);
}

export function getPublicUrl(key: string) {
  return `${process.env.S3_ENDPOINT}/${BUCKET}/${key}`;
}
