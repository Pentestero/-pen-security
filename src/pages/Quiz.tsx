import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quizQuestions } from '@/data/quizQuestions';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, ChevronRight, ChevronLeft, RefreshCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

// Helper function to shuffle an array (Fisher-Yates)
const shuffleArray = (array: any[]) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

const answerVariants = {
  initial: { x: 0 },
  correct: { scale: [1, 1.05, 1], transition: { duration: 0.3 } },
  incorrect: { x: [-1, 1, -1, 1, 0], transition: { duration: 0.3 } },
};

const Quiz = () => {
  const [activeQuestions, setActiveQuestions] = useState(quizQuestions.slice(0, 10));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const currentQuestion = activeQuestions[currentQuestionIndex];

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer !== null) return; // Prevent changing answer
    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setIsCorrect(null);
    setSelectedAnswer(null);
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    startQuiz(); // Re-shuffle and start
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setScore(0);
    setShowResult(false);
    setQuizStarted(true);
  };

  const startQuiz = () => {
    setActiveQuestions(shuffleArray([...quizQuestions]).slice(0, 10));
    setQuizStarted(true);
  };

  const getOptionClasses = (option: string) => {
    if (selectedAnswer === null) return '';
    if (option === currentQuestion.correctAnswer) {
      return 'border-green-500 bg-green-500/10 text-green-500 hover:bg-green-500/20';
    }
    if (option === selectedAnswer) {
      return 'border-red-500 bg-red-500/10 text-red-500 hover:bg-red-500/20';
    }
    return 'opacity-50';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20 container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-accent/50 text-accent">
            <CheckCircle2 className="w-3 h-3 mr-2" />
            Quiz Cybersécurité
          </Badge>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Testez vos connaissances en <span className="gradient-text">Cybersécurité</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Répondez à 10 questions aléatoires et évaluez votre niveau de compréhension.
          </p>
        </motion.div>

        {!quizStarted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto text-center"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Prêt à relever le défi ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Le quiz contient 10 questions tirées au sort parmi notre base de données.
                </p>
                <Button onClick={startQuiz} size="lg" className="bg-gradient-to-r from-primary to-accent">
                  Commencer le Quiz <ChevronRight className="ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : showResult ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto text-center"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-bold">Résultats du Quiz</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg mb-4">
                  Vous avez obtenu **{score}** bonnes réponses sur **{activeQuestions.length}** !
                </p>
                <Progress value={(score / activeQuestions.length) * 100} className="w-full mb-6" />
                <Button onClick={restartQuiz} className="bg-gradient-to-r from-primary to-accent">
                  Recommencer un nouveau Quiz <RefreshCcw className="ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center text-xl md:text-2xl">
                  <span>Question {currentQuestionIndex + 1} / {activeQuestions.length}</span>
                  <Badge variant="secondary">Score : {score}</Badge>
                </CardTitle>
                <Progress value={((currentQuestionIndex) / activeQuestions.length) * 100} className="w-full mt-2" />
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-semibold mb-4">{currentQuestion.question}</h3>
                <div className="grid gap-4">
                  {currentQuestion.options.map((option, index) => (
                    <motion.button
                      key={index}
                      variants={answerVariants}
                      animate={selectedAnswer === option ? (isCorrect ? 'correct' : 'incorrect') : 'initial'}
                      className={cn(
                        "text-left h-auto py-3 px-4 whitespace-normal break-words border-2 rounded-md transition-all duration-200",
                        "hover:border-primary hover:bg-primary/10",
                        selectedAnswer !== null && getOptionClasses(option),
                        selectedAnswer === null && 'border-border'
                      )}
                      onClick={() => handleAnswerSelect(option)}
                      disabled={selectedAnswer !== null}
                    >
                      {option}
                      {selectedAnswer !== null && option === currentQuestion.correctAnswer && <CheckCircle2 className="ml-auto text-green-500 inline-block" />}
                      {selectedAnswer !== null && option === selectedAnswer && option !== currentQuestion.correctAnswer && <XCircle className="ml-auto text-red-500 inline-block" />}
                    </motion.button>
                  ))}
                </div>
                {selectedAnswer && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 p-3 rounded-md bg-secondary text-sm"
                  >
                    <p className="font-semibold">Explication :</p>
                    <p>{currentQuestion.explanation}</p>
                  </motion.div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <div />
                <Button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswer === null}
                  className="bg-gradient-to-r from-primary to-accent"
                >
                  {currentQuestionIndex < activeQuestions.length - 1 ? 'Suivant' : 'Voir les résultats'} <ChevronRight className="ml-2" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Quiz;
