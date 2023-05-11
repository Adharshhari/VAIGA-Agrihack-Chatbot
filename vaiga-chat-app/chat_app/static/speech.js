// const speechBtn = document.getElementById("start-speech");

// const synth = window.speechSynthesis;
// window.SpeechRecognition =
//   window.SpeechRecognition || window.webkitSpeechRecognition;

// const recognition = new SpeechRecognition();
// recognition.interimResults = true;
// recognition.lang = "ml-IN";

// let query = "";
// recognition.addEventListener("result", (e) => {
//   const text = Array.from(e.results)
//     .map((result) => result[0])
//     .map((result) => result.transcript)
//     .join("");
//   query = text;
// });

// recognition.addEventListener("end", () => {
//   console.log(query);
//   submitForm.querySelector("input").value = query.toLowerCase();
// });

// speechBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   recognition.start();
//   console.log(document.querySelectorAll(".robot-aligner"));
// });

// function speak(text) {
//   const utterance = new SpeechSynthesisUtterance(text);

  // Set the speech settings for Malayalam language
//   utterance.lang = "ml-IN"; // Malayalam (India) language code
//   utterance.voiceURI = "Google मलयालम";
//   utterance.pitch = 1.0;
//   utterance.rate = 1.0;
//   utterance.volume = 1.0;

//   // Set the Malayalam voice
//   const malayalamVoice = synth
//     .getVoices()
//     .find((voice) => voice.lang === "ml-IN");
//   if (malayalamVoice) {
//     utterance.voice = malayalamVoice;
//   }

//   synth.speak(utterance);
// }
// let speaker = document.querySelector(".speaker");
// speaker.addEventListener("click", (e) => {
//   console.log("i am speaking");
//   let bubbles = document.querySelectorAll(".bubble");
//   // console.log(bubbles);
//   console.log(bubbles[bubbles.length - 1].textContent);
//   speak(bubbles[bubbles.length - 1].textContent);
// });





const speechBtn = document.getElementById("start-speech");
const synth = window.speechSynthesis;
const apiEndpoint = "https://texttospeech.googleapis.com/v1/text:synthesize?key=<YOUR_API_KEY>";

const apiKey = "<YOUR_API_KEY>"; // Replace with your Google API key
const voiceName = "hi-IN-Wavenet-B"; 

async function speak(text) {
  const response = await fetch(apiEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      input: { text },
      voice: { languageCode: "ml-IN", name: voiceName },
      audioConfig: { audioEncoding: "LINEAR16" },
    }),
  });
  const audioData = await response.arrayBuffer();
  const audioContext = new AudioContext();
  const audioBuffer = await audioContext.decodeAudioData(audioData);
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioContext.destination);
  source.start();
}

speechBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = "ml-IN";

  recognition.addEventListener("result", (e) => {
    const text = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");
    submitForm.querySelector("input").value = text.toLowerCase();
    speak(text);
  });

  recognition.start();
});

