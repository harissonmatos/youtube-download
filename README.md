# API YouTube para MP3 - Alta Qualidade para Android

API simples para converter vídeos do YouTube para arquivos MP3 de alta qualidade, otimizados para dispositivos Android.

## Requisitos

Para execução local:
- Node.js (v16 ou superior)
- FFmpeg

Para execução com Docker:
- Docker
- Docker Compose

## Instalação e Execução

### Método 1: Execução local

1. Clone o repositório ou baixe os arquivos
2. Instale as dependências:
```
npm install
```
3. Inicie o servidor:
```
npm start
```
4. Acesse a API em http://localhost:3000

### Método 2: Execução com Docker Compose

1. Clone o repositório ou baixe os arquivos
2. Execute o Docker Compose:
```
docker-compose up -d
```
3. Acesse a API em http://localhost:3000

## Como usar

### Endpoint único

`GET /download?url=YOUTUBE_URL`

Substitua `YOUTUBE_URL` pela URL completa do vídeo do YouTube.

### Exemplo de uso

```
http://localhost:3000/download?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

### Especificações técnicas

O áudio é convertido com as seguintes configurações:
- Formato: MP3
- Bitrate: 320kbps (qualidade máxima)
- Canais: 2 (estéreo)
- Frequência de amostragem: 48kHz

## Observações

- Esta API é destinada apenas para uso pessoal e educacional.
- Respeite os direitos autorais e os termos de serviço do YouTube.
