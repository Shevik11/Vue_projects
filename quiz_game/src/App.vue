<template v-if="this.answers">

  <ScoreBoard :winCount="this.winCount" :loseCount="this.loseCount" />


  <h1 v-html="this.question"></h1>

  <template v-for="(answer, index) in this.answers" :key="index">
    <input 
    :disabled="this.answerSubmitted"
    type="radio" 
    name="options" 
    :value="answer"
    v-model="chosen_answer"
    >
    <label v-html="answer"></label><br>
  </template>

  <button v-if="!this.answerSubmitted"  @click="this.submitAnswer()" class="send" type="button">Send</button>

  <section v-if="this.answerSubmitted" class="result">
    <h4 v-if="this.chosen_answer === this.correct_answer" 
    v-html="'&#9989;Correct! the answer is ' + this.correct_answer + '!'"
    >
    </h4>
    <h4 v-else
    v-html=" ' &#10060;Incorrect! the correct answer is ' + this.correct_answer + '!' ">
    </h4>
    <button @click="this.getNewQuestion()" class="send" type="button">Next Question</button>
  </section>

</template>

<script>

import ScoreBoard from './components/scoreBoard.vue';

export default {
  

  name: 'App',
  components: {
    ScoreBoard
  },

  data() {
    return {
      question: '',
      correct_answer: '',
      incorrect_answers: [],
      chosen_answer: '',
      answerSubmitted: false,
      winCount: 0,
      loseCount: 0,
    }
  },
  computed: {
    answers() {
      var answers = [...this.incorrect_answers];
      answers.splice(Math.round(Math.random() * answers.length), 0, this.correct_answer);
      return answers;
    }


  },
  methods: {
    submitAnswer() {
      if (!this.chosen_answer) {
        alert('Please choose an answer!');
        return;
      }
      else {
        this.answerSubmitted = true;
        if (this.chosen_answer === this.correct_answer) {
        this.winCount++;
      } else {
        this.loseCount++;
      }
    }
  },
    getNewQuestion() {

      this.answerSubmitted = false;
      this.chosen_answer = '';
      this.question = '';

    this.axios
    .get('https://opentdb.com/api.php?amount=1&category=15')
    .then((response) => {
      this.question = response.data.results[0].question;
      this.correct_answer = response.data.results[0].correct_answer;
      this.incorrect_answers = response.data.results[0].incorrect_answers;
    }); 
    }
  },

  created() {
    this.getNewQuestion();
  }
}

//https://opentdb.com/api.php?amount=1&category=15
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
  max-width: 960px;

  input[type= radio] {
    margin: 12px 4px;
  }

  button.send {
    margin-top:12 px;
    height:40px;
    min-width: 120px;
    padding: 0 16px;
    color: #fff;
    background-color: #1867c0;
    border:  #1867c0;
    cursor: pointer;
  }
}
</style>
