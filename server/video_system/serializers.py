from rest_framework import serializers
from .models import Video
from client_system.serializers import ClientSerializer

class VideoSerializer(serializers.ModelSerializer):
    """
    Serializer for the Video model.
    """
    video = serializers.SerializerMethodField()
    client_name = serializers.SerializerMethodField()

    class Meta:
        model = Video
        fields = ['id', 'caption', 'video', 'upload_date', 'client_name']

    def get_video(self, obj):
        """
        Returns the absolute URL of the video.
        """
        return self.context['request'].build_absolute_uri(obj.video.url)

    def get_client_name(self, obj):
        """
        Returns the name of the client associated with the video (if any).
        """
        if obj.client:
            client_serializer = ClientSerializer(obj.client)
            return client_serializer.data['name']
        else:
            return None

class VideoUploadSerializer(serializers.ModelSerializer):
    """
    Serializer for uploading a video.
    """
    class Meta:
        model = Video
        fields = ['caption', 'video', 'client']

class VideoDeleteSerializer(serializers.Serializer):
    """
    Serializer for deleting a video.
    """
    id = serializers.IntegerField()
