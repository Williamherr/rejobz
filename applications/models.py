from django.db import models


STATUS_CHOICES = [
    ('A', 'Applied'),
    ('I', 'Interviewing'),
    ('O', 'Offer'),
    ('R', 'Rejected'),
    ('C', 'Closed'),
]

class Application(models.Model):

    position = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    dateApplied = models.DateField()
    status = models.CharField(
        max_length=1,
        choices=STATUS_CHOICES,
        default='A',
    )
    site = models.CharField(max_length=100)
    

