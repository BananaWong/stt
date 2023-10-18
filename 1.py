from flask import Flask, request, jsonify
import azure.cognitiveservices.speech as speechsdk

app = Flask(__name__)

# Replace with your Azure Speech key and region
SPEECH_KEY = '53d0e91a232e43f281b3196c8035734a'
SPEECH_REGION = 'eastasia'

@app.route('/convert', methods=['POST'])
def convert():
    audio_file = request.files['audio']
    language = request.form['language']

    speech_config = speechsdk.SpeechConfig(subscription=SPEECH_KEY, region=SPEECH_REGION)
    speech_config.speech_recognition_language = language
    audio_input = speechsdk.AudioConfig(stream=audio_file)
    speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config, audio_config=audio_input)

    result = speech_recognizer.recognize_once()
    
    if result.reason == speechsdk.ResultReason.RecognizedSpeech:
        return result.text
    else:
        return "Error: Could not recognize speech."

if __name__ == '__main__':
    app.run(debug=True)
