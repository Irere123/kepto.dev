import { format } from "date-fns";
import { MarketingLayout } from "~/ui/layouts/MarketingLayout";

interface TimelineProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

interface ArticleProps {
  publishedAt: string;
  imageSrc: string;
  title: string;
  children: React.ReactNode;
  href: string;
}

function Timeline({ title, description, children }: TimelineProps) {
  return (
    <div className="grid gap-8">
      <div className="grid gap-4 md:grid-cols-5 md:gap-8">
        <div className="md:col-span-1" />
        <div className="grid gap-4 md:col-span-4">
          <h1 className="text-foreground font-cal text-4xl">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function Article({
  publishedAt,
  imageSrc,
  title,
  children,
  href,
}: ArticleProps) {
  return (
    <article className="grid grid-cols-1 gap-4 md:grid-cols-5 md:gap-6">
      <div className="relative row-span-2">
        <div className="sticky top-2">
          <time className="text-muted-foreground order-2 font-mono text-sm md:order-1 md:col-span-1">
            {format(new Date(publishedAt), "LLL dd, y")}
          </time>
        </div>
      </div>

      <div className="order-3 grid grid-cols-1 gap-4 md:col-span-4 md:col-start-2">
        <h2 className="text-foreground font-cal text-2xl">{title}</h2>
        {children}
      </div>
    </article>
  );
}

Timeline.Article = Article;

const changeLogs = [
  {
    title: "Initial start",
    publishedAt: new Date().toDateString(),
    image: "",
    slug: "This is new",
    content: "This is the initial beginning of kepto so stay tuned for more",
  },
];

export default function ChangelogPage() {
  return (
    <MarketingLayout>
      <Timeline
        title="Changelog"
        description="All the latest features, fixes and work to Kepto."
      >
        {changeLogs.map((post) => (
          <Timeline.Article
            key={post.slug}
            publishedAt={post.publishedAt}
            imageSrc={post.image}
            title={post.title}
            href={`./changelog/${post.slug}`}
          >
            <p>{post.content}</p>
          </Timeline.Article>
        ))}
      </Timeline>
    </MarketingLayout>
  );
}
