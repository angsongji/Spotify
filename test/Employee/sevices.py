from test import Employee


def get_employees_by_department(dept_id):
    return Employee.objects.filter(department_id=dept_id)