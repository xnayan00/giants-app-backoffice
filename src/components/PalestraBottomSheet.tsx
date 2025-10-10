import * as React from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';

interface PalestraBottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoUrl?: string;
  title?: string;
  description?: string;
}

const getEmbedUrl = (url: string | undefined): string | undefined => {
    if (!url) return undefined;
    let videoId = '';
    if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1];
    } else if (url.includes('watch?v=')) {
        videoId = url.split('watch?v=')[1];
    }

    const ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition !== -1) {
        videoId = videoId.substring(0, ampersandPosition);
    }

    if(videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
    }
    return undefined;
}


export function PalestraBottomSheet({
  open,
  onOpenChange,
  videoUrl,
  title,
  description,
}: PalestraBottomSheetProps) {

  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="p-4 max-w-4xl mx-auto w-full">
        {embedUrl && (
            <div className="aspect-video rounded-lg overflow-hidden">
                 <iframe
                    className="w-full h-full"
                    src={embedUrl}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        )}
        <DrawerHeader>
          {title && <DrawerTitle className="text-2xl">{title}</DrawerTitle>}
        </DrawerHeader>
        <div className="px-4">
            <p className="text-muted-foreground">{description}</p>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
