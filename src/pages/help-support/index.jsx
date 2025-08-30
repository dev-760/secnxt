import React, { useState } from 'react';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import UserProfileDropdown from '../../components/ui/UserProfileDropdown';
import NotificationCenter from '../../components/ui/NotificationCenter';
import LanguageSwitcher from '../../components/ui/LanguageSwitcher';
import Button from '../../components/ui/Button';

const DOCS = [
  { id: 'd1', title: 'Getting Started Guide', href: '#' },
  { id: 'd2', title: 'FAQs', href: '#' },
  { id: 'd3', title: 'Contact Support', href: '#' },
  { id: 'd4', title: 'Release Notes', href: '#' },
  { id: 'd5', title: 'Troubleshooting Agent Issues', href: '#' }
];

const HelpSupport = () => {
  const [query, setQuery] = useState('');
  const [contact, setContact] = useState({ subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const filtered = DOCS.filter(d => d.title.toLowerCase().includes(query.toLowerCase()));

  const handleSend = async () => {
    if (!contact.subject || !contact.message) {
      setFeedback({ type: 'error', text: 'Please provide subject and message.' });
      return;
    }
    setSending(true);
    await new Promise(r => setTimeout(r, 800));
    setSending(false);
    // store locally as mock
    const messages = JSON.parse(localStorage.getItem('support-messages') || '[]');
    messages.push({ ...contact, createdAt: new Date().toISOString() });
    localStorage.setItem('support-messages', JSON.stringify(messages));
    setContact({ subject: '', message: '' });
    setFeedback({ type: 'success', text: 'Message sent. Support will contact you shortly.' });
    setTimeout(() => setFeedback(null), 4000);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationSidebar />
      <div className="ml-60 transition-all duration-300">
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Help & Support</h1>
              <p className="text-sm text-muted-foreground">Get help, view documentation, or contact support.</p>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <NotificationCenter />
              <UserProfileDropdown />
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold text-foreground">Documentation</h2>
                  <input placeholder="Search docs..." value={query} onChange={e => setQuery(e.target.value)} className="px-3 py-2 rounded bg-input border border-border text-foreground" />
                </div>
                <div className="space-y-2">
                  {filtered.map(d => (
                    <a key={d.id} href={d.href} className="block p-3 border border-border rounded hover:bg-muted/50">{d.title}</a>
                  ))}
                  {filtered.length === 0 && <div className="text-muted-foreground p-3">No documents match your query.</div>}
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h2 className="text-lg font-semibold text-foreground mb-2">Contact Support</h2>
                {feedback && <div className={`p-3 rounded ${feedback.type === 'error' ? 'bg-destructive/10 text-destructive' : 'bg-success/10 text-success'}`}>{feedback.text}</div>}
                <div className="space-y-3 mt-3">
                  <input placeholder="Subject" value={contact.subject} onChange={e => setContact(prev => ({ ...prev, subject: e.target.value }))} className="w-full px-3 py-2 rounded bg-input border border-border text-foreground" />
                  <textarea placeholder="Message" value={contact.message} onChange={e => setContact(prev => ({ ...prev, message: e.target.value }))} className="w-full px-3 py-2 rounded bg-input border border-border text-foreground h-32" />
                  <div className="flex justify-end">
                    <Button onClick={handleSend} loading={sending}>Send Message</Button>
                  </div>
                </div>
              </div>
            </div>

            <aside className="space-y-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-md font-semibold text-foreground mb-2">Support Hours</h3>
                <p className="text-sm text-muted-foreground">Mon-Fri, 9:00 - 18:00 GMT</p>
                <p className="text-sm text-muted-foreground">Email: support@secnxt.example</p>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-md font-semibold text-foreground mb-2">Popular Articles</h3>
                <ul className="space-y-2 text-sm">
                  {DOCS.slice(0,3).map(d => <li key={d.id} className="text-muted-foreground">• {d.title}</li>)}
                </ul>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HelpSupport;
