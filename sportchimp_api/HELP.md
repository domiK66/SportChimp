# Django admin credentials
username: admin

password: admin

# Django setup steps
1. Open cmd

2. Install virtualenv
```python 
pip install virtualenv
```

3. Create a new virtual enviroment, when not already created
```python 
python -m venv venv
```

4. Activate venv (Windows)
```python 
venv\Scripts\activate.bat
```

5. Install Django
```python 
pip install django
```

6. Install rest_framework and security
```python 
pip install djangorestframework 
```
```python 
pip install djangorestframework-jwt 
```

7. Make migrations
```python 
python manage.py makemigrations
```

8. Migrate
```python 
python manage.py migrate
```

9. Run development server
```python 
python manage.py runserver
```
