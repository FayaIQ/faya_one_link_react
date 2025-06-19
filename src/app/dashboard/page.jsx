'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';

export default function Dashboard() {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

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
      const items = data.map((file) => ({
        name: file.name,
        url: supabase.storage.from('images').getPublicUrl(file.name).data.publicUrl,
        selected: false,
      }));
      setImages(items);
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

  function toggleSelect(idx) {
    const updated = images.map((img, i) =>
      i === idx ? { ...img, selected: !img.selected } : img,
    );
    setImages(updated);
  }

  function handleSelectAll() {
    const next = !selectAll;
    setSelectAll(next);
    setImages(images.map((img) => ({ ...img, selected: next })));
  }

  async function deleteImage(name) {
    const { error } = await supabase.storage.from('images').remove([name]);
    if (!error) {
      fetchImages();
    } else {
      console.error('delete error', error);
    }
  }

  async function deleteSelected() {
    const names = images.filter((i) => i.selected).map((i) => i.name);
    if (names.length === 0) return;
    const { error } = await supabase.storage.from('images').remove(names);
    if (!error) {
      fetchImages();
    } else {
      console.error('bulk delete error', error);
    }
  }

  async function handleReplace(name, file) {
    if (!file) return;
    const { error } = await supabase.storage
      .from('images')
      .upload(name, file, { upsert: true });
    if (error) {
      alert('حدث خطأ أثناء التعديل');
    } else {
      fetchImages();
    }
  }

  return (
    <div className="p-8 space-y-6 bg-white text-slate-800">
      <h1 className="text-2xl font-bold">لوحة التحكم</h1>
      <div className="flex flex-wrap items-center gap-4">
        <input
          id="upload-input"
          type="file"
          onChange={handleUpload}
          disabled={uploading}
          className="hidden"
        />
        <label
          htmlFor="upload-input"
          className="cursor-pointer rounded bg-indigo-600 px-4 py-2 text-white shadow hover:bg-indigo-700 transition"
        >
          {uploading ? 'جارٍ الرفع...' : 'رفع صورة'}
        </label>
        {images.length > 0 && (
          <>
            <button
              onClick={handleSelectAll}
              className="rounded bg-gray-200 px-4 py-2 shadow"
            >
              {selectAll ? 'إلغاء تحديد الكل' : 'تحديد الكل'}
            </button>
            <button
              onClick={deleteSelected}
              disabled={!images.some((img) => img.selected)}
              className="rounded bg-red-500 px-4 py-2 text-white shadow disabled:opacity-50"
            >
              حذف المحدد
            </button>
          </>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img, idx) => (
          <div key={img.name} className="relative rounded-lg overflow-hidden shadow border bg-white">
            <input
              type="checkbox"
              className="absolute top-2 right-2 w-4 h-4"
              checked={img.selected}
              onChange={() => toggleSelect(idx)}
            />
            <Image src={img.url} alt={img.name} width={400} height={200} className="w-full h-48 object-cover" unoptimized />
            <div className="flex justify-between p-2">
              <>
                <button
                  onClick={() => document.getElementById(`replace-${idx}`).click()}
                  className="rounded bg-blue-500 px-3 py-1 text-sm text-white"
                >
                  تعديل
                </button>
                <input
                  type="file"
                  id={`replace-${idx}`}
                  className="hidden"
                  onChange={(e) => handleReplace(img.name, e.target.files[0])}
                />
              </>
              <button
                onClick={() => deleteImage(img.name)}
                className="rounded bg-red-500 px-3 py-1 text-sm text-white"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
