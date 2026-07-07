from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProgramViewSet,
    DonationViewSet,
    VolunteerCreateView,
    VolunteerListView,
    ContactMessageCreateView,
    ContactMessageListView,
    paystack_webhook_simulator,
    RegisterView,
    UserProfileView,
)

router = DefaultRouter()
router.register('programs', ProgramViewSet, basename='program')
router.register('donations', DonationViewSet, basename='donation')

urlpatterns = [
    path('', include(router.urls)),
    path('volunteer/register/', VolunteerCreateView.as_view(), name='volunteer-register'),
    path('volunteer/list/', VolunteerListView.as_view(), name='volunteer-list'),
    path('contact/send/', ContactMessageCreateView.as_view(), name='contact-send'),
    path('contact/list/', ContactMessageListView.as_view(), name='contact-list'),
    path('webhook/paystack/', paystack_webhook_simulator, name='paystack-webhook'),
    path('auth/register/', RegisterView.as_view(), name='auth-register'),
    path('auth/profile/', UserProfileView.as_view(), name='auth-profile'),
]
