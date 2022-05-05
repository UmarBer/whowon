1. Create a "Submission" model: each Submission object will have a question ID and a user ID representing respectively the question that has been answered by the user that is currently logged in
2. Every time a question is answered, a new Submission document is created inside the Submissions collection.
3. If the answer provided by the user was correct, another call to the database is performed and that User document is updated by incrementing its score.
4. Every time we retrieve the questions from the database, we first retrieve the list of Submissions tied to the user that is currently logged in.
5. We then retrieve all the Questions, but exclude the ones that have already been answered by checking the Question IDs contained in the Submission documentes retrieved in the point above
6. We randomize a question and display it to the user
7. We could have a button in the app that says "Play again from the beginning" -> This will delete all Submissions tied to that user

// Name models in singular form
// Not Questions, but Question

// In the user schema, add a "questionsAnsweredCorrectly" property
// e.g.
const userSchema = new mongoose.Schema({
/_ ... _/
highScore: {
type: Number,
default: 0,
required: true
},
questionsAnsweredCorrectly: [
{
type: mongoose.Schema.Types.ObjectId,
ref: 'Question'
}
]
});

// When user visits /questions
// Load a random question
// (that the user hasn't responded to in the current response streak)

router.get('/', routeGuard, (req, res, next) => {
const idsOfQuestionsInCurrentStreak = req.user.questionsAnsweredCorrectly;
const queryFilter = { \_id: { $nin: idsOfQuestionsInCurrentStreak } };
Question.count(queryFilter)
.then((total) => {
// If total was 100, random index will be 0-99, integer
const randomIndex = Math.floor(Math.random() \* total);
return Question.findOne(queryFilter).skip(randomIndex);
})
.then((randomQuestion) => {
res.render('questions', {
randomQuestion
});
})
.catch((error) => {
next(error);
});
});

// Question model

const questionsSchema = new mongoose.Schema({
year: String,
options: [{
type: String
}],
correct: {
type: String
}
});

// Sample document

{
year: '2010',
options: ['Benfica', 'Sporting'],
correct: 'Sporting'
}

// Questions template

<ul>
  <div>
    <h1>Who was the champion of ULC on the season {{randomQuestion.year}}?</h1>
  </div>
  {{#each randomQuestion.options}}
    <form method="POST" action="/questions/{{randomQuestion._id}}/answer/{{ this }}">
        <button><{{ this }}</button>
    </form>
  {{/each}}
</ul>

// Route handler for responses

router.post('/:questionId/answer/:answerValue', routeGuard, (req, res, next) => {
const { questionId, answerValue } = req.params;
Question.findById(questionId)
.then((question) => {
if (question.correct === answerValue) {
const newHighScore = req.user.questionsAnsweredCorrectly.length === req.user.highScore ? req.user.highScore + 1 : req.user.highScore;
return User.findByIdAndUpdate(req.user.\_id, {
$push: { questionsAnsweredCorrectly: questionId },
highScore: newHighScore
}, { new: true })
} else {
return User.findByIdAndUpdate(req.user.\_id, { questionsAnsweredCorrectly: [] }, { new: true });
}
})
.then((user) => {
if (user.questionsAnsweredCorrectly.length) {
res.redirect('/questions');
} else {
res.redirect('/game-over');
}
})
.catch((error) => {
next(error);
});
});
