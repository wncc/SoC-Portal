# Database Entity Relationship Diagram
> An entity–relationship model (or ER model) describes interrelated things of interest in a specific domain of knowledge. A basic ER model is composed of entity types (which classify the things of interest) and specifies relationships that can exist between entities (instances of those entity types). -  Wikipedia

This is a diagram that shows the current database schema, generated based on the app's models.

```mermaid
---
Django ER Diagram
---
erDiagram
User {
    BigAutoField id
    CharField password
    DateTimeField last_login
    BooleanField is_superuser
    CharField roll_number
    CharField first_name
    CharField last_name
    CharField email
    BooleanField is_staff
    BooleanField is_active
    DateTimeField date_joined
    ManyToManyField groups
    ManyToManyField user_permissions
}
Season {
    BigAutoField id
    CharField name
    BooleanField is_active
    IntegerField status
}
Project {
    BigAutoField id
    DateTimeField created
    CharField title
    ForeignKey season
    CharField category
    IntegerField mentee_min
    IntegerField mentee_max
    TextField abstract
    TextField description
    TextField timeline
    FileField banner_image
    BooleanField is_accepted
    ManyToManyField mentors
}
MentorRequest {
    BigAutoField id
    ForeignKey mentor
    ForeignKey project
    IntegerField status
}
Mentee {
    BigAutoField id
    ForeignKey user
    ForeignKey season
    ForeignKey project
    ManyToManyField preferences
}
MenteePreference {
    BigAutoField id
    ForeignKey mentee
    ForeignKey project
    TextField sop
    IntegerField ordering
}

Project }|--|| Season : season
Project }|--|{ User : mentors
MentorRequest }|--|| User : mentor
MentorRequest }|--|| Project : project
Mentee }|--|| User : user
Mentee }|--|| Season : season
Mentee }|--|| Project : project
Mentee }|--|{ Project : preferences
MenteePreference }|--|| Mentee : mentee
MenteePreference }|--|| Project : project
```
