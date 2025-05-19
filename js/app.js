const topics = [
	"The importance of time management",
	"How to stay motivated while studying",
	"The impact of technology on education",
	"Benefits of a healthy lifestyle",
	"The role of social media in modern communication",
	"How to overcome public speaking anxiety",
	"The significance of teamwork in the workplace",
	"The future of renewable energy",
	"The effects of climate change on our planet",
	"The value of lifelong learning",
	"How to develop effective communication skills",
	"The influence of art and culture on society",
	"The challenges of remote work",
	"The importance of mental health awareness",
	"How to create a successful personal brand",
];

document.addEventListener("DOMContentLoaded", () => {
	const startButton = document.getElementById("startButton");
	const topicDisplay = document.getElementById("topicDisplay");
	const timerDisplay = document.getElementById("timerDisplay");
	const timerPhase = document.getElementById("timerPhase");
	const audioPlayback = document.getElementById("audioPlayback");
	const recordingStatus = document.getElementById("recordingStatus");

	let prepTimeInSeconds = 10;
	let speechTimeInSeconds = 10;
	let timer;
	let currentPhase = "idle"; // 'idle', 'prep', 'speech'

	// Start the whole process
	startButton.addEventListener("click", () => {
		// Reset UI
		audioPlayback.classList.add("hidden");
		recordingStatus.textContent = "";
		startButton.disabled = true;

		// Select and display random topic
		const randomTopic = getRandomTopic();
		topicDisplay.textContent = randomTopic;
		topicDisplay.classList.remove("hidden");

		// Start preparation timer
		currentPhase = "prep";
		timerPhase.textContent = "Preparation Time";
		startTimer(prepTimeInSeconds, () => {
			// After prep timer ends, start speech recording
			playSound("assets/sounds/start.mp3");
			currentPhase = "speech";
			timerPhase.textContent = "Speech Time";

			// Start recording
			startRecording();

			// Start speech timer
			startTimer(speechTimeInSeconds, () => {
				// When speech timer ends
				playSound("assets/sounds/end.mp3");
				stopRecording();
				currentPhase = "idle";
				timerPhase.textContent = "";
				startButton.disabled = false;
			});
		});
	});

	// Timer function
	function startTimer(durationInSeconds, callback) {
		let timeLeft = durationInSeconds;
		updateTimerDisplay(timeLeft);

		clearInterval(timer);
		timer = setInterval(() => {
			timeLeft--;
			updateTimerDisplay(timeLeft);

			if (timeLeft <= 0) {
				clearInterval(timer);
				callback();
			}
		}, 1000);
	}

	// Update the timer display with proper formatting
	function updateTimerDisplay(timeInSeconds) {
		const minutes = Math.floor(timeInSeconds / 60);
		const seconds = timeInSeconds % 60;
		timerDisplay.textContent = `${minutes
			.toString()
			.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
	}

	// Play sound effect
	function playSound(soundPath) {
		const audio = new Audio(soundPath);
		audio.play().catch((err) => console.warn("Could not play sound", err));
	}

	// Get random topic from our topics list
	function getRandomTopic() {
		return topics[Math.floor(Math.random() * topics.length)];
	}
});

function stopRecording() {
	// Logic to stop recording and download the audio file
	// This function will be implemented in recorder.js
}
