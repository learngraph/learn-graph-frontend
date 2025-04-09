export interface YoutubeVideoProps {
  videoID: string;
}

export default function YoutubeVideo(props: YoutubeVideoProps) {
  return (
    <div className="w-full p-6 flex justify-center">
      <div className="w-full max-w-4xl aspect-video bg-black/60 rounded-lg shadow-xl overflow-hidden">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${props.videoID}?autoplay=1&mute=1&rel=0&modestbranding=1&controls=0&showinfo=0`}
          title="Video Explanation"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
