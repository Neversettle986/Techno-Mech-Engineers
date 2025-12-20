import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISubmission extends Document {
    name: string;
    email: string;
    phone: string;
    company?: string;
    subject: string;
    message: string;
    status: 'new' | 'pending' | 'contacted';
    createdAt: Date;
}

const SubmissionSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    company: { type: String },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: {
        type: String,
        enum: ['new', 'pending', 'contacted'],
        default: 'new'
    },
    createdAt: { type: Date, default: Date.now }
});

// Check if model exists before compiling to avoid OverwriteModelError
const Submission: Model<ISubmission> = mongoose.models.Submission || mongoose.model<ISubmission>('Submission', SubmissionSchema);

export default Submission;
