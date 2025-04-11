from django.db import models
from .account_models import Account
from .premium_plan_models import PremiumPlan
from .role_models import Role

class User(models.Model):
    name = models.CharField(max_length=100, null=False)
    birthdate = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=6, choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')], null=True, blank=True)
    avatar = models.CharField(max_length=255, null=True, blank=True)
    
    account = models.ForeignKey(Account, on_delete=models.CASCADE, null=False)  
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True, blank=True)  
    premium = models.ForeignKey(PremiumPlan, on_delete=models.SET_NULL, null=True, blank=True)  

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']