// Script de apoyo para personalizar la aleatorización del módulo.
// Se mantiene sencillo como en los otros módulos del repositorio.
(function(){
  // ejemplo: mezcla aleatoria de preguntas (Fisher-Yates)
  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  window.randomizeQuestions = function(questions){
    return shuffle(questions.slice());
  };
})();
