import { useEffect, useState } from "react";
import { fetchSocialLinks, socialLinksCrud } from "../../../services/socialService.js";
import { Field, TextInput } from "../ui/Field.jsx";
import { AdminButton, SaveStatus } from "../ui/SaveStatus.jsx";

const EMPTY = { platform: "", label: "", url: "" };

export default function ContactEditor() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function reload() {
    const { data } = await fetchSocialLinks();
    setLinks(data);
    setLoading(false);
  }

  useEffect(() => {
    reload();
  }, []);

  function startEdit(link) {
    setEditingId(link.id);
    setForm({ platform: link.platform, label: link.label, url: link.url });
  }

  function startAdd() {
    setEditingId("new");
    setForm(EMPTY);
  }

  function cancel() {
    setEditingId(null);
    setForm(EMPTY);
    setStatus("idle");
  }

  async function handleSave(event) {
    event.preventDefault();
    setStatus("saving");
    setError("");

    const payload = { ...form, sort_order: links.length };
    const { error: saveError } =
      editingId === "new"
        ? await socialLinksCrud.create(payload)
        : await socialLinksCrud.update(editingId, form);

    if (saveError) {
      setStatus("error");
      setError(saveError.message);
      return;
    }
    setStatus("idle");
    cancel();
    reload();
  }

  async function handleDelete(id) {
    if (!confirm("Delete this link?")) return;
    const { error: deleteError } = await socialLinksCrud.remove(id);
    if (deleteError) {
      setError(deleteError.message);
      setStatus("error");
      return;
    }
    reload();
  }

  async function move(index, direction) {
    const target = index + direction;
    if (target < 0 || target >= links.length) return;
    await socialLinksCrud.swapOrder(links[index], links[target]);
    reload();
  }

  if (loading) return <p className="text-sm text-muted">Loading…</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl text-ink">Contact / Socials</h1>
      <p className="mt-1 text-sm text-muted">
        Email lives in Site Settings. These links appear in the public Contact section and
        footer.
      </p>

      <ul className="mt-8 divide-y divide-line/30 border-y border-line/30">
        {links.map((link, index) => (
          <li key={link.id} className="flex items-center justify-between gap-4 py-3">
            <div className="min-w-0">
              <p className="truncate text-sm text-ink">{link.label}</p>
              <p className="truncate text-xs text-muted">{link.url}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button type="button" onClick={() => move(index, -1)} disabled={index === 0} className="text-xs text-muted hover:text-ink disabled:opacity-30">↑</button>
              <button type="button" onClick={() => move(index, 1)} disabled={index === links.length - 1} className="text-xs text-muted hover:text-ink disabled:opacity-30">↓</button>
              <AdminButton variant="ghost" onClick={() => startEdit(link)}>Edit</AdminButton>
              <AdminButton variant="danger" onClick={() => handleDelete(link.id)}>Delete</AdminButton>
            </div>
          </li>
        ))}
        {links.length === 0 && <li className="py-6 text-sm text-muted">No links yet.</li>}
      </ul>

      {editingId ? (
        <form onSubmit={handleSave} className="mt-6 space-y-4 rounded border border-line/50 p-4">
          <Field label="Platform" hint="e.g. github, linkedin, email">
            <TextInput
              required
              value={form.platform}
              onChange={(e) => setForm((f) => ({ ...f, platform: e.target.value }))}
            />
          </Field>
          <Field label="Label" hint="Shown on the site, e.g. GitHub">
            <TextInput
              required
              value={form.label}
              onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
            />
          </Field>
          <Field label="URL">
            <TextInput
              required
              value={form.url}
              onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
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
          + Add link
        </AdminButton>
      )}
    </div>
  );
}
