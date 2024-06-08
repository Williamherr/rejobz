from rest_framework import serializers
from .models import Application

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['id','jobId','position', 'company', 'dateApplied', 'status', 'site']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['dateApplied'] = "/".join(str(int(part)) for part in instance.dateApplied.strftime("%m/%d/%Y").split("/"))
        return representation