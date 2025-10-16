import { useEffect, useRef, useState } from "react";
import styles from "./ScrollAnimation.module.css";

type News = {
  newid: string;
  title: string;
  image: string;
  content: string;
  date: string;
};

export default function ScrollVideoAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [frames, setFrames] = useState<HTMLImageElement[]>([]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    const loadFrames = async () => {
      try {
        const frameCount = 98;
        const frameUrls = [];

        for (let i = 0; i < frameCount; i++) {
          const frameNum = String(i).padStart(2, "0");
          frameUrls.push(`/frames/frame_${frameNum}_delay-0.01s.png`);
        }

        const loadedFrames: HTMLImageElement[] = [];
        let loaded = 0;
        let errors = 0;

        return new Promise<void>((resolveAll) => {
          frameUrls.forEach((url, index) => {
            const img = new Image();
            img.src = url;
            
            const onComplete = () => {
              loaded++;
              if (loaded + errors === frameUrls.length) {
                if (loadedFrames.length > 0) {
                  setFrames(loadedFrames);
                }
                resolveAll();
              }
            };

            img.onload = () => {
              loadedFrames[index] = img;
              onComplete();
            };
            
            img.onerror = () => {
              errors++;
              onComplete();
            };
          });
        });
      } catch (error) {
        console.error("Error loading frames:", error);
      }
    };

    const fetchNews = async () => {
      try {
        const headers = new Headers();
        const response = await fetch(
          "https://backend-renfe-m9dxh79ttmmg.sergioom9.deno.net/news",
          { headers },
        );
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        const formattedNews = data.map((item: News) => ({
          newid: item.newid,
          title: item.title,
          image: item.image,
          content: item.content,
          date: item.date,
        }));
        setNews(formattedNews);
      } catch (error) {
        console.error("Error fetching news:", error);
        setNews([]);
      }
    };

    const initializeData = async () => {
      setLoading(true);
      await loadFrames();
      await fetchNews();
      setLoading(false);
    };

    initializeData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (frames.length === 0) return;

      const scrollHeight = document.documentElement.scrollHeight -
        globalThis.innerHeight;
      const scrolled = globalThis.scrollY;
      const scrollProgress = scrolled / scrollHeight;

      const frameIndex = Math.min(
        frames.length - 1,
        Math.floor(scrollProgress * frames.length),
      );

      setCurrentFrame(frameIndex);
    };

    globalThis.addEventListener("scroll", handleScroll, { passive: true });
    return () => globalThis.removeEventListener("scroll", handleScroll);
  }, [frames]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <div className="loader">
            <div className="inner one"></div>
            <div className="inner two"></div>
            <div className="inner three"></div>
          </div>
        </div>
      </div>
    );
  }

  if (frames.length === 0) {
    return (
      <div
      ref={containerRef}
      className={styles.container}
      style={{
        backgroundImage: frames[currentFrame]
          ? `url(${frames[currentFrame].src})`
          : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <p className={styles.loadingText}>
            No frames found
          </p>
        </div>
      </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={styles.container}
      style={{
        backgroundImage: frames[currentFrame]
          ? `url(${frames[currentFrame].src})`
          : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className={styles.contentWrapper}>
        {news.length > 0
          ? (
            <div className={styles.newsSection}>
              <div className={styles.contentSection}>
                <div className={styles.glassBox}>
                  <h1>NOTICIAS</h1>
                </div>
              </div>
              {news.map((item: News) => (
                <div key={item.newid} className={styles.contentSection}>
                  <div className={styles.glassBox}>
                    <div>
                      <img
                        src={item.image}
                        alt={item.title}
                        className={styles.newsImage}
                      />
                    </div>
                    <div>
                      <h2 className={styles.sectionTitle}>{item.title}</h2>
                      <p className={styles.sectionText}>
                        {item.content}
                      </p>
                      <p>{item.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
          : (
            <div className="loader" style="margin-top: 20px;">
              <div className="inner one"></div>
              <div className="inner two"></div>
              <div className="inner three"></div>
            </div>
          )}
      </div>
    </div>
  );
}