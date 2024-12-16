import { DUMMY_NEWS } from "@/dummy-news";
import NewsList from "@/components/news/news-list";

export default function NewsPage() {
  return (
    <div id="news">
      <h1>News Page List</h1>
      <NewsList news={DUMMY_NEWS}/>
    </div>
  );
}
