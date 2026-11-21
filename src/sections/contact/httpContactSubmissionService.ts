import type { ContactMessage } from './contactModel';
import type {
    ContactSubmissionProtection,
    ContactSubmissionResult,
    ContactSubmissionService,
} from './contactSubmissionService';

export const createHttpContactSubmissionService = (
    _endpoint?: string,
): ContactSubmissionService => ({
    async submit(
        message: ContactMessage,
        _protection: ContactSubmissionProtection,
    ): Promise<ContactSubmissionResult> {
        const subject = encodeURIComponent(`Portfolio inquiry from ${message.name}`);
        const body = encodeURIComponent(
            `${message.message}\n\nReply to: ${message.email}`,
        );
        const mailtoUrl = `mailto:shreyanshrajput018@gmail.com?subject=${subject}&body=${body}`;

        if (typeof window !== 'undefined') {
            window.location.href = mailtoUrl;
        }

        return { kind: 'success' };
    },
});