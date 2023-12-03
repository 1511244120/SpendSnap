# SpendSnap
"SpendSnap" is a comprehensive transaction tracking application built with Express, Node.js and MongoDB. It serves as your digital tally book, allowing you to seamlessly record and manage financial transactions.

## How to run the project locally
### Download Mongodb

**Download address: https://www.mongodb.com/try/download/community**, suggest using Zip package
1. move the Zip package under C:\Program Files
2. create C:\data\db directory, MongoDB will save data to this folder by default
3. inside the bin folder of MongoDB, open the command terminal
4. run the command mongod
Then in port 27017, the MongoDB service should be running 

### Clone and start the project
**Clone the repository to your local computer**:
``` bash
$ git clone https://github.com/1511244120/SpendSnap.git
```
**Change to the project**:
``` bash
$cd GitHarbor
```
**Install the dependencie**:
``` bash
$ npm install
```
**Start the project**:
``` bash
$ npm start
```
Then you can try the project out, happy coding!

---
Some notes about the design of the Spendsnap project:

-Enabled users to add detailed transaction entries, including spending amount, debit/credit information, timestamp, notes, and purchased items, also able to delete and display transaction list. 
-Utilized sessions with 'express-session' to manage user sessions, employed JSON Web Tokens (JWT) to validate login credentials and provide secure access to API endpoints, ensuring a high level of security across the application.
-Utilized Lowdb initially as a temporary storage solution to facilitate early development stages. Then migrated to MongoDB and Mongoose to create and manage object data models, ensuring a scalable and efficient database structure.
-Structured API endpoints following RESTful conventions within Express simplifying data retrieval in JSON format.
-Mitigated security risks by implementing CSRF attack prevention through express-session middleware.
