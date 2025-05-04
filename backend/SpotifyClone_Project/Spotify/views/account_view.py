# views/account_view.py
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.hashers import check_password
from ..serializers.account_serializer import AccountLoginSerializer,AccountRegisterSerializer
from ..models.account_models import Account
from ..models.user_models import User
from ..models.friend_list_models import FriendList
from django.core.mail import send_mail
from django.conf import settings
from django.utils.crypto import get_random_string
from django.urls import reverse
from django.shortcuts import redirect


class AccountLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = AccountLoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            
            try:
                account = Account.objects.get(email=email)

                # Kiểm tra mật khẩu trước
                if not check_password(password, account.password):
                    return Response({"error": "Mật khẩu không đúng"}, status=status.HTTP_400_BAD_REQUEST)

                # Nếu mật khẩu đúng, tiếp tục kiểm tra is_active
                if not account.is_active:
                    return Response(
                        {"error": "Tài khoản chưa được xác thực. Vui lòng kiểm tra email để xác thực tài khoản."},
                        status=status.HTTP_403_FORBIDDEN
                    )


                # Nếu mọi thứ ok → cấp token
                account.is_online = True
                account.save()

                refresh = RefreshToken.for_user(account)

                return Response({
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                    "email": account.email,
                    "id": account.id,
                })

            except Account.DoesNotExist:
                return Response({"error": "Không tìm thấy tài khoản với email này"}, status=status.HTTP_404_NOT_FOUND)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class AccountLogoutView(APIView):
    # permission_classes = [IsAuthenticated]

    def post(self, request):
        token = request.headers.get('Authorization', None)

        if not token:
            return Response({"error": "Không tìm thấy token trong header"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            token = token.split(' ')[1]  # Lấy phần access token

            # Giải mã token để lấy user_id
            decoded_token = AccessToken(token)
            payload= decoded_token.payload
            
            # print(f"Dedcode_Token: {decoded_token}")
            # print(f"Payload: {payload}")

            user_id = payload['user_id']
            # Truy vấn người dùng từ user_id
            try:
                user = Account.objects.get(id=user_id)
                
                # In thông tin người dùng ra màn hình để debug
                print(f"Thông tin người dùng: {user}")

                # Trả về thông tin người dùng cho Postman (hoặc log để debug)
                user_info = {
                    "id": user.id,
                    "email": user.email,
                    "is_online": user.is_online,
                }

                # Cập nhật trạng thái is_online
                user.is_online = False
                user.save()

                return Response({
                    "message": "Đăng xuất thành công!",
                    "user_info": user_info  # Gửi thông tin người dùng lại trong response
                }, status=status.HTTP_200_OK)
            except Account.DoesNotExist:
                # Khi không tìm thấy user, trả về lỗi thông báo chi tiết
                return Response({"error": f"Không tìm thấy người dùng với id {user_id}"}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            print(f"❌ Lỗi trong quá trình logout: {e}")
            user.is_online = False
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
            
class AccountRegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = AccountRegisterSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']

            # 🔍 Kiểm tra xem tài khoản với email đã tồn tại chưa
            if Account.objects.filter(email=email).exists():
                return Response(
                    {"error": "Email này đã được đăng ký. Vui lòng sử dụng email khác."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Nếu chưa tồn tại → tạo tài khoản
            account = serializer.save()

            # Tạo token xác nhận
            account.verification_token = get_random_string(32)
            account.save()

            # Tạo link xác nhận email
            verification_url = request.build_absolute_uri(
                reverse("verify-email", args=[account.verification_token])
            )

            # Gửi email xác nhận
            send_mail(
                "Xác nhận tài khoản",
                f"Nhấn vào liên kết sau để xác nhận tài khoản: {verification_url}",
                settings.DEFAULT_FROM_EMAIL,
                [account.email],
                fail_silently=False,
            )

            return Response(
                {"message": "Tài khoản đã được tạo. Vui lòng kiểm tra email để xác thực."},
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VerifyEmailView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, token):
        try:
            account = Account.objects.get(verification_token=token)
            account.is_active = True
            account.verification_token = ""  # Xóa token sau khi xác nhận
            account.save()

            # ✅ Tạo User mới liên kết với Account
            User.objects.create(
                name="Chưa có tên",
                birthdate="2000-01-01",     
                gender="Other",
                avatar="None",
                account_id=account.id,             
                premium=None,
                role_id=2
            )

            if not hasattr(User, 'friend_list'):
             FriendList.objects.create(user=User)

            return redirect("http://localhost:5173/email-verified")
        except Account.DoesNotExist:
            return Response({"error": "Invalid verification token"}, status=status.HTTP_400_BAD_REQUEST)
