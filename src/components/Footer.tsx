export default function Footer() {
  return (
    <footer className="bg-black py-8 border-t-4 border-gray-800">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-gray-500 font-[family-name:var(--font-pixel)] text-[10px]">
          &copy; 2026 Yushi Chiba. All Rights Reserved.
        </div>
        <div className="flex gap-4">
          <a
            href="https://x.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            X (Twitter)
          </a>
          <a
            href="https://note.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            Note
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/UC5454"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
