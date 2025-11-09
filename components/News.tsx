import styles from "../assets/News.module.css";
import Loading from "./Loading.tsx";
import NewsCard from "./New.tsx";
import { useState,useEffect } from "preact/hooks";

type News = {
  newid: string;
  title: string;
  image: string;
  content: string;
  date: string;
};


const NewsPage = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  
  async function fetchNews (){
    const res = await fetch("/api/news")
    if(res.ok){
    const data = await res.json();
        const formattedNews = data.map((item: News) => ({
          newid: item.newid,
          title: item.title,
          image: item.image,
          content: item.content,
          date: item.date,
        }));
        setNews(formattedNews);
        setLoading(false);
    } else {
        setNews([]);
        setLoading(false);
    }
  }
  
  useEffect(() => {
    setLoading(true);
    fetchNews();
    setLoading(false);
  }, []);
  if(loading){
    return(
      <Loading />
    )
  }else{
  return (
    <>
      {news?.length > 0 ? (
        <div className={styles.maincontent}>
          <div className={styles.liquidglass2}>
            <h1 style="margin-left: 40%;">🎭 NOTICIAS 🎭</h1>
          </div>
          {news.map((item: News) => (
            <NewsCard key={item.newid}  item={item} />
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
};

export default NewsPage;