import { useEffect, useMemo, useState } from "react";
import { fetchSkillRows, skillsCrud } from "../../../services/skillsService.js";
import { Field, TextInput } from "../ui/Field.jsx";
import { AdminButton, SaveStatus } from "../ui/SaveStatus.jsx";

const EMPTY = { group_name: "", skill_name: "" };

export default function SkillsEditor() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function reload() {
    const { data } = await fetchSkillRows();
    setRows(data);
    setLoading(false);
  }

  useEffect(() => {
    reload();
  }, []);

  const groups = useMemo(() => {
    const map = new Map();
    rows.forEach((row) => {
      if (!map.has(row.group_name)) map.set(row.group_name, []);
      map.get(row.group_name).push(row);
    });
    return Array.from(map.entries());
  }, [rows]);

  function startAdd() {
    setEditingId("new");
    setForm(EMPTY);
  }

  function startEdit(row) {
    setEditingId(row.id);
    setForm({ group_name: row.group_name, skill_name: row.skill_name });
  }

  function cancel() {
    setEditingId(null);
    setStatus("idle");
  }

  async function handleSave(event) {
    event.preventDefault();
    setStatus("saving");
    setError("");

    const { error: saveError } =
      editingId === "new"
        ? await skillsCrud.create({ ...form, sort_order: rows.length })
        : await skillsCrud.update(editingId, form);

    if (saveError) {
      setStatus("error");
      setError(saveError.message);
      return;
    }
    cancel();
    reload();
  }

  async function handleDelete(id) {
    if (!confirm("Delete this skill?")) return;
    const { error: deleteError } = await skillsCrud.remove(id);
    if (deleteError) {
      setError(deleteError.message);
      setStatus("error");
      return;
    }
    reload();
  }

  async function move(row, direction) {
    const groupRows = rows.filter((r) => r.group_name === row.group_name);
    const index = groupRows.findIndex((r) => r.id === row.id);
    const target = groupRows[index + direction];
    if (!target) return;
    await skillsCrud.swapOrder(row, target);
    reload();
  }

  if (loading) return <p className="text-sm text-muted">Loading…</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl text-ink">Skills</h1>
      <p className="mt-1 text-sm text-muted">
        Grouped, text-based skills — no percentage ratings. Groups are formed automatically
        from what you type as &ldquo;Group&rdquo;.
      </p>

      <div className="mt-8 space-y-6">
        {groups.map(([groupName, groupRows]) => (
          <div key={groupName}>
            <h2 className="text-xs uppercase tracking-wide text-accent">{groupName}</h2>
            <ul className="mt-2 divide-y divide-line/30 border-y border-line/30">
              {groupRows.map((row, index) => (
                <li key={row.id} className="flex items-center justify-between gap-4 py-2.5">
                  <span className="text-sm text-ink">{row.skill_name}</span>
                  <div className="flex shrink-0 items-center gap-2">
                    <button type="button" onClick={() => move(row, -1)} disabled={index === 0} className="text-xs text-muted hover:text-ink disabled:opacity-30">↑</button>
                    <button type="button" onClick={() => move(row, 1)} disabled={index === groupRows.length - 1} className="text-xs text-muted hover:text-ink disabled:opacity-30">↓</button>
                    <AdminButton variant="ghost" onClick={() => startEdit(row)}>Edit</AdminButton>
                    <AdminButton variant="danger" onClick={() => handleDelete(row.id)}>Delete</AdminButton>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {groups.length === 0 && <p className="text-sm text-muted">No skills yet.</p>}
      </div>

      {editingId ? (
        <form onSubmit={handleSave} className="mt-6 space-y-4 rounded border border-line/50 p-4">
          <Field label="Group" hint="e.g. Programming, Data, Engineering, Tools">
            <TextInput
              required
              value={form.group_name}
              onChange={(e) => setForm((f) => ({ ...f, group_name: e.target.value }))}
            />
          </Field>
          <Field label="Skill">
            <TextInput
              required
              value={form.skill_name}
              onChange={(e) => setForm((f) => ({ ...f, skill_name: e.target.value }))}
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
          + Add skill
        </AdminButton>
      )}
    </div>
  );
}
