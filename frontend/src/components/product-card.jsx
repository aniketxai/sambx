import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ArrowRight, ShoppingCart ,Zap,CreditCard} from "lucide-react";

export default function ProductCard({ product }) {
  const statusStyles = {
    Available: "bg-green-500/10 text-green-500 border-green-500/20",
    Prototype: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    "In Development": "bg-blue-500/10 text-blue-500 border-blue-500/20",
  };

  return (
    <Card className="group flex flex-col h-full overflow-hidden rounded-xl transition-all hover:-translate-y-1 hover:shadow-lg">
      {/* IMAGE */}
      <Link href={`/products/${product.slug}`}>
        <div className="relative h-44 bg-muted overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <Badge
            className={`absolute top-3 right-3 text-xs ${statusStyles[product.status]}`}
          >
            {product.status}
          </Badge>
        </div>
      </Link>

      {/* HEADER */}
      <CardHeader className="pb-1">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm sm:text-base font-semibold leading-snug line-clamp-2 min-h-[40px] hover:text-primary transition">
            {product.name}
          </h3>
        </Link>
      </CardHeader>

      {/* CONTENT */}
      <CardContent className="pb-3 flex-1">
        <p className="hidden md:block text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
          {product.description}
        </p>

        {product.status === "Available" && (
          <p className="mt-2 text-lg font-bold text-primary">
            ₹{product.price}
          </p>
        )}
      </CardContent>

      {/* FOOTER – ALWAYS ALIGNED */}
      <CardFooter className="pt-0">
        {product.status === "Available" ? (
          <div className="w-full">
            {/* MOBILE */}
             <Link href={`/order/${product.slug}`} className="flex-1">
            <Button className="w-full h-10 sm:hidden">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Buy Now
            </Button>
            </Link>

            {/* DESKTOP */}
            <div className="hidden sm:flex gap-2">
                <Link href={`/order/${product.slug}`} className="flex-1">
              <Button className="flex-1 h-10">
                <Zap className="h-4 w-4 mr-2" />
                Buy Now
              </Button>
              </Link>


              <Link href={`/products/${product.slug}`} className="flex-1">
                <Button variant="outline" className="w-full h-10">
                  View
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <Link href="/contact" className="w-full">
            <Button variant="outline" className="w-full h-10">
              Contact for Demo
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
