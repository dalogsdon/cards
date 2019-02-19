// https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
function shuffle(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
const d = document;
const names = shuffle([
    'Asim',
    'Betty',
    'Bradley',
    'Brett',
    'Bryan',
    'Chris',
    'Drew',
    'Dom',
    'G',
    'Gregory',
    'Jesse',
    'John',
    'Jordan',
    'Megan',
    'Mike',
    'Rich',
    'Tyler',
    'Xiaojun',
    'Ytalo'
]);

function pronounce(name) {
    return name === 'Asim' ? 'Ahhsim' : name;
}

// voice
window.speechSynthesis.getVoices();
const say = msgTxt => {
    speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(msgTxt);
    const voices = window.speechSynthesis.getVoices()
        .filter(v => v.lang === 'en-GB' && v.name.indexOf('Male') > -1);
    msg.voice = voices[0];
    window.speechSynthesis.speak(msg);
}

const congrats = [
    'I\'m very proud.',
    'Good Job!',
    'Hooray!',
    'I look forward to hearing your voice.',
    'I hope you\'re actually here.',
    'Please serenade us'
];
const randomCongrats = () => congrats[Math.floor(Math.random() * congrats.length)];

// pick 3 random names
let namePointer = names.length - 1;
const getName = (list) => {
    namePointer = (namePointer + 1) % names.length;
    return names[namePointer];
}

d.querySelectorAll('.card').forEach(card => {
    const randomName = getName(names);
    card.querySelector('.card-name').textContent = randomName;

    card.addEventListener('click', () => {
        if (!card.classList.contains('flipped')) {
            window.setTimeout(() => say(pronounce(card.querySelector('.card-name').textContent) + ' is the winner. ' + randomCongrats()), 500);
        } else {
            say('Never mind');
            window.setTimeout(() => {
                const newName = getName(names);
                card.querySelector('.card-name').textContent = newName;
            }, 1000);
        }
        card.classList.toggle('flipped');
    });
});
