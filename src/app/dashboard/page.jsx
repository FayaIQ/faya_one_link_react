'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';

async function uploadToStorage(file) {
  const filePath = `${Date.now()}-${file.name}`;
  const { error: upErr } = await supabase
    .storage
    .from('images')
    .upload(filePath, file);
  if (upErr) {
    throw upErr;
  }
  return supabase.storage.from('images').getPublicUrl(filePath).data.publicUrl;
}

export default function Dashboard() {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    const { data, error } = await supabase
      .from('dashboard_images')
      .select('id, file_name, url, created_at')
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Error loading images', error);
    } else {
      const items = data.map((row) => ({
        id: row.id,
        file_name: row.file_name,
        url: row.url,
        selected: false,
      }));
      setImages(items);
    }
  }

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadToStorage(file);
      const { error } = await supabase.from('dashboard_images').insert({
        file_name: file.name,
        url,
      });
      setUploading(false);
      if (error) {
        alert('حدث خطأ أثناء الرفع');
      } else {
        fetchImages();
      }
    } catch (err) {
      setUploading(false);
      console.error('upload error', err);
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

  async function deleteImage(id) {
    const img = images.find((i) => i.id === id);
    const { error } = await supabase
      .from('dashboard_images')
      .delete()
      .eq('id', id);
    if (!error) {
      if (img) {
        await supabase.storage.from('images').remove([img.file_name]);
      }
      fetchImages();
    } else {
      console.error('delete error', error);
    }
  }

  async function deleteSelected() {
    const ids = images.filter((i) => i.selected).map((i) => i.id);
    if (ids.length === 0) return;
    const { error } = await supabase
      .from('dashboard_images')
      .delete()
      .in('id', ids);
    if (!error) {
      const names = images.filter((i) => ids.includes(i.id)).map((i) => i.file_name);
      if (names.length) {
        await supabase.storage.from('images').remove(names);
      }
      fetchImages();
    } else {
      console.error('bulk delete error', error);
    }
  }

  async function handleReplace(id, file) {
    if (!file) return;
    try {
      const img = images.find((i) => i.id === id);
      if (img) {
        await supabase.storage.from('images').remove([img.file_name]);
      }
      const url = await uploadToStorage(file);
      const { error } = await supabase
        .from('dashboard_images')
        .update({ file_name: file.name, url })
        .eq('id', id);
      if (error) {
        alert('حدث خطأ أثناء التعديل');
      } else {
        fetchImages();
      }
    } catch (err) {
      console.error('replace error', err);
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
          <div key={img.id} className="relative rounded-lg overflow-hidden shadow border bg-white">
            <input
              type="checkbox"
              className="absolute top-2 right-2 w-4 h-4"
              checked={img.selected}
              onChange={() => toggleSelect(idx)}
            />
            <Image
              src={img.url}
              alt={img.file_name}
              width={400}
              height={200}
              className="w-full h-48 object-cover"
              unoptimized
            />
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
                  onChange={(e) => handleReplace(img.id, e.target.files[0])}
                />
              </>
              <button
                onClick={() => deleteImage(img.id)}
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
