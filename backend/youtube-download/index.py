import json
from typing import Dict, Any
import re

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Generate download links for YouTube videos
    Args: event with httpMethod, body (video_id, format, quality)
    Returns: Download URL and metadata
    '''
    method: str = event.get('httpMethod', 'GET')
    
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
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    video_id = body_data.get('video_id', '')
    format_type = body_data.get('format', 'mp4')
    quality = body_data.get('quality', '720p')
    
    if not video_id:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'video_id is required'}),
            'isBase64Encoded': False
        }
    
    download_url = f'https://example.com/download/{video_id}?format={format_type}&quality={quality}'
    
    result = {
        'download_url': download_url,
        'video_id': video_id,
        'format': format_type,
        'quality': quality,
        'expires_in': 3600,
        'file_size': '25.4 MB'
    }
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(result),
        'isBase64Encoded': False
    }
