/** @jsx h */
import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";

interface ScrollAnimationProps {
  frameCount: number;
  folder: string;
}

export default function ScrollAnimation({ frameCount, folder }: ScrollAnimationProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollFraction = scrollTop / maxScroll;
      const frameIndex = Math.min(frameCount - 1, Math.floor(scrollFraction * frameCount));
      setFrame(frameIndex);
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [frameCount]);

  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
      <img
        ref={imgRef}
        src={`${folder}/frame_${frame}.png`}
        alt="scroll animation"
        style={{ width: "100%", display: "block" }}
      />
    </div>
  );
}
