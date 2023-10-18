async function uploadAudio() {
    const audioFile = document.getElementById('audioFile').files[0];
    const language = document.getElementById('language').value;

    if (!audioFile) {
        alert('请先选择一个音频文件！');
        return;
    }

    const audioData = new Blob([audioFile], { type: audioFile.type });
    const AZURE_API_ENDPOINT = 'eastasia.api.cognitive.microsoft.com/sts/v1.0/issuetoken';
    const response = await fetch(AZURE_API_ENDPOINT, {
        method: 'POST',
        headers: {
            'Ocp-Apim-Subscription-Key': '53d0e91a232e43f281b3196c8035734a',
            'Content-Type': 'audio/wav; codecs=audio/pcm; samplerate=16000',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: audioData
    });

    const data = await response.json();
    document.getElementById('transcriptionResult').value = data.DisplayText;
}

function downloadText() {
    const text = document.getElementById('transcriptionResult').value;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'transcription.txt';
    a.click();

    URL.revokeObjectURL(url);
}
