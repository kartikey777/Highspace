import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAdminContent } from '../context/AdminContentContext';
import '../pages/AdminPage.css';

const ADMIN_PASSWORD = 'admin'; // Simple demo password
const ADMIN_SESSION_KEY = 'highspace_admin_session';

function generateItemId(categoryId) {
  return `${categoryId}-new-${Date.now()}`;
}

export default function AdminPage() {
  const { content, updateHero, updateHomeSectionsTitle, updateCategory, updateItem, addItem, removeItem } = useAdminContent();
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [editingHero, setEditingHero] = useState(false);
  const [editingHomeTitle, setEditingHomeTitle] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [addingItem, setAddingItem] = useState(null);

  useEffect(() => {
    setLoggedIn(sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true');
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      setLoggedIn(true);
      setPassword('');
    } else {
      setLoginError('Incorrect password.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return (
      <div className="admin-page admin-page--login">
        <div className="admin-login">
          <h1 className="admin-login__title">Admin Login</h1>
          <p className="admin-login__hint">Enter password to edit site content.</p>
          <form onSubmit={handleLogin} className="admin-login__form">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="admin-login__input"
              autoFocus
            />
            {loginError && <p className="admin-login__error">{loginError}</p>}
            <button type="submit" className="admin-login__btn">Log in</button>
          </form>
          <Link to="/" className="admin-login__back">← Back to site</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1 className="admin-header__title">Admin – Edit content</h1>
        <div className="admin-header__actions">
          <Link to="/" className="admin-header__link">View site</Link>
          <button type="button" className="admin-header__logout" onClick={handleLogout}>Log out</button>
        </div>
      </header>

      <section className="admin-section">
        <h2 className="admin-section__title">Hero (home top)</h2>
        {!editingHero ? (
          <div className="admin-block">
            <p><strong>Title:</strong> {content.hero.title}</p>
            <p><strong>Subtitle:</strong> {content.hero.subtitle}</p>
            <p><strong>Background image:</strong> {content.hero.backgroundImage ? 'Set' : '—'}</p>
            <button type="button" className="admin-btn admin-btn--primary" onClick={() => setEditingHero(true)}>Edit</button>
          </div>
        ) : (
          <HeroEditor
            hero={content.hero}
            onSave={(data) => { updateHero(data); setEditingHero(false); }}
            onCancel={() => setEditingHero(false)}
          />
        )}
      </section>

      <section className="admin-section">
        <h2 className="admin-section__title">Home sections</h2>
        {!editingHomeTitle ? (
          <div className="admin-block">
            <p><strong>Section title:</strong> {content.homeSectionsTitle}</p>
            <button type="button" className="admin-btn admin-btn--primary" onClick={() => setEditingHomeTitle(true)}>Edit title</button>
          </div>
        ) : (
          <HomeTitleEditor
            value={content.homeSectionsTitle}
            onSave={(v) => { updateHomeSectionsTitle(v); setEditingHomeTitle(false); }}
            onCancel={() => setEditingHomeTitle(false)}
          />
        )}
      </section>

      {content.categories.map((cat) => (
        <section key={cat.id} className="admin-section">
          <h2 className="admin-section__title">{cat.title}</h2>
          {editingCategory !== cat.id ? (
            <div className="admin-block">
              <p><strong>Title:</strong> {cat.title}</p>
              <p><strong>Description:</strong> {cat.description}</p>
              <p><strong>Cover image:</strong> {cat.coverImage ? 'Set' : '—'}</p>
              <button type="button" className="admin-btn admin-btn--primary" onClick={() => setEditingCategory(cat.id)}>Edit section</button>
              <div className="admin-items">
                {cat.items.map((item) => (
                  <div key={item.id} className="admin-item-row">
                    <span>{item.name}</span>
                    <div className="admin-item-row__actions">
                      {editingItem?.categoryId === cat.id && editingItem?.itemId === item.id ? (
                        <ItemEditor
                          item={item}
                          categoryId={cat.id}
                          onSave={(data) => { updateItem(cat.id, item.id, data); setEditingItem(null); }}
                          onCancel={() => setEditingItem(null)}
                        />
                      ) : (
                        <>
                          <button type="button" className="admin-btn admin-btn--small" onClick={() => setEditingItem({ categoryId: cat.id, itemId: item.id })}>Edit</button>
                          <button type="button" className="admin-btn admin-btn--small admin-btn--danger" onClick={() => { if (window.confirm('Remove this item?')) removeItem(cat.id, item.id); }}>Delete</button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
                {addingItem === cat.id ? (
                  <NewItemEditor
                    categoryId={cat.id}
                    onSave={(data) => { addItem(cat.id, data); setAddingItem(null); }}
                    onCancel={() => setAddingItem(null)}
                  />
                ) : (
                  <button type="button" className="admin-btn admin-btn--add" onClick={() => setAddingItem(cat.id)}>+ Add item</button>
                )}
              </div>
            </div>
          ) : (
            <CategoryEditor
              category={cat}
              onSave={(data) => { updateCategory(cat.id, data); setEditingCategory(null); }}
              onCancel={() => setEditingCategory(null)}
            />
          )}
        </section>
      ))}
    </div>
  );
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

function HeroEditor({ hero, onSave, onCancel }) {
  const [title, setTitle] = useState(hero.title);
  const [subtitle, setSubtitle] = useState(hero.subtitle);
  const [backgroundImage, setBackgroundImage] = useState(hero.backgroundImage || '');

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file?.type.startsWith('image/')) return;
    try {
      const dataUrl = await readFileAsDataUrl(file);
      setBackgroundImage(dataUrl);
    } catch (_) {}
    e.target.value = '';
  };

  return (
    <form
      className="admin-form"
      onSubmit={(e) => { e.preventDefault(); onSave({ title, subtitle, backgroundImage }); }}
    >
      <label className="admin-form__label">Title</label>
      <input className="admin-form__input" value={title} onChange={(e) => setTitle(e.target.value)} />
      <label className="admin-form__label">Subtitle</label>
      <textarea className="admin-form__textarea" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} rows={2} />
      <label className="admin-form__label">Background image</label>
      <div className="admin-form__image-row">
        <input className="admin-form__input" value={backgroundImage?.startsWith('data:') ? '' : backgroundImage} onChange={(e) => setBackgroundImage(e.target.value)} placeholder={backgroundImage?.startsWith('data:') ? 'Image uploaded — or paste URL' : 'Paste URL or upload below'} />
        <label className="admin-btn admin-btn--upload">
          Upload from device
          <input type="file" accept="image/*" onChange={handleFile} className="admin-form__file" />
        </label>
      </div>
      {backgroundImage && (
        <div className="admin-form__preview">
          <img src={backgroundImage} alt="Preview" />
        </div>
      )}
      <div className="admin-form__actions">
        <button type="submit" className="admin-btn admin-btn--primary">Save</button>
        <button type="button" className="admin-btn" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

function HomeTitleEditor({ value, onSave, onCancel }) {
  const [v, setV] = useState(value);
  return (
    <form className="admin-form" onSubmit={(e) => { e.preventDefault(); onSave(v); }}>
      <input className="admin-form__input" value={v} onChange={(e) => setV(e.target.value)} />
      <div className="admin-form__actions">
        <button type="submit" className="admin-btn admin-btn--primary">Save</button>
        <button type="button" className="admin-btn" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

function CategoryEditor({ category, onSave, onCancel }) {
  const [title, setTitle] = useState(category.title);
  const [description, setDescription] = useState(category.description || '');
  const [coverImage, setCoverImage] = useState(category.coverImage || '');

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file?.type.startsWith('image/')) return;
    try {
      setCoverImage(await readFileAsDataUrl(file));
    } catch (_) {}
    e.target.value = '';
  };

  return (
    <form className="admin-form" onSubmit={(e) => { e.preventDefault(); onSave({ title, description, coverImage }); }}>
      <label className="admin-form__label">Section title</label>
      <input className="admin-form__input" value={title} onChange={(e) => setTitle(e.target.value)} />
      <label className="admin-form__label">Description</label>
      <textarea className="admin-form__textarea" value={description} onChange={(e) => setDescription(e.target.value)} rows={2} />
      <label className="admin-form__label">Cover image (optional)</label>
      <div className="admin-form__image-row">
        <input className="admin-form__input" value={coverImage?.startsWith('data:') ? '' : coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder={coverImage?.startsWith('data:') ? 'Uploaded — or paste URL' : 'URL or upload'} />
        <label className="admin-btn admin-btn--upload">
          Upload from device
          <input type="file" accept="image/*" onChange={handleFile} className="admin-form__file" />
        </label>
      </div>
      {coverImage && (
        <div className="admin-form__preview admin-form__preview--small">
          <img src={coverImage} alt="Preview" />
        </div>
      )}
      <div className="admin-form__actions">
        <button type="submit" className="admin-btn admin-btn--primary">Save</button>
        <button type="button" className="admin-btn" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

function ItemEditor({ item, categoryId, onSave, onCancel }) {
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description || '');
  const [images, setImages] = useState(item.images || []);

  const handleUpload = async (e) => {
    const files = e.target.files;
    if (!files?.length) return;
    try {
      const dataUrls = await Promise.all(
        Array.from(files).filter((f) => f.type.startsWith('image/')).map(readFileAsDataUrl)
      );
      setImages((prev) => [...prev, ...dataUrls]);
    } catch (_) {}
    e.target.value = '';
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave({ name, description, images });
  };

  return (
    <form className="admin-form admin-form--inline" onSubmit={handleSave}>
      <label className="admin-form__label">Name</label>
      <input className="admin-form__input" value={name} onChange={(e) => setName(e.target.value)} />
      <label className="admin-form__label">Description</label>
      <textarea className="admin-form__textarea" value={description} onChange={(e) => setDescription(e.target.value)} rows={2} />
      <label className="admin-form__label">Images</label>
      <div className="admin-form__thumbs">
        {images.map((src, i) => (
          <div key={i} className="admin-form__thumb">
            <img src={src} alt="" />
            <button type="button" className="admin-form__thumb-remove" onClick={() => removeImage(i)} aria-label="Remove image">×</button>
          </div>
        ))}
      </div>
      <label className="admin-btn admin-btn--upload">
        Upload from device
        <input type="file" accept="image/*" multiple onChange={handleUpload} className="admin-form__file" />
      </label>
      <div className="admin-form__actions">
        <button type="submit" className="admin-btn admin-btn--primary">Save</button>
        <button type="button" className="admin-btn" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

function NewItemEditor({ categoryId, onSave, onCancel }) {
  const newId = generateItemId(categoryId);
  const [name, setName] = useState('New Item');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  const handleUpload = async (e) => {
    const files = e.target.files;
    if (!files?.length) return;
    try {
      const dataUrls = await Promise.all(
        Array.from(files).filter((f) => f.type.startsWith('image/')).map(readFileAsDataUrl)
      );
      setImages((prev) => [...prev, ...dataUrls]);
    } catch (_) {}
    e.target.value = '';
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave({ id: newId, name, description, images });
  };

  return (
    <form className="admin-form admin-form--inline admin-form--new-item" onSubmit={handleSave}>
      <label className="admin-form__label">Name</label>
      <input className="admin-form__input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Item name" />
      <label className="admin-form__label">Description</label>
      <textarea className="admin-form__textarea" value={description} onChange={(e) => setDescription(e.target.value)} rows={2} placeholder="Optional" />
      <label className="admin-form__label">Images</label>
      <div className="admin-form__thumbs">
        {images.map((src, i) => (
          <div key={i} className="admin-form__thumb">
            <img src={src} alt="" />
            <button type="button" className="admin-form__thumb-remove" onClick={() => removeImage(i)} aria-label="Remove image">×</button>
          </div>
        ))}
      </div>
      <label className="admin-btn admin-btn--upload">
        Upload from device
        <input type="file" accept="image/*" multiple onChange={handleUpload} className="admin-form__file" />
      </label>
      <div className="admin-form__actions">
        <button type="submit" className="admin-btn admin-btn--primary">Add item</button>
        <button type="button" className="admin-btn" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
