"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

export default function ProjectsGrid({ projects }: { projects: any[] }) {
  const [visibleCount, setVisibleCount] = useState(6);

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center p-12 bg-zinc-900/30 rounded-2xl border border-zinc-800 border-dashed">
        <p className="text-gray-400">No projects added yet. Add them in the Sanity Studio.</p>
      </div>
    );
  }

  const visibleProjects = projects.slice(0, visibleCount);

  return (
    <div className="space-y-12">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleProjects.map((project: any) => (
          <div key={project._id} className="group flex flex-col bg-zinc-900/50 rounded-2xl overflow-hidden border border-zinc-800 hover:border-rose-600/50 transition-all duration-300">
            {project.image && (
              <div className="relative aspect-video w-full overflow-hidden">
                <Image 
                  src={urlFor(project.image).width(800).url()} 
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              {project.description && (
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>
              )}
              {project.techStack && project.techStack.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-zinc-800 text-xs rounded-full text-zinc-300">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-auto pt-4 border-t border-zinc-800/50">
                {project.url ? (
                  <Link 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-rose-500 hover:text-rose-400 font-semibold transition-colors"
                  >
                    Visit Website <ExternalLink className="w-4 h-4" />
                  </Link>
                ) : (
                  <span className="text-sm text-zinc-500">No link available</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < projects.length && (
        <div className="flex justify-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="px-8 py-3 bg-zinc-800 hover:bg-rose-600 text-white font-bold rounded-full transition-colors duration-300"
          >
            Load More Projects
          </button>
        </div>
      )}
    </div>
  );
}
