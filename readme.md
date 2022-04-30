1. Create a "Submission" model: each Submission object will have a question ID and a user ID representing respectively the question that has been answered by the user that is currently logged in
2. Every time a question is answered, a new Submission document is created inside the Submissions collection.
3. If the answer provided by the user was correct, another call to the database is performed and that User document is updated by incrementing its score.
4. Every time we retrieve the questions from the database, we first retrieve the list of Submissions tied to the user that is currently logged in.
5. We then retrieve all the Questions, but exclude the ones that have already been answered by checking the Question IDs contained in the Submission documentes retrieved in the point above
6. We randomize a question and display it to the user
7. We could have a button in the app that says "Play again from the beginning" -> This will delete all Submissions tied to that user
