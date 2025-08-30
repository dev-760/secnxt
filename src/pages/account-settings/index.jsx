import React, { useState, useEffect } from 'react';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import UserProfileDropdown from '../../components/ui/UserProfileDropdown';
import NotificationCenter from '../../components/ui/NotificationCenter';
import LanguageSwitcher from '../../components/ui/LanguageSwitcher';
import Button from '../../components/ui/Button';

const DEFAULT_ACCOUNT = {
  mfa: false,
  sessions: [
    { id: 's1', device: 'Chrome — Ubuntu', location: 'Casablanca', lastActive: new Date().toISOString(), current: true },
    { id: 's2', device: 'Firefox — Windows', location: 'Rabat', lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), current: false }
  ]
};

const AccountSettings = () => {
  const [account, setAccount] = useState(DEFAULT_ACCOUNT);
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('account');
    if (saved) setAccount(JSON.parse(saved));
  }, []);

  const handleToggleMfa = () => {
    setAccount(prev => ({ ...prev, mfa: !prev.mfa }));
  };

  const handleRevoke = (id) => {
    setAccount(prev => ({ ...prev, sessions: prev.sessions.filter(s => s.id !== id) }));
  };

  const handleChangePw = async () => {
    if (!passwords.current || !passwords.newPass) {
      setMessage({ type: 'error', text: 'Please provide current and new password.' });
      return;
    }
    if (passwords.newPass !== passwords.confirm) {
      setMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    setSaving(false);
    setPasswords({ current: '', newPass: '', confirm: '' });
    setMessage({ type: 'success', text: 'Password updated.' });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSaveAccount = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 700));
    localStorage.setItem('account', JSON.stringify(account));
    setSaving(false);
    setMessage({ type: 'success', text: 'Account settings saved.' });
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationSidebar />
      <div className="ml-60 transition-all duration-300">
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Account Settings</h1>
              <p className="text-sm text-muted-foreground">Manage authentication and security settings</p>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <NotificationCenter />
              <UserProfileDropdown />
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="max-w-4xl mx-auto bg-card border border-border rounded-lg p-6 shadow-sm space-y-6">
            {message && (
              <div className={`p-3 rounded ${message.type === 'error' ? 'bg-destructive/10 text-destructive' : 'bg-success/10 text-success'}`}>
                {message.text}
              </div>
            )}

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">Change Password</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input type="password" placeholder="Current password" value={passwords.current} onChange={e => setPasswords(prev => ({ ...prev, current: e.target.value }))} className="px-3 py-2 rounded bg-input border border-border text-foreground" />
                <input type="password" placeholder="New password" value={passwords.newPass} onChange={e => setPasswords(prev => ({ ...prev, newPass: e.target.value }))} className="px-3 py-2 rounded bg-input border border-border text-foreground" />
                <input type="password" placeholder="Confirm new" value={passwords.confirm} onChange={e => setPasswords(prev => ({ ...prev, confirm: e.target.value }))} className="px-3 py-2 rounded bg-input border border-border text-foreground" />
              </div>
              <div className="mt-3 flex justify-end">
                <Button onClick={handleChangePw} loading={saving}>Update Password</Button>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">Two-factor authentication</h2>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Require a second verification step when signing in</div>
                <div className="flex items-center gap-2">
                  <label className="switch">
                    <input type="checkbox" checked={account.mfa} onChange={handleToggleMfa} />
                    <span className="slider" />
                  </label>
                  <span className="text-sm">{account.mfa ? 'Enabled' : 'Disabled'}</span>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-2">Active sessions</h2>
              <div className="space-y-3">
                {account.sessions.map(s => (
                  <div key={s.id} className="flex items-center justify-between p-3 border border-border rounded">
                    <div>
                      <div className="font-medium text-foreground">{s.device}</div>
                      <div className="text-sm text-muted-foreground">{s.location} • Last active: {new Date(s.lastActive).toLocaleString()}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!s.current && <button onClick={() => handleRevoke(s.id)} className="text-sm text-destructive">Revoke</button>}
                      {s.current && <span className="text-sm text-muted-foreground">Current session</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="flex justify-end">
              <Button onClick={handleSaveAccount} loading={saving}>Save Settings</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AccountSettings;
