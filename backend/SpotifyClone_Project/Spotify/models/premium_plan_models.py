from django.db import models

class PremiumPlan(models.Model):
    name = models.CharField(max_length=50, null=False, blank=False)  
    price = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)  # Số thập phân với 10 chữ số, 2 chữ số thập phân

    def __str__(self):
        return self.name  