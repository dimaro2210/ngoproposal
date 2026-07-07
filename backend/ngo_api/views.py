from rest_framework import viewsets, generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Program, Donation, Volunteer, ContactMessage
from .serializers import (
    ProgramSerializer, DonationSerializer, VolunteerSerializer,
    ContactMessageSerializer, UserRegistrationSerializer, UserProfileSerializer
)

class ProgramViewSet(viewsets.ModelViewSet):
    queryset = Program.objects.all().order_by('-created_at')
    serializer_class = ProgramSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class DonationViewSet(viewsets.ModelViewSet):
    queryset = Donation.objects.all().order_by('-created_at')
    serializer_class = DonationSerializer

    def get_permissions(self):
        # Allow anyone to create a donation record, but only authenticated admin users to list them
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

class VolunteerCreateView(generics.CreateAPIView):
    queryset = Volunteer.objects.all()
    serializer_class = VolunteerSerializer
    permission_classes = [permissions.AllowAny]

class VolunteerListView(generics.ListAPIView):
    queryset = Volunteer.objects.all().order_by('-created_at')
    serializer_class = VolunteerSerializer
    permission_classes = [permissions.IsAuthenticated]

class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.AllowAny]

class ContactMessageListView(generics.ListAPIView):
    queryset = ContactMessage.objects.all().order_by('-created_at')
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.IsAuthenticated]

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def paystack_webhook_simulator(request):
    """
    Mock Paystack Webhook endpoint to simulate and process payment completions locally.
    """
    event = request.data.get('event')
    data = request.data.get('data', {})

    if event == 'charge.success':
        reference = data.get('reference')
        try:
            donation = Donation.objects.get(reference=reference)
            if donation.payment_status == 'success':
                return Response({'status': 'already processed'}, status=status.HTTP_200_OK)
                
            donation.payment_status = 'success'
            donation.save()

            # Update the campaign's raised amount
            if donation.program:
                program = donation.program
                program.current_amount += donation.amount
                program.save()

            return Response({'status': 'payment processed successfully'}, status=status.HTTP_200_OK)
        except Donation.DoesNotExist:
            return Response({'error': 'donation record not found'}, status=status.HTTP_404_NOT_FOUND)

    return Response({'error': 'invalid webhook event'}, status=status.HTTP_400_BAD_REQUEST)


class RegisterView(generics.CreateAPIView):
    """Public endpoint for new user registration."""
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(
            {'message': 'Registration successful!', 'username': user.username},
            status=status.HTTP_201_CREATED
        )


class UserProfileView(generics.RetrieveUpdateAPIView):
    """Returns the authenticated user's profile (JWT required)."""
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
