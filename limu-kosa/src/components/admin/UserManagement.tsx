"use client";

import { useState } from "react";
import { UserRound, Plus, Key, Trash2, Shield, Edit3 } from "lucide-react";

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "EDITOR";
  createdAt: string;
}

interface UserManagementProps {
  users: UserRecord[];
  onCreateUser: (name: string, email: string, password: string, role: "ADMIN" | "EDITOR") => Promise<void>;
  onResetPassword: (userId: string, newPassword: string) => Promise<void>;
  onDeleteUser: (userId: string) => Promise<void>;
  isBusy: boolean;
  currentUserRole: string;
}

export default function UserManagement({
  users,
  onCreateUser,
  onResetPassword,
  onDeleteUser,
  isBusy,
  currentUserRole,
}: UserManagementProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState<"ADMIN" | "EDITOR">("EDITOR");

  const [resetUserId, setResetUserId] = useState<string | null>(null);
  const [resetPassword, setResetPassword] = useState("");

  const isAdmin = currentUserRole === "ADMIN";

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    await onCreateUser(newName, newEmail, newPassword, newRole);
    setNewName("");
    setNewEmail("");
    setNewPassword("");
    setNewRole("EDITOR");
    setShowCreateForm(false);
  }

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    if (!resetUserId) return;
    await onResetPassword(resetUserId, resetPassword);
    setResetUserId(null);
    setResetPassword("");
  }

  if (!isAdmin) {
    return (
      <div className="px-4 py-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-[#D7DED5] p-8 text-center">
          <Shield className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-[#2C2C2C]">Access Restricted</h2>
          <p className="text-sm text-[#50627A] mt-2">
            Only administrators with the ADMIN role can manage users.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UserRound className="h-5 w-5 text-[#1E5631]" />
          <h2 className="text-sm font-black uppercase tracking-wider text-[#2C2C2C]">
            User Management
          </h2>
          <span className="text-xs bg-[#EEF2ED] text-[#1E5631] font-bold px-2 py-0.5 rounded-full">
            {users.length} users
          </span>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#1E5631] px-4 py-2 text-xs font-bold text-white hover:bg-[#12351E] transition shadow-sm"
        >
          <Plus className="h-3.5 w-3.5" />
          Add User
        </button>
      </div>

      {/* Create User Form */}
      {showCreateForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-[#D7DED5] overflow-hidden">
          <div className="flex items-center gap-2 border-b border-[#E8E1D4] px-5 py-4 bg-[#FAF9F5]">
            <Plus className="h-4 w-4 text-[#1E5631]" />
            <h3 className="text-xs font-black uppercase tracking-wider text-[#2C2C2C]">
              Create New User
            </h3>
          </div>
          <form onSubmit={handleCreate} className="p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-[#50627A]">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Abebe Tadesse"
                  className="w-full rounded-lg border border-[#D7DED5] bg-white px-3.5 py-2 text-sm outline-none focus:border-[#1E5631] focus:ring-1 focus:ring-[#1E5631]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-[#50627A]">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="e.g. user@limukosa.gov.et"
                  className="w-full rounded-lg border border-[#D7DED5] bg-white px-3.5 py-2 text-sm outline-none focus:border-[#1E5631] focus:ring-1 focus:ring-[#1E5631]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-[#50627A]">
                  Password
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="w-full rounded-lg border border-[#D7DED5] bg-white px-3.5 py-2 text-sm outline-none focus:border-[#1E5631] focus:ring-1 focus:ring-[#1E5631]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-[#50627A]">
                  Role
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as "ADMIN" | "EDITOR")}
                  className="w-full rounded-lg border border-[#D7DED5] bg-white px-3.5 py-2 text-sm outline-none focus:border-[#1E5631] focus:ring-1 focus:ring-[#1E5631]"
                >
                  <option value="EDITOR">Editor</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={isBusy}
                className="inline-flex items-center gap-2 rounded-lg bg-[#1E5631] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#12351E] transition disabled:opacity-40 shadow-sm"
              >
                <Plus className="h-4 w-4" />
                Create User
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="text-xs font-bold text-[#50627A] hover:text-red-600 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reset Password Modal */}
      {resetUserId && (
        <div className="bg-white rounded-2xl shadow-sm border border-amber-200 overflow-hidden">
          <div className="flex items-center gap-2 border-b border-amber-200 px-5 py-4 bg-amber-50">
            <Key className="h-4 w-4 text-amber-700" />
            <h3 className="text-xs font-black uppercase tracking-wider text-amber-900">
              Reset Password for {users.find(u => u.id === resetUserId)?.email}
            </h3>
          </div>
          <form onSubmit={handleResetPassword} className="p-5 space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-[#50627A]">
                New Password
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={resetPassword}
                onChange={(e) => setResetPassword(e.target.value)}
                placeholder="Enter new password (min. 8 characters)"
                className="w-full max-w-md rounded-lg border border-[#D7DED5] bg-white px-3.5 py-2 text-sm outline-none focus:border-[#1E5631] focus:ring-1 focus:ring-[#1E5631]"
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={isBusy}
                className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-amber-700 transition disabled:opacity-40 shadow-sm"
              >
                <Key className="h-4 w-4" />
                Reset Password
              </button>
              <button
                type="button"
                onClick={() => { setResetUserId(null); setResetPassword(""); }}
                className="text-xs font-bold text-[#50627A] hover:text-red-600 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#D7DED5] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E8E1D4] bg-[#FAF9F5]">
                <th className="text-left px-5 py-3.5 text-[10px] font-black uppercase tracking-wider text-[#50627A]">Name</th>
                <th className="text-left px-5 py-3.5 text-[10px] font-black uppercase tracking-wider text-[#50627A]">Email</th>
                <th className="text-left px-5 py-3.5 text-[10px] font-black uppercase tracking-wider text-[#50627A]">Role</th>
                <th className="text-left px-5 py-3.5 text-[10px] font-black uppercase tracking-wider text-[#50627A]">Created</th>
                <th className="text-right px-5 py-3.5 text-[10px] font-black uppercase tracking-wider text-[#50627A]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-[#E8E1D4] last:border-0 hover:bg-[#FAF9F5] transition">
                  <td className="px-5 py-3.5 text-sm font-medium text-[#2C2C2C]">{user.name}</td>
                  <td className="px-5 py-3.5 text-sm text-[#50627A]">{user.email}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      user.role === "ADMIN"
                        ? "bg-[#1E5631]/10 text-[#1E5631]"
                        : "bg-blue-50 text-blue-700"
                    }`}>
                      {user.role === "ADMIN" && <Shield className="h-3 w-3" />}
                      {user.role === "ADMIN" ? <Edit3 className="h-3 w-3" /> : null}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-[#50627A]">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => { setResetUserId(user.id); setResetPassword(""); }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 hover:bg-amber-100 transition"
                        title="Reset Password"
                      >
                        <Key className="h-3 w-3" />
                        Reset
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete ${user.email}? This action cannot be undone.`)) {
                            onDeleteUser(user.id);
                          }
                        }}
                        disabled={isBusy}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider text-red-700 bg-red-50 border border-red-200 hover:bg-red-100 transition disabled:opacity-40"
                        title="Delete User"
                      >
                        <Trash2 className="h-3 w-3" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-sm text-[#50627A]">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
