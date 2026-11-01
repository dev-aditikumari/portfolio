import type { Project } from "./types";

// Add a new project by appending an object to this array.
export const projects: Project[] = [
  {
    slug: "skillora",
    name: "Skillora",
    summary:
      "A full-stack learning platform with student, instructor and admin roles.",
    stack: ["React", "Redux Toolkit", "Tailwind CSS", "Node.js", "Express", "MongoDB", "JWT", "Cloudinary", "Razorpay"],
    liveUrl: "https://skillora-flame.vercel.app",
    codeUrl: "https://github.com/dev-aditikumari/Skillora",
  },
  {
    slug: "nextmeet",
    name: "NextMeet",
    summary:
      "Real-time video meetings built with WebRTC and Socket.IO. It has rooms, chat, screen sharing, raise hand and reconnection logic.",
    stack: ["WebRTC", "Socket.IO"],
    features: ["Rooms", "Chat", "Screen sharing", "Raise hand", "Reconnection logic"],
    liveUrl: "https://nextmeet.vercel.app",
    codeUrl: "https://github.com/dev-aditikumari/Nextmeet",
  },
  {
    slug: "shopper",
    name: "Shopper",
    summary:
      "A MERN clothing store with products, JWT accounts, a saved cart, promo codes and orders.",
    stack: ["MongoDB", "Express", "React", "Node.js", "JWT"],
    codeUrl: "https://github.com/dev-aditikumari/E-commerce-website",
  },
];
