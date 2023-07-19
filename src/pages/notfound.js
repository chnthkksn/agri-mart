import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container mx-auto py-10 h-screen">
      <h1 className="text-4xl font-bold mb-5">404 Not Found</h1>
      <p className="mb-5">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="underline hover:text-blue-500">Return to Home</Link>
    </div>
  );
}

export default NotFound;