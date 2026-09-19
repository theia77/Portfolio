import { useEffect, useState } from "react";
import { fetchSiteSettings, updateSiteSettings } from "../../../services/siteService.js";
import { Field, TextInput, TextArea } from "../ui/Field.jsx";
import { AdminButton, SaveStatus } from "../ui/SaveStatus.jsx";

export default function SiteSettingsEditor() {
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    role: "",
    intro: "",
    location: "",
    email: "",
    copyright_year: "",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSiteSettings().then(({ data }) => {
      if (data) {
        setForm({
          name: data.name || "",
          role: (data.role || []).join(", "),
          intro: data.intro || "",
          location: data.location || "",
          email: data.email || "",
          copyright_year: data.copyright_year ?? "",
        });
      }
      setLoading(false);
    });
  }, []);

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSave(event) {
    event.preventDefault();
    setStatus("saving");
    setError("");

    const { error: saveError } = await updateSiteSettings({
      name: form.name,
      role: form.role.split(",").map((s) => s.trim()).filter(Boolean),
      intro: form.intro,
      location: form.location || null,
      email: form.email || null,
      copyright_year: form.copyright_year ? Number(form.copyright_year) : null,
    });

    if (saveError) {
      setStatus("error");
      setError(saveError.message);
      return;
    }
    setStatus("saved");
  }

  if (loading) return <p className="text-sm text-muted">Loading…</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl text-ink">Site Settings</h1>
      <p className="mt-1 text-sm text-muted">
        Name, tagline and other details used across the whole site (hero, nav, footer).
      </p>

      <form onSubmit={handleSave} className="mt-8 space-y-5">
        <Field label="Name">
          <TextInput value={form.name} onChange={(e) => set("name", e.target.value)} />
        </Field>

        <Field label="Role / tagline" hint="Comma-separated, shown as ENGINEERING / DATA / RESEARCH.">
          <TextInput value={form.role} onChange={(e) => set("role", e.target.value)} />
        </Field>

        <Field label="Hero introduction">
          <TextArea rows={3} value={form.intro} onChange={(e) => set("intro", e.target.value)} />
        </Field>

        <Field label="Location">
          <TextInput value={form.location} onChange={(e) => set("location", e.target.value)} />
        </Field>

        <Field label="Email">
          <TextInput type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
        </Field>

        <Field label="Copyright year">
          <TextInput
            type="number"
            value={form.copyright_year}
            onChange={(e) => set("copyright_year", e.target.value)}
          />
        </Field>

        <div className="flex items-center gap-3 pt-2">
          <AdminButton type="submit" disabled={status === "saving"}>
            Save
          </AdminButton>
          <SaveStatus status={status} error={error} />
        </div>
      </form>
    </div>
  );
}
