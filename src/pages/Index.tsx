import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

export default function Index() {
  const [videoUrl, setVideoUrl] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (videoUrl.trim()) {
      setShowPreview(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0F0F] via-[#1a1a1a] to-[#0F0F0F]">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <header className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon name="Youtube" size={48} className="text-primary" />
            <h1 className="text-5xl font-black bg-gradient-to-r from-primary via-red-600 to-primary bg-clip-text text-transparent">
              YTDownloader
            </h1>
          </div>
          <p className="text-xl text-muted-foreground font-light">
            Скачивайте видео и музыку с YouTube в высоком качестве
          </p>
        </header>

        <Card className="p-8 mb-8 bg-card/50 backdrop-blur-sm border-border/50 shadow-2xl animate-scale-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Icon name="Link" size={20} />
              </div>
              <Input
                type="text"
                placeholder="Вставьте ссылку на YouTube видео..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="pl-12 h-14 text-lg bg-muted/50 border-border/50 focus:border-primary transition-all"
              />
            </div>
            <Button 
              type="submit" 
              size="lg" 
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-red-600 hover:from-red-600 hover:to-primary transition-all duration-300 shadow-lg hover:shadow-primary/50"
            >
              <Icon name="Download" size={24} className="mr-2" />
              Получить видео
            </Button>
          </form>
        </Card>

        {showPreview && (
          <Card className="p-6 mb-8 bg-card/50 backdrop-blur-sm border-border/50 shadow-2xl animate-fade-in">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3 relative group">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <img 
                    src="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" 
                    alt="Video thumbnail"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Icon name="PlayCircle" size={64} className="text-white" />
                  </div>
                </div>
                <Badge className="absolute top-2 right-2 bg-black/80 text-white border-none">
                  10:24
                </Badge>
              </div>
              
              <div className="md:w-2/3 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Awesome Video Title Goes Here</h3>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="User" size={16} />
                    <span>Channel Name</span>
                    <span className="mx-2">•</span>
                    <span>1.2M просмотров</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-semibold text-foreground/80">Выберите формат:</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button 
                      variant="outline" 
                      className="h-auto py-4 flex flex-col items-start gap-2 bg-muted/50 hover:bg-primary/10 hover:border-primary transition-all group"
                    >
                      <div className="flex items-center gap-2 w-full">
                        <Icon name="Video" size={20} className="text-primary" />
                        <span className="font-semibold">MP4 Video</span>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant="secondary" className="text-xs">1080p</Badge>
                        <Badge variant="secondary" className="text-xs">720p</Badge>
                        <Badge variant="secondary" className="text-xs">480p</Badge>
                      </div>
                    </Button>

                    <Button 
                      variant="outline" 
                      className="h-auto py-4 flex flex-col items-start gap-2 bg-muted/50 hover:bg-primary/10 hover:border-primary transition-all group"
                    >
                      <div className="flex items-center gap-2 w-full">
                        <Icon name="Music" size={20} className="text-primary" />
                        <span className="font-semibold">MP3 Audio</span>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant="secondary" className="text-xs">320kbps</Badge>
                        <Badge variant="secondary" className="text-xs">128kbps</Badge>
                      </div>
                    </Button>
                  </div>

                  <Button 
                    size="lg"
                    className="w-full mt-4 h-12 bg-primary hover:bg-primary/90 font-semibold shadow-lg hover:shadow-primary/30 transition-all"
                  >
                    <Icon name="Download" size={20} className="mr-2" />
                    Скачать сейчас
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        <Card className="p-8 bg-gradient-to-br from-primary/10 to-red-600/10 border-primary/20 backdrop-blur-sm shadow-2xl animate-fade-in">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
              <Icon name="Smartphone" size={32} className="text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Скачайте Android приложение</h2>
            <p className="text-muted-foreground">Загружайте видео прямо с телефона — быстро и удобно</p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <div className="w-48 h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                <span className="text-gray-600 font-bold text-lg">QR CODE</span>
              </div>
              <p className="text-center mt-3 text-sm text-gray-600 font-medium">Отсканируйте для скачивания</p>
            </div>

            <div className="space-y-4 max-w-md">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <Icon name="Zap" size={16} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Быстрая загрузка</h4>
                  <p className="text-sm text-muted-foreground">Скачивайте видео за секунды</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <Icon name="Sparkles" size={16} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">HD качество</h4>
                  <p className="text-sm text-muted-foreground">До 1080p и 320kbps аудио</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <Icon name="Shield" size={16} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Безопасно</h4>
                  <p className="text-sm text-muted-foreground">Без рекламы и вирусов</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <footer className="mt-12 text-center text-muted-foreground text-sm">
          <p>© 2024 YTDownloader. Скачивайте ответственно и уважайте авторские права.</p>
        </footer>
      </div>
    </div>
  );
}
