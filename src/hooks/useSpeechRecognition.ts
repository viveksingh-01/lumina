import { useEffect, useState } from "react";

const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      setError("Speech Recognition API is not supported in this browser.");
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition: SpeechRecognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = true;

    const handleResult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          setTranscript((prev) => prev + event.results[i][0].transcript);
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      // Example: Use interimTranscript to display partial results
      console.log("Interim Transcript:", interimTranscript);
    };

    const handleError = (event: SpeechRecognitionErrorEvent) => {
      setError(event.error);
      setIsListening(false);
    };

    if (isListening) {
      recognition.start();
      recognition.onresult = handleResult;
      recognition.onerror = handleError;
    } else {
      recognition.stop();
      recognition.onresult = null;
      recognition.onerror = null;
    }

    return () => {
      recognition.stop();
    };
  }, [isListening]);

  const startListening = () => setIsListening(true);
  const stopListening = () => setIsListening(false);

  return {
    transcript,
    setTranscript,
    isListening,
    error,
    startListening,
    stopListening,
  };
};

export default useSpeechRecognition;
