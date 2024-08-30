import { Button } from "@/components/ui/button"
import blogHeroCover from '../assets/blog-heroCover.jpg';
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="w-full h-screen py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4 text-primary-foreground">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Discover the Latest Insights
              </h1>
              <p className="max-w-[600px] text-primary-foreground/80 md:text-xl">
                Explore a diverse range of thought-provoking blogs and connect with like-minded individuals.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <div className="flex gap-2">
                <Link to='/signup'>
                  <Button
                    type="submit"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-foreground"
                  >
                    Sign Up
                  </Button>
                </Link>
                
                <Link to='/signin'>
                  <Button
                    type="submit"
                    
                    className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-foreground"
                  >
                    Sign In
                  </Button>
                </Link>
                
              </div>
            </div>
          </div>
          <img
            src={blogHeroCover}
            width="550"
            height="550"
            alt="Hero"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
          />
        </div>
      </div>
    </section>
  )
}