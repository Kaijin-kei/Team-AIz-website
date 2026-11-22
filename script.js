document.documentElement.classList.add('js-ready');

// Let the animated intro play, then invite the visitor through the welcome check.
const loader = document.querySelector('#loader-screen');
const verifyScreen = document.querySelector('#verify-screen');
const siteShell = document.querySelector('#site-shell');
window.setTimeout(() => {
  loader.classList.add('is-done');
  window.setTimeout(() => {
    loader.hidden = true;
    verifyScreen.hidden = false;
  }, 700);
}, 1450);

document.querySelector('#human-check').addEventListener('click', (event) => {
  const button = event.currentTarget;
  button.classList.add('is-checked');
  button.querySelector('.check-box').textContent = '✓';
  button.disabled = true;
  window.setTimeout(() => {
    verifyScreen.hidden = true;
    siteShell.hidden = false;
    document.body.classList.add('site-ready');
    document.querySelectorAll('.reveal').forEach((item) => revealObserver.observe(item));
  }, 380);
});

// Reveal sections as they enter the screen.
const revealItems = document.querySelectorAll('.reveal');
const revealObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 })
  : { observe: (item) => item.classList.add('is-visible') };

// The member bubbles begin as one, then expand into an orbit as the section arrives.
const membersSection = document.querySelector('#members');
if ('IntersectionObserver' in window) {
  const orbitObserver = new IntersectionObserver((entries, observer) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      window.setTimeout(() => membersSection.classList.add('members-expanded'), 350);
      observer.disconnect();
    }
  }, { threshold: 0.18 });
  orbitObserver.observe(membersSection);
} else {
  membersSection.classList.add('members-expanded');
}

// Mobile menu toggles open and closes after a section is selected.
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', isOpen);
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});
navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navLinks.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation menu');
}));

// Member details are listed in the same order as bubbles 1–6.
const members = [
  { name: 'Nomananap, Reneboy C.', role: '18 years old · Computer Engineering · 1C', bio: 'Keen on keeping the group’s files and code drafts organized, Reneboy helps everyone track deadlines while learning fundamental computer engineering theories.', fact: 'Mamaaaa!! Ang RENE ng 1C', photo: 'assets/reneboy-nomananap.jpg' },
  { name: 'Mallari, Rhian Aiza M.', role: '18 years old · Computer Engineering · 1C', bio: 'Observant at spotting small errors in diagrams and written work, Rhian Aiza also helps document design ideas for the group’s computer engineering requirements.', fact: 'Ang Ante Mema Gehlee Marie ng 1C', photo: 'assets/rhian-aiza-mallari.jpg' },
  { name: 'Alto, Archie C.', role: '18 years old · Computer Engineering · 1C', bio: 'Archie is interested in how hardware and software work together. He enjoys exploring basic circuit concepts and testing simple code for class activities.', fact: 'Ang Sexy JOZA ng 1C', photo: 'assets/archie-alto.jpe' },
  { name: 'Mallari, Rhian Raiza M.', role: '18 years old · Computer Engineering · 1C', bio: 'Raiza keeps the team motivated while researching hardware references. She is good at coordinating the group as they complete computer engineering assignments.', fact: 'Kain po Tayo TEAM RAIZA', photo: 'assets/raiza-mallari.jpg' },
  { name: 'Magat, Denver Louie T.', role: '18 years old · Computer Engineering · 1C', bio: 'Denver is a budding computer engineering learner who enjoys troubleshooting simple device issues and brainstorming creative ideas for small programming projects.', fact: 'Ang HOTTIE DZAADDYY ng 1C', photo: 'assets/denver-magat.jpe' },
  { name: 'Herrera, Junel M.', role: '18 years old · Computer Engineering · 1C', bio: 'Junel is eager to build fun little programs and mini-simulations. He often helps map out step-by-step logic for the team’s engineering tasks.', fact: 'Ang Jeonella ng 1C', photo: 'assets/junel-herrera.jpg' },
  { name: 'Garcia, Jan Vincent S.', role: 'Computer Engineering · 1C', bio: 'Jan Vincent is a member of Team AIz studying computer engineering in section 1C. More profile details can be added later.', fact: 'Kaijin Senpai', photo: 'assets/jan-vincent-garcia.jpe' },
];
document.querySelectorAll('.member-bubble').forEach((bubble, index) => {
  bubble.querySelector('.bubble-name').textContent = members[index].name;
  bubble.setAttribute('aria-label', `Open ${members[index].name} profile`);
});
const memberModal = document.querySelector('#member-modal');
let activeMemberIndex = 0;

function showMember(index) {
  activeMemberIndex = (index + members.length) % members.length;
  memberModal.classList.remove('is-closing');
  const member = members[activeMemberIndex];
  document.querySelector('#member-detail-name').textContent = member.name;
  document.querySelector('#member-detail-role').textContent = member.role;
  document.querySelector('#member-detail-bio').textContent = member.bio;
  document.querySelector('#member-detail-fact').textContent = member.fact;
  const detailAvatar = document.querySelector('#detail-avatar');
  detailAvatar.replaceChildren();
  if (member.photo) {
    const photo = document.createElement('img');
    photo.src = member.photo;
    photo.alt = member.name;
    detailAvatar.append(photo);
  } else {
    detailAvatar.textContent = member.name.slice(0, 1);
  }
  memberModal.hidden = false;
  document.body.classList.add('modal-open');
}
function closeMember() {
  if (memberModal.hidden || memberModal.classList.contains('is-closing')) return;
  memberModal.classList.add('is-closing');
  window.setTimeout(() => {
    memberModal.hidden = true;
    memberModal.classList.remove('is-closing');
    document.body.classList.remove('modal-open');
  }, 280);
}
document.querySelectorAll('.member-bubble').forEach((bubble) => bubble.addEventListener('click', () => showMember(Number(bubble.dataset.member))));
document.querySelector('#modal-close').addEventListener('click', closeMember);
document.querySelector('.modal-backdrop').addEventListener('click', closeMember);
document.querySelector('#detail-avatar').addEventListener('click', closeMember);
document.querySelector('#detail-next').addEventListener('click', () => showMember(activeMemberIndex + 1));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !memberModal.hidden) closeMember(); });

// Game 1: a small memory game. Restart shuffles a fresh set of pairs.
const memorySymbols = ['✦', '⌘', '◈', '☼'];
const memoryBoard = document.querySelector('#memory-board');
const memoryStatus = document.querySelector('#memory-status');
let openCards = [];
let matchedPairs = 0;
let memoryLocked = false;

function startMemoryGame() {
  const cards = [...memorySymbols, ...memorySymbols].sort(() => Math.random() - 0.5);
  openCards = [];
  matchedPairs = 0;
  memoryLocked = false;
  memoryStatus.textContent = 'Find the matching pairs!';
  memoryBoard.innerHTML = '';
  cards.forEach((symbol, index) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'memory-tile';
    const cardFront = document.createElement('span');
    cardFront.className = 'memory-face memory-front';
    cardFront.setAttribute('aria-hidden', 'true');
    const cardBack = document.createElement('span');
    cardBack.className = 'memory-face memory-back';
    cardBack.textContent = symbol;
    cardBack.setAttribute('aria-hidden', 'true');
    card.append(cardFront, cardBack);
    card.setAttribute('aria-label', `Hidden card ${index + 1}`);
    card.dataset.symbol = symbol;
    card.addEventListener('click', () => {
      if (memoryLocked || card.classList.contains('is-open') || card.classList.contains('is-matched')) return;
      card.classList.add('is-open');
      card.setAttribute('aria-label', `${symbol} card`);
      openCards.push(card);
      if (openCards.length === 2) {
        memoryLocked = true;
        if (openCards[0].dataset.symbol === openCards[1].dataset.symbol) {
          openCards.forEach((item) => item.classList.add('is-matched'));
          matchedPairs += 1;
          openCards = [];
          memoryLocked = false;
          memoryStatus.textContent = matchedPairs === memorySymbols.length ? 'All pairs found! Nice work ✨' : `${matchedPairs} of ${memorySymbols.length} pairs found.`;
        } else {
          memoryStatus.textContent = 'Not a match—try again.';
          window.setTimeout(() => {
            openCards.forEach((item) => {
              item.classList.remove('is-open');
              item.setAttribute('aria-label', 'Hidden card');
            });
            openCards = [];
            memoryLocked = false;
          }, 700);
        }
      }
    });
    memoryBoard.append(card);
  });
}
document.querySelector('#memory-reset').addEventListener('click', startMemoryGame);
startMemoryGame();

// Game 2: practice converting decimal numbers into 4-bit binary.
const binaryStatus = document.querySelector('#binary-status');
const binaryNumber = document.querySelector('#binary-number');
const binaryOptions = document.querySelector('#binary-options');
let binaryRound = 1;
let binaryScore = 0;
let binaryAnswer = 0;
let binaryFinished = false;

function renderBinaryGame() {
  binaryFinished = false;
  binaryAnswer = Math.floor(Math.random() * 16);
  binaryNumber.textContent = binaryAnswer;
  binaryStatus.textContent = `Round ${binaryRound} of 5 · Score ${binaryScore}`;
  binaryOptions.innerHTML = '';
  const choices = new Set([binaryAnswer]);
  while (choices.size < 4) choices.add(Math.floor(Math.random() * 16));
  [...choices].sort(() => Math.random() - 0.5).forEach((value) => {
    const choice = document.createElement('button');
    choice.type = 'button';
    choice.className = 'binary-option';
    choice.textContent = value.toString(2).padStart(4, '0');
    choice.addEventListener('click', () => {
      if (binaryFinished) return;
      binaryFinished = true;
      binaryOptions.querySelectorAll('button').forEach((button) => {
        button.disabled = true;
        if (button.textContent === binaryAnswer.toString(2).padStart(4, '0')) button.classList.add('is-correct');
      });
      if (value === binaryAnswer) {
        binaryScore += 1;
        binaryStatus.textContent = `Correct! ${binaryAnswer} is ${binaryAnswer.toString(2).padStart(4, '0')} · Score ${binaryScore}`;
      } else {
        choice.classList.add('is-wrong');
        binaryStatus.textContent = `Not quite—${binaryAnswer} is ${binaryAnswer.toString(2).padStart(4, '0')} · Score ${binaryScore}`;
      }
      window.setTimeout(() => {
        if (binaryRound === 5) {
          binaryStatus.textContent = `Game over! You scored ${binaryScore} out of 5.`;
          binaryOptions.innerHTML = '<button class="binary-play-again" type="button">Play again ↻</button>';
          binaryOptions.querySelector('button').addEventListener('click', startBinaryGame);
        } else {
          binaryRound += 1;
          renderBinaryGame();
        }
      }, 850);
    });
    binaryOptions.append(choice);
  });
}
function startBinaryGame() {
  binaryRound = 1;
  binaryScore = 0;
  renderBinaryGame();
}
document.querySelector('#binary-reset').addEventListener('click', startBinaryGame);
renderBinaryGame();

// Game 3: start a random wait, then measure the visitor's reaction time.
const reactionPad = document.querySelector('#reaction-pad');
const reactionMessage = document.querySelector('#reaction-message');
const reactionStatus = document.querySelector('#reaction-status');
const reactionBest = document.querySelector('#reaction-best');
let reactionState = 'ready';
let reactionTimer;
let greenAt = 0;
let bestTime = null;
reactionPad.addEventListener('click', () => {
  if (reactionState === 'ready' || reactionState === 'result') {
    reactionState = 'waiting';
    reactionPad.className = 'reaction-pad is-waiting';
    reactionMessage.textContent = 'Wait for green…';
    reactionStatus.textContent = 'Don’t tap too soon!';
    reactionTimer = window.setTimeout(() => {
      reactionState = 'go';
      greenAt = performance.now();
      reactionPad.className = 'reaction-pad is-go';
      reactionMessage.textContent = 'TAP NOW!';
      reactionStatus.textContent = 'Go!';
    }, 900 + Math.random() * 1900);
  } else if (reactionState === 'waiting') {
    window.clearTimeout(reactionTimer);
    reactionState = 'result';
    reactionPad.className = 'reaction-pad';
    reactionMessage.textContent = 'Too soon!';
    reactionStatus.textContent = 'Tap to try again.';
  } else if (reactionState === 'go') {
    const elapsed = Math.round(performance.now() - greenAt);
    reactionState = 'result';
    reactionPad.className = 'reaction-pad';
    reactionMessage.textContent = `${elapsed} ms`;
    reactionStatus.textContent = elapsed < 250 ? 'Quick reflexes!' : 'Tap to try again.';
    if (bestTime === null || elapsed < bestTime) {
      bestTime = elapsed;
      reactionBest.textContent = `Best: ${bestTime} ms`;
    }
  }
});

// Each topic fact becomes two question styles (identify a term or apply its purpose).
// 200 facts create a 400-question bank. Difficulty levels are tagged per fact.
const questionFacts = [
  { category: 'HTML', item: 'HTML element or attribute', facts: [
    ['easy','<a>','creates a clickable link to another page'],['easy','<img>','places an image in a page'],['easy','<p>','marks a paragraph of text'],['easy','<h1>','marks the most important page heading'],['easy','<ul>','groups items in a bulleted list'],['easy','<button>','creates a control that a visitor can activate'],['easy','<form>','groups fields for collecting user input'],['easy','<title>','sets the text shown in a browser tab'],['easy','alt','provides a text alternative for an image'],
    ['medium','<label>','gives a form field a readable description'],['medium','<input>','creates a field where a visitor can enter data'],['medium','<nav>','groups the main navigation links'],['medium','<main>','marks the central content of a page'],['medium','<section>','groups content around one related topic'],['medium','<footer>','marks closing or supplementary page information'],['medium','href','specifies the destination of a link'],['medium','required','makes a form field necessary before submission'],
    ['hard','aria-label','adds an accessible name when visible text is absent'],['hard','<fieldset>','groups related controls inside a form'],['hard','<legend>','gives a caption to a fieldset'],['hard','defer','waits to run a script until HTML parsing is complete'],['hard','data-*','stores custom data on an HTML element'],['hard','viewport meta','helps a page use the device screen width on mobile'],['hard','rel="stylesheet"','identifies a linked file as a CSS stylesheet'],['hard','type="email"','asks a browser to validate an email-shaped input'],
  ]},
  { category: 'PYTHON', item: 'Python feature or syntax', facts: [
    ['easy','print()','writes text or values to the output'],['easy','input()','reads text entered by a user'],['easy','len()','returns the number of items in a collection'],['easy','list','stores an ordered collection that can be changed'],['easy','tuple','stores an ordered collection that is usually kept unchanged'],['easy','dict','stores values under named keys'],['easy','if','runs a block only when a condition is true'],['easy','for','repeats a block for items in a sequence'],['easy','def','starts a function definition'],
    ['medium','range()','produces a sequence of numbers for iteration'],['medium','return','sends a result back from a function'],['medium','append()','adds an item to the end of a list'],['medium','keys()','provides the keys in a dictionary'],['medium','f-string','inserts values into a formatted string'],['medium','try/except','handles an error without immediately stopping the program'],['medium','import','makes code from a module available'],['medium','indentation','marks the beginning and end of Python code blocks'],
    ['hard','lambda','creates a small anonymous function expression'],['hard','list comprehension','builds a list using a compact expression'],['hard','enumerate()','loops over items while also providing their index'],['hard','zip()','pairs items from multiple iterables together'],['hard','set','stores unique values without a fixed order'],['hard','None','represents the absence of a value'],['hard','__name__ == "__main__"','checks whether a Python file is being run directly'],['hard','with open()','works with a file while ensuring it is closed afterward'],
  ]},
  { category: 'ARTISTIC DESIGN', item: 'design principle or term', facts: [
    ['easy','contrast','makes important elements visibly different'],['easy','alignment','places elements along shared visual edges'],['easy','repetition','reuses visual styles to create consistency'],['easy','proximity','groups related items close together'],['easy','hierarchy','shows viewers which information matters first'],['easy','balance','distributes visual weight across a composition'],['easy','white space','gives content room to breathe'],['easy','color palette','is a selected set of colors used in a design'],['easy','grid','helps align elements in rows and columns'],
    ['medium','complementary colors','sit opposite one another on the color wheel'],['medium','analogous colors','sit next to one another on the color wheel'],['medium','warm colors','often include reds, oranges, and yellows'],['medium','cool colors','often include blues, greens, and violets'],['medium','typography','is the visual design and arrangement of text'],['medium','kerning','adjusts the space between a pair of letters'],['medium','leading','controls the vertical space between lines of text'],['medium','focal point','is the area that first draws the viewer’s attention'],
    ['hard','golden ratio','is a proportion sometimes used to guide visual composition'],['hard','Gestalt closure','describes how viewers mentally complete incomplete shapes'],['hard','visual weight','describes how strongly an element attracts attention'],['hard','negative space','is the open area surrounding and between design elements'],['hard','color harmony','describes colors that work together pleasantly'],['hard','rhythm','uses repeated visual elements to guide the eye'],['hard','asymmetrical balance','balances unequal elements through their visual weight'],['hard','scale','compares the relative size of elements in a composition'],
  ]},
  { category: 'HARDWARE', item: 'computer hardware part', facts: [
    ['easy','CPU','executes program instructions and calculations'],['easy','RAM','temporarily holds data programs are actively using'],['easy','SSD','stores files persistently using flash memory'],['easy','HDD','stores files persistently on spinning magnetic disks'],['easy','GPU','processes graphics and many parallel calculations'],['easy','motherboard','connects major computer components together'],['easy','power supply','converts electrical power for computer components'],['easy','keyboard','lets a user enter text and commands'],['easy','monitor','displays visual output from a computer'],
    ['medium','USB port','connects peripherals and transfers data or power'],['medium','heatsink','moves heat away from a component'],['medium','cooling fan','moves air to help remove heat'],['medium','network interface card','connects a computer to a network'],['medium','chipset','coordinates communication between selected components'],['medium','CPU cache','keeps frequently needed data close to the processor'],['medium','VRAM','stores image data used by a graphics processor'],['medium','peripheral','is an external device connected to a computer'],
    ['hard','PCIe','is a high-speed interface for expansion cards and devices'],['hard','BIOS/UEFI','initializes hardware and starts the boot process'],['hard','CMOS battery','helps preserve firmware settings and the system clock'],['hard','system bus','carries data between computer components'],['hard','clock speed','describes processor cycles per second'],['hard','CPU core','executes program instructions as a processing unit'],['hard','thermal throttling','reduces performance to control component temperature'],['hard','firmware','is software stored on hardware to control its basic operation'],
  ]},
  { category: 'SOFTWARE & APPS', item: 'software or application', facts: [
    ['easy','operating system','manages computer hardware and provides services to applications'],['easy','Visual Studio Code','is a source-code editor used for programming'],['easy','Figma','is used to design and prototype user interfaces'],['easy','Photoshop','is commonly used to edit raster images'],['easy','Git','tracks changes to files over time'],['easy','web browser','opens and displays websites'],['easy','spreadsheet app','organizes data in rows and columns'],['easy','presentation app','creates slides for presenting information'],['easy','antivirus app','helps detect and remove malicious software'],
    ['medium','integrated development environment','combines coding tools such as editing and debugging'],['medium','version control system','records changes and helps people collaborate on files'],['medium','vector editor','creates artwork from scalable paths and shapes'],['medium','raster editor','edits images made from pixels'],['medium','CAD software','creates precise technical drawings and 3D models'],['medium','terminal','lets a user control a computer with text commands'],['medium','database app','stores and retrieves structured information'],['medium','backup software','creates copies of data for recovery'],
    ['hard','compiler','translates source code into another form before execution'],['hard','interpreter','runs program instructions through a runtime'],['hard','package manager','installs and updates reusable software packages'],['hard','debugger','helps inspect a program while it runs'],['hard','virtual machine','runs a simulated computer environment in software'],['hard','container','packages an application with its runtime requirements'],['hard','cloud storage','keeps files on remote servers for network access'],['hard','UX prototyping tool','creates interactive previews of an interface before implementation'],
  ]},
  { category: 'WEB DESIGN', item: 'web design tool or technique', facts: [
    ['easy','CSS','controls the visual style and layout of web pages'],['easy','HTML','structures the content of web pages'],['easy','responsive design','adapts a layout to different screen sizes'],['easy','Flexbox','arranges items along a row or column'],['easy','CSS Grid','lays out elements in rows and columns'],['easy','media query','applies styles when screen or device conditions match'],['easy','navigation bar','offers links to important site sections'],['easy','semantic HTML','uses elements whose names describe their content role'],['easy','alt text','describes an image for accessibility and fallback display'],
    ['medium','DOM','is the browser’s structured representation of a web page'],['medium','CSS selector','chooses which HTML elements receive a style'],['medium','pseudo-class','styles an element in a particular state'],['medium','box model','describes content, padding, border, and margin'],['medium','viewport meta tag','sets a page’s layout width to the device width'],['medium','breakpoint','marks a width where a responsive layout changes'],['medium','keyboard accessibility','lets people use a site without a mouse'],['medium','CSS :focus-visible','styles the currently keyboard-focused control'],
    ['hard','CSS custom property','stores a reusable value such as a color'],['hard','specificity','helps determine which competing CSS rule applies'],['hard','z-index','sets the stacking order of positioned elements'],['hard','lazy loading','delays loading off-screen resources until they are needed'],['hard','ARIA','adds accessibility information when native HTML is insufficient'],['hard','CSS transition','animates a property change over time'],['hard','client-side routing','changes views in a web app without a full page reload'],['hard','CORS','is a browser security rule controlling cross-origin requests'],
  ]},
  { category: 'CHARACTER DESIGN', item: 'character-design concept', facts: [
    ['easy','silhouette','helps a character remain recognizable from its outline'],['easy','color palette','sets the main colors used in a character design'],['easy','shape language','uses shapes to suggest a character’s qualities'],['easy','proportion','describes the relative sizes of a character’s parts'],['easy','facial expression','communicates a character’s emotion'],['easy','costume','helps show a character’s role, setting, or personality'],['easy','pose','communicates action or attitude through body position'],['easy','accessory','adds a small detail that can suggest a character’s story'],['easy','concept sketch','explores an early visual idea before final artwork'],
    ['medium','turnaround sheet','shows a character from multiple angles for consistency'],['medium','value study','checks light and dark shapes before final colors'],['medium','focal point','directs attention to the most important character feature'],['medium','color script','plans how color supports mood across a story'],['medium','character archetype','describes a familiar role or pattern in storytelling'],['medium','visual motif','repeats a visual idea to reinforce character identity'],['medium','negative space','keeps shapes around a character clear and readable'],['medium','thumbnail test','checks whether a design reads at a very small size'],
    ['hard','shape contrast','combines different forms to make a design more distinctive'],['hard','exaggeration','emphasizes selected features for clearer expression'],['hard','model sheet','records design details so a character stays consistent'],['hard','gesture line','captures the direction and energy of a pose'],['hard','asymmetry','adds variation instead of making both sides identical'],['hard','material distinction','uses visual cues to show different surface materials'],['hard','secondary shapes','add supporting detail without competing with the main silhouette'],['hard','storytelling prop','is an object that hints at a character’s history or role'],
  ]},
  { category: 'COMPUTER BASICS', item: 'computer concept', facts: [
    ['easy','binary','is a number system that uses only zero and one'],['easy','bit','is a single binary digit'],['easy','byte','is a group of eight bits'],['easy','file','stores information under a name'],['easy','folder','organizes files and other folders'],['easy','URL','is the address used to locate a resource on the web'],['easy','browser cache','keeps local copies of some web resources for faster reuse'],['easy','Wi-Fi','connects devices to a network wirelessly'],['easy','USB','is a common standard for connecting devices'],
    ['medium','IP address','identifies a device or interface on an internet protocol network'],['medium','DNS','translates domain names into network addresses'],['medium','RAM','holds data a computer is using temporarily'],['medium','operating system','manages computer resources and applications'],['medium','cloud storage','keeps data on remote servers accessed over a network'],['medium','encryption','transforms data so it cannot be read without the right key'],['medium','backup','is a separate copy used to restore lost data'],['medium','input device','sends data or commands into a computer'],
    ['hard','CPU cache','stores frequently used data near a processor for quick access'],['hard','algorithm','is a defined sequence of steps for solving a problem'],['hard','latency','measures delay before a response begins'],['hard','bandwidth','describes how much data a connection can carry over time'],['hard','source code','is human-readable instructions written in a programming language'],['hard','database','organizes information for structured storage and retrieval'],['hard','encryption key','is a value used to encrypt or decrypt information'],['hard','output device','presents results from a computer to a user'],
  ]},
];

const quizBank = questionFacts.flatMap((topic) => {
  const terms = topic.facts.map((fact) => fact[1]);
  const descriptions = topic.facts.map((fact) => fact[2]);
  return topic.facts.flatMap(([difficulty, term, description], factIndex) => {
    const conceptId = `${topic.category}-${factIndex}`;
    return [
      { category: topic.category, difficulty, conceptId, question: `Which ${topic.item} matches this description: ${description}?`, correct: term, choices: terms, note: `${term}: ${description}.` },
      { category: topic.category, difficulty, conceptId, question: `What is ${term} mainly used for?`, correct: description, choices: descriptions, note: `${term} ${description}.` },
    ];
  });
});

// Fisher-Yates shuffle gives each question and answer a fair random order.
function shuffle(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const otherIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[otherIndex]] = [shuffled[otherIndex], shuffled[index]];
  }
  return shuffled;
}

let quizQuestions = [];
let questionIndex = 0;
let quizScore = 0;
const quizOptions = document.querySelector('#quiz-options');
const quizFeedback = document.querySelector('#quiz-feedback');
const quizNext = document.querySelector('#quiz-next');
const quizRestart = document.querySelector('#quiz-restart');
const quizDifficulty = document.querySelector('#quiz-difficulty');
const quizLength = document.querySelector('#quiz-length');
const quizStart = document.querySelector('#quiz-start');
let quizAutoRestartTimer;

function createQuizRound() {
  const requestedCount = Number(quizLength.value);
  const chosenDifficulty = quizDifficulty.value;
  const eligibleQuestions = quizBank.filter((question) => chosenDifficulty === 'all' || question.difficulty === chosenDifficulty);
  const topicGroups = [...new Set(eligibleQuestions.map((question) => question.category))]
    .map((category) => ({ category, questions: eligibleQuestions.filter((question) => question.category === category) }));
  const count = Math.min(requestedCount, eligibleQuestions.length);
  const firstTopics = count >= topicGroups.length ? topicGroups : shuffle(topicGroups).slice(0, count);
  const selected = firstTopics.map((topic) => shuffle(topic.questions)[0]);
  const usedConcepts = new Set(selected.map((question) => question.conceptId));
  const remaining = shuffle(eligibleQuestions.filter((question) => !usedConcepts.has(question.conceptId)));
  for (const question of remaining) {
    if (selected.length >= count) break;
    if (!usedConcepts.has(question.conceptId)) {
      selected.push(question);
      usedConcepts.add(question.conceptId);
    }
  }
  return shuffle(selected);
}

function renderQuestion() {
  const current = quizQuestions[questionIndex];
  document.querySelector('#quiz-progress').textContent = `QUESTION ${questionIndex + 1} / ${quizQuestions.length}`;
  document.querySelector('#quiz-progress-bar').style.width = `${((questionIndex + 1) / quizQuestions.length) * 100}%`;
  document.querySelector('#quiz-score').textContent = quizScore;
  document.querySelector('#quiz-category').textContent = `${current.category} · ${current.difficulty.toUpperCase()}`;
  document.querySelector('#quiz-question').textContent = current.question;
  quizFeedback.textContent = '';
  quizNext.hidden = true;
  quizRestart.hidden = true;
  quizRestart.textContent = 'Play again ↻';
  quizOptions.innerHTML = '';
  const options = shuffle([current.correct, ...shuffle(current.choices.filter((choice) => choice !== current.correct)).slice(0, 3)]);
  current.correctIndex = options.indexOf(current.correct);
  options.forEach((option, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'quiz-option';
    button.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
    button.addEventListener('click', () => answerQuestion(index));
    quizOptions.append(button);
  });
}
function answerQuestion(selected) {
  const current = quizQuestions[questionIndex];
  const buttons = [...quizOptions.querySelectorAll('button')];
  buttons.forEach((button) => { button.disabled = true; });
  buttons[current.correctIndex].classList.add('correct');
  if (selected === current.correctIndex) {
    quizScore += 1;
    quizFeedback.textContent = `Correct! ${current.note}`;
  } else {
    buttons[selected].classList.add('wrong');
    quizFeedback.textContent = `Good try! ${current.note}`;
  }
  document.querySelector('#quiz-score').textContent = quizScore;
  if (questionIndex < quizQuestions.length - 1) quizNext.hidden = false;
  else {
    quizFeedback.textContent += ` Final score: ${quizScore} / ${quizQuestions.length}.`;
    quizFeedback.textContent += ' A new round starts in 6 seconds.';
    quizRestart.textContent = 'Start a new quiz now ↻';
    quizRestart.hidden = false;
    quizAutoRestartTimer = window.setTimeout(startQuiz, 6000);
  }
}
function startQuiz() {
  window.clearTimeout(quizAutoRestartTimer);
  quizQuestions = createQuizRound();
  questionIndex = 0;
  quizScore = 0;
  renderQuestion();
}
quizNext.addEventListener('click', () => { questionIndex += 1; renderQuestion(); });
quizRestart.addEventListener('click', startQuiz);
quizStart.addEventListener('click', startQuiz);
startQuiz();

// The provided Python projects are adapted below as browser-run HTML/CSS/JS demos.
// Original Python files are available through each project's source download link.
const projectBaseStyles = `*{box-sizing:border-box}body{margin:0;padding:18px;min-height:100vh;background:radial-gradient(circle at 15% 0%,#443264,#17142b 70%);color:#fff;font:14px Arial,sans-serif}.demo{width:min(520px,100%);margin:0 auto;padding:20px;border:1px solid #685490;border-radius:16px;background:#ffffff10;box-shadow:0 14px 35px #05040b66}.demo h1,.demo h2{margin:0 0 12px;color:#f1eaff}.demo p{color:#d4cbe4;line-height:1.5}.demo button,.demo input,.demo select{font:inherit}.demo button{padding:9px 12px;border:1px solid #9b7bd0;border-radius:8px;background:#a88aff;color:#171329;font-weight:bold;cursor:pointer}.demo button:hover{filter:brightness(1.12);transform:translateY(-1px)}.demo button.secondary{background:#ffffff17;color:#fff}.demo input,.demo select{min-width:0;padding:9px;border:1px solid #665781;border-radius:7px;background:#18152b;color:#fff}.demo .row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}.demo .status{min-height:24px;margin:12px 0 0;color:#ffe18a}.demo .small{font-size:11px;color:#c9bddf}.demo table{width:100%;border-collapse:collapse;margin-top:12px;font-size:11px}.demo th,.demo td{padding:7px 5px;border-bottom:1px solid #ffffff20;text-align:left}.demo th{color:#d4baff}.demo .bar{height:14px;overflow:hidden;border:1px solid #8168b2;border-radius:10px;background:#0d0c1b}.demo .bar span{display:block;width:0;height:100%;background:linear-gradient(90deg,#80e2c3,#a780ff);transition:width .18s}.demo label{display:grid;gap:4px;color:#ded4ed;font-size:11px}`;
function makeProjectCode(markup, css, javascript) {
  return `${markup}\n<style>${projectBaseStyles}\n${css}</style>\n<script>${javascript}</script>`;
}

const libraryProjects = [
  {
    title: 'Rock Paper Scissors', label: 'PYTHON · BROWSER EDITION', source: 'assets/python-source/rock-paper-scissors.py',
    description: 'Play a round against the computer and keep score.',
    code: makeProjectCode(`<main class="demo"><p class="small">ROCK · PAPER · SCISSORS</p><h2>Choose your move</h2><div class="row"><button data-move="0">✊ Rock</button><button data-move="1">✋ Paper</button><button data-move="2">✌️ Scissors</button></div><p id="rps-result" class="status">Pick a move to start.</p><p id="rps-score">You 0 · Computer 0</p><button class="secondary" id="rps-reset">Reset score</button></main>`,
      `.demo{text-align:center}.demo .row{justify-content:center}.demo [data-move]{min-width:92px}`, `const names=['Rock','Paper','Scissors'];let you=0,computer=0;const result=document.querySelector('#rps-result');const score=document.querySelector('#rps-score');document.querySelectorAll('[data-move]').forEach(button=>button.addEventListener('click',()=>{const player=Number(button.dataset.move);const rival=Math.floor(Math.random()*3);let outcome='Tie!';if(player!==rival){if((player-rival+3)%3===1){you++;outcome='You win this round!';}else{computer++;outcome='Computer wins this round.';}}result.textContent='You: '+names[player]+' · Computer: '+names[rival]+' — '+outcome;score.textContent='You '+you+' · Computer '+computer;}));document.querySelector('#rps-reset').addEventListener('click',()=>{you=0;computer=0;score.textContent='You 0 · Computer 0';result.textContent='Score reset. Pick a move!';});`),
  },
  {
    title: 'Math Activity: Classes & Objects', label: 'PYTHON · BROWSER EDITION', source: 'assets/python-source/math-activity.py',
    description: 'Choose a math prompt and try up to three answers.',
    code: makeProjectCode(`<main class="demo"><p class="small">MATH ACTIVITY</p><h2>Choose a challenge</h2><div class="row"><button data-topic="function">Function</button><button data-topic="sequence">Sequence</button><button data-topic="sets">Sets</button></div><p id="math-prompt">Choose a topic to begin.</p><div class="row"><input id="math-answer" placeholder="Your answer" aria-label="Your answer"><button id="math-submit">Check answer</button></div><p id="math-status" class="status" aria-live="polite"></p></main>`,
      `.demo .row{margin:10px 0}#math-answer{flex:1}`, `const topics={function:{prompt:'For f(x)=2x²+3x−1, evaluate f(2).',answers:['13']},sequence:{prompt:'Complete the sequence: 3, 6, 9, __.',answers:['12']},sets:{prompt:'What is the standard name for {0, 1, 2, 3, ...}?',answers:['whole numbers','whole number','w']}};let current=null,tries=0,expectedAnswer='';const prompt=document.querySelector('#math-prompt'),answer=document.querySelector('#math-answer'),status=document.querySelector('#math-status');document.querySelectorAll('[data-topic]').forEach(button=>button.addEventListener('click',()=>{current=topics[button.dataset.topic];expectedAnswer=current.answers[0];tries=0;prompt.textContent=current.prompt;answer.value='';status.textContent='You have three tries.';answer.focus();}));document.querySelector('#math-submit').addEventListener('click',()=>{if(!current){status.textContent='Choose a challenge first.';return;}tries++;const guess=answer.value.trim().toLowerCase();if(current.answers.includes(guess)){status.textContent='Correct! Nice work.';current=null;}else if(tries>=3){status.textContent='That was the last try. The answer was '+expectedAnswer+'.';current=null;}else{status.textContent='Not quite—try again. '+(3-tries)+' tries left.';}});`),
  },
  {
    title: 'Loading Type 1', label: 'PYTHON · BROWSER EDITION', source: 'assets/python-source/loading-type-1.py',
    description: 'A five-step loading dots animation with start and restart controls.',
    code: makeProjectCode(`<main class="demo loading-demo"><p class="small">LOADING TYPE 1</p><h2 id="dots-label">Ready when you are</h2><div class="row"><button id="dots-start">Start loading</button><button id="dots-reset" class="secondary">Reset</button></div><p id="dots-status" class="status" aria-live="polite">Press start to watch the dots animate.</p></main>`,
      `.loading-demo{text-align:center}.loading-demo .row{justify-content:center}#dots-label{min-height:34px}`, `let dotStep=0,timer=null;const label=document.querySelector('#dots-label'),status=document.querySelector('#dots-status');function resetDots(){clearInterval(timer);timer=null;dotStep=0;label.textContent='Ready when you are';status.textContent='Press start to watch the dots animate.';}document.querySelector('#dots-start').addEventListener('click',()=>{resetDots();status.textContent='Starting process…';timer=setInterval(()=>{dotStep++;label.textContent='Loading'+'.'.repeat(dotStep);if(dotStep>=5){clearInterval(timer);timer=null;label.textContent='Done!';status.textContent='Welcome!';}},500);});document.querySelector('#dots-reset').addEventListener('click',resetDots);`),
  },
  {
    title: 'Login Trial', label: 'PYTHON · BROWSER EDITION · DEMO', source: 'assets/python-source/login-trial.py',
    description: 'A three-attempt login flow using the sample credentials shown in the demo.',
    code: makeProjectCode(`<main class="demo"><p class="small">DEMO LOGIN — NOT REAL ACCOUNT SECURITY</p><h2>Welcome</h2><p class="small">Try admin / admin123, user1 / pass1, or guest / guest.</p><form id="login-form"><label>Username<input id="login-user" autocomplete="off" required></label><label style="margin-top:8px">Password<input id="login-pass" type="password" required></label><div class="row" style="margin-top:10px"><button id="login-submit">Sign in</button><button type="button" id="login-reset" class="secondary">Reset demo</button></div></form><p id="login-status" class="status" aria-live="polite">You have three attempts.</p></main>`,
      `.demo label{margin-top:8px}.demo label input{display:block;width:100%;margin-top:5px}`, `const users={admin:'admin123',user1:'pass1',guest:'guest'};let attempts=0,locked=false;const status=document.querySelector('#login-status'),form=document.querySelector('#login-form');form.addEventListener('submit',event=>{event.preventDefault();if(locked)return;const name=document.querySelector('#login-user').value.trim(),pass=document.querySelector('#login-pass').value;if(users[name]===pass){status.textContent='Login successful! Welcome, '+name+'. Demo access granted.';return;}attempts++;const left=3-attempts;if(left<=0){locked=true;status.textContent='Too many failed attempts. Demo locked until reset.';document.querySelector('#login-submit').disabled=true;}else{status.textContent='Invalid credentials. Attempts left: '+left+'.';}});document.querySelector('#login-reset').addEventListener('click',()=>{attempts=0;locked=false;form.reset();document.querySelector('#login-submit').disabled=false;status.textContent='Demo reset. You have three attempts.';});`),
  },
  {
    title: 'Simple Calculator', label: 'PYTHON · BROWSER EDITION', source: 'assets/python-source/simple-calculator.py',
    description: 'Calculate with addition, subtraction, multiplication, and division.',
    code: makeProjectCode(`<main class="demo"><p class="small">SIMPLE CALCULATOR</p><h2>Do the math</h2><div class="row"><input id="calc-a" type="number" step="any" placeholder="Number 1" aria-label="First number"><select id="calc-op" aria-label="Operation"><option>+</option><option>−</option><option>×</option><option>÷</option></select><input id="calc-b" type="number" step="any" placeholder="Number 2" aria-label="Second number"></div><div class="row" style="margin-top:10px"><button id="calc-go">Calculate</button><button id="calc-clear" class="secondary">Clear</button></div><p id="calc-result" class="status" aria-live="polite">Enter two numbers.</p></main>`,
      `.demo .row input{flex:1;width:80px}`, `const result=document.querySelector('#calc-result');document.querySelector('#calc-go').addEventListener('click',()=>{const a=Number(document.querySelector('#calc-a').value),b=Number(document.querySelector('#calc-b').value),op=document.querySelector('#calc-op').value;if(document.querySelector('#calc-a').value===''||document.querySelector('#calc-b').value===''){result.textContent='Enter both numbers first.';return;}let answer;if(op==='+')answer=a+b;else if(op==='−')answer=a-b;else if(op==='×')answer=a*b;else{if(b===0){result.textContent='Cannot divide by zero.';return;}answer=a/b;}result.textContent='Result: '+answer;});document.querySelector('#calc-clear').addEventListener('click',()=>{document.querySelector('#calc-a').value='';document.querySelector('#calc-b').value='';result.textContent='Enter two numbers.';});`),
  },
  {
    title: 'Loading Type 2', label: 'PYTHON · BROWSER EDITION', source: 'assets/python-source/loading-type-2.py',
    description: 'A startable 20-step progress bar that reaches 100%.',
    code: makeProjectCode(`<main class="demo"><p class="small">LOADING TYPE 2</p><h2 id="bar-label">Ready to load</h2><div class="bar"><span id="bar-fill"></span></div><p id="bar-status" class="status">0%</p><div class="row"><button id="bar-start">Start</button><button id="bar-reset" class="secondary">Reset</button></div></main>`,
      `.demo .bar{height:20px;margin:18px 0}.demo .bar span{width:0}#bar-status{text-align:center}`, `let progress=0,barTimer=null;const fill=document.querySelector('#bar-fill'),status=document.querySelector('#bar-status'),label=document.querySelector('#bar-label');function resetBar(){clearInterval(barTimer);barTimer=null;progress=0;fill.style.width='0%';status.textContent='0%';label.textContent='Ready to load';}document.querySelector('#bar-start').addEventListener('click',()=>{resetBar();label.textContent='Loading, please wait…';barTimer=setInterval(()=>{progress+=5;fill.style.width=progress+'%';status.textContent=progress+'%';if(progress>=100){clearInterval(barTimer);barTimer=null;label.textContent='Done!';status.textContent='100% · Welcome!';}},150);});document.querySelector('#bar-reset').addEventListener('click',resetBar);`),
  },
  {
    title: 'Guess the Number', label: 'PYTHON · BROWSER EDITION', source: 'assets/python-source/guess-the-number.py',
    description: 'Guess the hidden number from 1 to 100 using higher/lower hints.',
    code: makeProjectCode(`<main class="demo"><p class="small">GUESS THE NUMBER · 1–100</p><h2>Can you find it?</h2><form id="guess-form" class="row"><input id="guess-input" type="number" min="1" max="100" placeholder="Your guess" required><button>Guess</button></form><p id="guess-status" class="status" aria-live="polite">Enter a number to begin.</p><p id="guess-count" class="small">Guesses: 0</p><button id="guess-new" class="secondary">New number ↻</button></main>`,
      `.demo #guess-input{flex:1;width:90px}`, `let secret=1+Math.floor(Math.random()*100),guesses=0,finished=false;const status=document.querySelector('#guess-status'),count=document.querySelector('#guess-count');document.querySelector('#guess-form').addEventListener('submit',event=>{event.preventDefault();if(finished)return;const value=Number(document.querySelector('#guess-input').value);if(value<1||value>100){status.textContent='Choose a whole number from 1 to 100.';return;}guesses++;count.textContent='Guesses: '+guesses;if(value===secret){status.textContent='You got it in '+guesses+' tries!';finished=true;}else if(value<secret){status.textContent='Higher! Try again.';}else{status.textContent='Go lower! Try again.';}});document.querySelector('#guess-new').addEventListener('click',()=>{secret=1+Math.floor(Math.random()*100);guesses=0;finished=false;document.querySelector('#guess-input').value='';status.textContent='New number picked. Make a guess!';count.textContent='Guesses: 0';});`),
  },
  {
    title: 'Student Management System', label: 'PYTHON · BROWSER EDITION · LOCAL DEMO', source: 'assets/python-source/student-management-system.py',
    description: 'Add, search, update, filter, and delete sample student records in this preview session.',
    code: makeProjectCode(`<main class="demo"><p class="small">STUDENT MANAGEMENT · SESSION-ONLY DEMO</p><h2>Student records</h2><form id="student-form"><input id="student-id" placeholder="Student ID" required><input id="student-name" placeholder="Student name" required><input id="student-course" placeholder="Course" required><div class="row"><label>Year<select id="student-year"><option>1</option><option>2</option><option>3</option><option>4</option></select></label><label>GPA (0–5)<input id="student-gpa" type="number" min="0" max="5" step="0.1" required></label></div><div class="row" style="margin-top:9px"><button id="student-save">Add student</button><button type="reset" id="student-cancel" class="secondary" hidden>Cancel edit</button></div></form><div class="row" style="margin-top:12px"><input id="student-search" placeholder="Search ID, name, or course"><select id="student-filter"><option value="all">All years</option><option>1</option><option>2</option><option>3</option><option>4</option></select></div><p id="student-status" class="status" aria-live="polite">Records stay in this preview session.</p><div style="overflow:auto"><table><thead><tr><th>ID</th><th>Name / Course</th><th>Year</th><th>GPA</th><th>Actions</th></tr></thead><tbody id="student-rows"></tbody></table></div></main>`,
      `.demo #student-form{display:grid;gap:7px}.demo #student-form>.row label{flex:1}.demo #student-form>.row input,.demo #student-form>.row select{display:block;width:100%;margin-top:4px}.demo #student-search{flex:1} .demo td button{padding:5px 7px;margin:2px;font-size:10px}`, `let students=[],editingId=null;const form=document.querySelector('#student-form'),rows=document.querySelector('#student-rows'),status=document.querySelector('#student-status');function drawStudents(){rows.replaceChildren();const search=document.querySelector('#student-search').value.toLowerCase(),year=document.querySelector('#student-filter').value;students.filter(student=>(year==='all'||student.year===year)&&[student.id,student.name,student.course].some(value=>value.toLowerCase().includes(search))).forEach(student=>{const row=document.createElement('tr');[student.id,student.name+' / '+student.course,student.year,student.gpa.toFixed(1)].forEach(value=>{const cell=document.createElement('td');cell.textContent=value;row.append(cell);});const actions=document.createElement('td');const edit=document.createElement('button');edit.textContent='Edit';edit.dataset.action='edit';edit.dataset.id=student.id;const remove=document.createElement('button');remove.textContent='Delete';remove.dataset.action='delete';remove.dataset.id=student.id;actions.append(edit,remove);row.append(actions);rows.append(row);});if(!rows.children.length){const row=document.createElement('tr'),cell=document.createElement('td');cell.colSpan=5;cell.textContent=students.length?'No matching records.':'No students yet.';row.append(cell);rows.append(row);}}form.addEventListener('submit',event=>{event.preventDefault();const id=document.querySelector('#student-id').value.trim(),name=document.querySelector('#student-name').value.trim(),course=document.querySelector('#student-course').value.trim(),year=document.querySelector('#student-year').value,gpa=Number(document.querySelector('#student-gpa').value);if(!id||!name||!course||gpa<0||gpa>5){status.textContent='Enter all fields and a GPA from 0 to 5.';return;}if(editingId&&editingId!==id&&students.some(student=>student.id===id)){status.textContent='That student ID is already in use.';return;}if(!editingId&&students.some(student=>student.id===id)){status.textContent='That student ID is already in use.';return;}if(editingId){const record=students.find(student=>student.id===editingId);Object.assign(record,{id,name,course,year,gpa});editingId=null;document.querySelector('#student-id').disabled=false;document.querySelector('#student-save').textContent='Add student';document.querySelector('#student-cancel').hidden=true;status.textContent='Student updated.';}else{students.push({id,name,course,year,gpa});status.textContent='Student added.';}form.reset();drawStudents();});rows.addEventListener('click',event=>{const action=event.target.dataset.action,id=event.target.dataset.id,record=students.find(student=>student.id===id);if(!record)return;if(action==='delete'){students=students.filter(student=>student.id!==id);status.textContent='Student deleted.';drawStudents();}if(action==='edit'){editingId=id;document.querySelector('#student-id').value=record.id;document.querySelector('#student-id').disabled=true;document.querySelector('#student-name').value=record.name;document.querySelector('#student-course').value=record.course;document.querySelector('#student-year').value=record.year;document.querySelector('#student-gpa').value=record.gpa;document.querySelector('#student-save').textContent='Save changes';document.querySelector('#student-cancel').hidden=false;status.textContent='Editing '+record.name+'.';}});document.querySelector('#student-cancel').addEventListener('click',()=>{editingId=null;document.querySelector('#student-id').disabled=false;document.querySelector('#student-save').textContent='Add student';document.querySelector('#student-cancel').hidden=true;});document.querySelector('#student-search').addEventListener('input',drawStudents);document.querySelector('#student-filter').addEventListener('change',drawStudents);drawStudents();`),
  },
];
const libraryProjectList = document.querySelector('#library-projects');
const libraryCode = document.querySelector('#library-code');
const projectPreview = document.querySelector('#project-preview');
const libraryStatus = document.querySelector('#lab-status');
const originalSourceLink = document.querySelector('#original-source-link');
let activeLibraryProject = libraryProjects[0];

function runLibraryProject() {
  const contentSecurityPolicy = `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data: blob:; style-src 'unsafe-inline'; script-src 'unsafe-inline'; font-src data:; connect-src 'none'; form-action 'none'; base-uri 'none'>`;
  const errorReporter = `<script>window.addEventListener('error', function(event) { parent.postMessage({ type: 'library-project-error', message: event.message }, '*'); });</script>`;
  projectPreview.srcdoc = `${contentSecurityPolicy}${errorReporter}${libraryCode.value}`;
  libraryStatus.textContent = 'Running in an isolated preview…';
}

function loadLibraryProject(project) {
  activeLibraryProject = project;
  document.querySelector('#lab-title').textContent = `${project.title} · ${project.label.toLowerCase()}`;
  libraryCode.value = project.code;
  originalSourceLink.hidden = !project.source;
  if (project.source) {
    originalSourceLink.href = project.source;
    originalSourceLink.download = project.source.split('/').pop();
  }
  runLibraryProject();
}

libraryProjects.forEach((project, index) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `library-project${index === 0 ? ' is-active' : ''}`;
  const label = document.createElement('span');
  label.textContent = project.label;
  const title = document.createElement('strong');
  title.textContent = project.title;
  const description = document.createElement('small');
  description.textContent = project.description;
  button.append(label, title, description);
  button.addEventListener('click', () => {
    libraryProjectList.querySelectorAll('.library-project').forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');
    loadLibraryProject(project);
  });
  libraryProjectList.append(button);
});

document.querySelector('#run-project').addEventListener('click', runLibraryProject);
document.querySelector('#reset-project').addEventListener('click', () => {
  libraryCode.value = activeLibraryProject.code;
  runLibraryProject();
  libraryStatus.textContent = 'Restored the project’s original code and ran it.';
});
libraryCode.addEventListener('input', () => { libraryStatus.textContent = 'Code edited. Run the project to update its preview.'; });
window.addEventListener('message', (event) => {
  if (event.source === projectPreview.contentWindow && event.data?.type === 'library-project-error') {
    libraryStatus.textContent = `Preview error: ${event.data.message}`;
  }
});
loadLibraryProject(activeLibraryProject);

// Each developer's companion has a small visual effect and message.
const animalCompanions = [
  { member: 'Reneboy Nomananap', animal: 'Capybara', icon: '🦫', effect: 'capybara', lines: ['A calm pace still gets you somewhere wonderful.', 'Take a breath, then keep exploring.'] },
  { member: 'Rhian Aiza Mallari', animal: 'Owl', icon: '🦉', effect: 'owl', lines: ['Stay curious; every question lights a new path.', 'A little focus can reveal a brilliant answer.'] },
  { member: 'Archie Alto', animal: 'Bird', icon: '🐦', effect: 'fox', lines: ['Try a new angle. Your next idea might be the one.', 'Keep experimenting—every attempt teaches you something.'] },
  { member: 'Rhian Raiza Mallari', animal: 'Tiger', icon: '🐅', effect: 'tiger', lines: ['Two friends from the crew are joining the adventure!'] },
  { member: 'Denver Magat', animal: 'Dolphin', icon: '🐬', effect: 'dolphin', lines: ['Ride the next wave of ideas with confidence.', 'Let curiosity carry you somewhere new.'] },
  { member: 'Junel Herrera', animal: 'Deer', icon: '🦌', effect: 'tree', lines: ['Keep growing at your own pace.', 'You are capable of more than you think.'] },
  { member: 'Jan Vincent Garcia', animal: 'Sheep', icon: '🐑', effect: 'meteor', lines: ['A little wish can make a long night feel brighter.'] },
];
const zodiacSigns = [
  ['♈','Aries'],['♉','Taurus'],['♊','Gemini'],['♋','Cancer'],['♌','Leo'],['♍','Virgo'],
  ['♎','Libra'],['♏','Scorpio'],['♐','Sagittarius'],['♑','Capricorn'],['♒','Aquarius'],['♓','Pisces'],
];
// Recognizable stick-figure star patterns, with brighter named stars emphasized.
const zodiacMaps = {
  Aries:{stars:[[18,51,'Hamal'],[45,42,'Sheratan'],[68,53,'Mesarthim'],[83,65]],lines:[[0,1],[1,2],[2,3]]},
  Taurus:{stars:[[16,62],[32,44],[48,28,'Aldebaran'],[68,38],[87,57],[29,39],[11,24],[82,22],[91,16]],lines:[[0,1],[1,2],[2,3],[3,4],[2,5],[5,6],[3,7],[7,8]]},
  Gemini:{stars:[[28,67,'Castor'],[57,64,'Pollux'],[34,47],[59,45],[38,27],[64,26],[42,9],[70,10]],lines:[[0,2],[2,4],[4,6],[1,3],[3,5],[5,7],[2,3],[4,5]]},
  Cancer:{stars:[[20,28],[42,42],[61,62],[80,42],[42,42],[42,17]],lines:[[0,1],[1,2],[1,3],[1,4],[4,5]]},
  Leo:{stars:[[18,58],[33,43],[30,24],[46,13],[58,27],[52,44],[66,58,'Regulus'],[82,67,'Denebola']],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,2],[5,6],[6,7]]},
  Virgo:{stars:[[16,18],[27,37],[40,54],[56,66],[63,45],[65,22],[84,37,'Spica'],[47,35]],lines:[[0,1],[1,2],[2,3],[2,7],[7,4],[4,5],[4,6]]},
  Libra:{stars:[[25,22],[68,20],[79,61],[34,67],[25,22]],lines:[[0,1],[1,2],[2,3],[3,0]]},
  Scorpio:{stars:[[19,17],[33,28],[48,42],[64,52],[76,45],[73,31],[84,24],[87,47],[72,63,'Antares'],[58,70],[44,65],[35,53]],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[4,7],[7,8],[8,9],[9,10],[10,11]]},
  Sagittarius:{stars:[[19,31],[36,25],[54,30],[75,24],[69,48],[81,62],[55,60],[41,54],[47,42],[55,30],[34,46]],lines:[[0,1],[1,2],[2,3],[2,4],[4,5],[4,6],[6,7],[7,8],[8,9],[8,10],[10,1]]},
  Capricorn:{stars:[[16,51],[39,33],[63,29],[83,47],[75,67],[50,65],[16,51]],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0]]},
  Aquarius:{stars:[[17,24],[34,30],[47,19],[60,34],[76,24],[69,48],[82,64],[52,51],[39,67],[27,52]],lines:[[0,1],[1,2],[2,3],[3,4],[3,5],[5,6],[5,7],[7,8],[7,9]]},
  Pisces:{stars:[[15,23],[31,31],[46,41],[59,52],[73,62],[85,56],[72,39],[58,23],[46,13],[46,41]],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[2,9],[9,8],[8,7],[7,6],[6,9]]},
};
const fruitEncouragement = ['Keep growing','You’ve got this','Stay curious','One step more'];
const catMascot = document.querySelector('#cat-mascot');
const catMessage = document.querySelector('#cat-message');
const petOptions = document.querySelector('#pet-options');
const petScene = document.querySelector('#pet-scene');
const petMessage = document.querySelector('#cat-message-text');
const companionBackdrop = document.querySelector('#companion-backdrop');
let lastFortune = -1;
let activeCompanion = null;
let companionEffectTimer = null;
let capybaraTimer = null;
let capybaraFrame = null;
animalCompanions.forEach((pet) => {
  const option = document.createElement('button');
  option.type = 'button';
  option.className = 'pet-option';
  option.setAttribute('aria-label', `${pet.animal}, companion of ${pet.member}`);
  const icon = document.createElement('span'); icon.className = 'pet-option-icon'; icon.textContent = pet.icon;
  const label = document.createElement('span'); label.className = 'pet-option-copy';
  const animal = document.createElement('strong'); animal.textContent = pet.animal;
  const member = document.createElement('small'); member.textContent = pet.member;
  label.append(animal, member); option.append(icon, label);
  option.addEventListener('click', () => activateCompanion(pet, option));
  petOptions.append(option);
});

function activateCompanion(pet, option) {
  activeCompanion = pet;
  catMascot.querySelector('svg').hidden = true;
  let activeIcon = catMascot.querySelector('.active-pet-icon');
  if (!activeIcon) {
    activeIcon = document.createElement('span');
    activeIcon.className = 'active-pet-icon';
    activeIcon.setAttribute('aria-hidden','true');
    catMascot.append(activeIcon);
  }
  activeIcon.textContent = pet.icon;
  catMascot.setAttribute('aria-label', `Use ${pet.animal}, companion of ${pet.member}`);
  window.clearTimeout(companionEffectTimer);
  petOptions.querySelectorAll('.pet-option').forEach((button) => button.classList.toggle('is-selected', button === option));
  petScene.replaceChildren();
  petScene.hidden = false;
  petScene.className = `pet-scene effect-${pet.effect}`;
  const choices = pet.lines.map((_, index) => index).filter((index) => index !== lastFortune);
  let companionData = null;
  if (pet.effect === 'fortune') {
    lastFortune = choices[Math.floor(Math.random() * choices.length)];
    companionData = pet.lines[lastFortune];
  } else if (pet.effect === 'meteor') {
    companionData = zodiacSigns[Math.floor(Math.random() * zodiacSigns.length)];
  }
  applyPageCompanionEffect(pet, companionData);
  const creature = document.createElement('span'); creature.className = 'pet-creature'; creature.textContent = pet.icon;
  petScene.append(creature);
  if (pet.effect === 'fortune') {
    petMessage.textContent = `A little fortune from Denver’s cat: “${companionData}”`;
  } else if (pet.effect === 'dolphin') {
    petMessage.textContent = 'Denver’s dolphin sends a fresh wave of good energy across the galaxy.';
  } else if (pet.effect === 'tiger') {
    companionBackdrop.classList.add('summoning-tiger');
    petMessage.textContent = 'Raiza’s tiger calls two companions to activate their effects together!';
  } else if (pet.effect === 'capybara') {
    petMessage.textContent = 'Reneboy’s capybara will roam and make little shockwaves for 10 minutes.';
  } else if (pet.effect === 'meteor') {
    const [symbol, sign] = companionData;
    petMessage.textContent = `A wishing star is passing ${sign}’s constellation. Make a wish!`;
    const badge = document.createElement('span'); badge.className = 'zodiac-badge'; badge.textContent = `${symbol} ${sign}`; petScene.append(badge);
    const meteor = document.createElement('span'); meteor.className = 'pet-meteor'; meteor.textContent = '☄'; meteor.setAttribute('aria-hidden','true'); petScene.append(meteor);
  } else if (pet.effect === 'tree') {
    petMessage.textContent = 'Junel’s galaxy tree grew a few words just for you.';
    const tree = document.createElement('div'); tree.className = 'galaxy-tree';
    const crown = document.createElement('div'); crown.className = 'tree-crown';
    fruitEncouragement.forEach((word, index) => { const fruit = document.createElement('span'); fruit.className = `tree-fruit fruit-${index + 1}`; fruit.textContent = word; crown.append(fruit); });
    const trunk = document.createElement('span'); trunk.className = 'tree-trunk'; tree.append(crown, trunk); petScene.append(tree);
  } else if (pet.effect !== 'fox') {
    petMessage.textContent = `${pet.member}’s ${pet.animal.toLowerCase()} says: “${pet.lines[Math.floor(Math.random() * pet.lines.length)]}”`;
    const stars = document.createElement('span'); stars.className = 'pet-stars'; stars.textContent = '✦  ·  ✧  ·  ✦  ·  ✧'; petScene.append(stars);
  } else {
    const sparkle = document.createElement('span'); sparkle.className = 'pet-stars'; sparkle.textContent = '✦  ·  ✧  ·  ✦  ·  ✧'; petScene.append(sparkle);
  }
  companionEffectTimer = window.setTimeout(() => {
    companionBackdrop.replaceChildren();
    companionBackdrop.hidden = true;
    petScene.hidden = true;
  }, pet.effect === 'capybara' ? 600000 : 5000);
}

// Page-wide effects live in their own decorative layer, so they never block clicks.
function applyPageCompanionEffect(pet, companionData, append = false) {
  if (!append) companionBackdrop.replaceChildren();
  companionBackdrop.hidden = false;
  if (!append) companionBackdrop.className = `companion-backdrop page-effect-${pet.effect}`;
  const addParticle = (className, text = '') => {
    const particle = document.createElement('span');
    particle.className = className;
    particle.textContent = text;
    companionBackdrop.append(particle);
    return particle;
  };
  if (pet.effect === 'fortune') {
    const card = addParticle('page-fortune');
    card.textContent = `✦ Today’s luck · ${companionData}`;
  } else if (pet.effect === 'meteor') {
    const [symbol, sign] = companionData;
    const cluster = addParticle('zodiac-cluster');
    cluster.setAttribute('aria-label', `${sign} constellation`);
    const map = zodiacMaps[sign];
    const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('viewBox','0 0 100 80'); svg.setAttribute('class','zodiac-lines'); svg.setAttribute('role','img'); svg.setAttribute('aria-label',`${sign} constellation stick figure`);
    map.lines.forEach(([from,to])=>{const [x1,y1]=map.stars[from];const [x2,y2]=map.stars[to];const line=document.createElementNS('http://www.w3.org/2000/svg','line');line.setAttribute('x1',x1);line.setAttribute('y1',y1);line.setAttribute('x2',x2);line.setAttribute('y2',y2);svg.append(line);});
    map.stars.forEach(([cx,cy,name])=>{const star=document.createElementNS('http://www.w3.org/2000/svg','circle');star.setAttribute('cx',cx);star.setAttribute('cy',cy);star.setAttribute('r',name?2.3:1.5);svg.append(star);});
    cluster.append(svg);
    const title = document.createElement('span'); title.className='zodiac-title'; title.textContent=`${symbol} ${sign}`; cluster.append(title);
    for(let i=0;i<9;i++){
      const meteor = addParticle('page-meteor', '✦');
      meteor.style.setProperty('--x',`${(i * 37 + 8) % 96}%`);
      meteor.style.setProperty('--delay',`${-(i % 5) * .65}s`);
    }
  } else if (pet.effect === 'tree') {
    const tree = addParticle('page-galaxy-tree');
    const crown = document.createElement('span'); crown.className='page-tree-crown'; tree.append(crown);
    fruitEncouragement.forEach((word,index)=>{const fruit=document.createElement('span');fruit.className=`page-tree-fruit page-fruit-${index+1}`;fruit.textContent=word;tree.append(fruit);});
    const trunk=document.createElement('span');trunk.className='page-tree-trunk';tree.append(trunk);
  } else if (pet.effect === 'butterfly') {
    for(let i=0;i<18;i++){const flower=addParticle(`garden-flower flower-${i%6+1}`,['✿','❀','✾'][i%3]);flower.style.setProperty('--x',`${(i*37+8)%96}%`);flower.style.setProperty('--delay',`${(i%7)*-.7}s`);}
  } else if (pet.effect === 'owl') {
    for(let i=0;i<3;i++) addParticle(`aurora-ribbon aurora-${i+1}`);
    for(let i=0;i<35;i++){const star=addParticle('owl-starlight','✦');star.style.setProperty('--x',`${(i*47+9)%98}%`);star.style.setProperty('--y',`${(i*29+12)%88}%`);star.style.setProperty('--delay',`${(i%8)*-.4}s`);}
  } else if (pet.effect === 'fox') {
    const season=['spring','summer','autumn','winter'][Math.floor(Math.random()*4)];
    companionBackdrop.classList.add(`season-${season}`);
    const emblems={spring:'✿',summer:'☀',autumn:'🍂',winter:'❄'};
    for(let i=0;i<24;i++){const mote=addParticle('season-mote',emblems[season]);mote.style.setProperty('--x',`${(i*43+5)%98}%`);mote.style.setProperty('--delay',`${(i%9)*-.6}s`);}
    petMessage.textContent=`${pet.animal} brought ${season} to the galaxy. Enjoy the new season!`;
  } else if (pet.effect === 'dolphin') {
    addParticle('water-wave wave-from-left');
    addParticle('water-wave wave-from-right');
    addParticle('water-wave wave-from-left wave-second');
    addParticle('water-wave wave-from-right wave-second');
  } else if (pet.effect === 'tiger') {
    const candidates = animalCompanions.filter((candidate) => candidate.effect !== 'tiger');
    for (let i = candidates.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [candidates[i], candidates[j]] = [candidates[j], candidates[i]]; }
    const summoned = candidates.slice(0, 2);
    summoned.forEach((friend) => {
      let data = null;
      if (friend.effect === 'fortune') data = friend.lines[Math.floor(Math.random() * friend.lines.length)];
      if (friend.effect === 'meteor') data = zodiacSigns[Math.floor(Math.random() * zodiacSigns.length)];
      applyPageCompanionEffect(friend, data, true);
      addParticle('summoned-label', `${friend.icon} ${friend.animal}`);
    });
    petMessage.textContent = `The tiger summoned ${summoned[0].animal} and ${summoned[1].animal}!`;
  } else if (pet.effect === 'capybara') {
    companionBackdrop.classList.add('page-effect-capybara');
    summonRoamingCapybara();
  }
}

// One friendly capybara roams for ten minutes and ripples when it bumps an edge.
function summonRoamingCapybara() {
  window.clearTimeout(capybaraTimer);
  if (capybaraFrame) cancelAnimationFrame(capybaraFrame);
  document.querySelector('.roaming-capybara')?.remove();
  const capybara = document.createElement('span');
  capybara.className = 'roaming-capybara';
  capybara.textContent = '🦫';
  capybara.setAttribute('aria-hidden', 'true');
  document.body.append(capybara);
  let x = 35 + Math.random() * Math.max(1, window.innerWidth - 90);
  let y = 75 + Math.random() * Math.max(1, window.innerHeight - 140);
  let vx = (Math.random() < .5 ? -1 : 1) * 1.2;
  let vy = (Math.random() < .5 ? -1 : 1) * .85;
  let last = 0;
  const move = (time) => {
    if (time - last > 16) {
      last = time;
      x += vx; y += vy;
      const maxX = Math.max(0, window.innerWidth - 54);
      const maxY = Math.max(70, window.innerHeight - 62);
      let hit = false;
      if (x <= 0 || x >= maxX) { vx *= -1; x = Math.max(0, Math.min(maxX, x)); hit = true; }
      if (y <= 70 || y >= maxY) { vy *= -1; y = Math.max(70, Math.min(maxY, y)); hit = true; }
      capybara.style.transform = `translate3d(${x}px,${y}px,0) scaleX(${vx < 0 ? -1 : 1})`;
      if (hit) {
        const ripple = document.createElement('span');
        ripple.className = 'capybara-shockwave';
        ripple.style.left = `${x + 22}px`; ripple.style.top = `${y + 22}px`;
        document.body.append(ripple);
        window.setTimeout(() => ripple.remove(), 900);
      }
    }
    capybaraFrame = requestAnimationFrame(move);
  };
  capybaraFrame = requestAnimationFrame(move);
  capybaraTimer = window.setTimeout(() => {
    if (capybaraFrame) cancelAnimationFrame(capybaraFrame);
    capybaraFrame = null;
    capybara.remove();
  }, 600000);
}

catMascot.addEventListener('click', () => {
  const opening = catMessage.hidden;
  // After choosing a companion, tapping its corner button replays its effect.
  if (opening && activeCompanion) {
    const selected = [...petOptions.querySelectorAll('.pet-option')].find((button) => button.classList.contains('is-selected'));
    activateCompanion(activeCompanion, selected);
  }
  catMessage.hidden = !opening;
  catMascot.setAttribute('aria-expanded', String(opening));
});
document.querySelector('#cat-message-close').addEventListener('click', () => {
  catMessage.hidden = true;
  catMascot.setAttribute('aria-expanded', 'false');
  catMascot.focus();
});

// The wall uses Supabase when configured; local storage remains a preview fallback.
const messageStorageKey = 'aiz-community-wall-messages';
const messageList = document.querySelector('#message-list');
const wallCount = document.querySelector('#wall-count');
const confessionForm = document.querySelector('#confession-form');
const confessionStatus = document.querySelector('#confession-status');
const supabaseConfig = window.AIZ_SUPABASE_CONFIG || {};
const supabaseUrl = (supabaseConfig.url || '').trim().replace(/\/$/, '');
const supabasePublishableKey = (supabaseConfig.publishableKey || '').trim();
const publicBoardEnabled = /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(supabaseUrl) && supabasePublishableKey.length > 10;
let wallMessages = [];

try {
  const savedMessages = JSON.parse(localStorage.getItem(messageStorageKey) || '[]');
  if (Array.isArray(savedMessages)) wallMessages = savedMessages;
} catch (error) {
  wallMessages = [];
}

function renderWall() {
  messageList.innerHTML = '';
  wallCount.textContent = `${wallMessages.length} ${wallMessages.length === 1 ? 'NOTE' : 'NOTES'}`;
  if (wallMessages.length === 0) {
    const emptyState = document.createElement('p');
    emptyState.className = 'wall-empty';
    emptyState.textContent = 'No notes yet. Yours can be the first ✦';
    messageList.append(emptyState);
    return;
  }

  wallMessages.forEach((entry) => {
    const card = document.createElement('article');
    card.className = 'message-card';
    const heading = document.createElement('div');
    heading.className = 'message-card-heading';
    const author = document.createElement('strong');
    author.textContent = entry.nickname || 'Anonymous';
    const date = document.createElement('time');
    const timestamp = new Date(entry.created_at || entry.createdAt);
    date.dateTime = timestamp.toISOString();
    date.textContent = timestamp.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    const content = document.createElement('p');
    content.textContent = entry.message;
    heading.append(author, date);
    card.append(heading, content);
    messageList.append(card);
  });
}
renderWall();

async function supabaseRequest(path, options = {}) {
  const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: supabasePublishableKey,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  if (!response.ok) {
    const details = await response.text();
    throw new Error(details || `Supabase returned ${response.status}`);
  }
  return response.status === 204 ? null : response.json();
}

async function loadPublicWall() {
  if (!publicBoardEnabled) {
    confessionStatus.textContent = 'Add your Supabase URL and publishable key in supabase-config.js to enable the public board.';
    return;
  }
  confessionStatus.textContent = 'Loading public notes…';
  try {
    wallMessages = await supabaseRequest('community_messages?select=id,nickname,message,created_at&order=created_at.desc&limit=200');
    renderWall();
    confessionStatus.textContent = 'Public board connected. Notes are shared with everyone.';
  } catch (error) {
    confessionStatus.textContent = 'Could not load the public board. Check the Supabase URL, key, table, and access policies.';
  }
}
loadPublicWall();

const confessionMessage = document.querySelector('#confession-message');
confessionMessage.addEventListener('input', () => {
  document.querySelector('#message-count').textContent = `${confessionMessage.value.length} / 1000`;
});
confessionForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const nickname = document.querySelector('#nickname').value.trim();
  const message = confessionMessage.value.trim();
  if (!message) return;

  if (publicBoardEnabled) {
    const submitButton = confessionForm.querySelector('[type="submit"]');
    submitButton.disabled = true;
    confessionStatus.textContent = 'Posting your note…';
    try {
      await supabaseRequest('community_messages', {
        method: 'POST',
        body: JSON.stringify({ nickname: nickname || 'Anonymous', message }),
      });
      confessionForm.reset();
      document.querySelector('#message-count').textContent = '0 / 1000';
      await loadPublicWall();
      confessionStatus.textContent = 'Your note is now on the public board. Thanks for sharing!';
    } catch (error) {
      confessionStatus.textContent = 'Your note could not be posted. Check the Supabase table and access policies, then try again.';
    } finally {
      submitButton.disabled = false;
    }
    return;
  }

  const newEntry = { nickname, message, createdAt: new Date().toISOString() };
  wallMessages.unshift(newEntry);
  let saved = true;
  try {
    localStorage.setItem(messageStorageKey, JSON.stringify(wallMessages));
  } catch (error) {
    saved = false;
  }
  renderWall();
  confessionForm.reset();
  document.querySelector('#message-count').textContent = '0 / 1000';
  confessionStatus.textContent = saved
    ? 'Your note was added to this device’s community wall.'
    : 'Your note is shown for this visit, but this browser could not save it.';
});
