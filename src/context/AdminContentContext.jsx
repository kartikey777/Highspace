import { createContext, useContext, useMemo, useCallback, useState, useEffect } from 'react';
import { furnitureByCategory } from '../data/furniture';

const STORAGE_KEY = 'highspace_admin_content';

const defaultHero = {
  title: 'Highspace Furniture',
  subtitle: 'Curated pieces for every room. Browse by category and view all images for each collection.',
  backgroundImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Raja_Ravi_Varma%2C_Goddess_Saraswati.jpg/1920px-Raja_Ravi_Varma%2C_Goddess_Saraswati.jpg',
};

const defaultHomeSectionsTitle = 'Browse by room';

function loadStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return null;
}

function saveStored(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (_) {}
}

function mergeCategory(original, overrides) {
  if (!overrides) return original;
  const overriddenItems = original.items.map((item) => {
    const o = overrides.items?.find((i) => i.id === item.id);
    if (!o) return item;
    return {
      ...item,
      name: o.name ?? item.name,
      description: o.description ?? item.description,
      images: Array.isArray(o.images) && o.images.length > 0 ? o.images : item.images,
    };
  });
  const extraItems = (overrides.items || []).filter(
    (o) => !original.items.some((i) => i.id === o.id)
  ).map((o) => ({
    id: o.id,
    name: o.name ?? 'New Item',
    description: o.description ?? '',
    images: Array.isArray(o.images) ? o.images : [],
  }));
  return {
    ...original,
    title: overrides.title ?? original.title,
    description: overrides.description ?? original.description,
    coverImage: overrides.coverImage ?? original.coverImage,
    items: [...overriddenItems, ...extraItems],
  };
}

const AdminContentContext = createContext(null);

export function AdminContentProvider({ children }) {
  const [stored, setStored] = useState(loadStored);

  useEffect(() => {
    const onStorage = () => setStored(loadStored());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const content = useMemo(() => ({
    hero: { ...defaultHero, ...stored?.hero },
    homeSectionsTitle: stored?.homeSectionsTitle ?? defaultHomeSectionsTitle,
    categories: furnitureByCategory.map((cat) =>
      mergeCategory(cat, stored?.categories?.find((c) => c.id === cat.id))
    ),
  }), [stored]);

  const updateHero = useCallback((updates) => {
    setStored((prev) => {
      const next = prev ? { ...prev } : {};
      next.hero = { ...defaultHero, ...next.hero, ...updates };
      saveStored(next);
      return next;
    });
  }, []);

  const updateHomeSectionsTitle = useCallback((title) => {
    setStored((prev) => {
      const next = prev ? { ...prev } : {};
      next.homeSectionsTitle = title;
      saveStored(next);
      return next;
    });
  }, []);

  const updateCategory = useCallback((categoryId, updates) => {
    setStored((prev) => {
      const next = prev ? { ...prev } : {};
      next.categories = next.categories || [];
      const idx = next.categories.findIndex((c) => c.id === categoryId);
      const orig = furnitureByCategory.find((c) => c.id === categoryId);
      const merged = mergeCategory(orig, idx >= 0 ? next.categories[idx] : null);
      const merged2 = {
        id: categoryId,
        title: updates.title ?? merged.title,
        description: updates.description ?? merged.description,
        coverImage: updates.coverImage !== undefined ? updates.coverImage : merged.coverImage,
        items: merged.items.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          images: item.images,
        })),
      };
      if (idx >= 0) next.categories[idx] = merged2;
      else next.categories.push(merged2);
      saveStored(next);
      return next;
    });
  }, []);

  const updateItem = useCallback((categoryId, itemId, updates) => {
    setStored((prev) => {
      const next = prev ? { ...prev } : {};
      next.categories = next.categories || [];
      const cat = furnitureByCategory.find((c) => c.id === categoryId);
      const catOverride = next.categories.find((c) => c.id === categoryId);
      const mergedCat = mergeCategory(cat, catOverride);
      const item = mergedCat.items.find((i) => i.id === itemId);
      if (!item) return prev;
      const updatedItem = {
        id: itemId,
        name: updates.name ?? item.name,
        description: updates.description ?? item.description,
        images: Array.isArray(updates.images) ? updates.images : item.images,
      };
      const newItems = mergedCat.items.map((i) =>
        i.id === itemId ? updatedItem : { id: i.id, name: i.name, description: i.description, images: i.images }
      );
      const newCat = {
        id: categoryId,
        title: mergedCat.title,
        description: mergedCat.description,
        coverImage: mergedCat.coverImage,
        items: newItems,
      };
      const catIdx = next.categories.findIndex((c) => c.id === categoryId);
      if (catIdx >= 0) next.categories[catIdx] = newCat;
      else next.categories.push(newCat);
      saveStored(next);
      return next;
    });
  }, []);

  const addItem = useCallback((categoryId, item) => {
    setStored((prev) => {
      const next = prev ? { ...prev } : {};
      next.categories = next.categories || [];
      const idx = next.categories.findIndex((c) => c.id === categoryId);
      const orig = furnitureByCategory.find((c) => c.id === categoryId);
      const merged = mergeCategory(orig, idx >= 0 ? next.categories[idx] : null);
      const newItems = [...merged.items, { id: item.id, name: item.name, description: item.description ?? '', images: item.images ?? [] }];
      const newCat = { id: categoryId, title: merged.title, description: merged.description, coverImage: merged.coverImage, items: newItems };
      const catIdx = next.categories.findIndex((c) => c.id === categoryId);
      if (catIdx >= 0) next.categories[catIdx] = newCat;
      else next.categories.push(newCat);
      saveStored(next);
      return next;
    });
  }, []);

  const removeItem = useCallback((categoryId, itemId) => {
    setStored((prev) => {
      const next = prev ? { ...prev } : {};
      next.categories = next.categories || [];
      const idx = next.categories.findIndex((c) => c.id === categoryId);
      const orig = furnitureByCategory.find((c) => c.id === categoryId);
      const merged = mergeCategory(orig, idx >= 0 ? next.categories[idx] : null);
      const newItems = merged.items.filter((i) => i.id !== itemId);
      const newCat = { id: categoryId, title: merged.title, description: merged.description, coverImage: merged.coverImage, items: newItems };
      const catIdx = next.categories.findIndex((c) => c.id === categoryId);
      if (catIdx >= 0) next.categories[catIdx] = newCat;
      else next.categories.push(newCat);
      saveStored(next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      content,
      updateHero,
      updateHomeSectionsTitle,
      updateCategory,
      updateItem,
      addItem,
      removeItem,
      rawStored: stored,
    }),
    [content, updateHero, updateHomeSectionsTitle, updateCategory, updateItem, addItem, removeItem, stored]
  );

  return (
    <AdminContentContext.Provider value={value}>
      {children}
    </AdminContentContext.Provider>
  );
}

export function useAdminContent() {
  const ctx = useContext(AdminContentContext);
  if (!ctx) throw new Error('useAdminContent must be used within AdminContentProvider');
  return ctx;
}

export function getCategoryByIdFromContent(content, id) {
  return content.categories.find((cat) => cat.id === id) ?? null;
}
