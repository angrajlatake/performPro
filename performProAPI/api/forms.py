from django import forms
from .models import UploadedFile


class UploadFileForm(forms.ModelForm):
    class Meta:
        model = UploadedFile
        fields = ["file", "file_name"]


class CSVFileUploadForm(forms.ModelForm):
    class Meta:
        model = UploadedFile
        fields = ["file", "file_name"]
