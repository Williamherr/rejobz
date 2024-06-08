from django.db import models
from django.utils import timezone


STATUS_CHOICES = ['Applied', 'Interviewing', 'Offer', 'Closed']
STATUS_CHOICES = [(choice, choice) for choice in STATUS_CHOICES]

class Application(models.Model):
    jobId = models.CharField(max_length=100,blank=True, null=True)
    position = models.CharField(max_length=100)
    company = models.CharField(max_length=100,blank=True, null=True)
    dateApplied = models.DateField(default=timezone.now().date)
    status = models.CharField(
        max_length=12,
        choices=STATUS_CHOICES,
        default='Applied',
    )
    site = models.CharField(max_length=100,blank=True, null=True)

