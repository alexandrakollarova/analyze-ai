import React, { useState, useEffect } from "react";
import Dialog from "@/design-system/components/Dialog";
import Select from "@/design-system/components/Select";
import Button from "@/design-system/components/Button";
import Card from "@/design-system/components/Card";

const MODELS = [
  { label: "GPT-3.5", value: "gpt-3.5" },
  { label: "GPT-4o", value: "gpt-4o" },
];

const DATE_FORMATS = [
  { label: "YYYY-MM-DD", value: "yyyy-mm-dd" },
  { label: "DD/MM/YYYY", value: "dd/mm/yyyy" },
  { label: "MM/DD/YYYY", value: "mm/dd/yyyy" },
];

export default function UserPreferences({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [theme, setTheme] = useState("system");
  const [model, setModel] = useState("gpt-3.5");
  const [dateFormat, setDateFormat] = useState("yyyy-mm-dd");
  const [usage, setUsage] = useState({ messages: 0, tokens: 0 });

  useEffect(() => {
    const prefs = JSON.parse(localStorage.getItem("userPrefs") || "{}");
    if (prefs.theme) setTheme(prefs.theme);
    if (prefs.model) setModel(prefs.model);
    if (prefs.dateFormat) setDateFormat(prefs.dateFormat);
    const usageStats = JSON.parse(localStorage.getItem("usageStats") || "{}");
    setUsage({ messages: usageStats.messages || 0, tokens: usageStats.tokens || 0 });
  }, [open]);

  const savePrefs = () => {
    localStorage.setItem(
      "userPrefs",
      JSON.stringify({ theme, model, dateFormat })
    );
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} ariaLabel="User Preferences" title="User Preferences">
      <Card className="space-y-6 min-w-[320px]">
        <div>
          <label className="block text-sm font-medium mb-1">Theme</label>
          <Select value={theme} onChange={e => setTheme(e.target.value)}>
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Default Model</label>
          <Select value={model} onChange={e => setModel(e.target.value)}>
            {MODELS.map(m => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date Format</label>
          <Select value={dateFormat} onChange={e => setDateFormat(e.target.value)}>
            {DATE_FORMATS.map(f => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </Select>
        </div>
        <div className="border-t border-gray-light pt-4">
          <div className="text-xs text-gray mb-1 font-semibold">Usage</div>
          <div className="text-sm">Messages sent: {usage.messages}</div>
          <div className="text-sm">Tokens used: {usage.tokens}</div>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={savePrefs}>Save</Button>
        </div>
      </Card>
    </Dialog>
  );
} 