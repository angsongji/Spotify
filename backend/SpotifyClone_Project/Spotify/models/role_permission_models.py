from django.db import models
from .role_models import Role
from .permission_models import Permission

class RolePermission(models.Model):
    role_id = models.ForeignKey(Role,on_delete= models.CASCADE )
    permission_id = models.ForeignKey(Permission, on_delete=models.CASCADE)

    class Meta:
            unique_together = ('role_id', 'permission_id')

    def __str__(self):
        return f"Role: {self.role_id}, Permission: {self.permission_id}"  