resource "aws_s3_bucket" "video_storage" {
  bucket = "videoproject-vid-storage"
}

resource "aws_ssm_parameter" "obj_bucket_name" {
  name  = "obj_bucket_name"
  type  = "String"
  value = aws_s3_bucket.video_storage.bucket
}
