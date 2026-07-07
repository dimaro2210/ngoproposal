from django.db import models

class Program(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    target_amount = models.DecimalField(max_digits=12, decimal_places=2)
    current_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    status = models.CharField(max_length=50, default='active')
    image_url = models.URLField(max_length=500, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Donation(models.Model):
    donor_name = models.CharField(max_length=150)
    donor_email = models.EmailField()
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    payment_status = models.CharField(max_length=50, default='pending')
    reference = models.CharField(max_length=100, unique=True)
    program = models.ForeignKey(Program, on_delete=models.SET_NULL, null=True, blank=True, related_name='donations')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.donor_name} - ₦{self.amount} ({self.payment_status})"

class Volunteer(models.Model):
    full_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    experience = models.TextField()
    interest_areas = models.TextField()
    status = models.CharField(max_length=50, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} ({self.status})"

class ContactMessage(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True, null=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name} - {self.email}"
