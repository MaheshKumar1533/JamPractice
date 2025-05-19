function startPreparationTimer(duration, display) {
	let timer = duration,
		seconds;
	const preparationSound = new Audio("assets/sounds/start.mp3");
	preparationSound.play();

	const interval = setInterval(function () {
		seconds = parseInt(timer % 60, 10);
		seconds = seconds < 10 ? "0" + seconds : seconds;
		display.textContent = "Preparation Time: " + seconds + "s";

		if (--timer < 0) {
			clearInterval(interval);
			startRecordingTimer(
				60,
				document.querySelector("#recordingDisplay")
			);
		}
	}, 1000);
}

function startRecordingTimer(duration, display) {
	let timer = duration,
		seconds;
	const recordingSound = new Audio("assets/sounds/end.mp3");

	const interval = setInterval(function () {
		seconds = parseInt(timer % 60, 10);
		seconds = seconds < 10 ? "0" + seconds : seconds;
		display.textContent = "Recording Time: " + seconds + "s";

		if (--timer < 0) {
			clearInterval(interval);
			recordingSound.play();
			// Call the function to stop recording and download the audio
			stopRecording();
		}
	}, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
	const timerCircle = document.querySelector(".timer-circle");
	const circumference = 2 * Math.PI * 45; // r=45 is the circle radius

	timerCircle.style.strokeDasharray = `${circumference} ${circumference}`;
	timerCircle.style.strokeDashoffset = circumference;

	// Function to update the timer circle animation
	window.updateTimerAnimation = (percent) => {
		const offset = circumference - (percent / 100) * circumference;
		timerCircle.style.strokeDashoffset = offset;

		// Change color based on time remaining
		if (percent < 25) {
			timerCircle.style.stroke = "#e74c3c"; // Red for last 25%
		} else if (percent < 50) {
			timerCircle.style.stroke = "#f39c12"; // Orange for 25-50%
		} else {
			timerCircle.style.stroke = "#2ecc71"; // Green for 50-100%
		}
	};
});
