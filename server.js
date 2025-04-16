// server.js - API simples para streaming de YouTube para MP3 otimizado para Android
const express = require('express');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');

const app = express();
const PORT = process.env.PORT || 3000;

// Rota única que recebe a URL do YouTube e faz streaming do áudio otimizado para Android
app.get('/download', async (req, res) => {
  const videoUrl = req.query.url;
  
  if (!videoUrl) {
    return res.status(400).send('URL não fornecida. Use ?url=YOUTUBE_URL');
  }
  
  try {
    // Verificar se é uma URL válida do YouTube
    if (!ytdl.validateURL(videoUrl)) {
      return res.status(400).send('URL do YouTube inválida');
    }
    
    // Obter informações do vídeo
    const info = await ytdl.getInfo(videoUrl);
    const videoTitle = info.videoDetails.title;
    
    // Limpar o título para uso como nome de arquivo
    const sanitizedTitle = videoTitle.replace(/[^\w\s]/gi, '').replace(/\s+/g, '_');
    
    // Configurar cabeçalhos da resposta para download
    res.header('Content-Disposition', `attachment; filename="${sanitizedTitle}.mp3"`);
    res.header('Content-Type', 'audio/mpeg');
    
    // Stream do áudio do YouTube com a melhor qualidade disponível
    const audioStream = ytdl(videoUrl, {
      quality: 'highestaudio',
      filter: 'audioonly'
    });
    
    // Usar ffmpeg para converter para MP3 com configurações otimizadas para Android
    ffmpeg(audioStream)
      .audioCodec('libmp3lame')
      .audioBitrate(320) // Bitrate mais alto para melhor qualidade
      .audioChannels(2)  // Estéreo
      .audioFrequency(48000) // Frequência de amostragem de 48kHz
      .format('mp3')
      .outputOptions([
        '-qscale:a 0', // Qualidade de codec de áudio máxima
        '-compression_level 0' // Sem compressão adicional
      ])
      .on('error', (err) => {
        console.error('Erro na conversão:', err);
        if (!res.headersSent) {
          res.status(500).send('Erro ao converter o vídeo');
        }
      })
      .pipe(res, { end: true });
      
  } catch (error) {
    console.error('Erro:', error);
    if (!res.headersSent) {
      res.status(500).send('Erro ao processar o vídeo');
    }
  }
});

// Rota inicial com instruções básicas em formato de texto simples
app.get('/', (req, res) => {
  res.header('Content-Type', 'text/plain');
  res.send(`YouTube para MP3 - API Simples (Alta Qualidade)

Para baixar um áudio do YouTube em alta qualidade (320kbps), acesse:
/download?url=YOUTUBE_URL

Substitua YOUTUBE_URL pelo link do vídeo no YouTube.
Exemplo: /download?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ

O arquivo será baixado em formato MP3 otimizado para Android.`);
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
