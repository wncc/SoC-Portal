accounts package
================

Submodules
----------

accounts.admin module
---------------------

.. automodule:: accounts.admin
   :members:
   :undoc-members:
   :show-inheritance:

accounts.apps module
--------------------

.. automodule:: accounts.apps
   :members:
   :undoc-members:
   :show-inheritance:

accounts.custom\_auth module
----------------------------

.. automodule:: accounts.custom_auth
   :members:
   :undoc-members:
   :show-inheritance:

accounts.forms module
---------------------

.. automodule:: accounts.forms
   :members:
   :undoc-members:
   :show-inheritance:

accounts.models module
----------------------

.. automodule:: accounts.models
   :members:
   :undoc-members:
   :show-inheritance:
class UserCreationForm

Has fields roll number and email (basic info to create a user)

def _create_user

Create and save a user with the given roll number, email, and password.

class User

Users within the Django authentication system are represented by this
model.
Roll_number and password are required. Other fields are optional.


accounts.serializers module
---------------------------

.. automodule:: accounts.serializers
   :members:
   :undoc-members:
   :show-inheritance:

def validate_password

Validate the password against all password validators.

def create

Override the create mehtod with objects.create_user,
since the former saves with an unencrypted password

class UserAutoCompleteSerializer

To automatcally complete User's name

accounts.tests module
---------------------

.. automodule:: accounts.tests
   :members:
   :undoc-members:
   :show-inheritance:

accounts.urls module
--------------------

.. automodule:: accounts.urls
   :members:
   :undoc-members:
   :show-inheritance:

accounts.views module
---------------------

.. automodule:: accounts.views
   :members:
   :undoc-members:
   :show-inheritance:

Module contents
---------------

.. automodule:: accounts
   :members:
   :undoc-members:
   :show-inheritance:
