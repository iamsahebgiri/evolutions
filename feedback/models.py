from django.db import models

# Create your models here.
class Feedbacks(models.Model):
    title = models.CharField(max_length=200)
    feedback = models.TextField()
    yourname = models.CharField(max_length = 50)

    class Meta:
        verbose_name_plural = "Feedbacks"

    def __str__(self):
        return self.title