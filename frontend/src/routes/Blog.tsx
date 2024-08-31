import BlogCard from "@/components/custom/BlogCard"


function Blog() {
  return (
    <BlogCard authername={"Indrajit"} title={"Separate Backend Project for API Routes: In a traditional React project, you often need to maintain a separate backend project for handling API routes and server-side logic. Next.js provides a built-in API routes feature, allowing you to handle API requests directly within your Next.js application."} 
    content={"Search engines like Google and Bing use web crawlers (also known as bots or spiders) to discover and index websites. These crawlers visit websites and analyze the HTML content to understand what the website is about and how to rank it in search results. applications pose a challenge for SEO because the crawlers typically don't execute JavaScript and render the page to see the final output. Instead, they rely on the initial HTML response received from the server."} publishedDate={"2/07/24"} />
  )
}

export default Blog