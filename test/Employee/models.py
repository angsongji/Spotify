from django.db import models

class Department (models.Model):
    name = models.CharField (max_length=50)
    location = models.CharField(max_length=100)
    budget = models.IntegerField()

    def __str__(self):
        return self.name
    
class Employee(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=50)
    phone_number = models.CharField(max_length=10)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    


