import { useEffect, useState } from "react";
import { fetchSiteSettings, updateSiteSettings } from "../../../services/siteService.js";
import { Field, TextInput, TextArea } from "../ui/Field.jsx";
import { AdminButton, SaveStatus } from "../ui/SaveStatus.jsx";

export default function ResumeEditor() {
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ resume_url: "", resume_file_name: "", resume_summary: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSiteSettings().then(({ data }) => {
      if (data) {
        setForm({
          resume_url: data.resume_url || "",
          resume_file_name: data.resume_file_name || "",
          resume_summary: data.resume_summary || "",
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
      resume_url: form.resume_url || null,
      resume_file_name: form.resume_file_name || null,
      resume_summary: form.resume_summary || null,
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
      <h1 className="text-xl text-ink">Resume</h1>
      <p className="mt-1 text-sm text-muted">
        The public Resume section always uses this URL — nothing is hardcoded in the
        component. Upload your PDF somewhere with a public link (Supabase Storage, a file
        host, etc.) and paste the link here.
      </p>

      <form onSubmit={handleSave} className="mt-8 space-y-5">
        <Field label="Resume URL" hint="A public link to your PDF.">
          <TextInput value={form.resume_url} onChange={(e) => set("resume_url", e.target.value)} />
        </Field>

        <Field label="Download file name">
          <TextInput
            value={form.resume_file_name}
            onChange={(e) => set("resume_file_name", e.target.value)}
          />
        </Field>

        <Field label="Summary" hint="Short description shown above the resume links.">
          <TextArea rows={3} value={form.resume_summary} onChange={(e) => set("resume_summary", e.target.value)} />
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
