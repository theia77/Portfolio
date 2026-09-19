import { useEffect, useState } from "react";
import { fetchProjects, projectsCrud } from "../../../services/projectService.js";
import { Field, TextInput, TextArea, Checkbox } from "../ui/Field.jsx";
import { AdminButton, SaveStatus } from "../ui/SaveStatus.jsx";

const EMPTY = {
  title: "",
  slug: "",
  year: "",
  category: "",
  short_description: "",
  description: "",
  image_url: "",
  video_url: "",
  tools: "",
  overview: "",
  objective: "",
  approach: "",
  process: "",
  outcome: "",
  learnings: "",
  github_url: "",
  external_url: "",
  featured: false,
};

function toForm(project) {
  return {
    ...EMPTY,
    ...project,
    tools: (project.tools || []).join(", "),
    featured: Boolean(project.featured),
  };
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function toPayload(form) {
  const {
    title,
    slug,
    year,
    category,
    short_description,
    description,
    image_url,
    video_url,
    tools,
    overview,
    objective,
    approach,
    process,
    outcome,
    learnings,
    github_url,
    external_url,
    featured,
  } = form;

  return {
    title,
    slug: slug || slugify(title),
    year: year || null,
    category: category || null,
    short_description: short_description || null,
    description: description || null,
    image_url: image_url || null,
    video_url: video_url || null,
    tools: tools.split(",").map((s) => s.trim()).filter(Boolean),
    overview: overview || null,
    objective: objective || null,
    approach: approach || null,
    process: process || null,
    outcome: outcome || null,
    learnings: learnings || null,
    github_url: github_url || null,
    external_url: external_url || null,
    featured,
  };
}

export default function ProjectsEditor() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function reload() {
    const { data } = await fetchProjects();
    setProjects(data);
    setLoading(false);
  }

  useEffect(() => {
    reload();
  }, []);

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function startAdd() {
    setEditingId("new");
    setForm(EMPTY);
    setStatus("idle");
  }

  function startEdit(project) {
    setEditingId(project.id);
    setForm(toForm(project));
    setStatus("idle");
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
        ? await projectsCrud.create({ ...payload, sort_order: projects.length })
        : await projectsCrud.update(editingId, payload);

    if (saveError) {
      setStatus("error");
      setError(saveError.message);
      return;
    }
    cancel();
    reload();
  }

  async function handleDelete(id) {
    if (!confirm("Delete this project?")) return;
    const { error: deleteError } = await projectsCrud.remove(id);
    if (deleteError) {
      setError(deleteError.message);
      setStatus("error");
      return;
    }
    reload();
  }

  async function move(index, direction) {
    const target = index + direction;
    if (target < 0 || target >= projects.length) return;
    await projectsCrud.swapOrder(projects[index], projects[target]);
    reload();
  }

  if (loading) return <p className="text-sm text-muted">Loading…</p>;

  return (
    <div className="max-w-3xl">
      <h1 className="text-xl text-ink">Projects</h1>
      <p className="mt-1 text-sm text-muted">
        Powers both the Work section list and each project&rsquo;s /work/:slug page.
      </p>

      <ul className="mt-8 divide-y divide-line/30 border-y border-line/30">
        {projects.map((project, index) => (
          <li key={project.id} className="flex items-center justify-between gap-4 py-3">
            <div className="min-w-0">
              <p className="truncate text-sm text-ink">
                {project.title} {project.featured && <span className="text-accent">★</span>}
              </p>
              <p className="truncate text-xs text-muted">
                /{project.slug} · {[project.category, project.year].filter(Boolean).join(" / ")}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button type="button" onClick={() => move(index, -1)} disabled={index === 0} className="text-xs text-muted hover:text-ink disabled:opacity-30">↑</button>
              <button type="button" onClick={() => move(index, 1)} disabled={index === projects.length - 1} className="text-xs text-muted hover:text-ink disabled:opacity-30">↓</button>
              <AdminButton variant="ghost" onClick={() => startEdit(project)}>Edit</AdminButton>
              <AdminButton variant="danger" onClick={() => handleDelete(project.id)}>Delete</AdminButton>
            </div>
          </li>
        ))}
        {projects.length === 0 && <li className="py-6 text-sm text-muted">No projects yet.</li>}
      </ul>

      {editingId ? (
        <form onSubmit={handleSave} className="mt-6 space-y-6 rounded border border-line/50 p-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Title">
              <TextInput required value={form.title} onChange={(e) => set("title", e.target.value)} />
            </Field>
            <Field label="Slug" hint="Leave blank to generate from the title.">
              <TextInput value={form.slug} onChange={(e) => set("slug", e.target.value)} />
            </Field>
            <Field label="Category">
              <TextInput value={form.category} onChange={(e) => set("category", e.target.value)} />
            </Field>
            <Field label="Year">
              <TextInput value={form.year} onChange={(e) => set("year", e.target.value)} />
            </Field>
          </div>

          <Field label="Short description" hint="Shown in the Work list.">
            <TextArea rows={2} value={form.short_description} onChange={(e) => set("short_description", e.target.value)} />
          </Field>

          <Field label="Description" hint="Shown at the top of the project detail page.">
            <TextArea rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Image URL">
              <TextInput value={form.image_url} onChange={(e) => set("image_url", e.target.value)} />
            </Field>
            <Field label="Video URL">
              <TextInput value={form.video_url} onChange={(e) => set("video_url", e.target.value)} />
            </Field>
          </div>

          <Field label="Tools" hint="Comma-separated.">
            <TextInput value={form.tools} onChange={(e) => set("tools", e.target.value)} />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Overview"><TextArea rows={2} value={form.overview} onChange={(e) => set("overview", e.target.value)} /></Field>
            <Field label="Objective"><TextArea rows={2} value={form.objective} onChange={(e) => set("objective", e.target.value)} /></Field>
            <Field label="Approach"><TextArea rows={2} value={form.approach} onChange={(e) => set("approach", e.target.value)} /></Field>
            <Field label="Process"><TextArea rows={2} value={form.process} onChange={(e) => set("process", e.target.value)} /></Field>
            <Field label="Outcome"><TextArea rows={2} value={form.outcome} onChange={(e) => set("outcome", e.target.value)} /></Field>
            <Field label="Learnings"><TextArea rows={2} value={form.learnings} onChange={(e) => set("learnings", e.target.value)} /></Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="GitHub URL">
              <TextInput value={form.github_url} onChange={(e) => set("github_url", e.target.value)} />
            </Field>
            <Field label="External URL">
              <TextInput value={form.external_url} onChange={(e) => set("external_url", e.target.value)} />
            </Field>
          </div>

          <Checkbox
            label="Featured"
            checked={form.featured}
            onChange={(e) => set("featured", e.target.checked)}
          />

          <div className="flex items-center gap-3">
            <AdminButton type="submit" disabled={status === "saving"}>Save</AdminButton>
            <AdminButton variant="ghost" onClick={cancel}>Cancel</AdminButton>
            <SaveStatus status={status} error={error} />
          </div>
        </form>
      ) : (
        <AdminButton className="mt-6" onClick={startAdd}>
          + Add project
        </AdminButton>
      )}
    </div>
  );
}
