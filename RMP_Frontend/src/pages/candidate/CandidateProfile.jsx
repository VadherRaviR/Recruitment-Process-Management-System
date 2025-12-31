import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";

export default function CandidateProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [resumeFile, setResumeFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    experienceYears: 0
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await api.get("/candidates/profile");
      setProfile(res.data);
      setForm({
        fullName: res.data.fullName,
        phone: res.data.phone ?? "",
        experienceYears: res.data.experienceYears
      });
    } catch {
      alert("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      await api.put("/candidates/profile", {
        fullName: form.fullName,
        phone: form.phone,
        experienceYears: Number(form.experienceYears)
      });
      await loadProfile();
      setIsEditing(false);
      alert("Profile updated successfully");
    } catch {
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleResumeUpload = async () => {
    if (!resumeFile) return;

    const formData = new FormData();
    formData.append("resume", resumeFile);

    setUploading(true);
    try {
      await api.put("/candidates/profile/resume", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setResumeFile(null);
      await loadProfile();
      alert("Resume updated successfully");
    } catch {
      alert("Failed to upload resume");
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="p-6">Loading profile...</div>;

  const jobs = profile.appliedJobs || [];
  const count = (status) =>
    jobs.filter(j => j.applicationStatus === status).length;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10">

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">My Profile</h1>
        <span className="text-gray-500">{profile.email}</span>
      </div>

      <div className="bg-white shadow rounded-lg p-6 flex items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-xl font-bold text-blue-700">
          {profile.fullName.charAt(0)}
        </div>
        <div>
          <h2 className="text-xl font-semibold">{profile.fullName}</h2>
          <p className="text-gray-500">
            {profile.experienceYears} years experience
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Stat title="Applied" value={jobs.length} />
        <Stat title="Shortlisted" value={count("Shortlisted")} />
        <Stat title="Interview" value={count("Interview")} />
        <Stat title="Offer" value={count("Offer")} />
        <Stat title="Hired" value={count("Hired")} />
      </div>

      <Section title="Profile Details">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Full Name"
            name="fullName"
            value={form.fullName}
            disabled={!isEditing}
            onChange={handleChange}
          />
          <Input
            label="Phone"
            name="phone"
            value={form.phone}
            disabled={!isEditing}
            onChange={handleChange}
          />
          <Input
            label="Experience (Years)"
            type="number"
            name="experienceYears"
            value={form.experienceYears}
            disabled={!isEditing}
            onChange={handleChange}
          />
        </div>

        <div className="mt-4 flex gap-3">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleSaveProfile}
                disabled={saving}
                className="px-6 py-2 bg-green-600 text-white rounded disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save"}
              </button>

              <button
                onClick={() => {
                  setForm({
                    fullName: profile.fullName,
                    phone: profile.phone ?? "",
                    experienceYears: profile.experienceYears
                  });
                  setIsEditing(false);
                }}
                className="px-6 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </Section>

      <Section title="Resume">
        {profile.resumePath ? (
          <a
            href={`${import.meta.env.VITE_API_BASE_URL}/${profile.resumePath}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline block mb-3"
          >
            View Current Resume
          </a>
        ) : (
          <p className="text-gray-500 mb-2">No resume uploaded</p>
        )}

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResumeFile(e.target.files[0])}
        />

        <button
          onClick={handleResumeUpload}
          disabled={!resumeFile || uploading}
          className="mt-3 px-5 py-2 bg-green-600 text-white rounded disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Upload New Resume"}
        </button>
      </Section>

      <Section title="Applied Jobs">
        {jobs.length === 0 ? (
          <p className="text-gray-500">No applications yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Job</th>
                  <th className="px-4 py-2 text-center">Status</th>
                  <th className="px-4 py-2 text-center">Applied Date</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map(job => (
                  <tr key={job.jobId} className="border-t">
                    <td className="px-4 py-2">{job.jobTitle}</td>
                    <td className="px-4 py-2 text-center">
                      <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
                        {job.applicationStatus}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-center">
                      {new Date(job.appliedDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>
    </div>
  );
}


function Stat({ title, value }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 text-center">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}

function Input({ label, disabled, ...props }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input
        {...props}
        disabled={disabled}
        className={`w-full border rounded px-3 py-2 ${
          disabled ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
}
