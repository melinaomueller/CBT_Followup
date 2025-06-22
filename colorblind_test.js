/* colorblind_test.js  –– builds and returns a timeline array */
function buildColorblindTimeline(ITI = 500) {

  // ---------- intro screen ----------
  const timeline = [];
timeline.push({
    type: jsPsychHtmlButtonResponse,
    stimulus: `
      <div style="text-align:center">
        <p style="font-size:20px;"><b>Color Vision Test</b></p>
        <p>Now, you will be asked to complete a short color vision test.</p>
        <p>For each of the following images, select the answer corresponding to what you see.</p>
      </div>`,
    choices: ['Click to begin'],
    post_trial_gap: ITI
  });

CBtrials.forEach(trial => {
  timeline.push({
    type: jsPsychHtmlButtonResponse,
    stimulus: `<img src="./stimuli/${trial.image}" style="max-width:400px;">`,
    choices: trial.Choices,
    post_trial_gap: ITI,
    data: {
      task: 'colorvision',
      trial_num: trial.Trial,
      correct_response: trial.CorrRes,
      image: trial.image
    },
    on_finish: function(data) {
      // Log performance - response is 0-indexed, correct_response is 1-indexed
      data.correct = (data.response + 1) === data.correct_response;
      data.chosen_answer = trial.Choices[data.response];
      data.correct_answer = trial.Choices[data.correct_response - 1];
    }
  });
});
  // CBtrials.forEach(trial => {
  // timeline.push({
  //   type: jsPsychHtmlButtonResponse, //if using on cognition, make ./stimuli/${trial.image}
  //   stimulus: `<img src="./stimuli/${trial.image}" style="max-width:400px;">`,
  //   choices: trial.Choices,
  //   post_trial_gap: ITI,  // Add this if you want delay between trials
  //   data: {
  //     task: 'colorvision',
  //     trial_num: trial.Trial,
  //     correct_response: trial.CorrRes,
  //     response: trial.response
  //   },



  timeline.push({
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
      <p><b>You finished the color vision test!</b></p>
      <p>Press the button to end this task.</p>`,
    choices: ['Complete!'],
    post_trial_gap: ITI
  });

  return timeline;
}