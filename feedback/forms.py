from django import forms  
from .models import Feedbacks

class FeedbacksForm(forms.ModelForm):  
    class Meta:  
        model = Feedbacks
        fields = ("__all__")