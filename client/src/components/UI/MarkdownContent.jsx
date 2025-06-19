import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const MarkdownContent = ({ content }) => (
  <ReactMarkdown
    children={content}
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeRaw]}
    components={{
      h1: ({ node, ...props }) => (
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-green-700 my-6 sm:my-10" {...props} />
      ),
      h2: ({ node, ...props }) => (
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-blue-700 my-5 sm:my-8" {...props} />
      ),
      h3: ({ node, ...props }) => (
        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-purple-700 my-4 sm:my-6" {...props} />
      ),
      p: ({ node, ...props }) => (
        <p className="text-gray-900 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed my-4 sm:my-6" {...props} />
      ),
      ul: ({ node, ...props }) => (
        <ul className="list-disc list-inside text-blue-800 text-base sm:text-lg md:text-xl lg:text-2xl space-y-2 sm:space-y-3 my-4 sm:my-6" {...props} />
      ),
      ol: ({ node, ...props }) => (
        <ol className="list-decimal list-inside text-blue-800 text-base sm:text-lg md:text-xl lg:text-2xl space-y-2 sm:space-y-3 my-4 sm:my-6" {...props} />
      ),
      li: ({ node, ...props }) => {
        const isContest = typeof props.children?.[0] === 'string' && props.children[0].toLowerCase().includes('contest');
        return (
          <li
            className={`ml-4 sm:ml-6 ${isContest ? "bg-yellow-50 border-l-4 border-yellow-400 px-3 py-2 sm:px-4 rounded-md font-medium text-sm sm:text-lg" : ""}`}
            {...props}
          />
        );
      },
      strong: ({ node, ...props }) => (
        <strong className="font-bold text-black" {...props} />
      ),
      em: ({ node, ...props }) => (
        <em className="italic text-gray-700" {...props} />
      ),
      blockquote: ({ node, ...props }) => (
        <blockquote className="border-l-4 border-blue-500 pl-4 sm:pl-6 italic text-gray-700 bg-blue-50 rounded-lg text-lg sm:text-xl lg:text-2xl my-6 sm:my-8" {...props} />
      ),
      a: ({ node, ...props }) => (
        <a
          className="text-blue-600 underline hover:text-blue-800 break-words text-base sm:text-lg lg:text-2xl"
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        />
      ),
      table: ({ node, ...props }) => (
        <div className="overflow-x-auto my-6 sm:my-8">
          <table className="w-full border border-gray-300 text-sm sm:text-base md:text-lg lg:text-xl text-left text-gray-800 rounded-lg shadow-sm" {...props} />
        </div>
      ),
      thead: ({ node, ...props }) => (
        <thead className="bg-yellow-200 text-yellow-900 uppercase text-sm sm:text-base md:text-lg" {...props} />
      ),
      tbody: ({ node, ...props }) => <tbody {...props} />,
      tr: ({ node, ...props }) => (
        <tr className="odd:bg-white even:bg-yellow-50 border-b border-gray-200 hover:bg-yellow-100" {...props} />
      ),
      th: ({ node, ...props }) => (
        <th className="px-4 sm:px-6 py-3 font-bold border border-gray-300" {...props} />
      ),
      td: ({ node, ...props }) => (
        <td className="px-4 sm:px-6 py-3 border border-gray-300" {...props} />
      ),
    }}
  />
);

export default MarkdownContent;
