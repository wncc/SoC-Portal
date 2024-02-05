projects package
================

Subpackages
-----------

.. toctree::
   :maxdepth: 2



Submodules
----------

projects.admin module
---------------------

.. automodule:: projects.admin
   :members:
   :undoc-members:
   :show-inheritance:
 Here you can register your models

projects.apps module
--------------------

.. automodule:: projects.apps
   :members:
   :undoc-members:
   :show-inheritance:

projects.models module
----------------------

.. automodule:: projects.models
   :members:
   :undoc-members:
   :show-inheritance:

class SeasonManager:

Method to get the currently active Season. Has a hacky implementation using the
hard-coded Season ID, which can be overriden by setting hard_coded to False

def current_id:

Method to get the currently active Season ID. Has a hacky implementation using the
hard-coded Season ID, which can be overriden by setting hard_coded to False

class Season:

Model representing a Seasons of Code event. Used by projects to
reference which event they belonged to, and to control the apprearence of
the dashboard as the event progresses.

def get_current_id:

Method to return current_id of the Season ongoing

class Project:

Contains details of Project

class CategoryChoices:

Contains all the dropdown menu options i.e. all the genres

mentee_min and mentee_max:

Min and Max number of mentees for a particular projects

class MentorRequest:

Explicit many-to-many linking table between Project and
User. Doubles as the (co-)mentor request table

projects.serializers module
---------------------------

.. automodule:: projects.serializers
   :members:
   :undoc-members:
   :show-inheritance:
class ProjectSerializer:

Imports all the fields of Project Model


projects.urls module
--------------------

.. automodule:: projects.urls
   :members:
   :undoc-members:
   :show-inheritance:

projects.views module
---------------------

.. automodule:: projects.views
   :members:
   :undoc-members:
   :show-inheritance:

Module contents
---------------

.. automodule:: projects
   :members:
   :undoc-members:
   :show-inheritance:
