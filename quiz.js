(function() 
 {
  var allQuestions = [{
    question: "Sa La Liga ka te fituara FC Barcelona?",
    options: ["20", "23", "22", "21"],
    answer: 3
  }, {
    question: "Sa Copa del Rey ka te fituara FC Barcelona?",
    options: ["25", "20", "15", "10"],
    answer: 0
  }, {
    question: "Sa UEFA Champions League ka te fituara FC Barcelona?",
    options: ["5", "4", "3","2"],
    answer: 0
  },{
    question: "Ne vitin 2010-11 me kende eshte takuar FC Barcelona ne finalen e UEFA Champions League?",
    options: ["Arsenal", "Milano", "Manchester United", "Juventus"],
    answer: 2
  }, {
    question: "Kush mban numrin 10 ne  Fc Barcelona?",
    options: ["Lionel Messi", "Antoine Griezmann", "Sergio Busquets", "Ousmane Dembele"],
    answer: 0
  }];
  
  var quesCounter = 0;
  var selectOptions = [];
  var quizSpace = $('#quiz');
    
  nextQuestion();
    
  $('#next').click(function () 
    {
        chooseOption();
        if (isNaN(selectOptions[quesCounter])) 
        {
            alert('Ju lutemi zgjidhni nje opsion! ');
        } 
        else 
        {
          quesCounter++;
          nextQuestion();
        }
    });
  
  $('#prev').click(function () 
    {
        chooseOption();
        quesCounter--;
        nextQuestion();
    });
  
  function createElement(index) 
    {
        var element = $('<div>',{id: 'question'});
        var header = $('<h2 class="nr-pyetja">Pyetja Nr. ' + (index + 1) + ' :</h2>');
        element.append(header);

        var question = $('<p class="pyetja">').append(allQuestions[index].question);
        element.append(question);

        var radio = radioButtons(index);
        element.append(radio);

        return element;
    }
  
  function radioButtons(index) 
    {
        var radioItems = $('<ul class="kuizi-ul">');
        var item;
        var input = '';
        for (var i = 0; i < allQuestions[index].options.length; i++) {
          item = $('<li class="kuizi-li">');
          input = '<input type="radio" name="answer" value=' + i + ' />';
          input += allQuestions[index].options[i];
          item.append(input);
          radioItems.append(item);
        }
        return radioItems;
  }
  
  function chooseOption() 
    {
        selectOptions[quesCounter] = +$('input[name="answer"]:checked').val();
    }
   
  function nextQuestion() 
    {
        quizSpace.fadeOut(function() 
            {
              $('#question').remove();
              if(quesCounter < allQuestions.length)
                {
                    var nextQuestion = createElement(quesCounter);
                    quizSpace.append(nextQuestion).fadeIn();
                    if (!(isNaN(selectOptions[quesCounter]))) 
                    {
                      $('input[value='+selectOptions[quesCounter]+']').prop('checked', true);
                    }
                    if(quesCounter === 1)
                    {
                      $('#prev').show();
                    } 
                    else if(quesCounter === 0)
                    {
                      $('#prev').hide();
                      $('#next').show();
                    }
                }
              else 
                {
                    var scoreRslt = displayResult();
                    quizSpace.append(scoreRslt).fadeIn();
                    $('#next').hide();
                    $('#prev').hide();
                }
        });
    }
  
  function displayResult() 
    {
        var score = $('<p>',{id: 'question'});
        var correct = 0;
        for (var i = 0; i < selectOptions.length; i++) 
        {
          if (selectOptions[i] === allQuestions[i].answer) 
          {
            correct++;
          }
        }
        score.append('Ju keni te sakta ' + correct + ' nga ' +allQuestions.length);
        return score;
  }
})();