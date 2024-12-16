import NewsList from "@/components/news/news-list";
import { getAllNews } from "@/lib/news";

export default async function NewsPage() {
  const news = await getAllNews();

  return (
    <div id="news">
      <h1>News Page List</h1>
      <NewsList news={news}/>
    </div>
  );
}
