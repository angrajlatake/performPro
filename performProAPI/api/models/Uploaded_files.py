from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator


class UploadedFile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    file = models.FileField(upload_to="uploaded_files/", null=True)
    file_name = models.CharField(max_length=255, null=True)
    file_size = models.IntegerField(validators=[MaxValueValidator(104857600)])
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file_name

    def save(self, *args, **kwargs):
        if self.file:
            self.file_size = self.file.size
        super().save(*args, **kwargs)
