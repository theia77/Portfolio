import { useEffect, useState } from "react";
import { fetchEducation, educationCrud } from "../../../services/educationService.js";
import { Field, TextInput, TextArea } from "../ui/Field.jsx";
import { AdminButton, SaveStatus } from "../ui/SaveStatus.jsx";

const EMPTY = {
  institution: "",
  degree: "",
  start_year: "",
  end_year: "",
  description: "",
  location: "",
  interests: "",
};

function toForm(entry) {
  return {
    institution: entry.institution || "",
    degree: entry.degree || "",
    start_year: entry.start_year || "",
    end_year: entry.end_year || "",
    description: entry.description || "",
    location: entry.location || "",
    interests: (entry.interests || []).join(", "),
  };
}

function toPayload(form) {
  return {
    institution: form.institution,
    degree: form.degree || null,
    start_year: form.start_year || null,
    end_year: form.end_year || null,
    description: form.description || null,
    location: form.location || null,
    interests: form.interests.split(",").map((s) => s.trim()).filter(Boolean),
  };
}

export default function EducationEditor() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function reload() {
    const { data } = await fetchEducation();
    setEntries(data);
    setLoading(false);
  }

  useEffect(() => {
    reload();
  }, []);

  function startAdd() {
    setEditingId("new");
    setForm(EMPTY);
  }

  function startEdit(entry) {
    setEditingId(entry.id);
    setForm(toForm(entry));
  }

  function cancel() {
    setEditingId(null);
    setStatus("idle");
  }

  async function handleSave(event) {
    event.preventDefault();
    setStatus("saving");
    setError("");

    const payload = toPayload(form);
    const { error: saveError } =
      editingId === "new"
        ? await educationCrud.create({ ...payload, sort_order: entries.length })
        : await educationCrud.update(editingId, payload);

    if (saveError) {
      setStatus("error");
      setError(saveError.message);
      return;
    }
    cancel();
    reload();
  }

  async function handleDelete(id) {
    if (!confirm("Delete this education entry?")) return;
    const { error: deleteError } = await educationCrud.remove(id);
    if (deleteError) {
      setError(deleteError.message);
      setStatus("error");
      return;
    }
    reload();
  }

  async function move(index, direction) {
    const target = index + direction;
    if (target < 0 || target >= entries.length) return;
    await educationCrud.swapOrder(entries[index], entries[target]);
    reload();
  }

  if (loading) return <p className="text-sm text-muted">Loading…</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl text-ink">Education</h1>
      <p className="mt-1 text-sm text-muted">
        Rendered as the timeline on the public site, in this order.
      </p>

      <ul className="mt-8 divide-y divide-line/30 border-y border-line/30">
        {entries.map((entry, index) => (
          <li key={entry.id} className="flex items-center justify-between gap-4 py-3">
            <div className="min-w-0">
              <p className="truncate text-sm text-ink">{entry.institution}</p>
              <p className="truncate text-xs text-muted">
                {entry.degree} · {[entry.start_year, entry.end_year].filter(Boolean).join("–")}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button type="button" onClick={() => move(index, -1)} disabled={index === 0} className="text-xs text-muted hover:text-ink disabled:opacity-30">↑</button>
              <button type="button" onClick={() => move(index, 1)} disabled={index === entries.length - 1} className="text-xs text-muted hover:text-ink disabled:opacity-30">↓</button>
              <AdminButton variant="ghost" onClick={() => startEdit(entry)}>Edit</AdminButton>
              <AdminButton variant="danger" onClick={() => handleDelete(entry.id)}>Delete</AdminButton>
            </div>
          </li>
        ))}
        {entries.length === 0 && <li className="py-6 text-sm text-muted">No entries yet.</li>}
      </ul>

      {editingId ? (
        <form onSubmit={handleSave} className="mt-6 space-y-4 rounded border border-line/50 p-4">
          <Field label="Institution">
            <TextInput
              required
              value={form.institution}
              onChange={(e) => setForm((f) => ({ ...f, institution: e.target.value }))}
            />
          </Field>
          <Field label="Degree / Program">
            <TextInput
              value={form.degree}
              onChange={(e) => setForm((f) => ({ ...f, degree: e.target.value }))}
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Start year">
              <TextInput
                value={form.start_year}
                onChange={(e) => setForm((f) => ({ ...f, start_year: e.target.value }))}
              />
            </Field>
            <Field label="End year" hint="Leave blank or use “Present”.">
              <TextInput
                value={form.end_year}
                onChange={(e) => setForm((f) => ({ ...f, end_year: e.target.value }))}
              />
            </Field>
          </div>
          <Field label="Location">
            <TextInput
              value={form.location}
              onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
            />
          </Field>
          <Field label="Description">
            <TextArea
              rows={3}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            />
          </Field>
          <Field label="Interests" hint="Comma-separated.">
            <TextInput
              value={form.interests}
              onChange={(e) => setForm((f) => ({ ...f, interests: e.target.value }))}
            />
          </Field>
          <div className="flex items-center gap-3">
            <AdminButton type="submit" disabled={status === "saving"}>Save</AdminButton>
            <AdminButton variant="ghost" onClick={cancel}>Cancel</AdminButton>
            <SaveStatus status={status} error={error} />
          </div>
        </form>
      ) : (
        <AdminButton className="mt-6" onClick={startAdd}>
          + Add education
        </AdminButton>
      )}
    </div>
  );
}
