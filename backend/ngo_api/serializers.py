from rest_framework import serializers
from django.utils.html import escape
from django.contrib.auth.models import User
from .models import Program, Donation, Volunteer, ContactMessage

class SafeSerializer(serializers.ModelSerializer):
    """
    Base serializer that strips/escapes HTML tags from all input string values
    to protect against XSS stored injection.
    """
    def validate(self, attrs):
        for field, value in attrs.items():
            if isinstance(value, str):
                attrs[field] = escape(value)
        return super().validate(attrs)

class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = '__all__'

class DonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = '__all__'

class VolunteerSerializer(SafeSerializer):
    class Meta:
        model = Volunteer
        fields = '__all__'

class ContactMessageSerializer(SafeSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8, style={'input_type': 'password'})
    password2 = serializers.CharField(write_only=True, label='Confirm Password', style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password', 'password2']
        extra_kwargs = {'email': {'required': True}}

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({'password': 'Passwords do not match.'})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            password=validated_data['password']
        )
        return user

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'date_joined']
        read_only_fields = ['id', 'username', 'date_joined']
