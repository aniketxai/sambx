'use client';

import { useParams } from 'next/navigation';
import { blogPosts } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, User, ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';

export default function BlogPostPage() {
  const params = useParams();
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <article>
        <div className="relative h-[400px] md:h-[500px] bg-muted overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
          <div className="bg-background/95 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-border">
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>

            <Badge className="mb-4">{post.category}</Badge>

            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <div className="flex gap-2 mb-8">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>

            <Separator className="mb-8" />

            <div className="prose prose-neutral dark:prose-invert max-w-none">
              {post.content.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('# ')) {
                  return (
                    <h1 key={index} className="text-4xl font-bold mt-12 mb-6">
                      {paragraph.replace('# ', '')}
                    </h1>
                  );
                } else if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-3xl font-bold mt-10 mb-4">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                } else if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-2xl font-bold mt-8 mb-3">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                } else if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return (
                    <p key={index} className="font-bold text-lg mb-4">
                      {paragraph.replace(/\*\*/g, '')}
                    </p>
                  );
                } else if (paragraph.match(/^\d+\./)) {
                  return (
                    <p key={index} className="mb-3 ml-6">
                      {paragraph}
                    </p>
                  );
                } else if (paragraph.startsWith('- ')) {
                  return (
                    <p key={index} className="mb-2 ml-6">
                      {paragraph}
                    </p>
                  );
                } else if (paragraph.trim() === '') {
                  return <div key={index} className="h-4" />;
                } else {
                  return (
                    <p key={index} className="text-lg leading-relaxed mb-6">
                      {paragraph}
                    </p>
                  );
                }
              })}
            </div>
          </div>

          <div className="mt-12 p-8 rounded-2xl bg-muted/50">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-300" />
              <div>
                <h3 className="text-xl font-bold mb-1">{post.author}</h3>
                <p className="text-muted-foreground">
                  AI/ML Engineer & Founder of SAMBX
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 mb-20">
            <h2 className="text-2xl font-bold mb-6">Continue Reading</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts
                .filter((p) => p.id !== post.id)
                .slice(0, 2)
                .map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="group"
                  >
                    <div className="rounded-xl overflow-hidden bg-card border border-border hover:shadow-lg transition-all">
                      <div className="h-48 overflow-hidden bg-muted">
                        <img
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <Badge className="mb-2">{relatedPost.category}</Badge>
                        <h3 className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-2">
                          {relatedPost.readTime}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
