### document and Diagram DB in folder docs: 
- I have added a direct description in the Prisma/Prisma.schema folder and the relationship between the tables described by docs/arent_diagram.pdf or docs/arent_db_diagram.mwb (opened by MySQL Workbench).  Due to the limited time, I cannot describe specifically the relationship between the tables in the docs file. I hope you understand this issue.

### document api:
- module `auth` used to register and authenticate users with JWT.
- module `daily-diet` used to create a daily diet and update the user's daily goal progress.
- module `diary` used to create, update, get, remove the user's daily, only the owner can view their own diary.
- module `goal` used to create and update user goals. The Date/Achievement rate feature is defined in this module.
- module `graph` used to graphs weight, body fat of user.
- module `logger` used to track requests and responses during project development.
- module `user` user to update, get, remove user in database system.
- In addition, the config for the project