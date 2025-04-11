from django.db import models
from .account_models import Account
from .premium_plan_models import PremiumPlan

class Account_Premium(models.Model):
    account_id = models.ForeignKey(Account, on_delete=models.CASCADE)
    premium_id = models.ForeignKey(PremiumPlan,on_delete=models.CASCADE )
    start_date = models.DateField()
    end_date = models.DateField()

    class Meta:
         unique_together = ('account_id', 'premium_id')

    def __str__(self):
        return f"Account: {self.account_id}, Premium: {self.premium_id}"
