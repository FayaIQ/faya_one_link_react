'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';

export default function Dashboard() {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    const { data, error } = await supabase.storage
      .from('images')
      .list('', { limit: 100, offset: 0, sortBy: { column: 'name', order: 'desc' } });
    if (error) {
      console.error('Error loading images', error);
    } else {
      const urls = data.map((file) =>
        supabase.storage.from('images').getPublicUrl(file.name).data.publicUrl,
      );
      setImages(urls);
    }
  }

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const { error } = await supabase.storage
      .from('images')
      .upload(`${Date.now()}_${file.name}`, file);
    setUploading(false);
    if (error) {
      alert('حدث خطأ أثناء الرفع');
    } else {
      fetchImages();
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">لوحة التحكم</h1>
      <input type="file" onChange={handleUpload} disabled={uploading} className="mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((url, idx) => (
          <div key={idx} className="relative w-full h-48 rounded overflow-hidden">
            <Image src={url} alt={`img-${idx}`} fill className="object-cover" unoptimized />
          </div>
        ))}
      </div>
    </div>
  );
}
