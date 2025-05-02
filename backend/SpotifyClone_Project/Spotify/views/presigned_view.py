import boto3
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
import uuid
import mimetypes
@api_view(['POST'])
def get_presigned_url(request):
    file_name = request.data.get('file_name')
    full_type = str(request.data.get('file_type', '')).lower()
    file_type = full_type.split('/')[0] if '/' in full_type else full_type

    if not file_name or not file_type:
        return Response({'error': 'Thiếu thông tin'}, status=400)

    mime_type, _ = mimetypes.guess_type(file_name)  # => 'audio/mpeg'
    file_extension = mimetypes.guess_extension(mime_type or '') or ''

    file_extension = file_extension.lower()

    # Phân loại thư mục dựa vào type đơn giản
    if file_type == 'image':
        folder = 'image-song'
    elif file_type == 'audio':
        if file_extension == '.mp3':
            folder = 'music'
        elif file_extension == '.mp4':
            folder = 'video'
        else:
            folder = 'music'  # fallback
    else:
        folder = 'others'

    file_key = f"{folder}/{uuid.uuid4().hex}{file_extension}"

    s3 = boto3.client('s3',
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        region_name=settings.AWS_S3_REGION_NAME
    )

    presigned_url = s3.generate_presigned_url(
        'put_object',
        Params={
            'Bucket': settings.AWS_STORAGE_BUCKET_NAME,
            'Key': file_key,
            'ContentType': mimetypes.guess_type(file_name)[0] or 'application/octet-stream'
        },
        ExpiresIn=3600
    )

    file_url = f"https://{settings.AWS_STORAGE_BUCKET_NAME}.s3.{settings.AWS_S3_REGION_NAME}.amazonaws.com/{file_key}"

    return Response({
        'url': presigned_url,
        'key': file_key,
        'file_url': file_url
    })


@api_view(['POST'])
def delete_s3_file(request):
    file_key = request.data.get('file_key')
    if not file_key:
        return Response({'error': 'Thiếu file_key'}, status=400)

    s3 = boto3.client('s3',
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        region_name=settings.AWS_S3_REGION_NAME
    )

    try:
        s3.delete_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=file_key)
        return Response({'success': True})
    except Exception as e:
        return Response({'error': str(e)}, status=500)