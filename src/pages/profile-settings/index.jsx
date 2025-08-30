import React, { useState, useEffect, useRef, useCallback } from 'react';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import UserProfileDropdown from '../../components/ui/UserProfileDropdown';
import NotificationCenter from '../../components/ui/NotificationCenter';
import LanguageSwitcher from '../../components/ui/LanguageSwitcher';
import Button from '../../components/ui/Button';

const DEFAULT_PROFILE = {
  name: 'Sarah Johnson',
  email: 'sarah.johnson@company.com',
  role: 'Security Administrator',
  avatar: null
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ProfileSettings = () => {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [avatarPreview, setAvatarPreview] = useState(null); // preview URL (object URL or data URL)
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null); // { type: 'success'|'error', text }
  const fileInputRef = useRef(null);
  const lastSavedRef = useRef(DEFAULT_PROFILE);

  // Load saved profile once
  useEffect(() => {
    try {
      const saved = localStorage.getItem('profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        setProfile(parsed);
        lastSavedRef.current = parsed;
        if (parsed.avatar) setAvatarPreview(parsed.avatar);
      }
    } catch (e) {
      // storage read error - ignore and continue with defaults
      // Could log to a monitoring service in production
    }
  }, []);

  // Revoke any object URLs when component unmounts or when avatarPreview changes from object URL to something else
  useEffect(() => {
    return () => {
      if (avatarPreview && avatarPreview.startsWith('blob:')) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const setField = (key, value) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const handleAvatar = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Clean up any previous blob URL
    if (avatarPreview && avatarPreview.startsWith('blob:')) {
      try { URL.revokeObjectURL(avatarPreview); } catch (er) {}
    }

    // Create a temporary preview URL for quick feedback
    const objectUrl = URL.createObjectURL(file);
    setAvatarPreview(objectUrl);

    // Also store as data URL (base64) so it persists in localStorage
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setProfile(prev => ({ ...prev, avatar: dataUrl }));
    };
    reader.onerror = () => {
      setMessage({ type: 'error', text: 'Failed to read image file.' });
      setTimeout(() => setMessage(null), 3000);
    };
    reader.readAsDataURL(file);
  }, [avatarPreview]);

  const validate = useCallback(() => {
    if (!profile.name || !profile.email) return 'Name and email are required.';
    if (!EMAIL_RE.test(profile.email)) return 'Please enter a valid email address.';
    if (profile.name.length > 100) return 'Name is too long.';
    return null;
  }, [profile]);

  const handleSave = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const err = validate();
    if (err) {
      setMessage({ type: 'error', text: err });
      return;
    }

    setSaving(true);
    setMessage(null);
    try {
      // Simulate API call latency
      await new Promise(r => setTimeout(r, 700));
      // Persist to localStorage (in production replace with API)
      try {
        localStorage.setItem('profile', JSON.stringify(profile));
        lastSavedRef.current = profile;
        setMessage({ type: 'success', text: 'Profile saved successfully.' });
      } catch (storageErr) {
        setMessage({ type: 'error', text: 'Unable to save locally. Please check storage settings.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to save profile. Please try again.' });
    } finally {
      setSaving(false);
      window.setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleCancel = () => {
    // Reset to last saved values
    const last = lastSavedRef.current || DEFAULT_PROFILE;
    setProfile(last);
    setAvatarPreview(last?.avatar || null);
    // Clear file input value
    try { if (fileInputRef.current) fileInputRef.current.value = ''; } catch (e) {}
    setMessage(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationSidebar />
      <div className="ml-60 transition-all duration-300">
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Profile Settings</h1>
              <p className="text-sm text-muted-foreground">Manage your personal profile information</p>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <NotificationCenter />
              <UserProfileDropdown />
            </div>
          </div>
        </header>

        <main className="p-6">
          <form onSubmit={handleSave} className="max-w-4xl mx-auto bg-card border border-border rounded-lg p-6 shadow-sm" aria-labelledby="profile-heading">
            <h2 id="profile-heading" className="sr-only">Profile settings form</h2>

            <div className="flex flex-col md:flex-row items-start gap-6">
              <aside className="w-full md:w-36 flex-shrink-0">
                <div className="w-36 h-36 rounded-lg bg-surface flex items-center justify-center overflow-hidden border border-border" aria-hidden>
                  {avatarPreview ? (
                    <img src={avatarPreview} alt={`${profile.name} avatar`} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-muted-foreground">No photo</div>
                  )}
                </div>

                <div className="mt-3">
                  <label htmlFor="avatar" className="block text-sm text-muted-foreground mb-1">Upload photo</label>
                  <input id="avatar" ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatar} className="text-sm" aria-describedby="avatar-help" />
                  <div id="avatar-help" className="text-xs text-muted-foreground mt-1">PNG, JPG up to 2MB recommended</div>
                </div>
              </aside>

              <section className="flex-1 w-full">
                {message && (
                  <div role="status" aria-live="polite" className={`mb-4 p-3 rounded ${message.type === 'error' ? 'bg-destructive/10 text-destructive' : 'bg-success/10 text-success'}`}>
                    {message.text}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="full-name" className="block text-sm text-muted-foreground mb-1">Full name</label>
                    <input id="full-name" name="fullName" type="text" autoComplete="name" className="w-full px-3 py-2 rounded-md bg-input border border-border text-foreground" value={profile.name} onChange={e => setField('name', e.target.value)} maxLength={100} required />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm text-muted-foreground mb-1">Email</label>
                    <input id="email" name="email" type="email" autoComplete="email" className="w-full px-3 py-2 rounded-md bg-input border border-border text-foreground" value={profile.email} onChange={e => setField('email', e.target.value)} required />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="role" className="block text-sm text-muted-foreground mb-1">Role</label>
                    <input id="role" name="role" type="text" className="w-full px-3 py-2 rounded-md bg-input border border-border text-foreground" value={profile.role} onChange={e => setField('role', e.target.value)} />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end space-x-3">
                  <Button variant="ghost" type="button" onClick={handleCancel} disabled={saving}>Cancel</Button>
                  <Button type="submit" loading={saving} disabled={saving}>Save Changes</Button>
                </div>
              </section>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default ProfileSettings;
