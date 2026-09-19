import { useEffect, useState } from "react";
import { fetchAbout, saveAbout } from "../../../services/aboutService.js";
import { Field, TextInput, TextArea } from "../ui/Field.jsx";
import { AdminButton, SaveStatus } from "../ui/SaveStatus.jsx";

const linesToArray = (text) =>
  text.split("\n").map((line) => line.trim()).filter(Boolean);

export default function AboutEditor() {
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(null);
  const [form, setForm] = useState({
    headline: "",
    description: "",
    currently: "",
    interests: "",
    location: "",
    profile_image: "",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAbout().then(({ data }) => {
      if (data) {
        setId(data.id);
        setForm({
          headline: data.headline || "",
          description: (data.description || []).join("\n"),
          currently: (data.currently || []).join("\n"),
          interests: (data.interests || []).join(", "),
          location: data.location || "",
          profile_image: data.profile_image || "",
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

    const { data, error: saveError } = await saveAbout(id, {
      headline: form.headline,
      description: linesToArray(form.description),
      currently: linesToArray(form.currently),
      interests: form.interests.split(",").map((s) => s.trim()).filter(Boolean),
      location: form.location || null,
      profile_image: form.profile_image || null,
    });

    if (saveError) {
      setStatus("error");
      setError(saveError.message);
      return;
    }
    if (data) setId(data.id);
    setStatus("saved");
  }

  if (loading) return <p className="text-sm text-muted">Loading…</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl text-ink">About</h1>
      <p className="mt-1 text-sm text-muted">Shown in the About section of the public site.</p>

      <form onSubmit={handleSave} className="mt-8 space-y-5">
        <Field label="Headline">
          <TextInput value={form.headline} onChange={(e) => set("headline", e.target.value)} />
        </Field>

        <Field label="Description" hint="One paragraph per line.">
          <TextArea rows={5} value={form.description} onChange={(e) => set("description", e.target.value)} />
        </Field>

        <Field label="Currently" hint="One statement per line.">
          <TextArea rows={3} value={form.currently} onChange={(e) => set("currently", e.target.value)} />
        </Field>

        <Field label="Interests" hint="Comma-separated.">
          <TextInput value={form.interests} onChange={(e) => set("interests", e.target.value)} />
        </Field>

        <Field label="Location">
          <TextInput value={form.location} onChange={(e) => set("location", e.target.value)} />
        </Field>

        <Field label="Profile image URL" hint="Optional — leave blank to omit.">
          <TextInput value={form.profile_image} onChange={(e) => set("profile_image", e.target.value)} />
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
