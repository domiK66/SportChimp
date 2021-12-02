# Setup helpfile for DJANGO sportapp WITH sportchimp_api
an API for the sportchimp.xyz Webpage

username: admin /password: admin


## SETUP

- Open cmd / bash / shell

### VENV SETUP
- Install virtualenv
```python 
pip install virtualenv
```

- Create a new virtual enviroment, when not already created
```python 
python -m venv venv
```
### ACTIVATE VENV
- Activate the virtual envirmonent: venv (Windows)
```python 
(venv) C:\Users\AK-47u\Desktop\Code Projects\SportChimp>
```
```python 
venv\Scripts\activate.bat
```
- Activate the virtual envirmonent: venv (Linux)
Todo:

### PYTHON DJNAGO DEPENDECIES
- Install Django latest
```python 
pip install django
```
- Install rest_framework and security
```python 
pip install djangorestframework 
```
```python 
pip install djangorestframework-jwt 
```

### RUN THE DJANGO PROJECT
- Migrate migartions files
```python 
cd sportchimp_api
(venv) C:\Users\AK-47u\Desktop\Code Projects\SportChimp\sportchimp_api>
```
- Migrate migartions files
```python 
python manage.py migrate
```
- Run the development server on localhost
```python 
python manage.py runserver
```

### API & ADMIN
http://127.0.0.1:8000/

http://127.0.0.1:8000/admin


### New Models
- Make migrations
```python 
python manage.py makemigrations
```




