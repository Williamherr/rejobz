from django.urls import path
from . import views

urlpatterns = [
    path('excel/', views.excel, name='excel'),
    path('csv/', views.csv, name='csv'),
]