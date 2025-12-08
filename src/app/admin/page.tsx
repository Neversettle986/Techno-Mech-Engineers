'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Trash2, Edit, Save, X, Eye } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Submission {
    id: string;
    name: string;
    email: string;
    phone: string;
    company?: string;
    subject: string;
    message: string;
    date: string;
    status: 'new' | 'pending' | 'contacted';
}

const AdminDashboard = () => {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingSubmission, setEditingSubmission] = useState<Submission | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isBulkDeleting, setIsBulkDeleting] = useState(false);
    const { toast } = useToast();

    const fetchSubmissions = async () => {
        try {
            const response = await fetch('/api/admin/submissions');
            if (response.ok) {
                const data = await response.json();
                setSubmissions(data);
            } else {
                throw new Error('Failed to fetch');
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to load submissions",
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const confirmDelete = (id: string) => {
        setDeletingId(id);
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === submissions.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(submissions.map(s => s.id));
        }
    };

    const toggleSelect = (id: string) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(sId => sId !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const handleBulkDelete = async () => {
        if (selectedIds.length === 0) return;
        setIsBulkDeleting(true);
        try {
            const response = await fetch('/api/admin/submissions', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ids: selectedIds }),
            });

            if (response.ok) {
                setSubmissions(submissions.filter(s => !selectedIds.includes(s.id)));
                setSelectedIds([]);
                toast({ title: "Deleted", description: `${selectedIds.length} submissions deleted successfully` });
            } else {
                throw new Error('Failed to delete');
            }
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Failed to delete submissions" });
        } finally {
            setIsBulkDeleting(false);
        }
    };

    const handleDelete = async () => {
        if (!deletingId) return;

        try {
            const response = await fetch(`/api/admin/submissions?id=${deletingId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setSubmissions(submissions.filter(s => s.id !== deletingId));
                toast({ title: "Deleted", description: "Submission deleted successfully" });
            } else {
                throw new Error('Failed to delete');
            }
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Failed to delete" });
        } finally {
            setDeletingId(null);
        }
    };

    const handleEdit = (submission: Submission) => {
        setEditingSubmission({ ...submission });
    };

    const handleSave = async () => {
        if (!editingSubmission) return;

        try {
            const response = await fetch('/api/admin/submissions', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingSubmission),
            });

            if (response.ok) {
                setSubmissions(submissions.map(s => s.id === editingSubmission.id ? editingSubmission : s));
                setEditingSubmission(null);
                toast({ title: "Saved", description: "Submission updated successfully" });
            }
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Failed to update" });
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString() + ' ' + new Date(dateString).toLocaleTimeString();
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20">
                <Loader2 className="animate-spin h-8 w-8 text-[#DC143C]" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                    <div className="flex gap-2">
                        {selectedIds.length > 0 && (
                            <Button
                                onClick={handleBulkDelete}
                                variant="destructive"
                                disabled={isBulkDeleting}
                            >
                                {isBulkDeleting ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : <Trash2 className="h-4 w-4 mr-2" />}
                                Delete Selected ({selectedIds.length})
                            </Button>
                        )}
                        <Button onClick={fetchSubmissions} variant="outline">Refresh</Button>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-100 border-b">
                                <tr>
                                    <th className="px-6 py-3 text-left">
                                        <Checkbox
                                            checked={submissions.length > 0 && selectedIds.length === submissions.length}
                                            onCheckedChange={toggleSelectAll}
                                        />
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {submissions.map((submission) => (
                                    <tr key={submission.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <Checkbox
                                                checked={selectedIds.includes(submission.id)}
                                                onCheckedChange={() => toggleSelect(submission.id)}
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(submission.date)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900">{submission.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {submission.phone}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <a href={`mailto:${submission.email}`} className="hover:text-[#DC143C]">
                                                {submission.email}
                                            </a>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900 max-w-xs truncate">{submission.subject}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${submission.status === 'new' ? 'bg-green-100 text-green-800' :
                                                    submission.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-yellow-100 text-yellow-800'}`}>
                                                {submission.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(submission)} className="text-blue-600 hover:text-blue-900 mr-2">
                                                <Edit size={18} />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => confirmDelete(submission.id)} className="text-red-600 hover:text-red-900">
                                                <Trash2 size={18} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {submissions.length === 0 && (
                                    <tr>
                                        <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                                            No submissions found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <AlertDialog open={!!deletingId} onOpenChange={(open) => !open && setDeletingId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the submission
                            from the database.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {editingSubmission && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Edit Submission</h2>
                            <Button variant="ghost" size="icon" onClick={() => setEditingSubmission(null)}>
                                <X size={24} />
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={editingSubmission.name}
                                        onChange={(e) => setEditingSubmission({ ...editingSubmission, name: e.target.value })}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={editingSubmission.email}
                                        onChange={(e) => setEditingSubmission({ ...editingSubmission, email: e.target.value })}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                    <input
                                        type="text"
                                        value={editingSubmission.phone}
                                        onChange={(e) => setEditingSubmission({ ...editingSubmission, phone: e.target.value })}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        value={editingSubmission.status}
                                        onChange={(e) => setEditingSubmission({ ...editingSubmission, status: e.target.value as any })}
                                        className="w-full p-2 border rounded"
                                    >
                                        <option value="new">New</option>
                                        <option value="pending">Pending</option>
                                        <option value="contacted">Contacted</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                <input
                                    type="text"
                                    value={editingSubmission.subject}
                                    onChange={(e) => setEditingSubmission({ ...editingSubmission, subject: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea
                                    value={editingSubmission.message}
                                    onChange={(e) => setEditingSubmission({ ...editingSubmission, message: e.target.value })}
                                    rows={6}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <Button variant="outline" onClick={() => setEditingSubmission(null)}>Cancel</Button>
                            <Button onClick={handleSave} className="bg-[#DC143C] hover:bg-[#B01030] text-white">
                                <Save size={18} className="mr-2" />
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
