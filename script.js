import Utils from '/standup/Utils.js';

const d = document;
const names = Utils.names

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
function getName(list) {
    namePointer = (namePointer + 1) % names.length;
    return names[namePointer];
}
function setCardName(card, name) {
    card.setAttribute('data-pronounce', name.spoken || name.value);
    card.querySelector('.card-name').innerHTML = name.value;
}

d.querySelectorAll('.card').forEach(card => {
    setCardName(card, getName(names));

    card.addEventListener('click', () => {
        if (!card.classList.contains('flipped')) {
            window.setTimeout(() => say(card.getAttribute('data-pronounce') + ' is the winner. ' + randomCongrats()), 500);
        } else {
            say('Never mind');
            window.setTimeout(() => {
                setCardName(card, getName(names));
            }, 1000);
        }
        card.classList.toggle('flipped');
    });
});
