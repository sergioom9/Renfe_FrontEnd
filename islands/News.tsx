import { useEffect, useState } from "preact/hooks";
import Loading from "../components/Loading.tsx";
import News from "../components/News.tsx";

 type News = {
  newid: string;
  title: string;
  image: string;
  content: string;
  date: string;
};

export default function ScrollVideoAnimation() {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const headers = new Headers();
        const response = await fetch(
          "https://backend-renfe-gzndx3pdbzpw.sergioom9.deno.net/news",
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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setNews([]);
        setLoading(false);
      }
    };

    const initializeData = async () => {
      await fetchNews();
    };

    setLoading(true);
    initializeData();
    setLoading(false);
  }, []);

   if (loading) {
    return (
      <Loading />
    );
  }
  return (
    <News news={news} />
  );
}