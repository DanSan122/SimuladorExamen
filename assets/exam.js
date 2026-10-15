let userAnswers = [];
        let allQuestions = [];
        let selectedQuestions = [];
        const duration = Number(document.body.dataset.duration) * 60;
        let timeLeft = duration;
        let deadline;
        let finished = false;
        let timerInterval;
        let currentQuestionIndex = 0;

        async function loadQuestions() {
            try {
                if (!allQuestions.length) {
                    const response = await fetch('./preguntas.json');
                    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
                    allQuestions = ExamCore.validateQuestions(await response.json());
                }
                selectedQuestions = ExamCore.selectQuestions(allQuestions, 20);
                finished = false;
                userAnswers = new Array(selectedQuestions.length).fill(null);
                currentQuestionIndex = 0;
                document.getElementById('loading').style.display = 'none';
                document.getElementById('quiz-container').style.display = 'block';
                document.getElementById('submit-btn').style.display = 'none';
                renderQuiz();
                startTimer();
            } catch (error) {
                document.getElementById('loading').textContent = `Error al cargar las preguntas: ${error.message}`;
            }
        }

        function updateTimer() {
            if (finished || !deadline) return;
            timeLeft = ExamCore.remainingSeconds(deadline);
            document.getElementById('timer').textContent =
                `Tiempo: ${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`;
            if (timeLeft === 0) showResults();
        }

        function startTimer() {
            clearInterval(timerInterval);
            deadline = Date.now() + duration * 1000;
            updateTimer();
            timerInterval = setInterval(updateTimer, 1000);
        }
        document.addEventListener('visibilitychange', updateTimer);

        function renderQuiz() {
            renderCurrentQuestion();
        }

        function renderCurrentQuestion() {
            const container = document.getElementById('quiz-container');
            container.innerHTML = '';

            if (currentQuestionIndex >= selectedQuestions.length) {
                showResults();
                return;
            }

            const q = selectedQuestions[currentQuestionIndex];
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question';

            const headerDiv = document.createElement('div');
            headerDiv.className = 'question-header';
            headerDiv.innerHTML = `
                <div class="progress-info">
                    <h3>Pregunta ${currentQuestionIndex + 1} de ${selectedQuestions.length}</h3>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${((currentQuestionIndex + 1) / selectedQuestions.length) * 100}%"></div>
                    </div>
                </div>
            `;

            const questionText = document.createElement('div');
            questionText.className = 'question-text';
            questionText.textContent = q.question;

            const optionsDiv = document.createElement('div');
            optionsDiv.className = 'options';
            optionsDiv.setAttribute('role', 'radiogroup');
            optionsDiv.setAttribute('aria-label', q.question);

            q.options.forEach((option, optIndex) => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'option-item';

                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = `current-question`;
                radio.value = optIndex;
                radio.id = `opt${optIndex}`;

                const label = document.createElement('label');
                label.htmlFor = `opt${optIndex}`;
                label.textContent = option;

                optionDiv.appendChild(radio);
                optionDiv.appendChild(label);
                optionsDiv.appendChild(optionDiv);

                radio.addEventListener('change', () => {
                    updateTimer();
                    if (finished) return;
                    userAnswers[currentQuestionIndex] = optIndex;
                    document.querySelectorAll('.option-item').forEach(item => item.classList.remove('selected'));
                    optionDiv.classList.add('selected');

                    const nextBtn = document.getElementById('next-btn');
                    nextBtn.disabled = false;
                    nextBtn.classList.remove('disabled');
                });
            });

            const nextButtonDiv = document.createElement('div');
            nextButtonDiv.className = 'next-button-container';

            const nextBtn = document.createElement('button');
            nextBtn.id = 'next-btn';
            nextBtn.className = 'next-button disabled';
            nextBtn.disabled = true;
            nextBtn.textContent = currentQuestionIndex === selectedQuestions.length - 1 ? 'Finalizar Examen' : 'Siguiente Pregunta →';

            nextBtn.addEventListener('click', () => {
                if (!nextBtn.disabled) {
                    nextQuestion();
                }
            });

            nextButtonDiv.appendChild(nextBtn);

            questionDiv.appendChild(headerDiv);
            questionDiv.appendChild(questionText);
            questionDiv.appendChild(optionsDiv);
            questionDiv.appendChild(nextButtonDiv);
            container.appendChild(questionDiv);
        }

        function nextQuestion() {
            updateTimer();
            if (finished) return;
            currentQuestionIndex++;

            if (currentQuestionIndex >= selectedQuestions.length) {
                showResults();
            } else {
                renderCurrentQuestion();
            }
        }

        function showResults() {
            if (finished) return;
            finished = true;
            timeLeft = ExamCore.remainingSeconds(deadline);
            clearInterval(timerInterval);
            document.getElementById('submit-btn').style.display = 'none';
            document.getElementById('timer').style.display = 'none';

            const container = document.getElementById('quiz-container');
            container.innerHTML = '';

            const resultsDiv = document.getElementById('results');
            resultsDiv.style.display = 'block';

            let correctCount = 0;

            selectedQuestions.forEach((q, index) => {
                if (userAnswers[index] === q.answer) {
                    correctCount++;
                }
            });

            const unanswered = userAnswers.filter(answer => answer === null).length;
            const score = (correctCount / selectedQuestions.length * 100).toFixed(1);

            if (window.va) {
                window.va('track', 'exam_completed', {
                    score: parseFloat(score),
                    correct_answers: correctCount,
                    total_questions: selectedQuestions.length,
                    time_remaining: timeLeft
                });
            }

            resultsDiv.innerHTML = `
                <div class="results-header">
                    <h2>🎯 Resultados del Examen</h2>
                    <div class="score-summary">
                        <div class="score-circle">
                            <span class="score-percentage">${score}%</span>
                            <span class="score-text">${correctCount}/${selectedQuestions.length}</span>
                        </div>
                        <div class="score-details">
                            <p><strong>✅ Respuestas correctas:</strong> ${correctCount}</p>
                            <p><strong>❌ Respuestas incorrectas:</strong> ${selectedQuestions.length - correctCount - unanswered}</p>
                            <p><strong>⚪ Sin responder:</strong> ${unanswered}</p>
                            <p><strong>📊 Puntuación final:</strong> ${score}%</p>
                        </div>
                    </div>
                </div>
                <div class="results-review">
                    <h3>📋 Revisión de Respuestas</h3>
                    <p>A continuación puedes revisar cada pregunta con la respuesta correcta:</p>
                </div>
            `;

            selectedQuestions.forEach((q, index) => {
                const isCorrect = userAnswers[index] === q.answer;
                const userAnswer = userAnswers[index];

                const reviewDiv = document.createElement('div');
                reviewDiv.className = `question-review ${isCorrect ? 'correct-review' : 'incorrect-review'}`;

                reviewDiv.innerHTML = `
                    <div class="review-header">
                        <h4>Pregunta ${index + 1} ${isCorrect ? '✅' : '❌'}</h4>
                        <span class="review-status ${isCorrect ? 'correct' : 'incorrect'}">
                            ${isCorrect ? 'Correcta' : 'Incorrecta'}
                        </span>
                    </div>
                    <div class="review-question">
                        <p><strong>Pregunta:</strong> ${ExamCore.escapeHtml(q.question)}</p>
                    </div>
                    <div class="review-answers">
                        ${userAnswer !== null ?
                            `<p class="user-answer"><strong>Tu respuesta:</strong> <span class="${isCorrect ? 'correct-answer' : 'wrong-answer'}">${ExamCore.escapeHtml(q.options[userAnswer])}</span></p>` :
                            `<p class="user-answer"><strong>Tu respuesta:</strong> <span class="no-answer">No respondida</span></p>`
                        }
                        <p class="correct-answer-text"><strong>Respuesta correcta:</strong> <span class="correct-answer">${ExamCore.escapeHtml(q.options[q.answer])}</span></p>
                    </div>
                `;

                if (q.explanation) {
                    const explanation = document.createElement('p');
                    explanation.textContent = `Explicación: ${q.explanation}`;
                    reviewDiv.appendChild(explanation);
                }
                resultsDiv.appendChild(reviewDiv);
            });

            const restartDiv = document.createElement('div');
            restartDiv.className = 'restart-section';
            restartDiv.innerHTML = `
                <button onclick="restartExam()" class="restart-button">🔄 Realizar Nuevo Examen</button>
                <button onclick="goHome()" class="home-button">🏠 Volver al Inicio</button>
            `;
            resultsDiv.appendChild(restartDiv);
        }

        function restartExam() {
            currentQuestionIndex = 0;
            userAnswers = [];
            clearInterval(timerInterval);
            timeLeft = duration;
            deadline = null;
            finished = true;
            document.getElementById('timer').textContent = `Tiempo: ${duration / 60}:00`;

            document.getElementById('results').style.display = 'none';
            document.getElementById('loading').style.display = 'block';
            document.getElementById('timer').style.display = 'block';

            loadQuestions();
        }

        function goHome() {
            window.location.href = '../index.html';
        }

        window.addEventListener('DOMContentLoaded', loadQuestions);
    