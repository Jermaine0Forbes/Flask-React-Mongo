# Goals

- ~~Need to turn on Debug for app~~
- ~~Need to install React~~
- ~~Need to make flask show react app~~
- ~~Need to install react router and mui~~
- ~~Need to create layout page~~
- ~~Need to create home page~~
- ~~Need to create login form~~
- ~~Need to create signup page~~
- ~~Need to create footer section~~
- ~~Need to create profile page~~
- ~~Need to create validation on login api request~~
    - ~~salt password~~
    - ~~change api to login~~
    - ~~fetch request to api~~
    - ~~on success redirect to profile~~
- ~~connecting SQLAlchemy to app~~
    - ~~create models/sqlalchemy directory~~
    - ~~create env variable for mysql connection~~
    - ~~create schema for user~~
- ~~creating users for MySQL~~
    - ~~install jwt~~
    - ~~check if username already exists~~
    - ~~create user turn data into jwt token~~
    - ~~save the user ~~
    - ~~return token and possibly save to local storage~~
    - ~~redirect to profile after registering~~
- ~~connecting Mongo to app~~
- ~~make properties necessary in model class~~
- ~~creating users for Mongo~~
- ~~add conditional in register api to create user~~
- ~~possibly make email an optional valdiation field~~
- ~~create a mongo user through the signup page~~
- ~~create jwt token after creating mongo user~~
- ~~check if username exists in mongo~~
- ~~create endpoint to see if jwt is still valid~~
- ~~get user information after jwt validation~~
- ~~create service to retrieve user profile~~
- ~~update ui to handle profile data~~
- ~~create auth provider and reducer/context~~
- ~~create profile link~~
- ~~need to add logout functionality~~
- ~~add logic to login api~~
- ~~return jwt after successful login~~
- create roles and permissions for users
- set and remove cookies during authentication
- need to add proper type hinting to context and reducer
- need to refactor
- need to add test cases


### 3-7-26

Deciding if I want to start over and create new flask app with all the extensions that are recommended to use flask security. At this moment, I think I'm going to try to implement Flask Principal and see if I can get a working example of prevent certain users from accessing certain endpoints. It's definitely going to take some time because in the last sessions I have not been coding I've just been reading docs.


### 3-4-26

- [flask principal](https://pythonhosted.org/Flask-Principal/)
- [flask security: rbac](https://flask-security-too.readthedocs.io/en/stable/features.html#role-identity-based-access)
- [flask: security considerations](https://flask.palletsprojects.com/en/stable/web-security/)
- [flask - role based access control - geeksforgeeks](https://www.geeksforgeeks.org/python/flask-role-based-access-control/)
- [mongoengine](https://pypi.org/project/mongoengine/)