let currentQuestion = 0;
let correctAnswers = 0;
let timer;
let formattedTime;


//EVENTS
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);
document.querySelector('.start').addEventListener('click', startEvent);


function showQuestion() {
    if(questions[currentQuestion]) {
        let q = questions[currentQuestion];

        let pct = Math.floor((currentQuestion / questions.length) * 100);

        document.querySelector('.progress--bar').style.width = `${pct}%`;

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';
        document.querySelector('.telainicial').style.display = 'none';

        document.querySelector('.question').innerHTML = q.question;
        document.querySelector('.options').innerHTML = '';

        let optionsHtml = '';
        for(let i in q.options) {
            optionsHtml += `<div data-op="${i}" class='option'><span>${parseInt(i)+1} </span> ${q.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        });
        
        startTimer();
        
    } else {
        finishQuiz();
    }
}

function optionClickEvent(e) {
    clearTimeout(timer);
    let clickedOption = parseInt(e.target.getAttribute('data-op'));
    

    if(questions[currentQuestion].answer === clickedOption) {
        correctAnswers++;
    }

    currentQuestion++;
    showQuestion();
}

function finishQuiz() {
    let points = Math.floor((correctAnswers / questions.length) * 100);

    if(points <= 30) {
        document.querySelector('.scoreText1').innerHTML = 'Muito ruim em?';
        document.querySelector('.scorePct').style.color = '#ff0000';
    } else if(points > 30 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = 'BOM!?';
        document.querySelector('.scorePct').style.color = '#ff4500';
    } else if(points >= 70 ) {
        document.querySelector('.scoreText1').innerHTML = 'EXCELENTE!';
        document.querySelector('.scorePct').style.color = '#0D630D';
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`
    document.querySelector('.scoreText2').innerHTML = `Voce respondeu ${questions.length} questoes e acertou ${correctAnswers}.`;


    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = '100%';
}

function resetEvent() {
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion();
}

function startEvent() {
    showQuestion();
    document.querySelector('.telainicial').style.display = 'none';
}

function startTimer() {

    let timeLeft = 10; // 10 segundos

    // Atualiza o cronômetro a cada segundo
    timer = setInterval(function () {
    formattedTime = timeLeft.toString().padStart(2, '0');
        
        document.querySelector('.timer').innerHTML = `Tempo Restante: ${timeLeft}`;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timer); // Para o cronômetro quando atingir 0
            currentQuestion++;
            showQuestion();
        }
    }, 1000);
}