
const mongoose = require('mongoose');
const Subject = require('../models/Subject');
const Quiz = require('../models/Quiz');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/quizmaster');
    console.log('MongoDB Connected for seeding');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

const subjectsData = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    description: 'Master mathematical concepts from basic algebra to advanced calculus',
    icon: 'Calculator',
    color: 'bg-blue-500',
    category: 'STEM',
    difficulty: 'Medium',
    order: 1,
    subtopics: [
      {
        id: 'algebra',
        name: 'Algebra',
        description: 'Linear equations, quadratic functions, polynomials',
        difficulty: 'Medium',
        estimatedTime: '15-20 min',
        order: 1,
        learningObjectives: ['Solve linear equations', 'Work with quadratic functions', 'Understand polynomials'],
        tags: ['equations', 'functions', 'variables']
      },
      {
        id: 'geometry',
        name: 'Geometry',
        description: 'Shapes, angles, area, volume, and geometric proofs',
        difficulty: 'Medium',
        estimatedTime: '12-18 min',
        order: 2,
        learningObjectives: ['Calculate areas and volumes', 'Understand geometric relationships', 'Apply geometric theorems'],
        tags: ['shapes', 'area', 'volume', 'proofs']
      },
      {
        id: 'calculus',
        name: 'Calculus',
        description: 'Derivatives, integrals, limits, and applications',
        difficulty: 'Hard',
        estimatedTime: '20-25 min',
        order: 3,
        prerequisites: ['algebra'],
        learningObjectives: ['Understand derivatives', 'Calculate integrals', 'Apply calculus to real problems'],
        tags: ['derivatives', 'integrals', 'limits']
      },
      {
        id: 'statistics',
        name: 'Statistics',
        description: 'Probability, data analysis, and statistical inference',
        difficulty: 'Medium',
        estimatedTime: '15-20 min',
        order: 4,
        learningObjectives: ['Analyze data sets', 'Calculate probabilities', 'Make statistical inferences'],
        tags: ['probability', 'data', 'inference']
      },
      {
        id: 'trigonometry',
        name: 'Trigonometry',
        description: 'Sine, cosine, tangent, and trigonometric identities',
        difficulty: 'Medium',
        estimatedTime: '10-15 min',
        order: 5,
        prerequisites: ['geometry'],
        learningObjectives: ['Use trigonometric functions', 'Apply trigonometric identities', 'Solve trigonometric equations'],
        tags: ['sine', 'cosine', 'tangent', 'identities']
      }
    ],
    seo: {
      title: 'Mathematics Quizzes - Master Math Concepts | QuizMaster',
      description: 'Test your mathematical knowledge with our comprehensive quizzes covering algebra, geometry, calculus, statistics, and trigonometry.',
      keywords: ['mathematics quiz', 'algebra test', 'geometry quiz', 'calculus practice', 'math learning']
    }
  },
  {
    id: 'science',
    name: 'Science',
    description: 'Explore the natural world through physics, chemistry, and biology',
    icon: 'Atom',
    color: 'bg-green-500',
    category: 'STEM',
    difficulty: 'Hard',
    order: 2,
    subtopics: [
      {
        id: 'physics',
        name: 'Physics',
        description: 'Motion, forces, energy, waves, and quantum mechanics',
        difficulty: 'Hard',
        estimatedTime: '20-25 min',
        order: 1,
        learningObjectives: ['Understand motion and forces', 'Apply energy conservation', 'Explore wave properties'],
        tags: ['motion', 'forces', 'energy', 'waves']
      },
      {
        id: 'chemistry',
        name: 'Chemistry',
        description: 'Atoms, molecules, reactions, and chemical bonding',
        difficulty: 'Hard',
        estimatedTime: '18-22 min',
        order: 2,
        learningObjectives: ['Understand atomic structure', 'Balance chemical equations', 'Predict reaction products'],
        tags: ['atoms', 'molecules', 'reactions', 'bonding']
      },
      {
        id: 'biology',
        name: 'Biology',
        description: 'Life processes, genetics, evolution, and ecology',
        difficulty: 'Medium',
        estimatedTime: '15-20 min',
        order: 3,
        learningObjectives: ['Understand life processes', 'Apply genetics principles', 'Explore ecosystem relationships'],
        tags: ['life', 'genetics', 'evolution', 'ecology']
      }
    ],
    seo: {
      title: 'Science Quizzes - Physics, Chemistry, Biology | QuizMaster',
      description: 'Challenge yourself with science quizzes covering physics, chemistry, and biology concepts.',
      keywords: ['science quiz', 'physics test', 'chemistry quiz', 'biology practice', 'science learning']
    }
  },
  {
    id: 'history',
    name: 'History',
    description: 'Journey through time and explore human civilization',
    icon: 'Globe',
    color: 'bg-yellow-500',
    category: 'Liberal Arts',
    difficulty: 'Easy',
    order: 3,
    subtopics: [
      {
        id: 'ancient-history',
        name: 'Ancient History',
        description: 'Mesopotamia, Egypt, Greece, Rome, and ancient civilizations',
        difficulty: 'Easy',
        estimatedTime: '12-15 min',
        order: 1,
        learningObjectives: ['Know ancient civilizations', 'Understand historical timelines', 'Identify key historical figures'],
        tags: ['ancient', 'civilizations', 'egypt', 'rome', 'greece']
      },
      {
        id: 'medieval-history',
        name: 'Medieval History',
        description: 'Middle Ages, feudalism, crusades, and medieval culture',
        difficulty: 'Easy',
        estimatedTime: '10-15 min',
        order: 2,
        prerequisites: ['ancient-history'],
        learningObjectives: ['Understand feudal systems', 'Know about crusades', 'Explore medieval culture'],
        tags: ['medieval', 'feudalism', 'crusades', 'middle ages']
      },
      {
        id: 'modern-history',
        name: 'Modern History',
        description: 'Renaissance, industrial revolution, and modern era',
        difficulty: 'Medium',
        estimatedTime: '15-18 min',
        order: 3,
        prerequisites: ['medieval-history'],
        learningObjectives: ['Understand Renaissance impact', 'Know industrial revolution', 'Explore modern developments'],
        tags: ['renaissance', 'industrial revolution', 'modern era']
      },
      {
        id: 'world-wars',
        name: 'World Wars',
        description: 'WWI, WWII, causes, consequences, and global impact',
        difficulty: 'Medium',
        estimatedTime: '18-22 min',
        order: 4,
        prerequisites: ['modern-history'],
        learningObjectives: ['Understand war causes', 'Know major battles', 'Analyze global impact'],
        tags: ['world war', 'wwi', 'wwii', 'global conflict']
      }
    ],
    seo: {
      title: 'History Quizzes - Ancient to Modern History | QuizMaster',
      description: 'Test your knowledge of world history from ancient civilizations to modern times.',
      keywords: ['history quiz', 'ancient history', 'world wars', 'historical facts', 'history learning']
    }
  },
  {
    id: 'programming',
    name: 'Programming',
    description: 'Learn to code and build amazing software applications',
    icon: 'Code',
    color: 'bg-purple-500',
    category: 'Technical',
    difficulty: 'Hard',
    order: 4,
    subtopics: [
      {
        id: 'javascript',
        name: 'JavaScript',
        description: 'Variables, functions, DOM manipulation, and ES6+',
        difficulty: 'Medium',
        estimatedTime: '20-25 min',
        order: 1,
        learningObjectives: ['Understand JavaScript syntax', 'Manipulate DOM elements', 'Use modern ES6+ features'],
        tags: ['javascript', 'dom', 'es6', 'programming']
      },
      {
        id: 'python',
        name: 'Python',
        description: 'Syntax, data structures, OOP, and libraries',
        difficulty: 'Medium',
        estimatedTime: '18-22 min',
        order: 2,
        learningObjectives: ['Master Python syntax', 'Use data structures', 'Apply OOP concepts'],
        tags: ['python', 'oop', 'data structures', 'programming']
      },
      {
        id: 'web-development',
        name: 'Web Development',
        description: 'HTML, CSS, responsive design, and frameworks',
        difficulty: 'Hard',
        estimatedTime: '25-30 min',
        order: 3,
        prerequisites: ['javascript'],
        learningObjectives: ['Build responsive websites', 'Use CSS frameworks', 'Understand web standards'],
        tags: ['html', 'css', 'responsive', 'web development']
      },
      {
        id: 'data-structures',
        name: 'Data Structures',
        description: 'Arrays, linked lists, trees, graphs, and algorithms',
        difficulty: 'Hard',
        estimatedTime: '30-35 min',
        order: 4,
        prerequisites: ['python', 'javascript'],
        learningObjectives: ['Implement data structures', 'Analyze algorithm complexity', 'Solve programming problems'],
        tags: ['data structures', 'algorithms', 'complexity', 'programming']
      }
    ],
    seo: {
      title: 'Programming Quizzes - JavaScript, Python, Web Dev | QuizMaster',
      description: 'Test your programming skills with quizzes on JavaScript, Python, web development, and data structures.',
      keywords: ['programming quiz', 'javascript test', 'python quiz', 'web development', 'coding practice']
    }
  }
];

const quizzesData = [
  {
    title: 'Algebra Quiz',
    subject: 'mathematics',
    subtopic: 'algebra',
    path: 'mathematics/algebra',
    description: 'Test your understanding of algebraic concepts and problem-solving skills.',
    difficulty: 'Medium',
    timeLimit: 1800,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'Solve for x: 2x + 5 = 13',
        options: ['x = 4', 'x = 6', 'x = 8', 'x = 9'],
        correct: 0,
        explanation: 'Subtract 5 from both sides: 2x = 8, then divide by 2: x = 4',
        difficulty: 'Easy',
        points: 1,
        tags: ['linear equations', 'solving']
      },
      {
        id: 2,
        type: 'fill-blank',
        question: 'The slope-intercept form of a linear equation is ____.',
        correct: 'y = mx + b',
        explanation: 'The slope-intercept form shows the slope (m) and y-intercept (b)',
        difficulty: 'Easy',
        points: 1,
        tags: ['linear equations', 'forms']
      },
      {
        id: 3,
        type: 'multiple-choice',
        question: 'What is the value of x² when x = -3?',
        options: ['6', '9', '-9', '-6'],
        correct: 1,
        explanation: 'When x = -3, x² = (-3)² = 9. The square of a negative number is positive.',
        difficulty: 'Easy',
        points: 1,
        tags: ['exponents', 'evaluation']
      },
      {
        id: 4,
        type: 'fill-blank',
        question: 'If f(x) = 2x + 1, then f(3) = ____.',
        correct: '7',
        explanation: 'Substitute x = 3: f(3) = 2(3) + 1 = 6 + 1 = 7',
        difficulty: 'Medium',
        points: 1,
        tags: ['functions', 'evaluation']
      },
      {
        id: 5,
        type: 'multiple-choice',
        question: 'Which of the following is a quadratic equation?',
        options: ['y = 2x + 1', 'y = x² + 3x + 2', 'y = 1/x', 'y = √x'],
        correct: 1,
        explanation: 'A quadratic equation has the highest power of x as 2, which is x² + 3x + 2',
        difficulty: 'Medium',
        points: 1,
        tags: ['quadratic', 'identification']
      }
    ],
    seo: {
      title: 'Algebra Quiz - Test Your Mathematical Skills | QuizMaster',
      description: 'Challenge yourself with our comprehensive algebra quiz covering linear equations, functions, and quadratic expressions.',
      keywords: ['algebra quiz', 'linear equations', 'quadratic functions', 'math test']
    }
  },
  {
    title: 'Geometry Quiz',
    subject: 'mathematics',
    subtopic: 'geometry',
    path: 'mathematics/geometry',
    description: 'Test your knowledge of geometric shapes, areas, volumes, and theorems.',
    difficulty: 'Medium',
    timeLimit: 1200,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'What is the area of a circle with radius 5?',
        options: ['25π', '10π', '5π', '15π'],
        correct: 0,
        explanation: 'Area of a circle = πr². With r = 5, Area = π(5)² = 25π',
        difficulty: 'Easy',
        points: 1,
        tags: ['circle', 'area']
      },
      {
        id: 2,
        type: 'fill-blank',
        question: 'The sum of angles in a triangle is ____ degrees.',
        correct: '180',
        explanation: 'This is a fundamental theorem in geometry - the sum of interior angles in any triangle is always 180°',
        difficulty: 'Easy',
        points: 1,
        tags: ['triangle', 'angles']
      },
      {
        id: 3,
        type: 'multiple-choice',
        question: 'What is the volume of a cube with side length 4?',
        options: ['16', '32', '48', '64'],
        correct: 3,
        explanation: 'Volume of a cube = s³. With s = 4, Volume = 4³ = 64',
        difficulty: 'Easy',
        points: 1,
        tags: ['cube', 'volume']
      }
    ],
    seo: {
      title: 'Geometry Quiz - Shapes, Areas, and Volumes | QuizMaster',
      description: 'Test your geometry knowledge with questions on shapes, areas, volumes, and geometric theorems.',
      keywords: ['geometry quiz', 'shapes', 'area calculation', 'volume', 'geometric theorems']
    }
  },
  {
    title: 'Physics Quiz',
    subject: 'science',
    subtopic: 'physics',
    path: 'science/physics',
    description: 'Explore fundamental physics concepts including motion, forces, and energy.',
    difficulty: 'Hard',
    timeLimit: 1800,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'What is the unit of force in the SI system?',
        options: ['Joule', 'Newton', 'Watt', 'Pascal'],
        correct: 1,
        explanation: 'The Newton (N) is the SI unit of force, named after Sir Isaac Newton',
        difficulty: 'Easy',
        points: 1,
        tags: ['units', 'force']
      },
      {
        id: 2,
        type: 'fill-blank',
        question: 'The acceleration due to gravity on Earth is approximately ____ m/s².',
        correct: '9.8',
        explanation: 'The standard acceleration due to gravity at Earth\'s surface is 9.8 m/s²',
        difficulty: 'Easy',
        points: 1,
        tags: ['gravity', 'acceleration']
      },
      {
        id: 3,
        type: 'multiple-choice',
        question: 'Which law states that for every action, there is an equal and opposite reaction?',
        options: ['First Law', 'Second Law', 'Third Law', 'Law of Gravitation'],
        correct: 2,
        explanation: 'Newton\'s Third Law states that for every action, there is an equal and opposite reaction',
        difficulty: 'Medium',
        points: 1,
        tags: ['newton laws', 'motion']
      }
    ],
    seo: {
      title: 'Physics Quiz - Motion, Forces, and Energy | QuizMaster',
      description: 'Challenge yourself with physics questions covering motion, forces, energy, and fundamental physics laws.',
      keywords: ['physics quiz', 'motion', 'forces', 'energy', 'newton laws']
    }
  },
  {
    title: 'Chemistry Quiz',
    subject: 'science',
    subtopic: 'chemistry',
    path: 'science/chemistry',
    description: 'Test your understanding of chemical elements, compounds, and reactions.',
    difficulty: 'Hard',
    timeLimit: 1500,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'What is the chemical symbol for sodium?',
        options: ['So', 'Sd', 'Na', 'S'],
        correct: 2,
        explanation: 'Sodium\'s chemical symbol is Na, derived from its Latin name "natrium"',
        difficulty: 'Easy',
        points: 1,
        tags: ['elements', 'symbols']
      },
      {
        id: 2,
        type: 'fill-blank',
        question: 'Water has the chemical formula ____.',
        correct: 'H2O',
        explanation: 'Water consists of two hydrogen atoms and one oxygen atom: H₂O',
        difficulty: 'Easy',
        points: 1,
        tags: ['compounds', 'formulas']
      },
      {
        id: 3,
        type: 'multiple-choice',
        question: 'How many protons does a carbon atom have?',
        options: ['4', '6', '8', '12'],
        correct: 1,
        explanation: 'Carbon has an atomic number of 6, which means it has 6 protons',
        difficulty: 'Medium',
        points: 1,
        tags: ['atomic structure', 'elements']
      }
    ],
    seo: {
      title: 'Chemistry Quiz - Elements, Compounds, Reactions | QuizMaster',
      description: 'Test your chemistry knowledge with questions on elements, chemical formulas, and atomic structure.',
      keywords: ['chemistry quiz', 'chemical elements', 'compounds', 'atomic structure']
    }
  },
  {
    title: 'Ancient History Quiz',
    subject: 'history',
    subtopic: 'ancient-history',
    path: 'history/ancient-history',
    description: 'Journey through ancient civilizations and their remarkable achievements.',
    difficulty: 'Easy',
    timeLimit: 1200,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'Which civilization built the pyramids of Giza?',
        options: ['Mesopotamians', 'Greeks', 'Egyptians', 'Romans'],
        correct: 2,
        explanation: 'The ancient Egyptians built the pyramids of Giza as tombs for their pharaohs',
        difficulty: 'Easy',
        points: 1,
        tags: ['egypt', 'pyramids', 'civilizations']
      },
      {
        id: 2,
        type: 'fill-blank',
        question: 'The ancient city of ____ was known for its hanging gardens.',
        correct: 'Babylon',
        explanation: 'The Hanging Gardens of Babylon were one of the Seven Wonders of the Ancient World',
        difficulty: 'Easy',
        points: 1,
        tags: ['babylon', 'wonders', 'gardens']
      },
      {
        id: 3,
        type: 'multiple-choice',
        question: 'Who was the first emperor of Rome?',
        options: ['Julius Caesar', 'Augustus', 'Nero', 'Trajan'],
        correct: 1,
        explanation: 'Augustus (originally named Octavian) was the first Roman Emperor',
        difficulty: 'Medium',
        points: 1,
        tags: ['rome', 'emperors', 'augustus']
      }
    ],
    seo: {
      title: 'Ancient History Quiz - Civilizations and Empires | QuizMaster',
      description: 'Test your knowledge of ancient civilizations including Egypt, Rome, Greece, and Mesopotamia.',
      keywords: ['ancient history quiz', 'civilizations', 'egypt', 'rome', 'greece']
    }
  },
  {
    title: 'JavaScript Quiz',
    subject: 'programming',
    subtopic: 'javascript',
    path: 'programming/javascript',
    description: 'Test your JavaScript programming skills and modern ES6+ features.',
    difficulty: 'Medium',
    timeLimit: 1800,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'Which keyword is used to declare a variable in JavaScript?',
        options: ['var', 'let', 'const', 'All of the above'],
        correct: 3,
        explanation: 'JavaScript supports var, let, and const for variable declarations, each with different scoping rules',
        difficulty: 'Easy',
        points: 1,
        tags: ['variables', 'keywords', 'declarations']
      },
      {
        id: 2,
        type: 'fill-blank',
        question: 'The method to add an element to the end of an array is ____.',
        correct: 'push',
        explanation: 'The push() method adds one or more elements to the end of an array',
        difficulty: 'Easy',
        points: 1,
        tags: ['arrays', 'methods']
      },
      {
        id: 3,
        type: 'multiple-choice',
        question: 'What does the "===" operator do in JavaScript?',
        options: ['Assignment', 'Equality', 'Strict equality', 'Not equal'],
        correct: 2,
        explanation: 'The === operator checks for strict equality, comparing both value and type',
        difficulty: 'Medium',
        points: 1,
        tags: ['operators', 'comparison', 'equality']
      }
    ],
    seo: {
      title: 'JavaScript Quiz - Test Your Programming Skills | QuizMaster',
      description: 'Challenge yourself with JavaScript questions covering variables, functions, arrays, and ES6+ features.',
      keywords: ['javascript quiz', 'programming test', 'js variables', 'array methods', 'es6']
    }
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('Clearing existing data...');
    await Subject.deleteMany({});
    await Quiz.deleteMany({});

    // Insert subjects
    console.log('Seeding subjects...');
    await Subject.insertMany(subjectsData);
    console.log(`${subjectsData.length} subjects seeded successfully`);

    // Insert quizzes
    console.log('Seeding quizzes...');
    await Quiz.insertMany(quizzesData);
    console.log(`${quizzesData.length} quizzes seeded successfully`);

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

// Run the seeder
seedDatabase();
