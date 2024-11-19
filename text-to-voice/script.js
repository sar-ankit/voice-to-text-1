let recognition = new webkitSpeechRecognition() || new SpeechRecognition();
let languageSelect = document.getElementById('language');
let startBtn = document.getElementById('start-btn');
let stopBtn = document.getElementById('stop-btn');
let resultDiv = document.getElementById('result');

recognition.lang = 'en-US';
recognition.interimResults = true;
recognition.maxResults = 10;

languageSelect.addEventListener('change', () => {
    recognition.lang = languageSelect.value;
});

startBtn.addEventListener('click', () => {
    recognition.start();
    startBtn.disabled = true;
    stopBtn.disabled = false;
});
stopBtn.addEventListener('click', () => {
    recognition.stop();
    startBtn.disabled = false;
    stopBtn.disabled = true;
});

recognition.onresult = (event) => {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
    }
    resultDiv.innerText = transcript;
};

recognition.onerror = (event) => {
    console.error('Error:', event.error);
};

recognition.onend = () => {
    startBtn.disabled = false;
    stopBtn.disabled = true;
};

