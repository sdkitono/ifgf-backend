import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

aws.config.update({
    secretAccessKey: 'J9liQBI3+xCdejR3UISC/Y25RE9ISd8orKWb4pLe',
    accessKeyId: 'AKIAILY7RTFXAR5KOMIA',
    region: 'us-east-1'
});
const s3 = new aws.S3();
const uploadScanFile = multer({
  storage: multerS3({
    s3,
    bucket: 'finliv_bucket',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, 'IdentificationScan/' + Date.now().toString() + file.originalname);
    }
  })
});

class FileUploadHelper {
  static getUploadScanFileConnect() {
    return uploadScanFile;
  }
}

export default FileUploadHelper;

