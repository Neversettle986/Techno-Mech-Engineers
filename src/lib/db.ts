import dbConnect from './mongoose';
import SubmissionModel, { ISubmission } from '@/models/Submission';

export interface Submission {
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

const mapDocToSubmission = (doc: ISubmission): Submission => {
    return {
        id: doc._id.toString(),
        name: doc.name,
        email: doc.email,
        phone: doc.phone,
        company: doc.company,
        subject: doc.subject,
        message: doc.message,
        date: doc.createdAt.toISOString(),
        status: doc.status
    };
};

export const getSubmissions = async (): Promise<Submission[]> => {
    await dbConnect();
    const docs = await SubmissionModel.find({}).sort({ createdAt: -1 });
    // Check for auto-updates (logic from old db.ts moved here or handled differently?)
    // The old logic updated 'new' to 'pending' after 24h on read.
    // We can replicate that or skip it. Let's replicate it for consistency.

    // Actually, updating on read is not ideal for Mongoose. 
    // Let's just return the data for now. If status update is needed, it should be a separate background job or check.
    // However, to maintain exact behavior:

    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const updates = docs.filter(doc => doc.status === 'new' && doc.createdAt < twentyFourHoursAgo);

    if (updates.length > 0) {
        await SubmissionModel.updateMany(
            { _id: { $in: updates.map(d => d._id) } },
            { $set: { status: 'pending' } }
        );
        // Refresh data
        const updatedDocs = await SubmissionModel.find({}).sort({ createdAt: -1 });
        return updatedDocs.map(mapDocToSubmission);
    }

    return docs.map(mapDocToSubmission);
};

export const addSubmission = async (submission: Omit<Submission, 'id' | 'date' | 'status'>): Promise<Submission> => {
    await dbConnect();
    const doc = await SubmissionModel.create(submission);
    return mapDocToSubmission(doc);
};

export const updateSubmission = async (id: string, updates: Partial<Submission>): Promise<Submission | null> => {
    await dbConnect();
    const doc = await SubmissionModel.findByIdAndUpdate(id, updates, { new: true });
    return doc ? mapDocToSubmission(doc) : null;
};

export const deleteSubmission = async (id: string): Promise<void> => {
    await dbConnect();
    await SubmissionModel.findByIdAndDelete(id);
};

export const deleteSubmissions = async (ids: string[]): Promise<void> => {
    await dbConnect();
    await SubmissionModel.deleteMany({ _id: { $in: ids } });
};
