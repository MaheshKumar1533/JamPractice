const startRecordingButton = document.getElementById('startRecording');
const stopRecordingButton = document.getElementById('stopRecording');
const audioElement = document.getElementById('audioPlayback');
let mediaRecorder;
let audioChunks = [];
let recordingStream;

// Function to request microphone access and start recording
function startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            recordingStream = stream;
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            
            // Visual indication that recording is happening
            document.getElementById('recordingStatus').classList.add('recording');
            
            mediaRecorder.ondataavailable = event => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                
                // Set the audio source for playback
                const audioElement = document.getElementById('audioPlayback');
                audioElement.src = audioUrl;
                audioElement.classList.remove('hidden');
                
                // Download the recording
                downloadRecording(audioBlob);
                
                // Clear chunks for next recording
                audioChunks = [];
                
                // Stop all audio tracks
                recordingStream.getTracks().forEach(track => track.stop());
                
                // Remove recording indication
                document.getElementById('recordingStatus').classList.remove('recording');
            };
        })
        .catch(error => {
            console.warn('Microphone access denied or error:', error);
            // Continue with timer even if mic access fails
            document.getElementById('recordingStatus').textContent = "Recording unavailable (microphone access denied)";
        });
}

// Function to stop recording
function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
    }
}

// Function to download the recording
function downloadRecording(blob) {
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, '-');
    const filename = `speech-recording-${timestamp}.wav`;
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Event listeners for buttons
startRecordingButton.addEventListener('click', startRecording);
stopRecordingButton.addEventListener('click', stopRecording);