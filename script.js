

// Initial data
let currenteQuestion = 0;
let correctAnswer = 0;

// Events
showQuestion()

document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

//functions

function showQuestion(){
    if(questions[currenteQuestion]){
        let q = questions[currenteQuestion];

        let pct = Math.floor((currenteQuestion / questions.length) * 100);

        document.querySelector('.progress--bar').style.width = pct + '%';

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';
        
        document.querySelector('.question').innerHTML = q.question;
        document.querySelector('.options').innerHTML = '';

        let optionsHtml = '';
        for(let i in q.options) {
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i) + 1}</span>${q.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        })
    
    }else{
        finishQuiz();
    }
}

function optionClickEvent(e){
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if(questions[currenteQuestion].answer === clickedOption){
        correctAnswer++;
    }
    currenteQuestion++;
    showQuestion();
}

function finishQuiz() {
    let points = Math.floor((correctAnswer / questions.length)*100);

    if(points < 30){
        document.querySelector('.scoreText1').innerHTML = "Estude mais '-'";
        document.querySelector('.scorePct').style.color = '#FF0000';
    } else if(points >= 30 && points < 70){
        document.querySelector('.scoreText1').innerHTML = 'Muito bom!';
        document.querySelector('.scorePct').style.color = '#FFFF00';
    } else if(points >= 70){
        document.querySelector('.scoreText1').innerHTML = 'Parabéns';
        document.querySelector('.scorePct').style.color = '#0D630D';
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswer}.`


    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = '100%';


}

function resetEvent(){
    correctAnswer = 0;
    currenteQuestion = 0;
    showQuestion();
}
