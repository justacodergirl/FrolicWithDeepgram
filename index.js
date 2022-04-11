const { Deepgram } = require('@deepgram/sdk');


const deepgramApiKey = 'API KEY';


const pathToFile = 'Bueller-Life-moves-pretty-fast.wav';


const deepgram = new Deepgram(deepgramApiKey);


const deepgramSocket = deepgram.transcription.live({ punctuate: true });


deepgramSocket.addListener('open', () => {
  console.log('Connection Opened!');

 
  const fs = require('fs');
  const contents = fs.readFileSync(pathToFile);

  const chunk_size = 1000;
  for (i = 0; i < contents.length; i+= chunk_size) {
    const slice = contents.slice(i, i + chunk_size);
    deepgramSocket.send(slice);
  }


  deepgramSocket.finish();
});


deepgramSocket.addListener('close', () => {
  console.log('Connection closed.');
})

deepgramSocket.addListener('transcriptReceived', (transcription) => {
  console.dir(transcription, { depth: null });
});