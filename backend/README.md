# Setup helpfile for DJANGO sportapp WITH sportchimp_api
an API for the sportchimp.xyz Webpage

username: admin/password: admin


## SETUP

- Open cmd / bash / shell

### VENV SETUP
- Install virtualenv
```python 
pip install virtualenv
```

- Create a new virtual environment, when not already created
```python 
python -m venv venv
```
### ACTIVATE VENV
- Activate the virtual environment: venv (Windows)
```python 
(venv) C:\Users\AK-47u\Desktop\Code Projects\SportChimp>
```
```python 
venv\Scripts\activate.bat
```
- Activate the virtual environment: venv (Linux/Mac)
```python
(venv) lukas@MacBook-Pro-Lukas backend % source venv/bin/activate  
```
### PYTHON DJANGO DEPENDENCIES
- Install Django version 3.2.10
```python 
pip install django==3.2.10
```
- Install rest_framework and security
```python 
pip install djangorestframework 
```
```python 
pip install djangorestframework-jwt 
```

### RUN THE DJANGO PROJECT
- Migrate migrations files
```python 
cd sportchimp_api
(venv) C:\Users\AK-47u\Desktop\Code Projects\SportChimp\sportchimp_api>
```

```python 
python manage.py migrate
```
- Run the development server on localhost
```python 
python manage.py runserver
```
- Add Sports Data
```python
python manage.py loaddata sports
```

### API & ADMIN
http://127.0.0.1:8000/

http://127.0.0.1:8000/admin


### New Models
- Make migrations
```python 
python manage.py makemigrations
```






