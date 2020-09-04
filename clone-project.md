

User Stories:
     - As a Team Member I want to be able to work in a collaberative environment, find relevant tasks, and show availability in order to boost my productivity.

     - As a Project Owner I want to be able to see the progress and stage of development of my product. (bonus role)


     - As a Project Manager I want to be able to assign a team a set of tasks to simplify project development and make it more efficient. (bonus role)

Questions:
     - What routes should we use?
          - /login, /sign-up
     - How strong should a user's password be?
          - 8 characters, one number, one uppercase, one lowercase, one special character minimum.
     - What happens when a user inputs an invalid email and/or password?
          - Return an error message stating that invalid credentials were given.

Features - MVP:
     - Function "list" feature with information regarding sprint team relevant dates on tasks added to list
     - Viewable list of projects
     - Have assignable teams
     - Have projects assigned to teams
     - Log in feature via form
          - Email/Password
     - Sign up feature via form
          - Email/Password/First and last name
     - Filtering list to filter projects by team
     - Marking projects as complete/incomplete
     - Simple navbar
          - Log out
          - Search bar to search by keyword
          - User profile
               - Allow modification of user data (name, email, password)

Additional Features:
     - Ability for team members to "claim" specific tasks within a feature (possibly limit one member to one task)
     - Limiting access to "view-only" for projects that are not assigned to a user's sprint (or one of the user's sprints, for managers)
     - Adding users to specific sprint teams
     - Task priorities
     - User notes on specific tasks within a project
     - Github Oath
     - Google Oath
     - Member roles (manager, owner)
          - Project Manager Features:
               - Can manage individual sprints and what projects are assigned to them
                    - (option/for larger teams) If there are multiple managers, managers can have "owned" teams, which are the ones they have app authority over (but not over "unowned" team)
               - Can assigned specific tasks to specific individuals as need be
               - Can add and remove projects from the backlog
               - Can mark projects as "cancelled"
               - Has access to all the features that team members do
               - Can add notes to both tasks and subtasks

          - Project Owner Features:
               - Has full access to all features of the app within the project
               - Can add/remove features to an overall project backlog
               - Can add new people, assign new roles and create new projects


Tables:
     - Users
          - First name, last name, email(unique), hashed password, teamId(teams), (additional: role)
     - Sprint Project
          - Project name, teamId(teams, nullable), deadline, status, details/description/tasks, (additional: tags)
     - Teams
          - Team name, (additional: leader)

Additional Feature Tables:
     - Tasks
          -Task name, deadline, status, userId(users), details, projectId(projects)


Pages/routes:
     - Landing page/sign up (get, post, bcrypt for hashing)
          - Email, password, first name, last name
          - Form
     - Log in (get, post)
          - Redirects to app page (get)
          - Email and password
          - Form
     - Main app page (get, post, put)
          - Request all tasks (get)
               - Additional: sorting by deadline and priority
          - Requests tasks based on filters and search (get)
               - Additional: sorting by deadline and priority
          - Form for creating tasks (post)
          - Editing tasks (patch)
          - Views section for tasks detail (get)
               - Editing details (name, description, deadline, status) of tasks
               - (additional: CRUD notes)
     - Profile page (get, put/patch)
          - Editing name, email, password (patch)
