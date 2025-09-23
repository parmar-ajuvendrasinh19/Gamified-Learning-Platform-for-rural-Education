export interface QuizQuestion {
  id: string;
  question: string;
  questionHi: string;
  options: string[];
  optionsHi: string[];
  correctAnswer: number;
  explanation: string;
  explanationHi: string;
  subject: 'Science' | 'Physics' | 'Math' | 'Technology';
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export const quizQuestions: QuizQuestion[] = [
  // Physics Questions
  {
    id: 'physics-1',
    question: 'What is the speed of sound in air at room temperature?',
    questionHi: 'कमरे के तापमान पर हवा में ध्वनि की गति क्या है?',
    options: ['340 m/s', '300 m/s', '380 m/s', '420 m/s'],
    optionsHi: ['340 मी/से', '300 मी/से', '380 मी/से', '420 मी/से'],
    correctAnswer: 0,
    explanation: 'Sound travels at approximately 340 m/s in air at room temperature (20°C).',
    explanationHi: 'कमरे के तापमान (20°C) पर हवा में ध्वनि लगभग 340 मी/से की गति से चलती है।',
    subject: 'Physics',
    difficulty: 'Medium'
  },
  {
    id: 'physics-2',
    question: 'Which wave property determines the pitch of a sound?',
    questionHi: 'कौन सी तरंग गुण ध्वनि की पिच निर्धारित करता है?',
    options: ['Amplitude', 'Frequency', 'Wavelength', 'Speed'],
    optionsHi: ['आयाम', 'आवृत्ति', 'तरंग दैर्घ्य', 'गति'],
    correctAnswer: 1,
    explanation: 'Frequency determines the pitch - higher frequency means higher pitch.',
    explanationHi: 'आवृत्ति पिच निर्धारित करती है - उच्च आवृत्ति का मतलब उच्च पिच है।',
    subject: 'Physics',
    difficulty: 'Easy'
  },
  {
    id: 'physics-3',
    question: 'What happens to the range of a projectile when the launch angle is 45°?',
    questionHi: 'जब प्रक्षेप्य कोण 45° हो तो प्रक्षेप्य की रेंज का क्या होता है?',
    options: ['Minimum range', 'Maximum range', 'Average range', 'Zero range'],
    optionsHi: ['न्यूनतम रेंज', 'अधिकतम रेंज', 'औसत रेंज', 'शून्य रेंज'],
    correctAnswer: 1,
    explanation: 'At 45°, projectiles achieve maximum range in ideal conditions without air resistance.',
    explanationHi: '45° पर, वायु प्रतिरोध के बिना आदर्श स्थितियों में प्रक्षेप्य अधिकतम रेंज प्राप्त करते हैं।',
    subject: 'Physics',
    difficulty: 'Hard'
  },
  {
    id: 'physics-4',
    question: 'In which medium does sound travel fastest?',
    questionHi: 'ध्वनि किस माध्यम में सबसे तेज़ चलती है?',
    options: ['Air', 'Water', 'Steel', 'Vacuum'],
    optionsHi: ['हवा', 'पानी', 'स्टील', 'निर्वात'],
    correctAnswer: 2,
    explanation: 'Sound travels fastest through solids like steel due to tighter molecular bonds.',
    explanationHi: 'मजबूत आणविक बंधन के कारण ध्वनि स्टील जैसे ठोस पदार्थों में सबसे तेज़ चलती है।',
    subject: 'Physics',
    difficulty: 'Medium'
  },
  {
    id: 'physics-5',
    question: 'What is the unit of electric current?',
    questionHi: 'विद्युत धारा की इकाई क्या है?',
    options: ['Volt', 'Watt', 'Ampere', 'Ohm'],
    optionsHi: ['वोल्ट', 'वाट', 'एम्पियर', 'ओम'],
    correctAnswer: 2,
    explanation: 'Electric current is measured in Amperes (A), named after André-Marie Ampère.',
    explanationHi: 'विद्युत धारा को एम्पियर (A) में मापा जाता है, जो आंद्रे-मैरी एम्पियर के नाम पर है।',
    subject: 'Physics',
    difficulty: 'Easy'
  },

  // Math Questions
  {
    id: 'math-1',
    question: 'What is the quadratic formula?',
    questionHi: 'द्विघातीय सूत्र क्या है?',
    options: ['x = -b ± √(b²-4ac) / 2a', 'x = -b ± √(b²+4ac) / 2a', 'x = b ± √(b²-4ac) / 2a', 'x = -b ± √(b²-4ac) / a'],
    optionsHi: ['x = -b ± √(b²-4ac) / 2a', 'x = -b ± √(b²+4ac) / 2a', 'x = b ± √(b²-4ac) / 2a', 'x = -b ± √(b²-4ac) / a'],
    correctAnswer: 0,
    explanation: 'The quadratic formula x = -b ± √(b²-4ac) / 2a solves equations of the form ax² + bx + c = 0.',
    explanationHi: 'द्विघातीय सूत्र x = -b ± √(b²-4ac) / 2a, ax² + bx + c = 0 रूप के समीकरणों को हल करता है।',
    subject: 'Math',
    difficulty: 'Medium'
  },
  {
    id: 'math-2',
    question: 'What is the value of π (pi) approximately?',
    questionHi: 'π (पाई) का मान लगभग क्या है?',
    options: ['3.14159', '2.71828', '1.41421', '1.61803'],
    optionsHi: ['3.14159', '2.71828', '1.41421', '1.61803'],
    correctAnswer: 0,
    explanation: 'π (pi) is approximately 3.14159, representing the ratio of a circle\'s circumference to its diameter.',
    explanationHi: 'π (पाई) लगभग 3.14159 है, जो वृत्त की परिधि और व्यास के अनुपात को दर्शाता है।',
    subject: 'Math',
    difficulty: 'Easy'
  },
  {
    id: 'math-3',
    question: 'If log₁₀(100) = x, what is the value of x?',
    questionHi: 'यदि log₁₀(100) = x है, तो x का मान क्या है?',
    options: ['10', '2', '100', '1'],
    optionsHi: ['10', '2', '100', '1'],
    correctAnswer: 1,
    explanation: 'log₁₀(100) = 2 because 10² = 100.',
    explanationHi: 'log₁₀(100) = 2 क्योंकि 10² = 100।',
    subject: 'Math',
    difficulty: 'Medium'
  },
  {
    id: 'math-4',
    question: 'What is the derivative of x²?',
    questionHi: 'x² का अवकलज क्या है?',
    options: ['x', '2x', 'x²', '2x²'],
    optionsHi: ['x', '2x', 'x²', '2x²'],
    correctAnswer: 1,
    explanation: 'The derivative of x² is 2x, using the power rule d/dx(xⁿ) = nxⁿ⁻¹.',
    explanationHi: 'घात नियम d/dx(xⁿ) = nxⁿ⁻¹ का उपयोग करते हुए x² का अवकलज 2x है।',
    subject: 'Math',
    difficulty: 'Hard'
  },
  {
    id: 'math-5',
    question: 'What is the area of a circle with radius r?',
    questionHi: 'त्रिज्या r वाले वृत्त का क्षेत्रफल क्या है?',
    options: ['πr', 'πr²', '2πr', 'πr³'],
    optionsHi: ['πr', 'πr²', '2πr', 'πr³'],
    correctAnswer: 1,
    explanation: 'The area of a circle is πr², where r is the radius.',
    explanationHi: 'वृत्त का क्षेत्रफल πr² है, जहाँ r त्रिज्या है।',
    subject: 'Math',
    difficulty: 'Easy'
  },

  // Science Questions
  {
    id: 'science-1',
    question: 'What is the chemical symbol for water?',
    questionHi: 'पानी का रासायनिक प्रतीक क्या है?',
    options: ['H₂O', 'CO₂', 'NaCl', 'C₆H₁₂O₆'],
    optionsHi: ['H₂O', 'CO₂', 'NaCl', 'C₆H₁₂O₆'],
    correctAnswer: 0,
    explanation: 'Water is H₂O - two hydrogen atoms bonded to one oxygen atom.',
    explanationHi: 'पानी H₂O है - दो हाइड्रोजन परमाणु एक ऑक्सीजन परमाणु से जुड़े हुए।',
    subject: 'Science',
    difficulty: 'Easy'
  },
  {
    id: 'science-2',
    question: 'Which process do plants use to make food?',
    questionHi: 'पौधे भोजन बनाने के लिए कौन सी प्रक्रिया का उपयोग करते हैं?',
    options: ['Respiration', 'Photosynthesis', 'Digestion', 'Fermentation'],
    optionsHi: ['श्वसन', 'प्रकाश संश्लेषण', 'पाचन', 'किण्वन'],
    correctAnswer: 1,
    explanation: 'Photosynthesis is the process plants use to convert sunlight, CO₂, and water into glucose.',
    explanationHi: 'प्रकाश संश्लेषण वह प्रक्रिया है जिसका उपयोग पौधे सूर्य प्रकाश, CO₂ और पानी को ग्लूकोज में बदलने के लिए करते हैं।',
    subject: 'Science',
    difficulty: 'Easy'
  },
  {
    id: 'science-3',
    question: 'What is the pH of pure water?',
    questionHi: 'शुद्ध पानी का pH क्या है?',
    options: ['0', '7', '14', '10'],
    optionsHi: ['0', '7', '14', '10'],
    correctAnswer: 1,
    explanation: 'Pure water has a pH of 7, which is neutral (neither acidic nor basic).',
    explanationHi: 'शुद्ध पानी का pH 7 होता है, जो तटस्थ है (न अम्लीय और न ही क्षारीय)।',
    subject: 'Science',
    difficulty: 'Medium'
  },
  {
    id: 'science-4',
    question: 'What type of bond holds the two strands of DNA together?',
    questionHi: 'DNA की दो किस्में किस प्रकार के बंधन से जुड़ी होती हैं?',
    options: ['Ionic bonds', 'Covalent bonds', 'Hydrogen bonds', 'Metallic bonds'],
    optionsHi: ['आयनिक बंधन', 'सहसंयोजक बंधन', 'हाइड्रोजन बंधन', 'धात्विक बंधन'],
    correctAnswer: 2,
    explanation: 'Hydrogen bonds hold the complementary base pairs together in the DNA double helix.',
    explanationHi: 'हाइड्रोजन बंधन DNA की दोहरी कुंडली में पूरक क्षार जोड़ों को एक साथ रखते हैं।',
    subject: 'Science',
    difficulty: 'Hard'
  },
  {
    id: 'science-5',
    question: 'Which organelle is known as the powerhouse of the cell?',
    questionHi: 'कौन सा कोशिकांग कोशिका के पावरहाउस के रूप में जाना जाता है?',
    options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Chloroplast'],
    optionsHi: ['केन्द्रक', 'राइबोसोम', 'माइटोकॉन्ड्रिया', 'क्लोरोप्लास्ट'],
    correctAnswer: 2,
    explanation: 'Mitochondria produce ATP (energy) for cellular processes, earning the title "powerhouse of the cell".',
    explanationHi: 'माइटोकॉन्ड्रिया कोशिकीय प्रक्रियाओं के लिए ATP (ऊर्जा) का उत्पादन करता है, इसलिए इसे "कोशिका का पावरहाउस" कहा जाता है।',
    subject: 'Science',
    difficulty: 'Medium'
  },

  // Technology Questions
  {
    id: 'tech-1',
    question: 'What does WiFi stand for?',
    questionHi: 'WiFi का पूरा नाम क्या है?',
    options: ['Wireless Fidelity', 'Wide Field Internet', 'Wireless Frequency', 'Web Fidelity'],
    optionsHi: ['वायरलेस फिडेलिटी', 'वाइड फील्ड इंटरनेट', 'वायरलेस फ्रीक्वेंसी', 'वेब फिडेलिटी'],
    correctAnswer: 0,
    explanation: 'WiFi stands for Wireless Fidelity, a technology for wireless local area networking.',
    explanationHi: 'WiFi का मतलब वायरलेस फिडेलिटी है, जो वायरलेस स्थानीय क्षेत्र नेटवर्किंग की तकनीक है।',
    subject: 'Technology',
    difficulty: 'Easy'
  },
  {
    id: 'tech-2',
    question: 'What is the basic unit of computer memory?',
    questionHi: 'कंप्यूटर मेमोरी की मूल इकाई क्या है?',
    options: ['Bit', 'Byte', 'Megabyte', 'Gigabyte'],
    optionsHi: ['बिट', 'बाइट', 'मेगाबाइट', 'गीगाबाइट'],
    correctAnswer: 1,
    explanation: 'A byte (8 bits) is the basic addressable unit of computer memory.',
    explanationHi: 'एक बाइट (8 बिट्स) कंप्यूटर मेमोरी की मूल पता योग्य इकाई है।',
    subject: 'Technology',
    difficulty: 'Medium'
  },
  {
    id: 'tech-3',
    question: 'In a simple circuit, what controls the flow of electric current?',
    questionHi: 'सरल सर्किट में विद्युत धारा के प्रवाह को कौन नियंत्रित करता है?',
    options: ['Battery', 'Wire', 'Switch', 'Bulb'],
    optionsHi: ['बैटरी', 'तार', 'स्विच', 'बल्ब'],
    correctAnswer: 2,
    explanation: 'A switch controls whether the circuit is open (no current) or closed (current flows).',
    explanationHi: 'स्विच नियंत्रित करता है कि सर्किट खुला है (कोई धारा नहीं) या बंद है (धारा प्रवाहित होती है)।',
    subject: 'Technology',
    difficulty: 'Easy'
  },
  {
    id: 'tech-4',
    question: 'What does CPU stand for?',
    questionHi: 'CPU का पूरा नाम क्या है?',
    options: ['Computer Processing Unit', 'Central Processing Unit', 'Core Processing Unit', 'Computer Power Unit'],
    optionsHi: ['कंप्यूटर प्रोसेसिंग यूनिट', 'सेंट्रल प्रोसेसिंग यूनिट', 'कोर प्रोसेसिंग यूनिट', 'कंप्यूटर पावर यूनिट'],
    correctAnswer: 1,
    explanation: 'CPU stands for Central Processing Unit, the main processor of a computer.',
    explanationHi: 'CPU का मतलब सेंट्रल प्रोसेसिंग यूनिट है, जो कंप्यूटर का मुख्य प्रोसेसर है।',
    subject: 'Technology',
    difficulty: 'Easy'
  },
  {
    id: 'tech-5',
    question: 'Which protocol is used for sending emails?',
    questionHi: 'ईमेल भेजने के लिए कौन सा प्रोटोकॉल उपयोग किया जाता है?',
    options: ['HTTP', 'FTP', 'SMTP', 'TCP'],
    optionsHi: ['HTTP', 'FTP', 'SMTP', 'TCP'],
    correctAnswer: 2,
    explanation: 'SMTP (Simple Mail Transfer Protocol) is used for sending emails across networks.',
    explanationHi: 'SMTP (सिंपल मेल ट्रांसफर प्रोटोकॉल) का उपयोग नेटवर्क पर ईमेल भेजने के लिए किया जाता है।',
    subject: 'Technology',
    difficulty: 'Hard'
  }
];

export const getQuestionsBySubject = (subject: string): QuizQuestion[] => {
  return quizQuestions.filter(q => q.subject === subject);
};

export const getRandomQuestions = (subject?: string, count: number = 5): QuizQuestion[] => {
  let questions = subject ? getQuestionsBySubject(subject) : quizQuestions;
  
  // Shuffle and take the requested number
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};