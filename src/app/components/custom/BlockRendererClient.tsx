'use client';

import React from 'react';
import Image from 'next/image';
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';
import Link from 'next/link';

const BlockRendererClient = ({ content }: { readonly content: BlocksContent }) => {
  if (!content || !Array.isArray(content)) {
    return <p>ไม่มีเนื้อหาที่จะแสดง</p>;
  }

  return (
    <BlocksRenderer
      content={content}
      blocks={{
        paragraph: (props) => <p className="mb-4 text-neutral-900">{props.children}</p>,
        quote: (props) => (
          <blockquote className="pl-4 border-l-[3px] border-gray-300 text-neutral-700">
            {props.children}
          </blockquote>
        ),
        code: (props) => (
          <pre className="p-4 bg-neutral-100 rounded-md">
            <code>{props.plainText}</code>
          </pre>
        ),
        heading: ({ level, children }) => {
          const headingClasses = [
            "text-3xl sm:text-4xl lg:text-5xl mb-4 text-neutral-900",
            "text-2xl sm:text-3xl lg:text-4xl mb-3 text-neutral-800",
            "text-xl sm:text-2xl lg:text-3xl mb-2 text-neutral-700",
            "text-lg sm:text-xl lg:text-2xl mb-2 text-neutral-600",
            "text-base sm:text-lg lg:text-xl mb-1 text-neutral-500",
            "text-sm sm:text-base lg:text-lg mb-1 text-neutral-400",
          ];

          return React.createElement(`h${level}`, { className: headingClasses[level - 1] }, children);
        },
        link: (props) => (
          <a href={props.url} className="text-blue-600 hover:text-blue-800 underline">
            {props.children}
          </a>
        ),
        list: (props) => {
          const listClass = props.format === 'ordered' ? 'list-decimal' : 'list-disc';
          return <ul className={`${listClass} ml-6 mb-4`}>{props.children}</ul>;
        },
        'list-item': (props) => <li className="mb-1">{props.children}</li>,
        image: (props) => (
          <div className="my-4 flex justify-center">
            <Image
              src={props.image.url}
              width={props.image.width}
              height={props.image.height}
              alt={props.image.alternativeText || ""}
              className="object-cover max-w-full h-auto"
            />
          </div>
        ),
      }}
      modifiers={{
        bold: (props) => <strong className="font-bold">{props.children}</strong>,
        italic: (props) => <em className="italic">{props.children}</em>,
        underline: (props) => <u className="underline">{props.children}</u>,
        strikethrough: (props) => <del className="line-through">{props.children}</del>,
        code: (props) => <code className="font-mono bg-neutral-100 p-1 rounded">{props.children}</code>,
      }}
    />
  );
};

export default BlockRendererClient;
