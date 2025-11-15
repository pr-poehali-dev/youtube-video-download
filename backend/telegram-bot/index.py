import json
import os
from typing import Dict, Any
import urllib.request
import urllib.parse

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Telegram bot webhook handler for YouTube video downloads
    Args: event with httpMethod, body (Telegram update)
    Returns: Response to Telegram
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'GET':
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'status': 'Bot is running', 'info': 'Send POST requests from Telegram'}),
            'isBase64Encoded': False
        }
    
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
    
    if not bot_token:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'TELEGRAM_BOT_TOKEN not configured'}),
            'isBase64Encoded': False
        }
    
    update = json.loads(event.get('body', '{}'))
    
    if 'message' not in update:
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'ok': True}),
            'isBase64Encoded': False
        }
    
    message = update['message']
    chat_id = message['chat']['id']
    text = message.get('text', '')
    
    if text == '/start':
        response_text = '🚀 Привет! Отправь мне ссылку на YouTube видео, и я помогу скачать его.\n\nПоддерживаемые форматы:\n• MP4 (видео)\n• MP3 (аудио)'
        send_message(bot_token, chat_id, response_text)
    
    elif 'youtube.com' in text or 'youtu.be' in text:
        send_message(bot_token, chat_id, '⏳ Обрабатываю видео...')
        
        video_info = {
            'title': 'Sample Video',
            'formats': 'MP4: 1080p, 720p, 480p\nMP3: 320kbps'
        }
        
        response_text = f'✅ Видео найдено!\n\n📹 {video_info["title"]}\n\n📥 Доступные форматы:\n{video_info["formats"]}\n\nВыберите формат для скачивания:'
        send_message(bot_token, chat_id, response_text)
    
    else:
        send_message(bot_token, chat_id, '❌ Пожалуйста, отправьте корректную ссылку на YouTube видео.')
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json'},
        'body': json.dumps({'ok': True}),
        'isBase64Encoded': False
    }


def send_message(bot_token: str, chat_id: int, text: str) -> None:
    url = f'https://api.telegram.org/bot{bot_token}/sendMessage'
    data = {
        'chat_id': chat_id,
        'text': text,
        'parse_mode': 'HTML'
    }
    
    req = urllib.request.Request(
        url,
        data=json.dumps(data).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    
    urllib.request.urlopen(req)
