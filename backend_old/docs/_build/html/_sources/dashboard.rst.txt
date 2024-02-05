dashboard package
=================

Submodules
----------

dashboard.admin module
----------------------

.. automodule:: dashboard.admin
   :members:
   :undoc-members:
   :show-inheritance:

dashboard.apps module
---------------------

.. automodule:: dashboard.apps
   :members:
   :undoc-members:
   :show-inheritance:

dashboard.models module
-----------------------

.. automodule:: dashboard.models
   :members:
   :undoc-members:
   :show-inheritance:
class ProjectSubmission

Contains a reference to a project, along with details of
a project only relevant during mentor/project registration.

class MenteeForm

Allows mentee to choose their preference

MenteePreference

Preferences of a mentee (i.e. a user during a specific season)
dashboard.permissions module
----------------------------

.. automodule:: dashboard.permissions
   :members:
   :undoc-members:
   :show-inheritance:

dashboard.serializers module
----------------------------

.. automodule:: dashboard.serializers
   :members:
   :undoc-members:
   :show-inheritance:

class ProjectSubmissionSerializer

This serializer has a nested project.mentors field, but since this is
read only and co_mentors is write only, this does not cause any issues.

class MenteeSerializer

It uses the mentee form models

dashboard.tests module
----------------------

.. automodule:: dashboard.tests
   :members:
   :undoc-members:
   :show-inheritance:

dashboard.urls module
---------------------

.. automodule:: dashboard.urls
   :members:
   :undoc-members:
   :show-inheritance:

dashboard.views module
----------------------

.. automodule:: dashboard.views
   :members:
   :undoc-members:
   :show-inheritance:

class MenteeView

This view should only return the form
of the currently authenticated user.
Module contents
---------------

.. automodule:: dashboard
   :members:
   :undoc-members:
   :show-inheritance:
