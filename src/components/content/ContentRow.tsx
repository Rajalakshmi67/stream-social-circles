
import React from 'react';
import { ContentItem } from '@/types';
import ContentCard from './ContentCard';

interface ContentRowProps {
  title: string;
  items: ContentItem[];
  onShareContent?: (item: ContentItem) => void;
}

const ContentRow: React.FC<ContentRowProps> = ({ title, items, onShareContent }) => {
  return (
    <div className="my-8">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">{title}</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {items.map((item) => (
          <ContentCard key={item.id} item={item} onShare={onShareContent} />
        ))}
      </div>
    </div>
  );
};

export default ContentRow;
