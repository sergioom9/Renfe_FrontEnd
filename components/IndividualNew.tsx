import { useEffect, useState } from "preact/hooks";
import Loading from "../components/Loading.tsx";
import styles from "../assets/IndividualNew.module.css";

type New = {
  newid: string;
  title: string;
  image: string;
  content: string;
  date: string;
};

export default function IndividualNew() {
  const [uniquenew, setUniquenew] = useState<New | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const load = async () => {
      try {
        const path = globalThis.location?.pathname ?? "";
        const id = path.split("/").pop() ?? null;
        if (!id) {
          globalThis.location.replace("/news");
          return;
        }

        const res = await fetch("/api/news", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newid: id }),
        });

        if (!res.ok) {
          globalThis.location.replace("/news");
          return;
        }

        const data = await res.json();
        const newnew: New = {
            newid:data.newid,
            title: data.title,
            image: data.image,
            content: data.content,
            date: data.date
        }  
        if (!cancelled) setUniquenew(newnew);
      } catch (err) {
        console.error(err);
        if (!cancelled) globalThis.location.replace("/news");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <Loading />;
  if (uniquenew) {
    return (
      <div
            key={uniquenew.newid}
            className={styles.liquidglass2}
            style={{ cursor: "pointer" }}
          >
            <img src={uniquenew.image} alt={uniquenew.title} className={styles.newsImage} />
            <div>
              <h2 className={styles.sectionTitle}>📰 {uniquenew.title}</h2>
              <p className={styles.sectionText}>{uniquenew.content}</p>
              <p>📅 {uniquenew.date}</p>
            </div>
          </div>
    );
  }
}
