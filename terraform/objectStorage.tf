resource "aws_s3_bucket" "video_storage" {
  bucket = "videoproject-vid-storage"
}

resource "aws_ssm_parameter" "video_storage_s3_bucket" {
  name  = "/video/storageBucketName"
  type  = "String"
  value = aws_s3_bucket.video_storage.bucket
}
