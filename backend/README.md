# SportChimp.xyz Django - Backend

This module is made with Django v3.2.10 and sportchimp_api an API for the sportchimp.xyz single-page Web-Application.

### API & ADMIN

>To get to the API-Endpoint visit the [Rest API](http://localhost:8000)
>> Or go to the [Admin Dashboard](http://localhost:8000/admin)

## Requirements
Can be found in the [requirements.txt](https://github.com/domiK66/SportChimp/blob/main/backend/requirements.txt)

> **Python version 3.10.0** ([Download here](https://www.python.org/downloads/))
```
Package                 Version
----------------------- -------
asgiref                 3.4.1
Django                  3.2.10
djangorestframework     3.12.4
djangorestframework-jwt 1.11.0
Pillow                  9.0.0
pip                     21.1.3
PyJWT                   1.7.1
pytz                    2021.3
setuptools              57.0.0
sqlparse                0.4.2
wheel                   0.36.2

```

## SETUP API

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
| It should look like this:
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
pip install djangorestframework==3.12.4
```
```python 
pip install djangorestframework-jwt==1.11.0
```

### RUN THE DJANGO PROJECT
- Migrate migrations files
```python 
cd sportchimp_api
(venv) C:\Users\PC-NAME\SportChimp\sportchimp_api>
```

```python 
python manage.py migrate
```
- Run the development server on localhost
```python 
python manage.py runserver
```

- Create a superuser
> **Follow instructions in the Terminal**

```python
python manage.py createsuperuser
```

- Add Sports Data
```python
python manage.py loaddata sports
```

### New Models
- Make migrations
```python 
python manage.py makemigrations
```

```python 
python manage.py migrate
```





