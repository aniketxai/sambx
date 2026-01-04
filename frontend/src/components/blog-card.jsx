import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export default function BlogCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
        <div className="relative h-48 overflow-hidden bg-muted">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <CardHeader>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {post.readTime}
            </div>
          </div>
          <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <Badge variant="outline">{post.category}</Badge>
            <span className="text-sm text-primary flex items-center group-hover:gap-2 transition-all">
              Read More
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
