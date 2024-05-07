# Frontend Development

## Required Skills

Note that this project is completely beginner-friendly, none of the required skills are hard and fast prerequisites, you can always learn as you go!

- React - [YouTube Tutorial](https://www.youtube.com/playlist?list=PLu0W_9lII9agx66oZnT6IyhcMIbUMNMdt)
- JavaScript - [Tutorial](https://github.com/wncc/learners-space/blob/master/Web%20Development/Week%203/Bootstap%2BJavaScript.md)

## Project Statement

This project aims at creating a functional, user-friendly portal for WnCC's annual **Seasons of Code (SoC)**. The portal's objective is to bring together the various processes running in the background throughout the SoC projects' duration. Students will be able to register as mentors and mentees, float and apply for projects and access checkpoint and submission forms all in one place.

- **Home Page:** This page provides a general overview of SoC, along with some statistics and reviews from previous years.

- **Registration:** Students can register as either mentors or mentees via the registration page. A form collects their details (Name, Roll Number, Contact Number, Email ID) and asks them to set a password. The user profile is created and sent to the Django backend, using which students can access their dashboard by simply entering their roll number and password in the login page.

- **Add Project:** This option is available solely to users registered as mentors. They have the option to add one or more projects by providing a title, description, details about the number of mentees and a cover image. They can also edit their existing projects.

- **Current Projects:** When mentors add projects, the project title and cover image should be extracted and displayed on the "Current Projects" page in the form of React cards. Changes from the mentor's side should reflect here as well.

- **Past Certificates:** Using this page, past participants of SoC who have been awarded certificates can download their certificates directly.

## Ideas for Improvement

- **Styling the UI:** Although the UI is functional, it has not been styled properly yet.

- **Custom Features:**

You can find more such improvements in issues on which you can contribute.



<p align="center">Created with :heart: by <Link to="https://itc.gymkhana.iitb.ac.in/wncc/">WnCC</Link></p>
