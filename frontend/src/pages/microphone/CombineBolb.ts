export async function combineBlobsToAudio(blobArray: Blob[]): Promise<Blob | null> {
    if (blobArray.length === 0) {
      return null;
    }
  
    try {
      const audioContext = new AudioContext();
      const audioBuffers: AudioBuffer[] = [];
  
      for (const blob of blobArray) {
        const arrayBuffer = await blob.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        audioBuffers.push(audioBuffer);
      }
  
      const totalDuration = audioBuffers.reduce((total, buffer) => total + buffer.duration, 0);
      const outputBuffer = audioContext.createBuffer(
        audioBuffers[0].numberOfChannels,
        audioContext.sampleRate * totalDuration,
        audioBuffers[0].sampleRate
      );
  
      let offset = 0;
      for (const audioBuffer of audioBuffers) {
        for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
          const inputChannel = audioBuffer.getChannelData(channel);
          const outputChannel = outputBuffer.getChannelData(channel);
          outputChannel.set(inputChannel, offset);
        }
        offset += audioBuffer.length;
      }
  
      const outputArrayBuffer = outputBuffer.getChannelData(0).buffer;
      const audioBlob = new Blob([outputArrayBuffer], { type: 'audio/wav' }); // Change the type as needed
  
      return audioBlob;
    } catch (error) {
      console.error("Error combining audio:", error);
      return null;
    }
  }


  
//   // Example usage:
// const audioBlobArray: Blob[] = /* Your array of Blob objects */;
// combineBlobsToAudio(audioBlobArray).then((combinedAudioBlob) => {
//   if (combinedAudioBlob) {
//     // Save or use the combined audio Blob
//     // You can use the `saveCombinedAudioBlob` function here to save the Blob to a file or perform other actions.
//   }
// });
// In this code, we create an AudioContext, decode the Blobs into audio buffers, concatenate the audio data, and then convert the final audio buffer back to a Blob with the desired audio type. You may need to adjust the audio type based on your specific requirements (e.g., 'audio/mpeg', 'audio/wav', 'audio/ogg', etc.).

// Make sure to handle error cases and adapt the code to your specific use case as needed.






  

  