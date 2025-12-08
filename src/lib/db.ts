import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'submissions.json');

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

export const getSubmissions = (): Submission[] => {
    try {
        if (!fs.existsSync(DATA_FILE)) {
            return [];
        }
        const data = fs.readFileSync(DATA_FILE, 'utf-8');
        let submissions: Submission[] = JSON.parse(data);

        // Auto-update status from 'new' to 'pending' after 24 hours
        let hasUpdates = false;
        const now = new Date();
        const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        submissions = submissions.map(submission => {
            if (submission.status === 'new' && new Date(submission.date) < twentyFourHoursAgo) {
                hasUpdates = true;
                return { ...submission, status: 'pending' };
            }
            return submission;
        });

        if (hasUpdates) {
            fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2));
        }

        return submissions;
    } catch (error) {
        console.error('Error reading submissions:', error);
        return [];
    }
};

export const addSubmission = (submission: Omit<Submission, 'id' | 'date' | 'status'>) => {
    const submissions = getSubmissions();
    const newSubmission: Submission = {
        ...submission,
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString(),
        status: 'new'
    };
    submissions.unshift(newSubmission);
    fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2));
    return newSubmission;
};

export const updateSubmission = (id: string, updates: Partial<Submission>) => {
    const submissions = getSubmissions();
    const index = submissions.findIndex(s => s.id === id);
    if (index !== -1) {
        submissions[index] = { ...submissions[index], ...updates };
        fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2));
        return submissions[index];
    }
    return null;
};

export const deleteSubmission = (id: string) => {
    let submissions = getSubmissions();
    submissions = submissions.filter(s => s.id !== id);
    fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2));
};

export const deleteSubmissions = (ids: string[]) => {
    let submissions = getSubmissions();
    submissions = submissions.filter(s => !ids.includes(s.id));
    fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2));
};
